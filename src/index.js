document.addEventListener('DOMContentLoaded', () => {
    const quoteList = document.getElementById('quote-list')

    function renderList(){
        fetch('http://localhost:3000/quotes?_embed=likes')
        .then(res => res.json())
        .then(quotes => {
            quotes.forEach(quoteObject => {
                const quoteLine = document.createElement('li')
                quoteLine.innerHTML = `
                <li class='quote-card'>
                <blockquote class="blockquote">
                  <p class="mb-0">${quoteObject.quote}</p>
                  <footer class="blockquote-footer">${quoteObject.author}</footer>
                  <br>
                  <button class='btn-success'>Likes: <span>0</span></button>
                  <button class='btn-danger'>Delete</button>
                </blockquote>
              </li>
                `
                quoteList.appendChild(quoteLine)
            })
        })
    }

    renderList()
})