// create model

// import mongoose--------------------------------------
const mongoose = require('mongoose')

// define schema-felid and values of models(collection)----------------------
const adminSchema = new mongoose.Schema({
    uname: String,
    psw: String

})

// model - collection name----------------------------------------

const admins = new mongoose.model("admins", adminSchema)

// user------------------------------------------------------------
const userSchema = new mongoose.Schema({
    email: String,
    psw: String

})
const users = new mongoose.model("users", userSchema)


// cart-----------------------------------------------------------
const cartSchema = new mongoose.Schema({
    userId: String,
    pId: String,
    pname: String,
    description: String,
    price: Number,
    image: String,
    rating: Number,
    quantity: Number,
    totalprice: Number
})
const carts = new mongoose.model("carts", cartSchema)


// product details-------------------------------------------------

const productSchema = new mongoose.Schema({
    pname: String,
    description: String,
    price: Number,
    image: String,
    rating: Number,
    count: Number
})


const products = new mongoose.model("products", productSchema)

// wishlist
const wishlistsSchema = new mongoose.Schema({
    userId: String,
    pId: String,
    pname: String,
    description: String,
    price: Number,
    image: String,
    rating: Number
    
})
const wishlists = new mongoose.model("wishlist", wishlistsSchema)



// model export to import another file
module.exports = { admins, products, users, carts ,wishlists}