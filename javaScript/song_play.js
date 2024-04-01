    // Define the database of songs
    const songsDatabase = [
    {
        id: 1,
        name: "Three",
        description: "Audio for Three",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        image: "https://cdn-images.podbay.fm/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL2ltYWdlLnNpbXBsZWNhc3RjZG4uY29tL2ltYWdlcy9hMWE4N2I2Ny0yODY1LTQyMzQtYTA4Ny1iMzQyYWEzMGMzNTgvNmNiZGQzYmMtZTlmNy00MTQ1LWE0ZTktNTM4MTRlMWVlMDIyLzMwMDB4MzAwMC9zaG93LWNvdmVyLXRocmVlLTEuanBnP2FpZD1yc3NfZmVlZCIsImZhbGxiYWNrIjoiaHR0cHM6Ly9pczEtc3NsLm16c3RhdGljLmNvbS9pbWFnZS90aHVtYi9Qb2RjYXN0czEyNi92NC80Ny82NC9jNC80NzY0YzRhZi1lNzdlLTU4MGMtMWIxMi0yYzM0ZTYwYTZmYTQvbXphXzEyMzQxNDAxOTI1NTQ0MTk0OTkzLmpwZy82MDB4NjAwYmIuanBnIn0.sb8_Re1nykurmft-lcI1HtjPtY1XXNeKrbMHPgJSAZ4.jpg"
    },
    {
        id: 2,
        name: "Bear-Brook",
        description: "Audio for Bear-Brook",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        image: "https://cdn-images.podbay.fm/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL2ltYWdlLnNpbXBsZWNhc3RjZG4uY29tL2ltYWdlcy9iMmY1MWQyOC1iM2M3LTRmZDktOTQ0Ny1hYmZkMDJiMTE0MTgvZWRhYTI5ZDUtMDc4ZC00MTRjLWFiZGMtN2YzN2NhMzk3MTk3LzMwMDB4MzAwMC9iYjItbG9nb2ZpbmFsLmpwZz9haWQ9cnNzX2ZlZWQiLCJmYWxsYmFjayI6Imh0dHBzOi8vaXMxLXNzbC5tenN0YXRpYy5jb20vaW1hZ2UvdGh1bWIvUG9kY2FzdHMxMjYvdjQvMDQvYzMvNTEvMDRjMzUxNmYtOTcyMy1jYWFhLWY1ZWMtZDcxY2I5NTlhYzY2L216YV80ODQzODkyNzY5Njk2MjQyMDEwLmpwZy82MDB4NjAwYmIuanBnIn0.mLjCC6GAbTfW1tlY1WqD_bgq3zaZlcbI72xcf-Vak6c.jpg?width=400&height=400"
    },
    {
        id: 3,
        name: "Daily_About",
        description: "Audio for Daily_About",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        image: "https://cdn-images.podbay.fm/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL2ltYWdlLnNpbXBsZWNhc3RjZG4uY29tL2ltYWdlcy8wM2Q4YjQ5My04N2ZjLTRiZDEtOTMxZi04YThlOWI5NDVkOGEvMmNjZTU2NTktZjY0Ny00MzY2LWIzMTgtNDZlNGI2N2FmY2ZhLzMwMDB4MzAwMC9jODE5MzZmNTM4MTA2NTUwYjgwNGU3ZTRmZTJjMjM2MzE5YmFiN2ZiYTM3OTQxYTZlOGY3ZTVjM2QzMDQ4Yjg4ZmM1YjIxODJmYjc5MGY3ZDQ0NmJkYzgyMDQwNjQ1NmM5NDI4N2YyNDVkYjg5ZDg2NTZjMTA1ZDU1MTFlYzNkZS5qcGVnP2FpZD1yc3NfZmVlZCIsImZhbGxiYWNrIjoiaHR0cHM6Ly9pczEtc3NsLm16c3RhdGljLmNvbS9pbWFnZS90aHVtYi9Qb2RjYXN0czExNS92NC8xYy9hYy8wNC8xY2FjMDQyMS00NDgzLWZmMDktNGY4MC0xOTcxMGQ5ZmVkYTQvbXphXzEyNDIxMzcxNjkyMTU4NTE2ODkxLmpwZWcvNjAweDYwMGJiLmpwZyJ9.lrjqdIr_wLJW3F9-FnrODEZ-dAee-u3QT0JVJQEg7AI.jpg"
    }
    // Add more songs as needed
    ];

    // Function to play audio by ID
    function playAudioById(id) {
    const song = songsDatabase.find(song => song.id === id);
    if (song) {
        const audioPlayer = document.querySelector('.audio-player audio');
        audioPlayer.src = song.url;

        const songInfo = document.querySelector('.audio-player .song-info');
        songInfo.querySelector('img').src = song.image;
        songInfo.querySelector('h3').textContent = song.name;
        const pauseButton = document.querySelector('.controls button[title="Pause"]');
        pauseButton.textContent = '⏸';
        pauseButton.title = 'Pause';
        // Play the audio
        audioPlayer.play();
    } else {
        console.error('Song not found');
    }
    }

    // Function to pause audio
    function toggleAudio(pauseButton) {
        const audioPlayer = document.querySelector('.audio-player audio');
        if (audioPlayer.paused) {
            pauseButton.textContent = '⏸';
            pauseButton.title = 'Pause';
            audioPlayer.play();
        } else {
            pauseButton.textContent = '▶️';
            pauseButton.title = 'Play';
            audioPlayer.pause();
        }
    }

    // Function to stop audio
    function stopAudio() {
    const audioPlayer = document.querySelector('.audio-player audio');
    const pauseButton = document.querySelector('.controls button[title="Pause"]');
    
    audioPlayer.currentTime = 0;
    audioPlayer.pause();
    pauseButton.textContent = '▶️';
    pauseButton.title = 'Play';
    }

    // Add event listener to the play button
    document.addEventListener('DOMContentLoaded', function() {
    const playButtons = document.querySelectorAll('.controls button[title="Play"]');
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
        const songId = parseInt(this.getAttribute('data-song-id'));
        playAudioById(songId);
        });
    });
    const pauseButton = document.querySelector('.controls button[title="Pause"]');
    pauseButton.addEventListener('click', function() {
        toggleAudio(this); // Pass the button element as an argument
    });

    // Add event listener to the stop button
    const stopButton = document.querySelector('.controls button[title="Stop"]');
    stopButton.addEventListener('click', stopAudio);
    });
