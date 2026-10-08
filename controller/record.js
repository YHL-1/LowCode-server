const {createRecord,deleteRecordById,updateRecordById,getRecordsByUserId,getRecordById,deleteAllRecordsByUserId}=require('../service/record');


class RecordController{
    async addRecord(ctx){
        const result = ctx.request.body;
        result.UserId=ctx.userId
        const res = await createRecord(result);
        ctx.body = {
            code: 200,
            message: '记录添加成功',
            result: {id: res.id, result: res.result}
        };
    }

    async deleteRecord(ctx){
        const {id}=ctx.request.body;
const res=await deleteRecordById(id);
ctx.body = {
            code: 200,
            message: '记录删除成功',
            result: {res}
        };
    }

    async updateRecord(ctx){
        const body= ctx.request.body;
        const res = await updateRecordById(body.id,body);
        ctx.body = {
            code: 200,
            message: '更新成功',
            result: res
        };
    }

    async getRecordsByUserId(ctx){
        const userId = ctx.userId;
        console.log( "用户id"+userId)
        const res = await getRecordsByUserId(userId);
        ctx.body = {
            code: 200,
            message: '获取用户记录成功',
            result: res
        };
    }

    async getRecordById(ctx){
        const {id}=ctx.request.body;
const res=await getRecordById(id);
ctx.body = {
            code: 200,
            message: '查询单条数据成功',
            result: res
        };
    }

    async deleteAll(ctx){
        const userId = ctx.userId
        const res = await deleteAllRecordsByUserId(userId);
        ctx.body = {
            code: 200,
            message: '清空记录成功',
            result: res
        };
    }
}


module.exports=new RecordController();