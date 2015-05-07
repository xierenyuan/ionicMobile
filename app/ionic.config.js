/**
 * @用途 ionic 框架的配置
 * @作者 xierenhong
 * @时间 2015/1/12
 */
define(["app"], function (app) {
    app.config(["$ionicConfigProvider", function ($ionicConfigProvider) {
        $ionicConfigProvider.views.maxCache(5);
        $ionicConfigProvider.platform.android.views.maxCache(5);
        //默认的动画过渡平台
        $ionicConfigProvider.views.transition('ios');
        //tab 标签的位置
        $ionicConfigProvider.tabs.position('bottom');
        //navBar 显示的位置
        $ionicConfigProvider.navBar.alignTitle('center');
    }]);
});