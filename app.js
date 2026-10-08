const Koa=require('koa');
const app=new Koa();

const json=require('koa-json');
const logger=require('koa-logger');
const views=require('koa-views');
const nodemailer = require('nodemailer')

const {koaBody}=require('koa-body');
const fs=require('fs');

const index=require('./routes/index');
const users=require('./routes/user');
const records=require('./routes/record')

app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname+'/public'));
app.use(views(__dirname+'/views',{
    extension:'pug'
}));

app.use(async(ctx,next)=>{
    ctx.set('Access-Control-Allow-Origin','*');
    ctx.set('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,OPTIONS');
    ctx.set('Access-Control-Allow-Headers','Content-Type, Authorization');
    if(ctx.method==='OPTIONS'){
        ctx.status=204;
    } else{
        await next();
    }
});

app.use(koaBody({
    multipart:true,
    formidable:{
        maxFileSize:200*1024*1024,
        uploadDir:'public/',
        onFileBegin:(name,file)=>{
            if(!fs.existsSync('upload')) fs.mkdirSync('upload');
            file.path=`upload/${file.name}`;
        }}
}));

app.use(async(ctx,next)=>{
    const start=Date.now();
    await next();
    const ms=Date.now()-start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
}
);



const path=require('path');
const static=require('koa-static');
app.use(static(path.join(__dirname,'./static/')));
app.use(index.routes(),index.allowedMethods());
app.use(users.routes(),users.allowedMethods());
app.use(records.routes(),records.allowedMethods());

app.on('error',(err,ctx)=>{
    console.error('server error',err,ctx);
});

module.exports=app;