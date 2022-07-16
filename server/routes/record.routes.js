const Router = require('express')
const router = new Router()
const recordController = require('../controllers/record.controller')

router.post('/create-record', recordController.createRecord)
router.get('/records', recordController.getRecords)
router.get('/record/:id', recordController.getOneRecord)

module.exports = router
