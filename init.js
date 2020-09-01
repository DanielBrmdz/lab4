const express = require('express')
const app = express()
const port = process.argv[2];

app.use(express.static(__dirname + '/public/'));

app.get('/', (req, res) => {
  res.send('')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
