
var {prefix, prefixStart, prefixEnd} = require('./utils.js');

/**
 * 测量某个函数的执行时间
 * @param {*} fn 
 * @param {*} name 
 * 
 * performance.mark
 * 1.创建一个新的PerformanceMark对象
 * 2.将name属性设置为markName
 * 3.将entryType属性设置为mark
 * 4.将startTime属性设置为performance.now
 * 5.将duration属性设置为0
 * 6.将mark对象放入队列中
 * 7.将mark对象放入performance entry buffer中
 * 8.返回undefined
 */
const measureV1 = (fn, name = fn.name) =>{
    performance.mark(prefixStart(name));
    fn();
    performance.mark(prefixEnd(name));
}


const getMarks = key => {
  return performance
    .getEntriesByType('mark') // 只获取通过 performance.mark 记录的数据
    .filter(({ name }) => name === prefixStart(key) || name === prefixEnd(key))
}

const getDurationV1 = entries => {
    //[PerformanceMark, PerformanceMark] {name:startxx, entryType:'mark', startTime:, duration} {name:endxx, entryType}
    console.log(entries);
    const {start = 0, end = 0} = entries.reduce((last, { name, startTime }) => {
    if (/^start/.test(name)) {
      last.start = startTime
    } else if (/^end/.test(name)) {
      last.end = startTime
    }
    return last
  },{})
  console.log(`start:${start}, end:${end}`)
  return end - start;
}

const retriveResultV1 = key => getDurationV1(getMarks(key));
//----opt--v
const measure = (fn, name = fn.name) =>{
    const startName = prefixStart(name);
    const endName = prefixEnd(name);
    performance.mark(startName);
    fn();
    performance.mark(endName);
    //调用measure，简化时间计算
    performance.measure(name, startName, endName);
}


const getDuration = entries =>{
    //直接获取duration, entries对应数组 [PerformanceMeasure对象] {duration:, entryType:'measure', name:'foo', startTime:}
    console.log(entries);
    const [{duration}] = entries;
    return duration;
}

const retriveResult = key => getDuration(performance.getEntriesByName(key));


//异步函数
const asyncMeasure = async (fn, name = fn.name) =>{
    const startName = prefixStart(name);
    const endName = prefixEnd(name);
    performance.mark(startName);
    await fn();
    performance.mark(endName);
    //调用measure
    performance.measure(name, startName, endName);
}


module.exports =  {measure:measureV1, retriveResult:retriveResultV1};