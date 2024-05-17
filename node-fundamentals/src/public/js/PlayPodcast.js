document.addEventListener("DOMContentLoaded", function() {
    const backwardBtn = document.getElementById("backward-btn");
    const playPauseBtn = document.getElementById("play-pause-btn");
    const forwardBtn = document.getElementById("forward-btn");
    const audioPlayer = document.getElementById("audio-player");

    const audioUrl = document.querySelector('.audio-player').getAttribute('data-audio-url');
    // Set the source URL for the audio element
    audioPlayer.src = audioUrl;

    backwardBtn.addEventListener("click", function() {
      audioPlayer.currentTime -= 5; // Move backward 5 seconds
    });

    playPauseBtn.addEventListener("click", function() {
      if (audioPlayer.paused) {
        audioPlayer.play(); // If paused, play
        playPauseBtn.textContent = "⏸"; // Change button display to pause
      } else {
        audioPlayer.pause(); // If playing, pause
        playPauseBtn.textContent = "▶️"; // Change button display to play
      }
    });

    forwardBtn.addEventListener("click", function() {
      audioPlayer.currentTime += 5; // Move forward 5 seconds
    });
  });