const express = require('express')



const { adminLogin, addProduct, getProducts, editProduct, deleteProduct,
    getSingleProduct, userSignUp, userLogin, addToCart,
     cartcount, cartItems, addwishlist, wishlistItems, removeWishlist, getUsers, deleteUser, totalprice, QuantityIncrement, QuantityDecrement, removeCartlist} = require('../controller/logic')





// 
const router = new express.Router()

router.post('/admin/login', adminLogin)
router.post('/admin/add-product', addProduct)
router.get('/products-access', getProducts)
router.put('/products-update/:id', editProduct)
router.delete('/product-delete/:id', deleteProduct)
router.get('/one-product/:id', getSingleProduct)
router.post('/user-signUp', userSignUp)
router.post('/user-login', userLogin)
router.post('/addtocart', addToCart)
router.get('/cart-count/:userId', cartcount)
router.get('/cart-items/:userId', cartItems)
router.get(`/price-total/:userId`,totalprice)
router.get(`/quantity-update-inc/:id`,QuantityIncrement)
router.get(`/quantity-update-dec/:id`,QuantityDecrement)
router.delete('/remove-cartlist/:id',removeCartlist)
router.get('/wishlist-items/:userId',wishlistItems)
router.post('/addtowishlist', addwishlist)
router.delete('/remove-wishlist/:id',removeWishlist)
router.get('/user-access',getUsers)
router.delete('/user-delete/:_id',deleteUser)


// export router
module.exports = router






