// const products = [];
const Product = require('../models/product.js');
// const Cart = require('../models/cart');
const Order = require('../models/order');

const getProducts = (req,res,next) => {

    Product.find()
        .then(products=>{
            res.render('shop/product-list',{
                products:products, 
                pageTitle:'All Products', 
                path:'/products'
            });
        })
        .catch(err => console.log(err));
}

const getProduct = (req,res,next)=>{
    const id = req.params.id;

    Product.findById(id)
            .then(product=>{
                res.render('shop/product-detail',{
                    product:product,
                    pageTitle:product.title,
                    path:'/products',
                    csrfToken:req.csrfToken()
                })
            })
            .catch(err=>console.log(err));
}

const getIndex = (req,res,next) => {

    Product.find()
            .then(products=>{
                res.render('shop/index',{
                    products:products, 
                    pageTitle:'Shop', 
                    path:'/'
                });
            })
            .catch(err=>{
                console.log(err);
            })
}

const getCart = (req,res,next)=>{
    req.user
        .populate('cart.items.productId')
        .then(user=>{
            const products = user.cart.items;
            // console.log('products::::',user.cart.items);
            res.render('shop/cart',{
                path:'/cart/',
                pageTitle: 'Your Cart',
                products:products
            })
        })
        .catch(err=>console.log(err));
}

const postCart = (req,res,next)=>{
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(product => {
            console.log('req.user::::',req.user);
            return req.user.addToCart(product);
        }).then(result=>{
            console.log(result);
            res.redirect('/cart');
        })
}

// Sequelize
// const postCart = (req,res,next)=>{
//     const prodId = req.body.productId;
//     let fetchedCart;
//     let newQuantity = 1;
//     req.user
//         .getCart()
//         .then(cart=>{
//             fetchedCart = cart;
//             return cart.getProducts({where:{id:prodId}});
//         })
//         .then(products=>{
//             let product;
//             if(products.length>0){
//                 product = products[0];
//             }
//             if(product){
//                 const oldQuantity = product.cartItem.quantity;
//                 newQuantity = oldQuantity+1;
//                 return product;
//             }
//             return Product.findByPk(prodId)
//         })
//         .then(product=>{
//             return fetchedCart.addProduct(product, { 
//                 through: { quantity:newQuantity }
//             });
//         })
//         .then(()=>{
//             res.redirect('/cart');
//         })
//         .catch(err=>console.log(err));
//     /*const prodId = req.body.productId;
//     Product.getProductById(prodId,(product)=>{
//         Cart.addProduct(prodId,product.price);
//     })
//     res.redirect('/cart'); */
// }

const postOrder = (req,res,next)=>{
    req.user
        .populate('cart.items.productId')
        .then(user=>{
            const products = user.cart.items.map(i=>{
                return {
                    quantity: i.quantity, 
                    product: {...i.productId._doc}
                }
            });
            const order = new Order({
                user:{
                    email:req.user.email,
                    userId: req.user._id
                },
                products:products
            });
            return order.save();
        })
        .then(()=>{
            return req.user.clearCart();
        })
        .then(()=>{
            res.redirect('/orders');
        })
        .catch(err=>console.log(err))
}

const getOrders = (req,res,next)=>{
    console.log('req.user._id::',req.user._id);
    Order.find({ 'user.userId': req.user._id })
        .then(orders=>{
            console.log('orders::',orders);
            res.render('shop/orders',{
                path: '/orders',
                pageTitle:'Your Orders',
                orders:orders
            });
        });
}

// const getCheckout = (req,res,next)=>{
//     res.render('shop/checkout',{
//         path: '/checkout',
//         pageTitle:'Checkout'
//     });
// }

const deleteProductFromCart = (req,res,next)=>{
    const productId = req.body.productId;
    req.user
        .removeFromCart(productId)
        .then(()=>{
            res.redirect('/cart');
        })
        .catch(err=>console.log(err));
}

module.exports.getProducts = getProducts;
module.exports.getIndex = getIndex;
module.exports.getCart = getCart;
// module.exports.getCheckout = getCheckout;
module.exports.postOrder = postOrder;
module.exports.getOrders = getOrders;
module.exports.getProduct = getProduct;
module.exports.postCart = postCart;
module.exports.deleteProductFromCart = deleteProductFromCart;