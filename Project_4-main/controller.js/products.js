const Knex = require("knex")
const connection = require("../knexfile")
const knex = Knex(connection["development"])

//this is for product


exports.product = (req, res) => {

    knex("product").select("*")
        .then((result) => {
            if (req.query.page == undefined) {
                req.query.page = 1
            }
            if (req.query.limit == undefined) {
                req.query.limit = 20
            }
            knex("product").count("product_id")
                .then((count) => {
                    list = []
                    knex('product').orderBy('product_id', req.query.order).limit(req.query.limit).offset(req.query.page * req.query.limit - req.query.limit)
                        .then((data) => {

                            for (index in data) {
                                if (req.query.description_length != undefined) {
                                    data[index]["description"] = `${data[index]["description"].slice(0,data[index]["description"].length-(data[index]["description"].length-req.query.description_length))}...`
                                } else {
                                    data[index]["description"] = data[index]["description"].slice(0, 200)
                                }
                            }
                            res.status(200).send({
                                count: count[0]['count(`product_id`)'],
                                row: data
                            })
                        }).catch((err) => {
                            res.send(err)
                        })
                }).catch((err) => {
                    res.send(err)
                })

        })
        .catch((err) => {
            res.send(err)
        })
}

//this is for product/search

exports.product_search = (req, res) => {
    knex("product").select("*")
        .then((result) => {
            if (req.query.page == undefined) {
                req.query.page = 1
            }
            knex('product').orderBy('product_id', req.query.order)
                .then(async (data) => {
                    list = []
                    list1 = []
                    list2 = []
                    count1 = 0
                    if (req.query.query_string != undefined) {
                        for (index in data) {
                            if (data[index]["description"].includes(req.query.query_string) == true) {
                                list.push(data[index])
                                count1 = count1 + 1
                            }
                        }

                        for (index in list) {
                            if (req.query.description_length != undefined) {
                                list[index]["description"] = `${list[index]["description"].slice(0,list[index]["description"].length-(list[index]["description"].length-req.query.description_length))}...`
                                list1.push(list[index])

                            } else {
                                list[index]["description"] = list[index]["description"].slice(0, 200)
                                list1.push(data[index])
                            }
                        }
                        if (req.query.limit == undefined) {
                            req.query.limit = 20
                            start = req.query.limit * req.query.page - req.query.limit
                            while (start < req.query.limit * req.query.page) {
                                list2.push(list1[start])
                                start = start + 1
                            }
                        } else {
                            start = req.query.limit * req.query.page - req.query.limit
                            while (start < req.query.limit * req.query.page) {
                                list2.push(list1[start])
                                start = start + 1
                            }
                        }
                    } else {
                        res.send("please enter query_string")
                    }
                    res.status(200).send({
                        count: count1,
                        row: list2
                    })
                }).catch((err) => {
                    res.send(err)
                })

        })
        .catch((err) => {
            res.send(err)
        })
}


//this is for product/{product_id}

exports.product_id = (req, res) => {
    knex("product").select("*").where({
            product_id: req.params.product_id
        })
        .then((result) => {
            if (result.length != 0) {
                res.status(200).send(result)
            } else {
                res.status(400).json({
                    "error": {
                        "status": 400,
                        "code": "DEP_02",
                        "message": "Don'exist product with this ID.",
                        "field": "product_id"
                    }
                })
            }
        })
        .catch((err) => {
            res.send(err)
        })
}

//this is for product/inCategory/{category_id}

exports.products_inCategory_category_id = (req, res) => {
    knex("product_category").select("*").where({
            category_id: req.params.category_id
        })
        .then(async (result) => {
            list = []
            count_pID = []
            if (result.length != 0) {
                await knex("product_category").where({
                        category_id: req.params.category_id
                    }).count("product_id")
                    .then(async (count) => {
                        count_pID.push(count[0]["count(`product_id`)"])

                        for (index in result) {
                            await knex("product").select("*").where({
                                    product_id: result[index]["product_id"]
                                })
                                .then((data) => {
                                    for (index in data) {
                                        list.push(data[index])
                                    }
                                })
                                .catch((err) => {
                                    res.send(err)
                                })

                        }
                    })
                    .catch((err) => {
                        res.send(err)
                    })
                res.send({
                    count: count_pID,
                    rows: list
                })
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


//this is for product/{product_id}/details

exports.products_product_id_details = (req, res) => {
    knex("product").select("*").where({
            product_id: req.params.product_id
        })
        .then((result) => {
            if (result.length != 0) {
                delete result[0]["display"]
                delete result[0]["thumbnail"]


                res.status(200).send(result)
            } else {
                res.status(400).json({
                    "error": {
                        "status": 400,
                        "code": "DEP_02",
                        "message": "Don'exist product with this ID.",
                        "field": "product_id"
                    }
                })
            }
        })
        .catch((err) => {
            res.send(err)
        })
}

//this is for product/inDepartment/Department_id

exports.product_inDepartment_department_id = (req, res) => {
    knex.select('*')
        .from('product')
        .join("product_category", "product_category.product_id", '=', 'product.product_id')
        .join('category', 'category.category_id', '=', 'product_category.category_id')
        .where('department_id', req.params.dp_id).limit(req.query.limit).offset(req.query.page * req.query.limit - req.query.limit)
        .then((data) => {
            if (req.query.page == undefined) {
                req.query.page = 1
            }
            if (req.query.limit == undefined) {
                req.query.limit = 20
            }
            for (index in data) {
                if (req.query.description_length != undefined) {
                    data[index]["description"] = `${data[index]["description"].slice(0,data[index]["description"].length-(data[index]["description"].length-req.query.description_length))}...`
                } else {
                    data[index]["description"] = data[index]["description"].slice(0, 200)
                }
            }
            res.send(data)
        })
        .catch((err) => {
            res.send(err)
        })


}



//this is for product/{product_id}/details

exports.products_product_id_location = (req, res) => {
    knex("product").select("*").where({
            product_id: req.params.product_id
        })
        .then((result) => {
            if (result.length != 0) {
                knex("product_category").select("category_id").where({
                        product_id: result[0]["product_id"]
                    })
                    .then((data) => {
                        // console.log(data)
                        knex("category").select("*").where({
                                category_id: data[0]["category_id"]
                            })
                            .then((data_category) => {
                                // console.log(data_category)
                                knex("department").select("*").where({
                                        department_id: data_category[0]["department_id"]
                                    })
                                    .then((data_department) => {
                                        delete data_category[0]["description"]
                                        data_category[0]["department_name"] = data_department[0]["name"]
                                        res.send(data_category)
                                    })
                                    .catch((err) => {
                                        res.send(err)
                                    })
                            })
                            .catch((err) => {
                                res.send(err)
                            })
                    })
                    .catch((err) => {
                        res.send(err)
                    })
            } else {
                res.status(400).json({
                    "error": {
                        "status": 400,
                        "code": "DEP_02",
                        "message": "Don'exist product with this ID.",
                        "field": "product_id"
                    }
                })
            }
        })
        .catch((err) => {
            res.send(err)
        })
}

//this is for product/{product_id}/Review

exports.post_product_product_id_review = (req, res) => {
    user = req.user
    date = new Date()

    knex("customer").select("customer_id").where({
            email: user.Email_id
        })
        .then((result) => {
            knex("review").select("*").where({
                    "customer_id": result[0]["customer_id"],
                    'product_id': req.params.product_id
                })
                .then((data) => {
                    if (data.length == 0) {
                        knex('review')
                            .insert({
                                "created_on": date,
                                'rating': req.body.rating,
                                'review': req.body.review,
                                'product_id': req.params.product_id,
                                'customer_id': result[0]["customer_id"]
                            })
                            .then(() => {
                                res.send("thanks for the review")
                            })
                            .catch((err) => {
                                res.send(err)
                            })
                    } else {
                        knex('review')
                            .update({
                                'review': req.body.review,
                                'rating': req.body.rating
                            })
                            .where({
                                "customer_id": result[0]["customer_id"],
                                'product_id': req.params.product_id
                            })
                            .then(() => {
                                res.send("review updated")
                            })
                            .catch((err) => {
                                res.send(err)
                            })
                    }
                })
                .catch((err) => {
                    res.send(err)
                })
        })
        .catch((err) => {
            res.send(err)
        })
}


exports.get_product_product_id_review = (req, res) => {
    knex("review")
        .select('rating', 'review', 'created_on', 'name')
        .join('customer', 'customer.customer_id', "=", 'review.customer_id')
        .where({
            'product_id': req.params.product_id
        })
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.send(err)
        })

}