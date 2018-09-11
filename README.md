# js-performance
js性能采集，perform api测试，收集浏览器加载性能信息，错误信息收集，以及使用node中间件 source-map对压缩后的代码进行错误解析

### Performance Timeline
性能时间线

getEntries()     返回一个列表，该列表包含一些用于承载各种性能数据的对象，不做过滤
getEntriesByType  返回一个列表，该列表包含一些用于承载各种性能数据的对象，按类型过滤
getEntriesByName 返回一个列表，该列表包含一些用于承载各种性能数据的对象，按名称过滤


### PerformanceEntryList
    返回的列表对象，列表中的对象叫做PerformanceEntry
    不同方法的过滤条件不同，所以列表中的PerformEntry对象包含的数据页不同

### PerformanceEntry
    name PerformanceEntry对象的标识符，不唯一
    entryType 通过该属性可以得到PerformanceEntry对象的类型
    startTime 开始的时间戳
    duration 持续时间

### performance.getEntries()
    PerfromanceNavigationTiming   performance.getEntriesByType('navigation')
        用来获取domContentLoad的时间
    PerformanceResourceTiming
    PerformancePaintTiming
### PerformanceObserver
    用来观察“性能时间线”记录新的性能信息，当一个新的性能信息被记录时，观察者会收到通知。
    回调接收两个参数：第一个参数是一个列表，第二个参数是观察者实例
    const observer = new PerformanceObserver(function(list){
        //当记录一个新的性能指标执行
    })

    //注册
    observer.observe({entryTypes:['longtask']})
    “长任务”观察器，它的功能是每当有超过50毫秒的任务被执行时调用回调函数。

    PerformanceLongTaskTiming

### 资源加载性能 PerformanceResourceTiming
    获取资源加载的相关信息，initiatorType为img,css,script,xmlhttprequest，fetch, link,iframe, other

    

    const resourceList = window.performance.getEntriesByType('resource')

    ----------------------------------------
    name     请求资源的绝对地址，重定向也不会改变该值
    entryType   resource
    startTime   用户代理开始排队获取资源的时间，如果重定向，与redirectStart相同，否则与                  fetchStart相同
    duration    返回responseEnd与startTime之间的时间
    initialtorType 发起资源的类型
    ---------------------------------------------
    过程模型

    Redirect   AppCache   DNS  TCP Request  Response


### 记录页面加载性能
    获取navigation对应的数据，获取相关数据
    const [entry] = performance.getEntriesByType('navigation')
    console.log('page loading time: ' + entry.duration)

unloadEventStart	如果被请求的页面来自于前一个同源（同源策略）的文档，那么该属性存储的值是浏览器开始卸载前一个文档的时刻。否则的话（前一个文档非同源或者没有前一个文档）为0
unloadEventEnd	前一个文档卸载完成的时刻。如果前一个文档不存在则为0
domInteractive	指文档完成解析的时间，包括在“传统模式”下被阻塞的通过script标签加载的内容（使用defer或者async属性异步加载的情况除外）
domContentLoadedEventStart	DOMContentLoaded事件触发前的时间
domContentLoadedEventEnd	DOMContentLoaded事件触发后的时间
domComplete	用户代理将将document.readyState设置为complete的时间
loadEventStart	load事件被触发前的时间，如果load事件还没触发则返回0
loadEventEnd	load事件完成后的时间，如果load事件还没触发则返回0
redirectCount	页面被重定向的次数
type	页面被载入的方式


--------------------------------------------
end: 学习地址 https://mp.weixin.qq.com/s?__biz=MzA5NzkwNDk3MQ==&mid=2650588047&idx=1&sn=eed8f5411e9e3903a490384e7b0228b7&chksm=8891d3abbfe65abdfbc32112569d2bf377fe615e7cede6e34bb6afec95396a00ed42f4ddf9fc&mpshare=1&scene=1&srcid=0908PnCCe1zqKLfmkRqeCOyb&pass_ticket=vk0uNXeynic4ASeIY5GMmWKvVxbhkvr19ElxaOqZHmAY%2B21gUBfMJ1GTE%2BceU7m7#rd



### 错误捕获
try-catch                  window.onerror          Vue.config.errorHandler         Error Boundary

            否                            source-map压缩              是


            上传服务器                                              node中间层解析  服务器解析

https://github.com/luozhihao/error-catch-report/blob/master/server/route.js

------------------------------------------------------------------------------
9.11 
    新增app跨域支持   
    前端请求更改为cors
    新增production环境，进行代码压缩
    node 6.10.2版本，不支持webAssembly,切换到8.9可以
    开发环境增加配置，进行代码压缩
       optimaization:{
           minimizer:[
               new UglifyJsPlugin()
           ]
       } 
    