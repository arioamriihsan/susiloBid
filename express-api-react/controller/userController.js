const db = require('../database')
const crypto = require('crypto')

module.exports = {
    Register : (req, res) => {
        let { username, password, roleId } = req.body
        let hashPassword = crypto.createHmac('sha256', 'kuncirahasia').update(password).digest('hex')
        //console.log(hashPassword)

        let sql = `INSERT INTO users (username, password, roleId) VALUES ('${username}', '${hashPassword}', ${roleId})`
        db.query(sql, req.body, (err, insert) => {
            if (err){
                res.status(500).send(err.message)
            } else {
                let sql = `SELECT username, roleId FROM users WHERE id = ${insert.insertId}`
                db.query(sql, (err, results) => {
                    if (err){
                        res.status(500).send(err.message)
                    }
                    res.status(500).send(results[0])
                })
            }
        })
    },
    Login : (req, res) => {
        let { username, password } = req.body
        let hashPassword = crypto.createHmac('sha256', 'kuncirahasia').update(password).digest('hex')
        let sql = `SELECT * FROM users WHERE username = '${username}' AND password = '${hashPassword}'`
        db.query(sql, (err, result) => {
            if (err){
                res.status(500).send(err.message)
            }
            res.status(200).send(result)
        })
    }
}