const express = require("express")
const department = require("../controller.js/department")
const category = require("../controller.js/category")
const attribute = require("../controller.js/attribute")
const product = require("../controller.js/products")
const taX = require("../controller.js/tax")
const shipping = require("../controller.js/shipping")
const customer = require("../controller.js/customer")
const order = require("../controller.js/order")
const shopping = require("../controller.js/shoppingCart")
const auth = require("../auth")

const route = express.Router()
//Department
route.get("/department", department.department)
route.get("/department/:dp_id", department.department_id)

//categories
route.get("/categories", category.categories)
route.get("/categories/:category_id", category.categories_id)
route.get("/categories/inProduct/:product_id", category.categories_inProduct_product_id)
route.get("/categories/inDepartment/:department_id", category.categories_inDepartments_department_id)


//attribute
route.get("/attribute", attribute.attribute)
route.get("/attribute/:attribute_id", attribute.attribute_id)
route.get("/attribute/values/:attribute_id", attribute.attribute_values_attribute_id)
route.get("/attribute/inProduct/:product_id", attribute.attribute_inProduct_product_id)

//product
route.get("/product", product.product)
route.get("/product/search", product.product_search)
route.get("/product/:product_id", product.product_id)
route.get("/product/inCategory/:category_id", product.products_inCategory_category_id)
route.get("/product/inDepartment/:dp_id", product.product_inDepartment_department_id)
route.get("/product/:product_id/details", product.products_product_id_details)
route.get("/product/:product_id/location", product.products_product_id_location)
route.post("/product/:product_id/review", auth, product.post_product_product_id_review)
route.get("/product/:product_id/review", product.get_product_product_id_review)


//customer
route.post("/customer/register", customer.customer_register)
route.post("/customer/login", customer.customer_login)
route.put("/customer/update", auth, customer.customer_update)
route.get("/customer", auth, customer.customer_customer_id)
route.get("/customer/facebook", customer.customer_facebook)
route.put("/customer/address", auth, customer.customer_update_address)
route.put("/customer/credit_card", auth, customer.customer_update_creditCard)

//shopping_cart
route.get("/shoppingCart/generateUniqueId", shopping.generate_shopping_cart)
route.post("/shoppingCart/add", auth, shopping.shopping_cart_add)
route.get("/shoppingCart/:cart_id", auth, shopping.shopping_cart_id)
route.put("/shoppingCart/update/:item_id", auth, shopping.shopping_item_id_update)
route.delete("/shoppingCart/delete/:cart_id", auth, shopping.shopping_cart_id_delete)
route.get("/shoppingCart/moveToCart/:item_id", auth, shopping.shopping_moveTo_cart)
route.get("/shoppingCart/totalAmount/:cart_id", auth, shopping.shopping_totalAmount_cart_id)
route.get("/shoppingCart/saveForLater/:item_id", auth, shopping.shopping_saveFor_later)
route.get("/shoppingCart/getSave/:cart_id", auth, shopping.shopping_getSave_cart_id)
route.delete("/shoppingCart/removeproduct/:item_id", auth, shopping.shopping_removeProduct)

//orders
route.post("/orders", auth, order.orders)
route.get("/orders/:order_id", auth, order.orders_order_id)
route.get("/orders/inCustomer", auth, order.orders_order_id)
route.get("/orders/shortDetail/:order_id", auth, order.orders_shortDetail)

//tax
route.get("/tax", taX.tax)
route.get("/tax/:tax_id", taX.tax_id)


//shipping_region
route.get("/shipping/region", shipping.shipping_region)
route.get("/shipping/region/:shipping_region_id", shipping.shipping_region_shopping_region_id)

module.exports = route