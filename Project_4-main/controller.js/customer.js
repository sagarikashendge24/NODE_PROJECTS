const Knex = require("knex")
const connection = require("../knexfile")
const knex = Knex(connection["development"])
const jwt = require("jsonwebtoken")

//this is fo for coustomer_register

exports.customer_register = (req, res) => {
    knex("customer").insert({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }).then(() => {
        const tokon = jwt.sign({
            Email_id: req.body.email
        }, "sagarika");
        res.cookie('jwt', tokon, {
            httpOnly: true,
            secure: true,
            maxAge: 3600000
        });
        res.status(200).send("you have signup sucessfully");
    }).catch((err) => {
        res.send(err)
    })
}

//this is fo for coustomer_login

exports.customer_login = (req, res) => {
    knex("customer").select("*").where({
        email: req.body.email
    } && {
        password: req.body.password
    }).then((result) => {
        const tokon = jwt.sign({
            Email_id: req.body.email
        }, "sagarika");
        res.cookie('jwt', tokon, {
            httpOnly: true,
            secure: true,
            maxAge: 3600000
        });
        res.status(200).send("you have login sucessfully")
    }).catch((err) => {
        res.send(err)
    })
}

//this is for customer_update

exports.customer_update = (req, res) => {
    user = req.user

    knex("customer").select("*")
        .where({
            email: user.Email_id
        })
        .update({
            "name": req.body.name,
            "email": req.body.email,
            "password": req.body.password,
            "day_phone": req.body.day_phone,
            "eve_phone": req.body.eve_phone,
            "mob_phone": req.body.mob_phone
        })
        .then((data) => {
            res.send("data updated")
        })
        .catch((err) => {
            res.send(err)
        })
}

//this is for customer_customer_id


exports.customer_customer_id = (req, res) => {
    user = req.user

    knex("customer").select("*")
        .where({
            email: user.Email_id
        })
        .then((data) => {
            delete data[0].password;
            res.send(data)
        })
        .catch((err) => {
            res.send(err)
        })
}

//this is for customer_facebook


exports.customer_facebook = (req, res) => {
    const authHeader = req.body.tokon;
    if (authHeader) {
        const token = authHeader.split(' ')[0];
        token_created = token.slice(4, token.length - 1)
        jwt.verify(token_created, "sagarika", (err, user) => {
            if (err) {
                res.sendStatus(403);

            } else {
                req.user = user;
                knex("customer").select("*")
                    .where({
                        email: user.Email_id
                    })
                    .then((result) => {
                        res.send(result)
                    })
                    .catch((err) => {
                        res.send(err)
                    })
            }
        });
    } else {
        res.sendStatus(401);

    }
}

//this is for customer_update_adress

exports.customer_update_address = (req, res) => {
    user = req.user

    knex("customer").select("*")
        .where({
            email: user.Email_id
        })
        .update({
            "address_1": req.body.address_1,
            "address_2": req.body.address_2,
            "city": req.body.city,
            "region": req.body.region,
            "postal_code": req.body.postal_code,
            "country": req.body.country,
            "shipping_region_id": req.body.shipping_region_id
        })
        .then((data) => {
            res.send("adress updated")
        })
        .catch((err) => {
            res.send(err)
        })
}

//this is for customer_update_credit_Card

exports.customer_update_creditCard = (req, res) => {
    user = req.user

    knex("customer").select("*")
        .where({
            email: user.Email_id
        })
        .update({
            "credit_card": req.body.credit_card
        })
        .then((data) => {
            res.send("credit_card updated")
        })
        .catch((err) => {
            res.send(err)
        })
}