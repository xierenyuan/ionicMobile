/**
 * @用途
 * @作者 谢仁洪
 * @时间 2014/11/28
 */
'use strict';
define(['ng'], function () {
    //注册$resource服务使得用短短的几行代码就可以创建一个RESTful客户端。我们的应用使用这个客户端来代替底层的$http服务。 这里因为后台的原因没有使用REST
    return angular.module('app.services', []);
});
