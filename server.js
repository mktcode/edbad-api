require('dotenv').config()
const express = require('express')
const mysql = require('mysql')
const crypto = require('crypto')
const uuidv4 = require('uuid/v4');

const app = express()
const port = 3000
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
})

connection.connect()

app.use(express.json())

app.get('/api/players/:name', (req, res) => {
  connection.query('SELECT uuid, name, currentDungeon, deepestDungeon, minDungeon FROM players WHERE name = ?', [req.params.name], (error, result) => {
    if (error) throw error
    res.send(result)
  })
})

app.get('/api/players/:name/guard', (req, res) => {
  connection.query('SELECT uuid, name, currentDungeon, deepestDungeon, minDungeon FROM players p JOIN (SELECT MAX(deepestDungeon) as maxDeepestDungeon FROM players) m WHERE name != ? AND p.deepestDungeon = m.maxDeepestDungeon', [req.params.name], (error, result) => {
    if (error) throw error
    res.send(result[0])
  })
})

app.post('/api/login', (req, res) => {
  const name = req.body.name
  const password = crypto.createHash('sha256').update(req.body.password).digest('hex')

  connection.query('SELECT uuid, name, password, currentDungeon, deepestDungeon, minDungeon FROM players WHERE name = ?', [name], (error, result) => {
    if (error) throw error
    if (result.length) {
      // check password
      if (result[0].password === password) {
        // login
        res.send(result[0])
      } else {
        // fail
        res.sendStatus(401)
      }
    } else {
      // create account
      connection.query(
        'INSERT INTO players (uuid, name, password) VALUES (?, ?, ?)',
        [uuidv4(), name, password, 1, 1],
        (error, result) => {
          if (error) throw error
          if (result) {
            // account created
            connection.query('SELECT uuid, name, password, currentDungeon, deepestDungeon, minDungeon FROM players WHERE name = ?', [name], (error, result) => {
              if (error) throw error
              res.send(result[0])
            })
          }
        }
      )
    }
  })
})

app.post('/api/save', (req, res) => {
  const name = req.body.name
  const password = crypto.createHash('sha256').update(req.body.password).digest('hex')
  const currentDungeon = req.body.currentDungeon
  const deepestDungeon = req.body.deepestDungeon
  const minDungeon = req.body.minDungeon

  connection.query(
    'UPDATE players SET currentDungeon = ?, deepestDungeon = ?, minDungeon = ? WHERE name = ? AND password = ?',
    [currentDungeon, deepestDungeon, minDungeon, name, password],
    (error, result) => {
      if (error) throw error
      res.sendStatus(result.affectedRows ? 200 : 401)
    }
  )
})

app.listen(port, () => console.log(`Game API listening on port ${port}!`))
