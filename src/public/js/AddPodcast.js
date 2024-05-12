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
          }
          if(userId){
            const res = await fetch(`/podcast/check-QueueOrMyPodcast`, {
              method: 'post',
              body: JSON.stringify({ esposideId, userId, action }),
              headers:  {'Content-Type': 'application/json'}
            });
            const data = await res.json();
            console.log(data);
            if(data.found){
              const res =  await fetch('/podcast/remove-from-QueueOrMyPodcast', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ esposideId, userId, action })
              });
              const data = await res.json();
              console.log(data);
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
              console.log(data);
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