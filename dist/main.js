/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/test.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var { prefix, prefixStart, prefixEnd } = __webpack_require__(/*! ./utils.js */ "./src/utils.js");


const selfMeasure = (fn, name = fn.name) => {
    const mark_start = Date.now();
    fn();
    const duration = Date.now() - mark_start;
    return duration;
}

// 时间不受系统影响，时间精确
const selfMeasureV1 = (fn, name = fn.name) => {
        const mark_start = performance.now();
        fn();
        const duration = performance.now() - mark_start;
        return duration;
    }
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
const measureV1 = (fn, name = fn.name) => {
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
    const { start = 0, end = 0 } = entries.reduce((last, { name, startTime }) => {
        if (/^start/.test(name)) {
            last.start = startTime
        } else if (/^end/.test(name)) {
            last.end = startTime
        }
        return last
    }, {})
    console.log(`start:${start}, end:${end}`)
    return end - start;
}

const retriveResultV1 = key => getDurationV1(getMarks(key));
//----opt--v
const measure = (fn, name = fn.name) => {
    const startName = prefixStart(name);
    const endName = prefixEnd(name);
    performance.mark(startName);
    fn();
    performance.mark(endName);
    //调用measure，简化时间计算
    performance.measure(name, startName, endName);
}


const getDuration = entries => {
    //直接获取duration, entries对应数组 [PerformanceMeasure对象] {duration:, entryType:'measure', name:'foo', startTime:}
    console.log(entries);
    const [{ duration }] = entries;
    return duration;
}

const retriveResult = key => getDuration(performance.getEntriesByName(key));


//异步函数
const asyncMeasure = async(fn, name = fn.name) => {
    const startName = prefixStart(name);
    const endName = prefixEnd(name);
    performance.mark(startName);
    await fn();
    performance.mark(endName);
    //调用measure
    performance.measure(name, startName, endName);
}


//获取首屏数据
//首次绘制(first paint)不保罗默认背景绘制,但是包含非默认的背景绘制和iframe
const measureFirstPaint = () => {
    performance.getEntriesByType('paint')
}

const observer = new PerformanceObserver(function(list) {

    const perfEntries = list.getEntries()

    for (let i = 0; i < perfEntries.length; i++) {
        // 处理数据
        // 上报性能检测数据
        console.log("xxx");
    }

})

// 注册绘制观察者
observer.observe({ entryTypes: ["paint"] })

module.exports = { measure: measureV1, retriveResult: retriveResultV1 };

/***/ }),

/***/ "./src/optindex.js":
/*!*************************!*\
  !*** ./src/optindex.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

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

const getMeasure = () => {
    const observer = new PerformanceObserver(list => {
        list.getEntries().forEach(({ name, duration }) => {
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

module.exports = { getMeasure };

/***/ }),

/***/ "./src/test.js":
/*!*********************!*\
  !*** ./src/test.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var {measure, retriveResult} =  __webpack_require__(/*! ./index.js */ "./src/index.js");

var {getMeasure} = __webpack_require__(/*! ./optindex.js */ "./src/optindex.js");

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
if(observer){
    setTimeout(()=>{
        observer.disconnect();
    }, 10000)
}

measure(foo);
//--------------use optmeasure---------------------

const duration = retriveResult('foo');
console.log(`foo execute duration:${duration}`); //complex 0.19999999858555384, easy 0.09999999747378752,测试精确度不同

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

const prefix = fix => input => `${fix}${input}`;
const prefixStart = prefix('start');
const prefixEnd = prefix('end');

module.exports =  {prefix, prefixStart, prefixEnd};

/***/ })

/******/ });
//# sourceMappingURL=main.js.map