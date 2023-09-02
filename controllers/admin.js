const Product = require('../models/product.js');

const addProduct = (req,res) => {
    res.render('admin/edit-product',{
        pageTitle:'Add Product',
        path:'/admin/add-product',
        editing:false
    });
};

const addProductPost = (req,res,next)=>{
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    const userId = req.user._id;

    const product = new Product({
        title:title, 
        price:price, 
        description:description, 
        imageUrl:imageUrl,
        userId:userId
    });
    product
        .save()
        .then(result=>{
            console.log(result);
            console.log('Product created');
            res.redirect('/admin/products');
        })
        .catch(err=>{
            console.log(err);
        });
};

const editProduct = (req,res) => {
    const editMode = req.query.edit;
    if(!editMode){
        return res.redirect('/');
    }
    const prodId = req.params.id;

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

};

const editProductPost = (req,res,next)=>{
    const id = req.body.id;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;

    Product.findById(id)
    .then(product=>{
        product.title = title;
        product.imageUrl = imageUrl;
        product.description = description;
        product.price = price;
        return product.save()
    })
    .then(result=>{
        console.log('Product updated successfully!');
        res.redirect('/admin/products');
    })
    .catch(err=>console.log(err));

};

const getProducts = (req,res,next) => {
    Product.find()
        // .select('title price -_id')
        // .populate('userId','name')
        .then(products=>{
            console.log(products);
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

const deleteProductPost = (req,res,next)=>{
    const id = req.body.id;
    Product.findByIdAndDelete(id)
        .then(()=>{
            console.log('Product Removed');
            res.redirect('/admin/products');
        })
        .catch(err=>console.log(err))
}

module.exports.addProduct = addProduct;
module.exports.addProductPost = addProductPost;
module.exports.getProducts = getProducts;
module.exports.editProduct = editProduct;
module.exports.editProductPost = editProductPost;
module.exports.deleteProductPost = deleteProductPost;