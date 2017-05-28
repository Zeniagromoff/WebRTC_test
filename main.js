'use strict';

var localVideo = document.getElementById('localVideo');
var remoteVideo = document.getElementById('remoteVideo');

localVideo.onclick = start

var localStream;
var pc1;
var pc2;
var offerOptions = {
  offerToReceiveAudio: 1,
  offerToReceiveVideo: 1
};

localVideo.addEventListener('loadedmetadata', function() {
  trace('Local video videoWidth: ' + this.videoWidth +
    'px,  videoHeight: ' + this.videoHeight + 'px');
});

remoteVideo.addEventListener('loadedmetadata', function() {
  trace('Remote video videoWidth: ' + this.videoWidth +
    'px,  videoHeight: ' + this.videoHeight + 'px');
});


function start() {
	console.log( 'start' )
	navigator.mediaDevices.getUserMedia({
		audio: false,
		video: true
	})
	.then( ( stream )=>{
		localVideo.srcObject = stream;
		window.localStream = localStream = stream;
		// var videoTracks = localStream.getVideoTracks();
		// var audioTracks = localStream.getAudioTracks();
		
		// if (videoTracks.length > 0) {
		// 	console.log('Using video device: ' + videoTracks[0].label);
		// }
		// if (audioTracks.length > 0) {
		// 	console.log('Using audio device: ' + audioTracks[0].label);
		// }

		// pc1 = new RTCPeerConnection( null );
		// console.log( 'Created local peer connection object pc1' );
		// pc1.onicecandidate = function ( e ) {
		// 	onIceCandidate( pc1, e );
		// }

		// pc2 = new RTCPeerConnection( null );
		// console.log( 'Created local peer connection object pc2' );
		// pc2.onicecandidate = function ( e ) {
		// 	onIceCandidate( pc2, e );
		// };

		console.log(localVideo)
		console.log(stream)

		// pc1.addStream( localStream );
	})
	.catch( function( e ) {
		console.log( 'getUserMedia() error: ' + e.name );
	});
}


function getName(pc) {
	return (pc === pc1) ? 'pc1' : 'pc2';
}

function getOtherPc(pc) {
	return (pc === pc1) ? pc2 : pc1;
}

function onIceCandidate( pc, event ) {
  if ( event.candidate ) {
    getOtherPc( pc ).addIceCandidate(
      new RTCIceCandidate( event.candidate )
    ).then(
      function() {
        onAddIceCandidateSuccess( pc );
      },
      function( err ) {
        onAddIceCandidateError( pc, err );
      }
    );
    console.log( getName( pc ) + ' ICE candidate: \n' + event.candidate.candidate );
  }
}

function onAddIceCandidateSuccess( pc ) {
	console.log( getName( pc ) + ' addIceCandidate success');
}

function onAddIceCandidateError( pc, error ) {
	console.log( getName( pc ) + ' failed to add ICE Candidate: ' + error.toString());
}