/**
 * @用途 app 主程序入口
 * @作者 xierenhong
 * @时间 2014/12/16
 */
'use strict';
define(['ng-ionic', 'controllers/controllers', 'directives/directives', 'services/services', 'ng-localStorage'], function () {
    var app = angular.module('hwApp', ['ionic', 'app.controllers', 'app.directives', 'app.services', 'LocalStorageModule']);
    //手动绑定ng 模块
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['hwApp']);
    });
    return app;
});