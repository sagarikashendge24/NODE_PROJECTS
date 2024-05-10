const Knex = require("knex")
const connection = require("../knexfile")
const knex = Knex(connection["development"])


//this is for attribute 


exports.attribute = (req, res) => {
    knex("attribute ").select("*")
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            res.send(err)
         })
}

//this is for attribute/{attribute_id}

exports.attribute_id = (req, res) => {
    knex("attribute").select("*").where({
            attribute_id: req.params.attribute_id
        })
        .then((result) => {
            if (result.length != 0) {
                res.status(200).send(result)
            } else {
                res.status(400).json({
                    "error": {
                        "status": 400,
                        "code": "DEP_02",
                        "message": "Don'exist attribute with this ID.",
                        "field": "attribute_id"
                    }
                })
            }
        })
        .catch((err) => {
            res.send(err)
         })
}

//this is for attribute/values/{attribute_id}


exports.attribute_values_attribute_id = (req, res) => {
    knex("attribute").select("*").where({
            attribute_id: req.params.attribute_id
        })
        .then((result) => {
            if (result.length != 0) {
                knex("attribute_value").select("*").where({
                        attribute_id: req.params.attribute_id
                    })
                    .then((data) => {
                        res.send(data)
                    })
                    .catch(() => {
                        res.status(400).json({
                            "code": "USR_02",
                            "message": "The field example is empty.",
                            "field": "example",
                            "status": "500"
                        })
                    })
            } else {
                res.status(400).json({
                    "error": {
                        "status": 400,
                        "code": "DEP_02",
                        "message": "Don'exist attribue_id with this ID.",
                        "field": "attribute_id"
                    }
                })
            }
        })
        .catch((err) => {
            res.send(err)
         })
}

//this is for attribute/inProduct/{product_id}

exports.attribute_inProduct_product_id = (req, res) => {
    knex("product_attribute").select("*").where({
            product_id: req.params.product_id
        })
        .then(async (result) => {
            list = []
            list1 = []
            // console.log(result)
            if (result.length != 0) {
                for (i in result) {
                    await knex("attribute_value").select("*").where({
                            attribute_value_id: result[i]["attribute_value_id"]
                        })
                        .then(async (data) => {
                            list.push(data)
                            for (i in list) {
                                for (j in list[i]) {
                                    await knex("attribute").select("name").where({
                                            attribute_id: list[i][j]["attribute_id"]
                                        })
                                        .then((data_at) => {
                                            for (j in data_at) {
                                                list[i][j]["attribute_name"] = data_at[j]["name"]

                                            }
                                        })
                                        .catch((err) => {
                                            res.send(err)
                                        })
                                }
                            }
                        })
                        .catch((err) => {
                            res.send(err)
                        })
                }

                for (i in list) {
                    for (j in list[i]) {
                        delete list[i][j]["attribute_id"]
                        list1.push(list[i][j])
                    }
                }
                res.send(list1)

            } else {
                res.status(400).json({
                    "error": {
                        "status": 400,
                        "code": "DEP_02",
                        "message": "Don'exist product_id with this ID.",
                        "field": "product_id"
                    }
                })
            }
        })
        .catch((err) => {
            res.send(err)
         })
}