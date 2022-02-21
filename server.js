const express = require('express')
const cors = require('cors')
const euroApp = require("./app")

const port = process.env.PORT || 3000

const app = express()

app.use(express.static('./'));

// var corsOptions = {
//   origin: '*',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
// }
app.use(cors())

app.listen(port, () => {
  console.log(`Server running at port ${port}`)
})
