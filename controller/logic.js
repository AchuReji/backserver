const { admins, products, users, carts, wishlists } = require("../models/collection");

// logic
const adminLogin = (req, res) => {
    const { uname, psw } = req.body
    admins.findOne({ uname, psw }).then(user => {
        if (user) {
            res.status(200).json({
                message: "login success",
                statusCode: 200,
                status: true
            })

        }
        else {
            res.status(404).json({
                message: "login details are incurrect",
                statusCode: 404,
                status: false
            })
        }
    })
}

const addProduct = (req, res) => {
    const { pname, description, price, image, rating, count } = req.body
    const newProduct = new products({
        pname, description, price, image, rating, count

    })
    newProduct.save()
    res.status(200).json({
        message: "new product added",
        statusCode: 200,
        status: true
    })
}

const getProducts = (req, res) => {
    products.find().then(data => {
        if (data) {
            res.status(200).json({
                message: data,
                statusCode: 200,
                status: true
            })
        }
    })
}

const editProduct = (req, res) => {
    const { id } = req.params
    const { pname, description, price, image, rating, count } = req.body
    products.findOne({ _id: id }).then(pdata => {
        if (pdata) {
            pdata.pname = pname
            pdata.description = description
            pdata.price = price
            pdata.image = image
            pdata.rating = rating
            pdata.count = count

            pdata.save()
            res.status(200).json({
                message: "product update",
                statusCode: 200,
                status: true
            })
        }
    })
}
const deleteProduct = (req, res) => {
    const { id } = req.params
    products.deleteOne({ _id: id }).then(data => {

        res.status(200).json({
            message: "product deleted",
            statusCode: 200,
            status: true
        })

    })
}
const getSingleProduct = (req, res) => {
    const { id } = req.params
    products.findOne({ _id: id }).then(data => {
        if (data) {

            res.status(200).json({
                message: data,
                statusCode: 200,
                status: true
            })
        }

        else {
            res.status(404).json({
                message: "no data",
                statusCode: 404,
                status: false
            })
        }
    })
}

const userSignUp = (req, res) => {
    const { email, psw } = req.body
    users.findOne({ email }).then(user => {
        if (user) {
            res.status(404).json({
                message: "already register",
                statusCode: 404,
                status: false
            })
        }
        else {
            newUser = new users({
                email, psw
            })
            newUser.save()
            res.status(200).json({
                message: "registerd",
                statusCode: 200,
                status: true
            })
        }
    })
}
const userLogin = (req, res) => {
    const { email, psw } = req.body
    users.findOne({ email, psw }).then(user => {
        if (user) {
            res.status(200).json({
                message: "login success",
                statusCode: 200,
                status: true,
                _id: user._id
            })

        }
        else {
            res.status(404).json({
                message: "login details are incurrect",
                statusCode: 404,
                status: false
            })
        }
    })
}


// cart


const addToCart = (req, res) => {
    const { userId, pId } = req.body


    carts.findOne({ userId, pId }).then(data => {

        if (data) {

            // var quantity = data.quantity
            data.quantity += 1
            data.totalprice = data.quantity * data.price
            data.save()


            res.status(200).json({
                message: "product addedd to cart",
                statusCode: 200,
                status: true,
            })

        }
        else {

            products.findOne({ _id: pId }).then(product => {
                if (product) {
                    newCart = new carts({
                        userId,
                        pId,
                        pname: product.pname,
                        description: product.description,
                        price: product.price,
                        image: product.image,
                        rating: product.rating,
                        quantity: 1,
                        totalprice: product.price

                    })
                    newCart.save()
                    res.status(200).json({
                        message: "product addedd to cart",
                        statusCode: 200,
                        status: true
                    })
                }
            })



        }

    })


}

const totalprice=(req,res)=>{
    const{userId}=req.params
    carts.find({userId}).then(products=>{
        if(products){
            if(products.length>0){
                total=products.map(i=>i.totalprice).reduce((i1,i2)=>i1+i2)

                res.status(200).json({
                    message:total,
                    statusCode:200,
                    status:true,
                })
            }
        }
    })
}


const QuantityIncrement=(req,res)=>{
    const{_id}=req.params
    carts.findOne({_id}).then(data=>{
        if(data){
            data.quantity+=1
            data.totalprice=data.price*data.quantity
            data.save()
            res.status(200).json({
                message:data.quantity,
                statusCode:200,
                status:true,
                price:data.totalprice
            })
        }
    })
}

const QuantityDecrement=(req,res)=>{
    const{_id}=req.params
    carts.findOne({_id}).then(data=>{
        if(data){
            if(data.quantity>1){
                data.quantity-=1
                data.totalprice=data.price*data.quantity

                data.save()
                res.status(200).json({
                    message:data.quantity,
                    statusCode:200,
                    status:true,
                    price:data.totalprice
                })
            }

            else{
                res.status(404).json({
                    message:"you can remove this from cart",
                    statusCode:404,
                    status:false,
            })
        }
        }
    })
}




const cartcount = (req, res) => {
    const { userId } = req.params
    carts.find({ userId }).then(products => {
        if (products) {
            res.status(200).json({
                message: products.length,
                statusCode: 200,
                status: true
            })
        }
    })
}
// cartItems

const cartItems = (req, res) => {
    const { userId } = req.params
    carts.find({ userId }).then(products => {
        if (products) {
            res.status(200).json({
                message: products,
                statusCode: 200,
                status: true
            })
        }
    })
}





const addwishlist = (req, res) => {
    const { userId, pId } = req.body


    wishlists.findOne({ userId, pId }).then(data => {

        if (data) {



            res.status(400).json({
                message: "product already in wishlist",
                statusCode: 400,
                status: false,
            })

        }
        else {

            products.findOne({ _id: pId }).then(product => {
                if (product) {
                    newwishlist = new wishlists({
                        userId,
                        pId,
                        pname: product.pname,
                        description: product.description,
                        price: product.price,
                        image: product.image,
                        rating: product.rating,


                    })
                    newwishlist.save()
                    res.status(200).json({
                        message: "product addedd to wishlist",
                        statusCode: 200,
                        status: true
                    })
                }
            })



        }

    })


}

const wishlistItems = (req, res) => {
    const { userId } = req.params
    wishlists.find({ userId }).then(products => {
        if (products) {
            res.status(200).json({
                message: products,
                statusCode: 200,
                status: true
            })
        }
    })
}

const removeWishlist = (req, res) => {
    const { _id } = req.params
    wishlists.deleteOne({ _id }).then(data => {
        res.status(200).json({
            message: "product removed from wishlist",
            statusCode: 200,
            status: true
        })
    })
}

const getUsers = (req, res) => {
    users.find().then(data => {
        if (data) {
            res.status(200).json({
                message: data,
                statusCode: 200,
                status: true
            })
        }
    })
}


const deleteUser = (req, res) => {
    const { _id } = req.params
    users.deleteOne({ _id }).then(data => {

        carts.deleteMany({ userId: _id }).then(data => {
            wishlists.deleteMany({ userId: _id }).then(data => {
                res.status(200).json({
                    message: "user deleted",
                    statusCode: 200,
                    status: true
                })
            })
        })




    })
}

const removeCartlist = (req, res) => {
    const { _id } = req.params
    carts.deleteOne({ _id }).then(data => {
        res.status(200).json({
            message: "product removed from cartlist",
            statusCode: 200,
            status: true
        })
    })
}




module.exports = {
    adminLogin, addProduct, getProducts, editProduct, deleteProduct,
    getSingleProduct, userSignUp, userLogin, addToCart, cartcount, cartItems, addwishlist,
    wishlistItems, removeWishlist, getUsers, deleteUser,totalprice,QuantityIncrement,QuantityDecrement,removeCartlist
}