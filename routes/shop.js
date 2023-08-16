const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','views','shop.html'));
    // console.log('Hello from shop module');
    // res.send('<h1>Hello from express!</h1>');
});
// module.exports = path.dirname(require.main.filename);
module.exports = router;