const Router=require('koa-router');
const router = new Router();
const {register,login,sendCode,resetPassword}=require('../controller/user');

router.prefix('/user');

router.post('/register',register);
router.post('/login',login);
router.post('/sendCode',sendCode);
router.post('/resetPassword',resetPassword);

module.exports=router;
