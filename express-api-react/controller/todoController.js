const db = require('../database')

module.exports = {
    getTodo : (req, res) => {
        let { id } = req.params
        let sql = `SELECT todo FROM todo WHERE userId = ${id}`
        db.query(sql, (err, result) => {
            if (err){
                res.status(500).send(err.message)
            }
            res.status(200).send(result)
        })
    },
    addTodo : (req, res) => {
        let { todo } = req.body
        let { id } = req.params
        let sql = `INSERT INTO todo (todo, userId) VALUES ('${todo}', ${id})`
        db.query(sql, req.body, (err, insert) => {
            if (err){
                res.status(500).send(err.message)
            }
            res.status(200).send({
                status : 'Created',
                message : 'Data Created'
            })
        })
    },
    editTodo : (req, res) => {
        let { todo } = req.body
        let { id } = req.params
        let sql = `UPDATE todo SET todo = '${todo}' WHERE id = ${id}`
        db.query(sql, req.body, (err, result) => {
            if (err){
                res.status(500).send(err.message)
            }
            res. status(200).send({
                status : 'Edited',
                message : 'Data Edited'
            })
        })
    },
    deleteTodo : (req, res) => {
        let { id } = req.params
        let sql = `DELETE FROM todo WHERE id = ${id}`
        db.query(sql, (err, del) => {
            if (err){
                res.status(500).send(err.message)
            }
            res.status(200).send({
                status : 'deleted',
                message : 'Data Deleted'
            })
        })
    }
}