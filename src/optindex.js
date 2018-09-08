/**
 * NOTE:
 *         mark                                       measure
 * 作用   运行某个操作时，记录一个时间戳                  针对起始+结束的mark值，汇总形成一个直接可用的性能数据
 * 不足   对于一个操作，需要两个时间戳才能计算出性能耗时     想要测量多个操作时，需要重复调用
 * 进阶版
 **/
 

 /**使用PerformanceObserver接口，解决以下问题
  *1，每次查看数据时，要主动调用接口
    2. 当获取不同类型的数据指标时，产生重复逻辑
    3.其他资源需要同时操作 performance buffer时，产生资源竞争情况

  */

const getMeasure = ()=>{
    const observer = new PerformanceObserver(list =>{
        list.getEntries().forEach(({name, duration}) => {
            console.log(`name is ${name}, duration is ${duration}`);
            //操作数据逻辑
        });
    });

    //只需要关注 measure 的数据
   observer.observe({
        entryTypes: ['measure'],
        buffered: true
  })
return observer;
}

module.exports = {getMeasure};
