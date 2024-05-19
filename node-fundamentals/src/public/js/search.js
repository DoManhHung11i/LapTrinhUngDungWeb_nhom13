document.addEventListener('DOMContentLoaded',()=> {
    const search_input = document.getElementById('search_input');
    search_input.addEventListener('dblclick',()=>{
        window.location.href = '/search';
    
}) 
    search_input.addEventListener('input',()=>{

    const searchQuery = search_input.value.toLowerCase();
    console.log(searchQuery);
    const podcastItems = document.querySelectorAll('.podcast-item');

    podcastItems.forEach(function(item) {
      
      const title = item.querySelector('.arttitle').textContent.toLowerCase();
      const author = item.querySelector('.authorofart').textContent.toLowerCase();
      if (title.includes(searchQuery) || author.includes(searchQuery)) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  

    })
})
