angular
    .module('app')
    .service('LocalStorageService', [
        function ($http) {
            var service = {};
            var localStorage = window.localStorage;
            var userList = [];

            function guidGenerator() {
                var S4 = function () {
                    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
                };
                return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
            }

            service.getUserList = function (body) {
                return JSON.parse(localStorage.getItem('userList'));
            };

            service.authenticate = function (body) {
                if (userList = localStorage.getItem('userList')) {
                    var user = JSON.parse(userList).filter(function (x) {
                        return x.email === body.email && x.password === body.password;
                    });
                    if(user.length === 1) {
                        localStorage.setItem('SESSION', JSON.stringify(user[0]));
                        return true;
                    }
                    else {
                        return false;
                    }
                } else {
                    return false;
                }
            };

            service.getSession = function() {
                return JSON.parse(localStorage.getItem('SESSION'))
            }

            service.createUser = function (body) {
                var userList = [];
                body._id = guidGenerator();
                if (userList = localStorage.getItem('userList')) {
                    userList = JSON.parse(userList);
                    userList.push(body);
                } else {
                    userList = [];
                    userList.push(body);
                }
                localStorage.setItem('userList', JSON.stringify(userList));
            };

            service.getProjectList = function() {
                return localStorage.getItem('projectList');
            }

            service.saveProjectList = function(body) {
                return localStorage.setItem('projectList', JSON.stringify(body));
            }

            service.addProject = function(body) {
                var projectList = [];
                body._id = guidGenerator();
                body.posted = Date.now();
                if(projectList = JSON.parse(localStorage.getItem('projectList'))) {
                    projectList.push(body);
                    localStorage.setItem('projectList', JSON.stringify(projectList));
                }
                else {
                    localStorage.setItem('projectList', JSON.stringify([body]));
                }
            }

            return service;
        }
    ]);