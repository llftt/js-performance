var {measure, retriveResult} =  require('./index.js');

var {getMeasure} = require('./optindex.js');

//错误监控
require('./InspectorService.js')

function foo(){
    for(var i = 0; i < 1000; i++){}
}

//--------------use optmeasure---------------------

//项目入口文件的顶部
let observer;
if(window.PerformanceObserver){
    console.log('Observer');
    observer = getMeasure();
}

//某个时机，释放监测

measure(foo);


//--------------use optmeasure---------------------

// const duration = retriveResult('foo');
// console.log(`foo execute duration:${duration}`); //complex 0.19999999858555384, easy 0.09999999747378752,测试精确度不同

throw Error("custom error")