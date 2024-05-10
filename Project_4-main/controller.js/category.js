const Knex = require("knex")
const connection = require("../knexfile")
const knex = Knex(connection["development"])

//this is for categories


exports.categories = (req, res) => {
    knex("category").select("*")
        .then((result) => {
            if (req.query.order || req.query.limit || req.query.page) {
                if (req.query.order == undefined) {
                    req.query.order = "asc"
                }
                if (req.query.page == undefined) {
                    req.query.page = 1
                }
                if (req.query.limit == undefined) {
                    req.query.limit = 20
                }
                knex("category").count("category_id")
                    .then((count) => {
                        knex('category').orderBy('category_id', req.query.order).limit(req.query.limit).offset(req.query.page * req.query.limit - req.query.limit)
                            .then((data) => {
                                res.status(200).send({
                                    count: count[0]['count(`category_id`)'],
                                    row: data
                                })
                            }).catch((err) => {
                                res.send(err)
                            })
                    }).catch((err) => {
                        res.send(err)
                    })
            } else {
                knex("category").count("category_id")
                    .then((count) => {
                        res.status(200).send({
                            count: count[0]['count(`category_id`)'],
                            row: result
                        })
                    }).catch((err) => {
                        res.send(err)
                    })
            }

        })
        .catch((err) => {
            res.send(err)
        })
}

//this is for categories/{category_id}

exports.categories_id = (req, res) => {
    knex("category").select("*").where({
            category_id: req.params.category_id
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

//this is for categories/inProduct/{product_id}


exports.categories_inProduct_product_id = (req, res) => {
    knex("product_category").select("*").where({
            product_id: req.params.product_id
        })
        .then(async (result) => {
            list = []
            if (result.length != 0) {
                for (i in result) {
                    await knex("category").select("category_id", "department_id", "name").where({
                            category_id: result[i]["category_id"]
                        })
                        .then((data) => {
                            list.push(data)
                        })
                        .catch((err) => {
                            res.send(err)
                        })
                }
                res.send(list)

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

//this is for categories/inDepartment/{department_id}

exports.categories_inDepartments_department_id = (req, res) => {
    knex("category").select("*").where({
            department_id: req.params.department_id
        })
        .then((result) => {
            if (result.length != 0) {
                res.send(result)
            } else {
                res.status(400).json({
                    "error": {
                        "status": 400,
                        "code": "DEP_02",
                        "message": "Don'exist department_id with this ID.",
                        "field": "department_id"
                    }
                })
            }
        })
        .catch((err) => {
            res.send(err)
        })
}