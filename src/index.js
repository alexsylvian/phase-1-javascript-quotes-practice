document.addEventListener('DOMContentLoaded', () => {
    const quoteList = document.getElementById('quote-list')
    const newQuoteForm = document.getElementById('new-quote-form')

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

    newQuoteForm.addEventListener('submit', addNewQuote)

    function addNewQuote(e){
        e.preventDefault()
        const newQuoteLine = document.createElement('li')
        newQuoteLine.innerHTML = `
        <li class='quote-card'>
        <blockquote class="blockquote">
          <p class="mb-0">${e.target.quote.value}</p>
          <footer class="blockquote-footer">${e.target.author.value}</footer>
          <br>
          <button class='btn-success'>Likes: <span>0</span></button>
          <button class='btn-danger'>Delete</button>
        </blockquote>
      </li>
        `
        quoteList.appendChild(newQuoteLine)
    }

    renderList()
})