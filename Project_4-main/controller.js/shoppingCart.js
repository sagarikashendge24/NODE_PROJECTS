const Knex = require("knex")
const connection = require("../knexfile")
const knex = Knex(connection["development"])

//this is for generation unique Id 

exports.generate_shopping_cart = (req, res) => {
    let unique_id = Math.random().toString(36).substring(2);
    res.send({
        card_id: unique_id
    })
}

//this is for shoppingcart_add

exports.shopping_cart_add = (req, res) => {
    user = req.user
    let product_id = parseInt(req.body.product_id)
    knex('customer')
        .select("customer_id")
        .where({
            email: user.Email_id
        })
        .then((cust_data) => {
            knex("product").select("*").where({
                    product_id: req.body.product_id
                })
                .then((result) => {
                    knex('shopping_cart')
                        .select('product_id', 'item_id', 'cart_id', 'quantity')
                        .where({
                            'product_id': product_id,
                            'attributes': req.body.attributes,
                            "cart_id": cust_data[0]["customer_id"]
                        })
                        .then((data) => {
                            console.log(data)
                            if (data.length > 0) {
                                let quantity = data[0]["quality"] + 1
                                knex('shopping_cart')
                                    .where({
                                        item_id: data[0]["item_id"]
                                    })
                                    .update({
                                        quantity: quantity
                                    })
                                    .then(() => {
                                        res.send("quantity added")
                                    })
                                    .catch((err) => {
                                        res.send(err)
                                    })
                            } else {
                                let date = new Date()
                                knex('shopping_cart').insert({
                                        'product_id': product_id,
                                        'cart_id': cust_data[0]["customer_id"],
                                        'attributes': req.body.attributes,
                                        'added_on': date,
                                        'quantity': 1
                                    })
                                    .then(() => {

                                        res.send("item added")
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

        })
        .catch((err) => {
            res.send(err)
        })

}

//this is for shoppingcart_cart_id

exports.shopping_cart_id = (req, res) => {
    knex('shopping_cart')
        .select('*')
        .where({
            cart_id: req.params.cart_id
        })
        .then((data) => {
            res.send(data)
        }).catch((err) => {
            res.send(err)
        })
}

//this is for shoppingcart_item_update

exports.shopping_item_id_update = (req, res) => {
    let quantity = parseInt(req.body.quantity)
    knex('shopping_cart')
        .where({
            item_id: req.params.item_id
        })
        .update({
            'quantity': quantity
        })
        .then((data) => {
            knex('shopping_cart')
                .select("*")
                .where({
                    item_id: req.params.item_id
                })
                .then((result) => {
                    res.send(result)
                })
                .catch((err) => {
                    res.send(err)
                })
        })
        .catch((err) => {
            res.send(err)
        })
}

//this is for shoppingcart_delete

exports.shopping_cart_id_delete = (req, res) => {
    knex('shopping_cart')
        .where({
            cart_id: req.params.cart_id
        })
        .del()
        .then(() => {
            res.send([])
        })
        .catch((err) => {
            res.send(err)
        })
}


//this is for shoppingcart_moveTo cart

exports.shopping_moveTo_cart = (req, res) => {
    knex('save_cart')
        .select('*')
        .where({
            item_id: req.params.item_id
        })
        .then((data) => {
            // res.send(data)
            data[0].added_on = new Date();
            delete data[0]["item_id"]
            knex('shopping_cart')
                .insert(data[0])
                .then(() => {
                    knex('save_cart')
                        .where({
                            item_id: req.params.item_id
                        })
                        .del()
                        .then(() => {
                            return res.send('your data moved to cart')
                        }).catch((err) => {
                            res.send(err)
                        })

                })
                .catch((err) => {
                    res.send(err)
                })
        }).catch((err) => {
            res.send(err)
        })
}


//this is for shoppingcart_totalAmount

exports.shopping_totalAmount_cart_id = (req, res) => {
    knex('shopping_cart')
        .select("*")
        .join('product', 'product.product_id', 'shopping_cart.product_id')
        .where('shopping_cart.cart_id', req.params.cart_id)
        .then((data) => {
            var amount = 0
            for (i in data) {
                price = data[i]['price'] * data[i]['quantity']
                amount += price
            }
            res.send({
                "amount": amount
            })
        })

}


//this is for shoppingcart_saveFor_later/item_id

exports.shopping_saveFor_later = (req, res) => {
    knex('shopping_cart')
        .select('item_id', 'product_id', 'attributes', 'quantity', 'cart_id')
        .where('shopping_cart.item_id', req.params.item_id)
        .then((data) => {
            console.log(data)
            // knex('save_cart')
            //     .insert(data[0])
            //     .then(() => {
            //         knex('shopping_cart')
            //             .where('shopping_cart.item_id', req.params.item_id)
            //             .del()
            //             .then(() => {
            //                 res.send('your product has been saved for later')
            //             })
            //     }).catch((err) => {
            //         res.send(err)
            //     })
        }).catch((err) => {
            res.send(err)
        })

}


//this is for shoppingcart_getSave/cart_id

exports.shopping_getSave_cart_id = (req, res) => {
    knex('save_cart')
        .select('product.name', 'item_id', 'attributes', 'price')
        .join('product', 'save_cart.cart_id', '=', 'product.product_id')
        .where('save_cart.cart_id', req.params.cart_id)
        .then((data) => {
            res.send(data[0])
        }).catch((err) => {
            res.send(err)
        })
}

//this is for shoppingcart_removeProduct_item_id

exports.shopping_removeProduct = (req, res) => {
    knex('shopping_cart')
        .where({
            item_id: req.params.item_id
        })
        .del()
        .then(() => {
            res.send("product is removed from cart")
        })
        .catch((err) => {
            res.send(err)
        })
}