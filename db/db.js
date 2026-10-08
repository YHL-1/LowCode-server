const {Sequelize}=require('sequelize');

const seq=new Sequelize('lowcode','root','1234',{
    host:'localhost',
    dialect:'mysql',
});

seq.authenticate().then(()=>{
    console.log('Database connection successful');
}).catch(err=>{
    console.error('Unable to connect to the database:',err);
});

module.exports=seq;