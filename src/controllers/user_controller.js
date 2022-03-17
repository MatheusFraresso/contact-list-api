const service = require('../services/user_services');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 */
 const createUser = async(req,res)=>{
     const body = {
         name: req.body.name,
         email: req.body.email,
         password:req.body.password,
         image: req.body.image
     }
     if(!body.email.includes('@')){
        throw "Invalid email"
     }
     let response = await service.getByEmail(body.email);
     if(response!=null){
         throw "Email already exists"
     }
     return service.create(body);
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 */
const getUserById = async (req,res)=>{
    const params={
        id: req.params.id
    }
    return service.getById(params.id)
}

module.exports={createUser,getUserById};

