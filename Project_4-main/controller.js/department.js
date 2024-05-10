const Knex = require("knex")
const connection = require("../knexfile")
const knex = Knex(connection["development"])

//this is for department 

exports.department = (req, res) => {
    knex("department").select("*")
        .then((result) => {
            res.status(200).send(result)
        })
        .catch((err) => {
            res.status(400).send(err)
        })
}

//this is for department/{department_id}

exports.department_id = (req, res) => {
    knex("department").select("*").where({
            department_id: req.params.dp_id
        })
        .then((result) => {
            if (result.length != 0) {
                res.status(200).send(result)
            } else {
                res.status(400).json({
                    "error": {
                        "status": 400,
                        "code": "DEP_02",
                        "message": "Don'exist department with this ID.",
                        "field": "department_id"
                    }
                })
            }
        })
        .catch((err) => {
            res.send(err)
        })
}