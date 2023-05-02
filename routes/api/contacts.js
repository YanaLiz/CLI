const express = require('express')
const  ctrl  = require("../../controllers/contacts/index");


const { validateBody, isValidId } = require("../../middlewares")
const router = express.Router();
const { schemas } = require("../../models/contact");


router.get('/', ctrl.getAll)

router.get('/:contactId', isValidId, ctrl.getById)

router.post('/', validateBody(schemas.addSchema), ctrl.add)

router.delete('/:contactId',  isValidId, ctrl.deleteById)

router.put('/:contactId', isValidId, validateBody(schemas.addSchema), ctrl.updateById)

router.patch("/:contactId/favorite", isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateFavorite);

module.exports = router;
