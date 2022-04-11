const Express = require("express");
const userController = require("./src/controllers/user_controller");
const contactController = require("./src/controllers/contact-info_controller");

const cors = require("cors");

const port = 3001;

const app = Express();

app.use(Express.json());

app.use(cors());

//user

app.post("/users", async (req, res) => {
  let createdUser = await userController.create(req, res).catch((error) => {
    res.status(500).send(error.message);
  });

  res.status(201).send(createdUser);
});

app.patch("/users/:id", async (req, res) => {
  let createdUser = await userController.edit(req, res).catch((error) => {
    res.status(500).send(error.message);
  });

  res.status(200).send(createdUser);
});

app.get("/users/:id", async (req, res) => {
  let user = await userController.getById(req, res).catch((error) => {
    res.status(500).send(error.message);
  });

  res.status(200).send(user);
});

app.delete("/users/:id", async (req, res) => {
  let createdUser = await userController.remove(req, res).catch((error) => {
    res.status(500).send(error.message);
  });

  res.status(200).send(createdUser);
});

app.get("/users", async (req, res) => {
  let user = await userController.getAll(req, res).catch((error) => {
    res.status(500).send(error.message);
  });

  res.status(200).send(user);
});
//user-contacts
app.post("/users/:id/contacts", async (req, res) => {
  let createdUser = await userController
    .createUserContacts(req, res)
    .catch((error) => {
      res.status(500).send(error.message);
    });
  res.status(201).send(createdUser);
});

app.get("/users/:id/contacts", async (req, res) => {
  let user = await userController.getUserContacts(req, res).catch((error) => {
    res.status(500).send(error.message);
  });

  res.status(200).send(user);
});

// contacts

app.patch("/contacts/:id", async (req, res) => {
  let createdUser = await contactController.edit(req, res).catch((error) => {
    res.status(500).send(error.message);
  });

  res.status(200).send(createdUser);
});

app.delete("/contacts/:id", async (req, res) => {
  let createdUser = await contactController.remove(req, res).catch((error) => {
    res.status(500).send(error.message);
  });

  res.status(200).send(createdUser);
});

app.listen(port, () =>
  console.log(`listening on port ${process.env.PORT || 3001}`)
);
