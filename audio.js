const audioIcon = document.getElementById('audio-icon');
const audioPlayer = new Audio('videoplayback.mp3');

let isAudioMuted = true;

audioIcon.addEventListener('click', () => {
  if (isAudioMuted) {
    audioIcon.src = '/unMute.svg';
    audioPlayer.play();
    isAudioMuted = false;
  } else {
    audioIcon.src = 'https://ttdevasthanams.ap.gov.in/muteIcon.svg';
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    isAudioMuted = true;
  }
});