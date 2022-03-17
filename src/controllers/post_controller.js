const userService = require('../services/user_services');
const service = require('../services/post_services');
const { ObjectId } = require('mongodb');


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 */
const createPost = async (req,res)=>{

    const body = {
        title: req.body.title,
        description: req.body.description,
        user_email: req.body.user_email,
        image: req.body.image
    }   

    let response = await userService.getByEmail(body.user_email);
    if(response===null){
        throw "Only a user can post "
    }
    return service.create(body);
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 */
 const updatePost = async (req,res)=>{
     
    const body = {
        _id :ObjectId(req.body.id),
        title: req.body.title,
        description: req.body.description,
        user_email: req.body.user_email,
        image: req.body.image
    }   
    let response = await service.checkUserOwner(body.user_email,body._id);
    if(response===null){
        throw "Only the post's owner can update the post"
    }
    return service.update(body);

}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 */
 const removePost = async (req,res)=>{
     
    const body = {
        _id :ObjectId(req.body.id),
        user_email: req.body.user_email
    }   
    let response = await service.checkUserOwner(body.user_email,body._id);
    if(response===null){
        throw "Only the post's owner can delete the post"
    }
    return await service.remove(body._id);

}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 */
const getAllPosts = async (req,res)=>{
    let response = await userService.getByEmail(req.params.userEmail);
    if(response===null){
        throw "You have to be signed in to see all posts"
    }

    return await service.getAll()    
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 */
 const getPostById = async (req,res)=>{
    const params={
        id: req.params.id
    }
    return service.getById(params.id)
}

module.exports ={
    createPost,
    updatePost,
    removePost,
    getAllPosts,
    getPostById,
    
}