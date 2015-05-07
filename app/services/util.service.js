/**
 * @用途 工具服务
 * @作者 xierenhong
 * @时间 2015/4/13
 */
define(["services/services", 'zepto'], function (services, zepto) {
    //工具方法
    services.factory('Util', ['$ionicPopup', function ($ionicPopup) {
        return {
            /**
             * 字符串扩展
             * 使用方式var a = "I Love {0}, and You Love {1},Where are {0}! {4}";
             * alert(Util.format(a, "You", "Me"));
             */
            format: function () {
                if (arguments.length == 0)
                    return null;
                var str = arguments[0];
                for (var i = 1; i < arguments.length; i++) {
                    var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
                    str = str.replace(re, arguments[i]);
                }
                return str;
            },
            /**
             * 弹出框
             * Util.alert("测试",fn);
             * @params {string} content 消息内容
             * @params {Function} fn 点击确定后执行的回调函数
             */
            alert: function (content, fn) {
                $ionicPopup.alert({
                    title: '消息提示',
                    template: content,
                    okText: '确定'
                }).then(fn);
            },
            /**
             * 确认框
             * Util.alert("删除提示",'你确定要删除吗?',fn);
             * @params {string} content 消息内容
             * @params {Function} fn 点击确定后执行的回调函数
             */
            confirm: function (title, content, fn) {
                var confirmPopup = $ionicPopup.confirm({
                    title: title,
                    template: content,
                    cancelText: '取消',
                    cancelType: 'button-light',
                    okText: '确定'
                });
                confirmPopup.then(fn);
            },
            /**
             * 数组元素删除
             * Util.arrayDel([1,2,4,5],0);
             * @params {Array} array 需要删除的数组
             * @params {string} index 表示第几项，从0开始算起
             */
            arrayDel: function (array, index) {
                return index < 0 ? array : array.slice(0, index).concat(array.slice(index + 1, array.length));
            },
            /**
             * 根据值获取数组下标
             * Util.arrayGetIndex([1,2,4,5],2);
             * @param {Array} array 需要删除的数组
             * @param {string} value 值
             * @return {number} value值所在的元素下标
             */
            arrayGetIndex: function (array, value) {
                for (var i = 0, length = array.length; i < length; i++) {
                    if (array[i] == value) {
                        return i;
                    }
                }
            },
            /**
             * 根据值获取json 数组的下标
             * @param {Object} obj json 数据
             * @param {param} param 参数唯一标示Id
             * @param {string} value 值
             * @return {number} value值所在的元素下标
             */
            JsonGetIndex: function (obj, param, value) {
                for (var i = 0, length = obj.length; i < length; i++) {
                    if (obj[i][param] == value) {
                        return i;
                    }
                }
            },
            /**
             * 根据值获取json 数组的 单条数据
             * @return {null} 获取 单条json 数据
             */
            JsonGetValue: function (obj, param, value) {
                for (var i = 0, length = obj.length; i < length; i++) {
                    if (obj[i][param] == value) {
                        return obj[i];
                    }
                }
                return null;
            },
            /**
             * 修改页面title
             * @param title {string} 需要改变的title 数据
             * @see http://qywx.gitcafe.io/2014/11/14/%E5%BE%AE%E4%BF%A1webview%E4%B8%AD%E7%9A%84%E4%B8%80%E4%BA%9B%E9%97%AE%E9%A2%98/
             */
            setTitle: function (title) {
                var $body = $('body')
                document.title = title;
                //hack在微信等webview中无法修改document.title的情况
                var $iframe = $('<iframe src="/favicon.ico"></iframe>').on('load', function () {
                    setTimeout(function () {
                        $iframe.off('load').remove()
                    }, 0)
                }).appendTo($body)
            }
        }
    }]);
});
