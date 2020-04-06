export function playSound() {
  const audio = document.getElementById('audio');
  audio.pause();
  audio.play();
}
