const Product = require('../models/product');
const mongodb = require('mongodb');
// const ObjectId = mongodb.ObjectId;

const addProduct = (req,res) => {
    // res.sendFile(path.join(rootDir,'views','add-product.html'));
    res.render('admin/edit-product',{
        pageTitle:'Add Product',
        path:'/admin/add-product',
        editing:false
        // activeAddProduct:true,
        // productCSS:true,
        // formsCSS:true
    });

    // res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title" /><button type="submit">Send</button></form>');
};

const addProductPost = (req,res,next)=>{
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;


    const product = new Product(
        title, 
        price, 
        description, 
        imageUrl, 
        null, 
        req.user._id
    );
    product
        .save()
        .then(result=>{
            console.log(result);
            console.log('Product created');
            res.redirect('/admin/products');
        })
        .catch(err=>{
            console.log(err);
        })

    // Using Association
    // req.user.createProduct({
    //     title:title,
    //     price:price,
    //     imageUrl:imageUrl,
    //     description:description,
    // }).then(result=>{
    //     console.log(result);
    //     return res.redirect('/admin/products');
    // }).catch(err=>{
    //     console.log(err);
    // });


    //
    // Product.create({
    //     title:title,
    //     price:price,
    //     imageUrl:imageUrl,
    //     description:description,
    //     userId:req.user.id
    // }).then(result=>{
    //     console.log(result);
    //     return res.redirect('/admin/products');
    // }).catch(err=>{
    //     console.log(err);
    // });

    // Mysql
    /*const productModel = new Product(null,title,imageUrl,description,price);
    productModel
        .save()
        .then(()=>{
            res.redirect('/');
        })
        .catch(err => console.log(err));
        */

    // Through dummy json
    /*console.log('POST');
    products.push({'title':req.body.title});
    console.log(req.body); */
    // return res.redirect('/admin/products');
};

const editProduct = (req,res) => {
    const editMode = req.query.edit;
    if(!editMode){
        return res.redirect('/');
    }
    const prodId = req.params.id;

    // Product.findByPk(prodId)
    // req.user.getProducts({where:{id:prodId}})
    Product.findById(prodId)
            .then(product=>{
                // const product = products[0];
                if(!product){
                    return res.redirect('/');
                }
                res.render('admin/edit-product',{
                    pageTitle:'Edit Product',
                    path:'/admin/edit-product',
                    editing:editMode,
                    product:product
                });
            })
            .catch(err=>console.log(err))

    // Mysql
    /*
    Product.getProductById(prodId,product=>{
        if(!product){
            return res.redirect('/');
        }
        // res.sendFile(path.join(rootDir,'views','add-product.html'));
        res.render('admin/edit-product',{
            pageTitle:'Edit Product',
            path:'/admin/edit-product',
            editing:editMode,
            product:product
            // activeAddProduct:true,
            // productCSS:true,
            // formsCSS:true
        });
    }); */

    // res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title" /><button type="submit">Send</button></form>');
};

const editProductPost = (req,res,next)=>{
    const id = req.body.id;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    // Product.findByPk(id)
    //         .then(product=>{
    //             product.title = title;
    //             product.imageUrl = imageUrl;
    //             product.description = description;
    //             product.price = price;
    //             return product.save();
    //         })
    const product = new Product(title, price, description, imageUrl, id);
    product
        .save()
        .then(result=>{
            console.log('Product updated successfully!');
            res.redirect('/admin/products');
        })
        .catch(err=>console.log(err));

    // mysql
    /*const productModel = new Product(
        id, 
        title,
        imageUrl,
        description,
        price
    );
    productModel.save(); */

    //dummy update
    // console.log('POST');
    // products.push({'title':req.body.title});
    // console.log(req.body);
    // res.redirect('/admin/products');
};

const getProducts = (req,res,next) => {
    Product.fetchAll()
        .then(products=>{
            res.render('admin/products',{
                products:products, 
                pageTitle:'Admin Products', 
                path:'/admin/products'
            });
        })
        .catch(err=>{
            console.log(err);
        });
}

// const getProducts = (req,res,next) => {

//     // Product.findAll()
//     req.user.getProducts()
//             .then(products=>{
//                 res.render('admin/products',{
//                     products:products, 
//                     pageTitle:'Admin Products', 
//                     path:'/admin/products'
//                 });
//             })
//             .catch(err=>{
//                 console.log(err);
//             });

//     /*Product.getAllProducts(products=>{
//         res.render('admin/products',{
//             products:products, 
//             pageTitle:'Admin Products', 
//             path:'/admin/products'
//         });
//     });*/
// };

const deleteProductPost = (req,res,next)=>{
    const id = req.body.id;

    // Product.findByPk(id)
    Product.deleteProductById(id)
        // .then(product=>{
        //     return product.destroy();
        // })
        .then(result=>{
            console.log('Product Removed');
            res.redirect('/admin/products');
        })
        .catch(err=>console.log(err))

    //Dummy Delete
    // Product.deleteProductById(id);

    // res.redirect('/admin/products');
}

module.exports.addProduct = addProduct;
module.exports.addProductPost = addProductPost;
module.exports.getProducts = getProducts;
module.exports.editProduct = editProduct;
module.exports.editProductPost = editProductPost;
module.exports.deleteProductPost = deleteProductPost;