const service = require('../services/user_services');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns {Promise}
 * 
 */
 const create = async(req,res)=>{
     const body = {
         name: req.body.name,
         email: req.body.email,
         contacts: req.body. contacts
     }
     return await service.create(body);
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns {Promise}
 * 
 */
 const edit = async(req,res)=>{
    const body = {
        name: req.body.name,
        email: req.body.email,
        contacts: req.body. contacts
    }
    return await service.create(body);
}

/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @return {Promisse} 
 */
const getById = async (req,res)=>{
    const params={
        id: req.params.id
    }
    return await service.getById(params.id)
}
/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @return {Promise} 
 */
const remove = async(req,res)=>{
     const params={
        id: req.params.id
     }

    return await service.create(params);
}

module.exports={create, edit, getById, remove};

