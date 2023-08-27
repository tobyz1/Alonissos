const express = require("express")
const app = express()


const nodemailer = require('nodemailer')

// (async () => {
//   const bcrypt = require('bcryptjs')

//   try {



    
//   } catch (error) {
//     console.log(error)
//   }
// })()

const PORT = process.env.PORT || 5000

app.use(express.static('public'))
app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})
app.post('/', (req, res) => {
  console.log(req.body)

  const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: 'chelidoniahouse.alonissos@outlook.com',
      pass: 'iY9iHsY$XqT74rQ@'
    }
  })
  const mailOptions = {
    from: 'chelidoniahouse.alonissos@outlook.com',
    to: 'bencaro.dupre@free.fr',
    subject: `Message from ${req.body.email}for reservation (${req.body.date1}-${req.body.date2})`,
    text: `Name : ${req.body.nom}
           Email : ${req.body.email}
           Check-in : ${req.body.date1}
           Check-out : ${req.body.date2}`
  }
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
      res.send('error')
    }
    else {
      console.log('Email sent: ' + info.response)
      res.send('success')
    }
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})