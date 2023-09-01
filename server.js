const express = require('express')
const mysql = require('mysql2')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const session = require('express-session');

const app = express()

app.use(session({
  secret: 'cookieOfAdminSession',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

const jsonParser = bodyParser.json()

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
const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.urlencoded({ extended: true }))

const db = mysql.createConnection({
  host: config.mysqlHost,
  user: config.mysqlUser,
  password: config.mysqlPassword,
  database: config.mysqlDatabase
})

db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données : ' + err.message)
    return;
  }
  console.log('Connecté à la base de données MySQL')
})


// Gestion de la soumission du formulaire
app.post('/login', (req, res) => {
  const { username, password } = req.body

  // Requête SQL pour récupérer l'utilisateur
  const query = 'SELECT id, username, password FROM admin WHERE username = ?'
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('Erreur de requête : ' + err.message)
      // return res.status(500).send('Erreur du serveur')
      // retourner une alerte sur index.html (pas une page) pour écrire 'Erreur du serveur'
    }

    if (results.length === 1) {
      const user = results[0]

      bcrypt.compare(password, user.password, (err, passwordMatch) => {
        if (err) {
          console.error('Erreur de comparaison de mot de passe : ' + err.message);
          return res.status(400).json({ success: false, message: 'Erreur de comparaison de mot de passe.' });
        }

        if (passwordMatch) {
          // Authentification réussie : Vous pouvez ajouter un cookie ici
          // et envoyer une réponse JSON au client
          res.json({ success: true, message: 'Authentification réussie.' });
        } else {
          // Authentification échouée : Envoyer un message d'erreur au client
          res.status(401).json({ success: false, message: 'Nom d\'utilisateur ou mot de passe incorrect.' });
        }
      })
    }
    })
})

app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Erreur de déconnexion : ' + err.message);
      // return res.status(500).send('Erreur du serveur')
      // retourner une alerte sur index.html (pas une page) pour écrire 'Erreur du serveur'
    }
    res.redirect('./index.html');
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

