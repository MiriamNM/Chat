const express = require('express');
const multer = require('multer');
const response = require('../../network/response');
const controller = require('./constroller');
const router = express.Router();

const upload = multer({
    dest: 'public/files/',
})

router.get('/', (req, res) => {
    const filterMessages = req.query.user || null;
    controller.getMessage(filterMessages)
        .then((messageList)=>{
            response.success(req, res, messageList, 200);
        })
        .catch(e=>{
            response.error(req, res, 'Unexpected Error', 500, e)
        })
})

router.post('/',upload.single('file'), (req, res) => {
    controller.addMessage(req.body.user, req.body.message, req.file)
        .then((fullmesagge)=>{
            response.success(req, res, fullmesagge);
        })
        .catch(()=>{
            response.error(req, res, 'Información invalida', 400, 'Error para loggearlo');
        });
})

router.patch('/:id', (req, res) => {
    controller.updateMessage(req.params.id, req.body.message)
    .then((data)=>{
        response.success(req, res, data, 200);
    })
    .catch(e => {
        response.error(req, res, 'Error interno', 500, e);
    })
})

router.delete('/:id', (req, res) => {
    controller.deleteMessage(req.params.id)
        .then(() => {
            response.success(req, res, `Usuario ${req.params.id} eliminado`, 200);
        })
        .catch(e => {
            response.error(req, res, 'Error interno', 500, e);
        })
})

module.exports = router;