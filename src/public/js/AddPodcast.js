document.addEventListener('click', async function(event) {
    const container = event.target.closest('.container_body_feature-item');
    if (container) {
        const button = event.target.closest('button');
        if (button) {
          let userId, esposideId, action;
          if (button.id === 'addToQueuebtn') {
              // Xử lý khi click vào nút 'Add to Queue'
              userId = button.getAttribute('data-user-id');
              esposideId = button.getAttribute('data-esposide-id');
              action = button.getAttribute('data-action');
          } else if (button.id === 'addToMyPodcastbtn') {
              // Xử lý khi click vào nút 'Add to My Podcast'
              userId = button.getAttribute('data-user-id');
              esposideId = button.getAttribute('data-esposide-id');
              action = button.getAttribute('data-action');                              
          } else if (button.id === 'shareBtn'){
            // Code for 'Share' button
            openShareModal();
            return; // Exit early to prevent further execution
          }
          if(userId){
            const res = await fetch(`/podcast/check-QueueOrMyPodcast`, {
              method: 'post',
              body: JSON.stringify({ esposideId, userId, action }),
              headers:  {'Content-Type': 'application/json'}
            });
            const data = await res.json();
            if(data.found){
              const res =  await fetch('/podcast/remove-from-QueueOrMyPodcast', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ esposideId, userId, action })
              });
              const data = await res.json();
              if(data.deleted){
                if(data.message === 'Esposide removed from queue'){
                  button.textContent = 'Add to Queue';
                }
                else if(data.message === 'Esposide removed from MyPodcast'){
                  button.textContent = 'Add to MyPodcast'
                }
              }
            }
            else {
              const res = await fetch('/podcast/add-to-QueueOrMyPodcast', {
                          method: 'POST',
                          headers: {
                              'Content-Type': 'application/json'
                          },
                          body: JSON.stringify({ esposideId, userId, action })
                      });
              const data = await res.json();
              if(data.saved){
                if(data.message === 'Esposide added to queue'){
                  button.textContent = 'Remove From Queue';
                }
                else if(data.message === 'Esposide added to My Podcast'){
                  button.textContent = 'Remove From MyPodcast'
                }
              }
            }
          }  
          else{
            alert("Login to use this feature");
            window.location.href = '/login';
          }
        }
    }
});

function openShareModal() {
  var modalOverlay = document.getElementById('modalOverlay');
    var modal = document.getElementById('shareModal');
    modalOverlay.style.display = 'block';
    modal.style.display = 'block';
    // Set the current page URL as the value of the input field
    document.getElementById('shareUrl').value = window.location.href;
    document.documentElement.style.overflow = 'hidden';
}

function closeShareModal() {
  var modalOverlay = document.getElementById('modalOverlay');
    var modal = document.getElementById('shareModal');
    modalOverlay.style.display = 'none';
    modal.style.display = 'none';
    document.documentElement.style.overflow = 'auto';
}

function copyUrl() {
  var shareUrlInput = document.getElementById('shareUrl');
  shareUrlInput.select();
  document.execCommand('copy');
  alert('URL copied to clipboard');
}

function shareOnFacebook() {
  var url = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href);
  window.open(url, '_blank');
}

function shareOnTwitter() {
  var url = 'https://twitter.com/intent/tweet?url=' + encodeURIComponent(window.location.href);
  window.open(url, '_blank');
}