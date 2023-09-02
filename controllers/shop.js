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

    // const products = adminData.products;
    // Product.getAllProducts(products=>{
    //     res.render('shop/product-list',{
    //         products:products, 
    //         pageTitle:'All Products', 
    //         path:'/products',
    //         hasProducts:products.length>0,
    //         activeShop:true,
    //         productCSS:true
    //     });
    // });

    // console.log('products::',products);
    // res.render('shop',{
    //     products:products, 
    //     pageTitle:'Shop', 
    //     path:'/',
    //     hasProducts:products.length,
    //     activeShop:true,
    //     productCSS:true
    // });
    // console.log('adminData.products::::::::::::',adminData.products);
    // res.sendFile(path.join(rootDir,'views','shop.html'));
    // // console.log('Hello from shop module');
    // // res.send('<h1>Hello from express!</h1>');
}

const getProduct = (req,res,next)=>{
    const id = req.params.id;

    Product.findById(id)
            .then(product=>{
                res.render('shop/product-detail',{
                    product:product,
                    pageTitle:product.title,
                    path:'/products'
                })
            })
            .catch(err=>console.log(err));

    //
    // Product.findAll({where:{id:id}})
    //         .then(products=>{
    //             res.render('shop/product-detail',{
    //                 product:products[0], 
    //                 pageTitle:products[0].title, 
    //                 path:'/products',
    //             });
    //         })
    //         .catch(err=>{
    //             console.log(err);
    //         })

    //findByPk
    /*Product.findByPk(id)
            .then(product=>{
                res.render('shop/product-detail',{
                    product:product, 
                    pageTitle:product.title, 
                    path:'/products',
                });
            })
            .catch(err=>{
                console.log(err);
            }) */

    // Mysql
    /* Product.getProductById(id)
            .then(([product])=>{
                console.log('product:::',product);
                res.render('shop/product-detail',{
                    product:product[0], 
                    pageTitle:product[0].title, 
                    path:'/products',
                });
            })
            .catch(err=>console.log(err))
    */

    // Dummy Json        
    /*Product.getProductById(id, product => {
        res.render('shop/product-detail',{
            product:product, 
            pageTitle:product.title, 
            path:'/products',
        });
    }); */
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

    // Mysql
    /*Product.getAllProducts()
        .then(([rows, fieldData])=>{
            res.render('shop/index',{
                products:rows, 
                pageTitle:'Shop', 
                path:'/'
            });
        })
        .catch(err => console.log(err));*/

    // Dummy Data
    /*Product.getAllProducts(products=>{
        res.render('shop/index',{
            products:products, 
            pageTitle:'Shop', 
            path:'/',
            hasProducts:products.length>0,
            activeShop:true,
            productCSS:true
        });
    }); */
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
                    name:req.user.name,
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
    console.log('req.user._id::::',req.user._id);
    Order.find({"user.userId":req.user._id})
        .then(orders=>{
            console.log('orders::',orders[0].products);
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