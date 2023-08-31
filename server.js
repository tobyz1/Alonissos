const express = require('express')
const mysql = require('mysql')

const app = express()


const nodemailer = require('nodemailer')

const PORT = process.env.PORT || 5000


app.use(express.static('public'))
app.use(express.json())
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`)
})

const config = require('./config.js');

app.post('/', (req, res) => {
  console.log(req.body)

  const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: config.emailUsername,
      pass: config.emailPassword,
    },
  })
  const mailOptions = {
    from: 'chelidoniahouse.alonissos@outlook.com',
    to: 'bencaro.dupre@free.fr',
    subject: `Message from ${req.body.email}for reservation (${req.body.date1}-${req.body.date2})`,
    text: `Name : ${req.body.nom}
           Email : ${req.body.email}
           Check-in : ${req.body.date1}
           Check-out : ${req.body.date2}`,
  }
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
      res.send('error')
    } else {
      console.log(`Email sent: ${info.response}`)
      res.send('success')
    }
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
