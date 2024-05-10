const Knex = require("knex")
const connection = require("../knexfile")
const knex = Knex(connection["development"])

//this is for tax

exports.tax = (req, res) => {
    knex("tax").select("*")
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            res.send(err)
        })
}

//this is for tax/{tax_id}

exports.tax_id = (req, res) => {
    knex("tax").select("*").where({
            tax_id: req.params.tax_id
        })
        .then((result) => {
            if (result.length != 0) {
                res.status(200).send(result)
            } else {
                res.status(400).json({
                    "error": {
                        "status": 400,
                        "code": "DEP_02",
                        "message": "Don'exist tax with this ID.",
                        "field": "tax_id"
                    }
                })
            }
        })
        .catch((err) => {
            res.send(err)
        })
}