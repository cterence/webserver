const express = require('express')
const app = express()
const port = 3000

app.get('/', (request, response) => {
  response.send('Bonjour, je suis le serveur de Térence!')
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
