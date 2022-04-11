const service = require("../services/user_services");
const contactInfoservice = require("../services/contact-info_services.js");

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns {Promise}
 *
 */
const create = async (req, res) => {
  const body = {
    name: req.body.name,
    email: req.body.email,
    contacts: req.body.contacts,
  };
  return service.create(body);
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns {Promise}
 *
 */
const edit = async (req, res) => {
  const params = {
    id: req.params.id,
  };
  const body = {
    name: req.body.name,
    email: req.body.email,
    contacts: req.body.contacts,
  };
  return await service.edit(params, body);
};

/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @return {Promisse}
 */
const getById = async (req, res) => {
  const params = {
    id: req.params.id,
  };
  return await service.getById(params.id);
};
/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @return {Promise}
 */
const remove = async (req, res) => {
  const params = {
    id: req.params.id,
  };

  return await service.remove(params);
};
/**
 *
 * @param {*} req
 * @param {*} res
 * @returns {Promise}
 *
 */
const createUserContacts = async (req, res) => {
  const params = {
    userId: req.params.id,
  };
  const body = {
    contacts: req.body.contacts,
  };

  return await contactInfoservice.createMany(params, body);
};

/**
 *
 *
 * @param {*} req
 * @param {*} res
 * @return {Promisse}
 */

const getAll = async (req, res) => {
  return await service.getAll();
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns {Promise}
 *
 */
const getUserContacts = async (req, res) => {
  const params = {
    userId: req.params.id,
  };
  return await contactInfoservice.getByUserId(params);
};

module.exports = {
  create,
  edit,
  getById,
  remove,
  createUserContacts,
  getAll,
  getUserContacts,
};
