const express = require('express');
const fs = require('fs');
const router = express.Router();
const fetch = require('node-fetch');
const sourceMap = require('source-map');
const path = require('path');
const resolve = file => path.resolve(__dirname, file);

var app = new express();
app.listen(3000);
router.post('/errorMsg/', function(req, res){
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers", "accept, content-type");  
    let error = req.body;
    let url = error.scriptURI;
    if(url){
        let fileUrl= url.slice(url.lastIndexOf('/')+1)+'.map';
        let file = resolve('../dist/'+fileUrl);
        console.log(`map file is ${file}`)
        let sourceMapConsumer = new sourceMap.SourceMapConsumer(fs.readFileSync(file, 'utf8'));
        sourceMapConsumer.then((result) => {
            var ret = result.originalPositionFor({
                line:error.lineNo,
                column:error.columnNo
            });
            console.log(`ret: ${ret}`);
            res.json({success:true});
            // let url = '';
            // fetch(url, {
            //     method:'POST',
            //     headers:{
            //         'Content-Type':'application/json'
            //     },
            //     body:JSON.stringify({
            //         errorMessage:error.errorMessage,
            //         source:ret.source,
            //         line:ret.line,
            //         column:ret.column,
            //         stack:error.stack
            //     })
            // }).then(function(response){
            //     return response.json();
            // }).then(function(json){
            //     res.json(json);
            // });
        }).catch((err) => {
            
        });
    }
});

module.exports = router;