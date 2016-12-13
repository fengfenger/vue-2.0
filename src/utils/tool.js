// url 的配置
var Config = require('config');
var env = Config.env[Config.scheme];


// 获取url地址栏中的参数
var getQueryString = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}


// 判断数据类型
var Type = function() {
    var Type = {};
    for (var i = 0, type; type = ['String', 'Array', 'Number'][i++];) {
        (function(type) {
            Type['is' + type] = function(obj) {
                return Object.prototype.toString.call(obj) === '[object ' + type + ']';
            }
        })(type)
    }
    return Type;
}


//获取滚动条当前的位置
var getScrollTop = function() {
    var scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;
}


//获取当前可视范围的高度
var getClientHeight = function() {
    var clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
    } else {
        clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
    }
    return clientHeight;
}

//获取文档完整的高度
var getScrollHeight = function() {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}


// 判断http的状态值 返回对用的错误信息
var errorHttpMsg = function(response) {
    // 根据状态返回不同的信息提示
    console.log(response);
};


// 处理url地址
var processUrl = function(url) {
    return env.url_prefix + url;
}

var processUrl2 = function(url) {
    return env.url_prefix2 + url;
}


// 判断是安卓还是iOS的设备
var checkMobileBrowse = function() {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
        return 'isAndroid'
    } else if (isiOS) {
        return 'isiOS'
    } else {
        return '其他'
    }
}


// 获取token
var getToken = function(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
    } else {
        return null;
    }
}


//判断访问终端
var browser = {
    versions: function() {
        var u = navigator.userAgent,
            app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1, //是否微信
            qq: u.match(/\sQQ/i) == " qq" //是否QQ
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}


var eventUtil = {
    addHandler: function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },

    getEvent: function(event) {
        return event ? event : window.event;
    },

    getTarget: function(event) {
        return event.target || event.srcElement;
    },

    getPageX: function(event) {
        var result = event.pageX,
            doc = document;
        if (!result && result !== 0) {
            result = (event.clientX || 0) +
                (doc.documentElement.scrollLeft ||
                    doc.body.scrollLeft);
        }
        return result;
    },

    getPageY: function(event) {
        var result = event.pageY,
            doc = document;
        if (!result && result !== 0) {
            result = (event.clientY || 0) +
                (doc.documentElement.scrollTop ||
                    doc.body.scrollTop);
        }
        return result;
    },


    removeHandler: function(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    }

};


// 获取元素子节点个数
var getChildNodes=function(ele){
   var childArr=ele.children || ele.childNodes,
         childArrTem=new Array();  //  临时数组，用来存储符合条件的节点
    for(var i=0,len=childArr.length;i<len;i++){
        if(childArr[i].nodeType==1){
            childArrTem.push(childArr[i]);
        }
    }
    return childArrTem;
}

// 获取rem的值
var getRemVal = function(val){
    return (val/2/37.5);
}

// 阻止事件冒泡
var stopPropagation = function (e) {
    e = e || window.event;
    if(e.stopPropagation) { //W3C阻止冒泡方法
        e.stopPropagation();
    } else {
        e.cancelBubble = true; //IE阻止冒泡方法
    }
}

var hasClass = function (elem, cls){
    cls = cls || '';
    if(cls.replace(/\s/g, '').length == 0) return false;
    return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
}

var addClass = function (elem, cls){
    if(!hasClass(elem, cls)){
        elem.className += ' ' + cls;
    }
}

var removeClass = function (elem, cls){
    if(hasClass(elem, cls)){
        var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' ';
        while(newClass.indexOf(' ' + cls + ' ') >= 0){
            newClass = newClass.replace(' ' + cls + ' ', ' ');
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
    }
}

var isEmptyObject = function(obj) {
    var name
    for (name in obj) return false
    return true
}

module.exports = {
    getQueryString,
    Type,
    getScrollTop,
    getClientHeight,
    getScrollHeight,
    errorHttpMsg,
    processUrl,
    processUrl2,
    checkMobileBrowse,
    browser,
    getToken,
    eventUtil,
    getChildNodes,
    getRemVal,
    hasClass,
    addClass,
    removeClass,
    stopPropagation,
    isEmptyObject
}
