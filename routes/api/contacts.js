const express = require('express')
const  ctrl  = require("../../controllers/contacts/index");


const { validateBody, isValidId, authenticate } = require("../../middlewares")
const router = express.Router();
const { schemas } = require("../../models/contact");


router.get('/', authenticate, ctrl.getAll);

router.get('/:contactId', isValidId, authenticate, ctrl.getById);

router.post('/', validateBody(schemas.addSchema), authenticate, ctrl.add);

router.delete('/:contactId', isValidId, authenticate, ctrl.deleteById);

router.put('/:contactId', isValidId, authenticate, validateBody(schemas.addSchema), ctrl.updateById);

router.patch("/:contactId/favorite", isValidId, authenticate, validateBody(schemas.updateFavoriteSchema), ctrl.updateFavorite);

module.exports = router;
