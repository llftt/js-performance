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

eval("\r\nvar {prefix, prefixStart, prefixEnd} = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\r\n\r\n/**\r\n * 测量某个函数的执行时间\r\n * @param {*} fn \r\n * @param {*} name \r\n * \r\n * performance.mark\r\n * 1.创建一个新的PerformanceMark对象\r\n * 2.将name属性设置为markName\r\n * 3.将entryType属性设置为mark\r\n * 4.将startTime属性设置为performance.now\r\n * 5.将duration属性设置为0\r\n * 6.将mark对象放入队列中\r\n * 7.将mark对象放入performance entry buffer中\r\n * 8.返回undefined\r\n */\r\nconst measureV1 = (fn, name = fn.name) =>{\r\n    performance.mark(prefixStart(name));\r\n    fn();\r\n    performance.mark(prefixEnd(name));\r\n}\r\n\r\n\r\nconst getMarks = key => {\r\n  return performance\r\n    .getEntriesByType('mark') // 只获取通过 performance.mark 记录的数据\r\n    .filter(({ name }) => name === prefixStart(key) || name === prefixEnd(key))\r\n}\r\n\r\nconst getDurationV1 = entries => {\r\n    //[PerformanceMark, PerformanceMark] {name:startxx, entryType:'mark', startTime:, duration} {name:endxx, entryType}\r\n    console.log(entries);\r\n    const {start = 0, end = 0} = entries.reduce((last, { name, startTime }) => {\r\n    if (/^start/.test(name)) {\r\n      last.start = startTime\r\n    } else if (/^end/.test(name)) {\r\n      last.end = startTime\r\n    }\r\n    return last\r\n  },{})\r\n  console.log(`start:${start}, end:${end}`)\r\n  return end - start;\r\n}\r\n\r\nconst retriveResultV1 = key => getDurationV1(getMarks(key));\r\n//----opt--v\r\nconst measure = (fn, name = fn.name) =>{\r\n    const startName = prefixStart(name);\r\n    const endName = prefixEnd(name);\r\n    performance.mark(startName);\r\n    fn();\r\n    performance.mark(endName);\r\n    //调用measure，简化时间计算\r\n    performance.measure(name, startName, endName);\r\n}\r\n\r\n\r\nconst getDuration = entries =>{\r\n    //直接获取duration, entries对应数组 [PerformanceMeasure对象] {duration:, entryType:'measure', name:'foo', startTime:}\r\n    console.log(entries);\r\n    const [{duration}] = entries;\r\n    return duration;\r\n}\r\n\r\nconst retriveResult = key => getDuration(performance.getEntriesByName(key));\r\n\r\n\r\n//异步函数\r\nconst asyncMeasure = async (fn, name = fn.name) =>{\r\n    const startName = prefixStart(name);\r\n    const endName = prefixEnd(name);\r\n    performance.mark(startName);\r\n    await fn();\r\n    performance.mark(endName);\r\n    //调用measure\r\n    performance.measure(name, startName, endName);\r\n}\r\n\r\n\r\nmodule.exports =  {measure:measureV1, retriveResult:retriveResultV1};\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/optindex.js":
/*!*************************!*\
  !*** ./src/optindex.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\r\n * NOTE:\r\n *         mark                                       measure\r\n * 作用   运行某个操作时，记录一个时间戳                  针对起始+结束的mark值，汇总形成一个直接可用的性能数据\r\n * 不足   对于一个操作，需要两个时间戳才能计算出性能耗时     想要测量多个操作时，需要重复调用\r\n * 进阶版\r\n **/\r\n \r\n\r\n /**使用PerformanceObserver接口，解决以下问题\r\n  *1，每次查看数据时，要主动调用接口\r\n    2. 当获取不同类型的数据指标时，产生重复逻辑\r\n    3.其他资源需要同时操作 performance buffer时，产生资源竞争情况\r\n\r\n  */\r\n\r\nconst getMeasure = ()=>{\r\n    const observer = new PerformanceObserver(list =>{\r\n        list.getEntries().forEach(({name, duration}) => {\r\n            console.log(`name is ${name}, duration is ${duration}`);\r\n            //操作数据逻辑\r\n        });\r\n    });\r\n\r\n    //只需要关注 measure 的数据\r\n   observer.observe({\r\n        entryTypes: ['measure'],\r\n        buffered: true\r\n  })\r\nreturn observer;\r\n}\r\n\r\nmodule.exports = {getMeasure};\r\n\n\n//# sourceURL=webpack:///./src/optindex.js?");

/***/ }),

/***/ "./src/test.js":
/*!*********************!*\
  !*** ./src/test.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var {measure, retriveResult} =  __webpack_require__(/*! ./index.js */ \"./src/index.js\");\r\n\r\nvar {getMeasure} = __webpack_require__(/*! ./optindex.js */ \"./src/optindex.js\");\r\n\r\nfunction foo(){\r\n    for(var i = 0; i < 1000; i++){}\r\n}\r\n\r\n//--------------use optmeasure---------------------\r\n\r\n//项目入口文件的顶部\r\nlet observer;\r\nif(window.PerformanceObserver){\r\n    console.log('Observer');\r\n    observer = getMeasure();\r\n}\r\n\r\n//某个时机，释放监测\r\nif(observer){\r\n    setTimeout(()=>{\r\n        observer.disconnect();\r\n    }, 10000)\r\n}\r\n\r\nmeasure(foo);\r\n//--------------use optmeasure---------------------\r\n\r\nconst duration = retriveResult('foo');\r\nconsole.log(`foo execute duration:${duration}`); //complex 0.19999999858555384, easy 0.09999999747378752,测试精确度不同\n\n//# sourceURL=webpack:///./src/test.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const prefix = fix => input => `${fix}${input}`;\r\nconst prefixStart = prefix('start');\r\nconst prefixEnd = prefix('end');\r\n\r\nmodule.exports =  {prefix, prefixStart, prefixEnd};\n\n//# sourceURL=webpack:///./src/utils.js?");

/***/ })

/******/ });