const bycrypt = require('bcryptjs');
module.exports.adminLogin = (req,res) => {
    const {uniqueId,password} = req.body;

    if(!uniqueId || !password){
        return res.status(400).json({message: 'Please enter all fields'});
    }
    if(uniqueId === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD){
        return res.status(200).json({message: 'Login successful'});
    }
    
};