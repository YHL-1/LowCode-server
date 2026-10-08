const Record=require('../model/record');

class RecordService{
    async createRecord(result){
        const res=await Record.create(result);
        return res.dataValues;
    }

    async deleteRecordById(id){
        const res=await Record.destroy({where:{id}})
        return res.dataValues
    }

    // 根据记录ID查询
    async updateRecordById(id,result) {
        const res = await Record.update({title:result.title,result:result.result},{where:{id:id}});
        return res ? res.dataValues : null;
    }

    // 根据用户ID查询所有记录
    async getRecordsByUserId(UserId) {
        const res = await Record.findAll({
            where: { UserId }
        });
        return res;
    }

    async getRecordById(id){
        const res=await Record.findByPk(id)
        return res?res.dataValues:null;
    }

    async deleteAllRecordsByUserId(UserId) {
        const res = await Record.destroy({
            where: { UserId }
        });
        return res;
    }
}

module.exports=new RecordService();