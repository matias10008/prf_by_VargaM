const express = require("express")
const app = express()

app.use((req, res, next) => {

    console.log('A middleware futott!')

    next()
  })


app.use('/api/users', require('./usersRouter'))

app.use('', express.static('public'))


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})