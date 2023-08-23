const Product = require('../models/product');

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
    const productModel = new Product(null,title,imageUrl,description,price);
    productModel.save();
    // console.log('POST');
    // products.push({'title':req.body.title});
    // console.log(req.body);
    res.redirect('/admin/products');
};

const editProduct = (req,res) => {
    const editMode = req.query.edit;
    if(!editMode){
        return res.redirect('/');
    }
    const prodId = req.params.id;
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
    });

    // res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title" /><button type="submit">Send</button></form>');
};

const editProductPost = (req,res,next)=>{
    const id = req.body.id;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    const productModel = new Product(
        id, 
        title,
        imageUrl,
        description,
        price
    );
    productModel.save();
    // console.log('POST');
    // products.push({'title':req.body.title});
    // console.log(req.body);
    res.redirect('/admin/products');
};

const getProducts = (req,res,next) => {
    Product.getAllProducts(products=>{
        res.render('admin/products',{
            products:products, 
            pageTitle:'Admin Products', 
            path:'/admin/products'
        });
    });
};

const deleteProductPost = (req,res,next)=>{
    const id = req.body.id;
    Product.deleteProductById(id);
    res.redirect('/admin/products');
}

module.exports.addProduct = addProduct;
module.exports.addProductPost = addProductPost;
module.exports.getProducts = getProducts;
module.exports.editProduct = editProduct;
module.exports.editProductPost = editProductPost;
module.exports.deleteProductPost = deleteProductPost;