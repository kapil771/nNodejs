// const products = [];
const Product = require('../models/product');
const Cart = require('../models/cart');

const getProducts = (req,res,next) => {

    Product.getAllProducts()
        .then(([rows, fieldData])=>{
            res.render('shop/product-list',{
                products:rows, 
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
    Product.getProductById(id)
            .then(([product])=>{
                console.log('product:::',product);
                res.render('shop/product-detail',{
                    product:product[0], 
                    pageTitle:product[0].title, 
                    path:'/products',
                });
            })
            .catch(err=>console.log(err))
    // Product.getProductById(id, product => {
    //     res.render('shop/product-detail',{
    //         product:product, 
    //         pageTitle:product.title, 
    //         path:'/products',
    //     });
    // });
}

const getIndex = (req,res,next) => {

    Product.getAllProducts()
        .then(([rows, fieldData])=>{
            res.render('shop/index',{
                products:rows, 
                pageTitle:'Shop', 
                path:'/'
            });
        })
        .catch(err => console.log(err));

    // Product.getAllProducts(products=>{
    //     res.render('shop/index',{
    //         products:products, 
    //         pageTitle:'Shop', 
    //         path:'/',
    //         hasProducts:products.length>0,
    //         activeShop:true,
    //         productCSS:true
    //     });
    // });
}

const getCart = (req,res,next)=>{
    Cart.getCart(cart=>{
        Product.getAllProducts(products=>{
            const cartProducts = [];
            for(product of products){
                const cartProductsData = cart.products.find(
                    prod=>prod.id === product.id
                );
                if(cartProductsData){
                    cartProducts.push({productData:product, qty:cartProductsData.qty})
                }
            }

            res.render('shop/cart',{
                path: '/cart',
                pageTitle:'Your Cart',
                products:cartProducts
            });
        })
    })
    
}

const postCart = (req,res,next)=>{
    const prodId = req.body.productId;
    // console.log('prodId:::',prodId);
    Product.getProductById(prodId,(product)=>{
        Cart.addProduct(prodId,product.price);
    })
    res.redirect('/cart');
}

const getOrders = (req,res,next)=>{
    res.render('shop/orders',{
        path: '/orders',
        pageTitle:'Your Orders'
    });
}

const getCheckout = (req,res,next)=>{
    res.render('shop/checkout',{
        path: '/checkout',
        pageTitle:'Checkout'
    });
}

const deleteProductFromCart = (req,res,next)=>{
    const productId = req.body.id;
    Product.getProductById(productId, product=>{
        Cart.deleteProduct(productId,product.price);
        res.redirect('/cart');
    })
}

module.exports.getProducts = getProducts;
module.exports.getIndex = getIndex;
module.exports.getCart = getCart;
module.exports.getCheckout = getCheckout;
module.exports.getOrders = getOrders;
module.exports.getProduct = getProduct;
module.exports.postCart = postCart;
module.exports.deleteProductFromCart = deleteProductFromCart;