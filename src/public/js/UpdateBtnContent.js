async function updateButtonContent() {
    const containers = document.querySelectorAll('.container_body_feature-item');
    console.log(containers);
    containers.forEach(container => {
        const button = container;
        console.log(button);
        if (button) {
            let userId, esposideId, action;
            if (button.id === 'addToQueuebtn' || button.id === 'addToMyPodcastbtn') {
                userId = button.getAttribute('data-user-id');
                esposideId = button.getAttribute('data-esposide-id');
                action = button.getAttribute('data-action');

                if (!userId) {
                    if (button.id === 'addToQueuebtn') {
                        button.textContent = "Add to queue";
                    } else if (button.id === 'addToMyPodcastbtn') {
                        button.textContent = "Add to MyPodcast";
                    }
                } else {
                    fetch(`/podcast/check-QueueOrMyPodcast`, {
                        method: 'post',
                        body: JSON.stringify({ esposideId, userId, action }),
                        headers: {'Content-Type': 'application/json'}
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.found) {
                            if (data.action === 'addToQueue') {
                                button.textContent = "Remove from queue";
                            } else if (data.action === 'addToMyPodcast') {
                                button.textContent = "Remove from MyPodcast";
                            }
                        } else {
                            if (data.action === 'addToQueue') {
                                button.textContent = "Add to queue";
                            } else if (data.action === 'addToMyPodcast') {
                                button.textContent = "Add to MyPodcast";
                            }
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                }
            }
        }
    });
}