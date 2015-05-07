/**
 * @用途 路由配置
 * @作者 xierenhong
 * @时间 2014/12/16
 */
define(["app"], function (app) {
    //全局设置

    app.config(["$stateProvider", "$urlRouterProvider", "$httpProvider", function ($stateProvider, $urlRouterProvider, $httpProvider) {
        //修改post 传输格式
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript, */*; q=0.01';
        $httpProvider.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $httpProvider.defaults.timeout = 5000;

        /**
         * 重写angular的param方法，使angular使用jquery一样的数据序列化方式  The workhorse; converts an object to x-www-form-urlencoded serialization.
         * @param {Object} obj
         * @return {String}
         */
        var param = function (obj) {
            var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
            for (name in obj) {
                value = obj[name];

                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if (value !== undefined && value !== null)
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
            }
            return query.length ? query.substr(0, query.length - 1) : query;
        };

        // Override $http service's default transformRequest
        $httpProvider.defaults.transformRequest = [function (data) {
            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        }];

        //路由配置
        $stateProvider
            .state('login', {
                url: "/login?redirect_url",
                templateUrl: "views/user/login.html",
                controller: "LoginCtrl"
            })
            //测试表单
            .state('select', {
                url: "/card/select",
                templateUrl: "views/card/select.html",
                controller: 'SelectCtrl'
            })
            //测试表单2
            .state('list', {
                url: "/card/list",
                templateUrl: "views/card/list.html",
                controller: 'SearchCustomerCtrl'
            })
            //测试表单3
            .state('form', {
                url: "/from",
                templateUrl: "views/from.html"
            });
        //没有匹配到就默认指向
        $urlRouterProvider.otherwise('/card/contact');
        //设置ajax 请求拦截器
        $httpProvider.interceptors.push('authInterceptorService');
    }]);

    //在injector创建完成后执行
    app.run(["localStorageService", "$location", function (localStorageService, $location) {
        //如果页面是刚刚进入令牌页面则不跳转至登录页面
        if ($location.path() === "/auth") {
            var searchObj = $location.search();
            if (searchObj.token) {
                return;
            }
        }
        if ($location.path() === "/loginGo") {
            return;
        }
        var authorizationData = localStorageService.get("authorizationData");
        if (authorizationData) {
            //如果登录过期则跳转到登录页面
            if (Date.parse(authorizationData.expirationTime) > new Date()) {
                return;
            }
        }
        //$location.url('/loginGo?redirect_url=' + escape($location.url()));
    }]);
});