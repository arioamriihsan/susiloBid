const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 2000
const cors = require('cors')
const bearerToken = require('express-bearer-token')
const { transporter, transportAwait } = require('./helper/nodemailer')

app.use(bodyParser())
app.use(bearerToken())
app.use(cors())
app.use(bodyParser.urlencoded({ extended : false }))
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.status(200).send('<h1>Welcome To Susilobid API</h1>')
})

app.post('/send-mail', async (req, res) => {
    let to = req.query.email;
    let mailOptions = {
        from : 'Admin <admin@susilobid.com>',
        to,
        subject : 'Testing nodemailer',
        html : '<h1>Success</h1>'
    }
    if (to) {
        try {
            await transportAwait(mailOptions)
            res.status(200).send('Email Sent')
        } catch(err) {
            res.status(500).send(err.message)
        }
    } else {
        res.status(404).send('Email Not Found')
    }
})

const {
    userRouter
} = require('./router')

app.use('/users', userRouter)

app.listen(port, () => console.log(`API active at port ${port}`))