const express = require('express')
const router = express.Router()

const mysqlConnection = require("../connection")

//Get all employees
router.get("/", (req, res) => {
    mysqlConnection.query('SELECT * FROM employee', (err, rows, fields) => {
        if (!err) {
            res.send(rows)
        } else {
            console.log(err)
        }
    })
})

router.get("/:id", (req, res) => {
    const {id} = req.params;
    mysqlConnection.query('SELECT * FROM employee WHERE id = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.send(rows)
        } else {
            console.log(err)
        }
    })
})

router.delete("/:id", (req, res) => {
    const {id} = req.params;
    mysqlConnection.query('DELETE FROM employee WHERE id = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.send("Deleted successfully")
        } else {
            console.log(err)
        }
    })
})

router.post("/", (req, res) => {
    const {name, salary, age} = req.body;
    mysqlConnection.query('INSERT INTO employee (name, salary, age) VALUES (?, ?, ?)', [name, salary, age], (err, rows, fields) => {
        if (!err) {
            res.send("Inserted successfully")
        } else {
            console.log(err)
        }
    })
})

router.put("/:id", (req, res) => {
    const {id} = req.params;
    const {name, salary, age} = req.body;
    mysqlConnection.query('UPDATE employee SET name = ?, salary = ?, age = ? WHERE id = ?', [name, salary, age, id], (err, rows, fields) => {
        if (!err) {
            res.send("Updated successfully")
        } else {
            console.log(err)
        }
    })
})

module.exports = router