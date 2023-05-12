var express = require('express');
var router = express.Router();
const adminController = require('../controllers/admin.controllers');
const auth = require('../middleware/auth.midllware');

/* GET home page. */
router.get('/',auth.ChuaDangNhap, adminController.getFormLogin);
router.post('/',auth.ChuaDangNhap, adminController.postSignin);
router.get('/notification',auth.YeuCauDangNhap, adminController.getFormNoti);
router.post('/notification',auth.YeuCauDangNhap, adminController.postNoti);
router.get('/account',auth.YeuCauDangNhap, adminController.getFormAccount);
router.get('/logout', adminController.postLogout);
router.get('/password',auth.YeuCauDangNhap, adminController.getFormupdatePass);
router.post('/password',auth.YeuCauDangNhap, adminController.postUpdate);
router.get('/resetpassword',auth.ChuaDangNhap, adminController.getFormRestPass);
router.post('/resetpassword',auth.ChuaDangNhap, adminController.postRestPass);




module.exports = router;
