const Router=require('koa-router')
const router = new Router();;
const fs=require('fs');
const archiver=require('archiver');

router.post('/upload',async(ctx)=>{
    const file=ctx.request.files.file;
    ctx.body={
        Type:1,
        IsSuccess:true,
        Message:'文件上传成功',
        path:file.path
    };
});

router.get('/download/:filename',async(ctx)=>{
    const path='fileStorage/dnpath/'+ctx.params.filename;
    ctx.attachment(path);
    await send(ctx,path);
});

router.get('/download/',async(ctx)=>{
    const dir='fileStorage/dnpath';
    const files=fs.readdirSync(dir);
    const target=dir+files[0];
    ctx.attachment(target);
    await send(ctx,target);
})

module.exports=router;