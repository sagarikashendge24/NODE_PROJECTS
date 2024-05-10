const Knex = require("knex")
const connection = require("../knexfile")
const {
    shipping_region
} = require("./shipping")
const knex = Knex(connection["development"])


//this is for orders

exports.orders = (req, res) => {
    user = req.user
    knex('customer')
        .select('*')
        .where({
            email: user.Email_id
        })
        .then((cust_data) => {
            knex('shopping_cart')
                .select('*')
                .where({
                    cart_id: cust_data[0]["customer_id"]
                })
                .join('product', 'shopping_cart.product_id', 'product.product_id')
                .then((data) => {
                    let total_amount = 0
                    for (i of data) {
                        total_amount += i.price * i.quantity
                    }
                    knex('shipping')
                        .select('shipping_cost')
                        .where('shipping_id', req.body.shipping_id)
                        .then((shipping_data) => {
                            total_amount += shipping_data[0]["shipping_cost"]
                            knex("tax").select("*").where({
                                    tax_id: req.body.tax_id
                                })
                                .then((tax_data) => {
                                    let tax_percentage = tax_data[0]["tax_percentage"]
                                    let tax = (tax_percentage * total_amount) / 100
                                    total_amount += tax
                                    knex('orders')
                                        .insert({
                                            'total_amount': total_amount,
                                            'created_on': new Date(),
                                            'shipping_id': req.body.shipping_id,
                                            'tax_id': req.bodytax_id,
                                            'status': 1,
                                            'customer_id': cust_data[0]["customer_id"]
                                        })
                                        .then(() => {
                                            knex('shopping_cart')
                                            knex('orders')
                                                .select("*")
                                                .where({
                                                    customer_id: cust_data[0]["customer_id"]
                                                })
                                                .then((orders_data) => {
                                                    knex('order_detail')
                                                        .insert({
                                                            'order_id': orders_data[0]["order_id"],
                                                            'product_id': data[0]["product_id"],
                                                            'attributes': data[0]["attributes"],
                                                            'product_name': data[0]["name"],
                                                            'quantity': data[0]["quantity"],
                                                            'unit_cost': data[0]["price"]
                                                        })
                                                        .then(() => {
                                                            knex('shopping_cart')
                                                                .where({
                                                                    cart_id: cust_data[0]["customer_id"]
                                                                })
                                                                .del()
                                                                .then(() => {
                                                                    res.send("order has been placed")
                                                                })
                                                                .catch((err) => {
                                                                    res.send(err);
                                                                })

                                                        })
                                                        .catch((err) => {
                                                            res.send(err);
                                                        })

                                                }).catch((err) => {
                                                    res.send(err)
                                                })

                                        })
                                        .catch((err) => {
                                            res.send(err)
                                        })
                                })
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
}


//this is for orders/{order_id}

exports.orders_order_id = (req, res) => {
    knex('order_detail')
        .select('*')
        .where({
            order_id: req.params.order_id
        })
        .then((data) => {
            res.send(data)
        }).catch((err) => {
            res.send(err)
        })
}


//this is for orders/incustomer

exports.orders_incustomer = (req, res) => {
    knex('orders')
        .select(
            'order_id',
            'total_amount',
            'created_on',
            'shipped_on',
            'status',
            'name'
        )
        .join('customer', 'orders.customer_id', '=', 'customer.customer_id')
        .where('orders.customer_id', data.customer_id)
        .then((data) => {
            res.send(data)
        }).catch((err) => {
            res.send(err)
        })
}

//this is for orders/ShortDetail
exports.orders_shortDetail = (req, res) => {
    knex('orders')
        .select(
            'order_id',
            'total_amount',
            'created_on',
            'shipped_on',
            'status',
            'name'
        )
        .join('customer', 'orders.customer_id', '=', 'customer.customer_id')
        .where({
            customer_id: req.params.order_detail
        })
        .then((data) => {
            res.send(data)
        }).catch((err) => {
            res.send(err)
        })
}