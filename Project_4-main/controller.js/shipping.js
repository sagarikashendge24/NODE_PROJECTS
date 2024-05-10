const Knex = require("knex")
const connection = require("../knexfile")
const knex = Knex(connection["development"])

//this is for shipping_region

exports.shipping_region = (req, res) => {
    knex("shipping_region").select("*")
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            res.send(err)
        })
}

//this is for shipping_region/{shipping_region_id}

exports.shipping_region_shopping_region_id = (req, res) => {
    knex("shipping_region").select("*").where({
            shipping_region_id: req.params.shipping_region_id
        })
        .then((result) => {
            if (result.length != 0) {
                knex("shipping").select("*").where({
                        shipping_region_id: result[0]["shipping_region_id"]
                    })
                    .then((data) => {
                        res.send(data)
                    })
                    .catch((err) => {
                        res.send(err)
                    })
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