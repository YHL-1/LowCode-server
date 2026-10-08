const Router=require('koa-router');
const authMiddleWare=require('../middleWare/auth')
const router = new Router();
router.use(authMiddleWare)

const {addRecord,deleteRecord,getRecordsByUserId,updateRecord,getRecordById,deleteAll}=require('../controller/record');

router.prefix('/record');


router.post('/add',addRecord);
router.post('/delete',deleteRecord);
router.post('/update',updateRecord);
router.get('/list',getRecordsByUserId);
router.post('/get',getRecordById)
router.post('/deleteAll',deleteAll);

module.exports=router;