document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('audio-player');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const backwardBtn = document.getElementById('backward-btn');
    const forwardBtn = document.getElementById('forward-btn');
    const audioData = JSON.parse(sessionStorage.getItem('audioData'));
    // Function to initialize the audio player with the stored data
    function initializeAudioPlayer(audioData) {
        if (audioData) {
            // Set the audio source URL from the stored data
            audioPlayer.src = audioData.audioUrl;
            // Set the image source and title from the stored data
            document.querySelector('.song-info img').src = audioData.imageUrl;
            document.querySelector('.song-info h3').textContent = audioData.title;

            const isFirstLoadAfterSave = sessionStorage.getItem('isFirstLoadAfterSave');
            var savedTime = sessionStorage.getItem('audioPlayerCurrentTime');
            var isPlaying = sessionStorage.getItem('audioPlayerIsPlaying') === 'true';
            // Load saved audio state
            if(isFirstLoadAfterSave){
                savedTime = sessionStorage.getItem('detailAudioPlayerCurrentTime');
                isPlaying = sessionStorage.getItem('detailAudioPlayerIsPlaying') === 'true';
                sessionStorage.removeItem('isFirstLoadAfterSave');
            }
        
            if (savedTime) {
                audioPlayer.currentTime = savedTime;
            }

            if (isPlaying) {
                audioPlayer.play();
                playPauseBtn.textContent = '⏸️';
            }

            // Save the audio state when time updates
            audioPlayer.addEventListener('timeupdate', () => {
                sessionStorage.setItem('audioPlayerCurrentTime', audioPlayer.currentTime);
            });

            // Save the play/pause state
            audioPlayer.addEventListener('play', () => {
                sessionStorage.setItem('audioPlayerIsPlaying', true);
            });

            audioPlayer.addEventListener('pause', () => {
                sessionStorage.setItem('audioPlayerIsPlaying', false);
            });

            // Play/Pause button
            playPauseBtn.addEventListener('click', () => {
                if (audioPlayer.paused) {
                    audioPlayer.play();
                    playPauseBtn.textContent = '⏸️';
                } else {
                    audioPlayer.pause();
                    playPauseBtn.textContent = '▶️';
                }
            });

            // Backward button
            backwardBtn.addEventListener('click', () => {
                audioPlayer.currentTime = Math.max(0, audioPlayer.currentTime - 15);
            });

            // Forward button
            forwardBtn.addEventListener('click', () => {
                audioPlayer.currentTime = Math.min(audioPlayer.duration, audioPlayer.currentTime + 15);
            });
        } else {
            console.error('No audio data found in sessionStorage.');
        }
    }
    initializeAudioPlayer(audioData);
});
