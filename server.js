const Express = require('express')
const userController = require ("./src/controllers/user_controller");
const postController = require ("./src/controllers/post_controller");


const port = 3001;

const app = Express();

app.use(Express.json())

app.use(Express.urlencoded({extended:true}))

const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: 'http://localhost:3001',
  clientID: '1UF7NDNBCeUJY756W3k9qQJrhHHhdsMo',
  issuerBaseURL: 'https://dev-g8xtovme.us.auth0.com/',
  secret: 'fdasfda4890jklfdjlçjdaçfjda230984fuhlfdjhfda89034ji2oç4j09uf9diopajfds'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
});

//user

app.post('/user',async (req,res)=>{
    let createdUser = await userController.createUser(req,res).catch(error=>{
        res.status(500).send(error)
    })
    res.status(200).send(createdUser)
})

app.get('/user/:id',async(req,res)=>{
    let user = await userController.getUserById(req,res).catch(error=>{
        res.status(500).send(error)
    })
    res.status(200).send(user)
})

//post

app.post('/post',async(req,res)=>{
    let createdPost = await postController.createPost(req,res).catch(error=>{
        res.status(500).send(error)
    })
    res.status(200).send(createdPost)
})

app.patch('/post',async(req,res)=>{
    let updatedPost = await postController.updatePost(req,res).catch(error=>{
        res.status(500).send(error)
    })
    res.status(200).send(updatedPost)

})

app.delete('/post',async(req,res)=>{
    let removedPost = await postController.removePost(req,res).catch(error=>{
        res.status(500).send(error)
    })
    res.status(200).send(removedPost)

})
app.get('/post/getAll/:userEmail',async(req,res)=>{
    let posts = await postController.getAllPosts(req,res).catch(error=>{
        res.status(500).send(error)
    })
    res.status(200).send(posts)

})

app.get('/post/:id',async(req,res)=>{
    let post = await postController.getPostById(req,res).catch(error=>{
        res.status(500).send(error)
    })
    res.status(200).send(post)

})



app.listen(port || 3001,()=>console.log(`listening on port ${process.env.PORT || 3001}`));