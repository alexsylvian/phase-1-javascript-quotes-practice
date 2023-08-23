document.addEventListener('DOMContentLoaded', () => {
    const quoteList = document.getElementById('quote-list')
    const newQuoteForm = document.getElementById('new-quote-form')

    function renderList(){
        quoteList.innerText = ''
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

                const deleteButton = quoteLine.querySelector('.btn-danger')
                deleteButton.addEventListener('click', (e) => {
                    // e.target.parentElement.remove()
                    fetch(`http://localhost:3000/quotes/${quoteObject.id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    })
                    .then(() => renderList())
                })
            })
        })
    }

    newQuoteForm.addEventListener('submit', createNewQuote)

    function createNewQuote(e){
        e.preventDefault()
        const newQuoteObject = {
            quote:e.target.quote.value,
            author:e.target.author.value,
        }
        addNewQuote(newQuoteObject)

    //     const newQuoteLine = document.createElement('li')
    //     newQuoteLine.innerHTML = `
    //     <li class='quote-card'>
    //     <blockquote class="blockquote">
    //       <p class="mb-0">${e.target.quote.value}</p>
    //       <footer class="blockquote-footer">${e.target.author.value}</footer>
    //       <br>
    //       <button class='btn-success'>Likes: <span>0</span></button>
    //       <button class='btn-danger'>Delete</button>
    //     </blockquote>
    //   </li>
    //     `
    //     quoteList.appendChild(newQuoteLine)
    }

    function addNewQuote(newQuoteObject){
        fetch('http://localhost:3000/quotes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newQuoteObject)
        })
        .then(res => res.json())
        .then(quotes => {
            quoteList.textContent = ''
            renderList()
        })
    }

    renderList()
})