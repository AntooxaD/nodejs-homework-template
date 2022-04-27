const express = require('express');
const { createError } = require('../../helpers/creeateError');
const { contactSchema } = require('../../helpers/shema');

const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts');

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({ contacts, message: 'List users' });
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
    if (!contact) {
      throw createError(404);
    }
    res.json({ ...contact }).status(200);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const { body } = req;
    if (!body.name || !body.email || !body.phone) {
      return res.status(400).send({ message: 'missing required name field' });
    }

    const contact = await addContact(body);

    res.json({ ...contact }).status(201);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  const contact = await removeContact(req.params.contactId);
  if (!contact) {
    return res.status(404).send({ message: 'Not found' });
  }
  res.json({ message: 'contact deleted', status: 'success' });
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const { contactId } = req.params;

    const contacts = await updateContact(contactId, req.body);
    if (!req.body.name || !req.body.email || !req.body.phone) {
      return res.status(400).send({ message: 'missing required fields' });
    }
    if (!contacts) {
      throw createError(404);
    }
    res.json({ ...contacts });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
