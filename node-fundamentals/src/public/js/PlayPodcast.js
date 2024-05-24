document.addEventListener("DOMContentLoaded", function() {
  function initializeAudioPlayer(){
    const detail_backwardBtn = document.getElementById("detail_backward-btn");
    const detail_playPauseBtn = document.getElementById("detail_play-pause-btn");
    const detail_forwardBtn = document.getElementById("detail_forward-btn");
    const detail_audioPlayer = document.getElementById("detail_audio-player");
    const detail_audioData = JSON.parse(sessionStorage.getItem('audioData'));
    const detail_audioUrl = document.querySelector('.detail_audio-player').getAttribute('detail_data-audio-url');
    detail_audioPlayer.src = detail_audioUrl;


    detail_backwardBtn.addEventListener("click", function() {
      detail_audioPlayer.currentTime -= 15; // Move backward 5 seconds
    });

    detail_playPauseBtn.addEventListener("click", async function() {
      if (detail_audioPlayer.paused) {
        detail_audioPlayer.play(); // If paused, play

        if (!detail_audioData) {
          const imageUrl = document.querySelector('.container_body_img img').src;
          const title = document.querySelector('.detail_controls h3').textContent;
          const audioData = {
            audioUrl: detail_audioUrl,
            imageUrl: imageUrl,
            title: title
          };
          sessionStorage.setItem('audioData', JSON.stringify(audioData));

          try {
            const response = await fetch('/api/save-audio-data', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(audioData)
            });

            if (response.ok) {
              const responseData = await response.json();
              console.log(responseData.message);
            } else {
              console.error('Failed to save audio data');
            }
          } catch (error) {
            console.error('Error:', error);
          }
          
          // Set flag to indicate data has been saved
          sessionStorage.setItem('isFirstLoadAfterSave', true);
        }
        
        detail_playPauseBtn.textContent = "❚❚"; // Change button display to pause
      } else {
        detail_audioPlayer.pause(); // If playing, pause
        detail_playPauseBtn.textContent = "▶"; // Change button display to play
      }
    });

    detail_forwardBtn.addEventListener("click", function() {
      detail_audioPlayer.currentTime += 15; // Move forward 5 seconds
    });

    
    detail_audioPlayer.addEventListener('timeupdate', () => {
      sessionStorage.setItem('detailAudioPlayerCurrentTime', detail_audioPlayer.currentTime);
    });

    detail_audioPlayer.addEventListener('play', () => {
      sessionStorage.setItem('detailAudioPlayerIsPlaying', true);
    });

    detail_audioPlayer.addEventListener('pause', () => {
      sessionStorage.setItem('detailAudioPlayerIsPlaying', false);
    });
  }
  

  async function deleteAudioData() {
    try {
      const response = await fetch('/api/audio-data', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        console.log('Audio data deleted successfully');
        sessionStorage.removeItem('audioData');
      } else {
        console.error('Failed to delete audio data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  if (document.querySelector('.detail') !== null) {
    deleteAudioData();
    initializeAudioPlayer();

  }

});
