const service = require('../services/contact-info_services');

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
     
    const params = {
        id: req.params.id
    }
    const body = {
        name: req.body.name,
        type: req.body.type,
        value: req.body.value,
    }
    return await service.edit(params, body);
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

    return await service.remove(params);
}

module.exports={create, edit, getById, remove};

