

const express = require('express')
const app = express()
const port = 3000
const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'tom',
  host: 'database',
  database: 'pgdb',
  password: 'Lemon501',
  port: 5432,
})
pool.query(`SELECT * FROM color_table;`, (err, res) => {
  console.log("Here!")

  if(err){
      console.log("error: ", err)
  }
  else{
      console.log(res)
  }

  pool.end()
})
// const client = new Client({
//   user: 'dbuser',
//   host: 'database.server.com',
//   database: 'mydb',
//   password: 'secretpassword',
//   port: 3211,
// })
// client.connect()
// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   client.end()
// })


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})