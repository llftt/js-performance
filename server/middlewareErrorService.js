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
    let error = req.body;
     console.log(`stack: ${JSON.stringify(error)}`);
    let url = error.scriptURI;
    if(url){
        let fileUrl= url.slice(url.lastIndexOf('/')+1)+'.map';
        let file = resolve('../dist/'+fileUrl);
        console.log(`map file is ${file}, line is ${error.lineNo}, column:${error.columnNo}`)
        let sourceMapConsumer = new sourceMap.SourceMapConsumer(fs.readFileSync(file, 'utf8'));
        sourceMapConsumer.then((result) => {
            var ret = result.originalPositionFor({
                line:error.lineNo,
                column:error.columnNo
            });
            
            ret = Object.assign({}, ret, {errorMessage:error.errorMessage,stack:error.stack})
            res.json(ret);
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
        }).catch(err => {
            console.log(err);
        });
    }
});

module.exports = router;