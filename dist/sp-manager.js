(function() {
	'use strict';
/** File Created On: Monday, July 24, 2017, 4:14:52 PM EDT */

angular
    .module('sp-manager', [
        'sp-manager.root',
        'sp-manager.security',
        'sp-manager.sessionManager',
        'sp-manager.userRoles',
        'sp-manager.spClock'
    ]);


angular
    .module('sp-manager.root', [])
    .provider('FlashManager', function () {

        this.$get = ['$rootScope', function ($rootScope) {


            $rootScope.isFlashy = false;

            function flashify() {
                $rootScope.isFlashy = true;
                var store = 'true';
                localStorage.setItem('flash', store);
            }

            function unFlashify() {
                $rootScope.isFlashy = false;
                localStorage.removeItem('flash');
            }

            function checkOnRefresh() {
                $rootScope.$on('$viewContentLoaded', function() {
                    if (localStorage.getItem('flash') === 'true') {
                        flashify();
                    }
                })
            }

            return {
                flashify: flashify,
                unFlashify: unFlashify,
                checkOnRefresh: checkOnRefresh
            }
        }];
    });


angular
    .module('sp-manager.security', [])
    .provider('SecHelper', function () {

        this.$get = ['$rootScope', function ($rootScope) {

            $rootScope.GUID = localStorage.getItem('guid');

            function clearGuid() {
                localStorage.removeItem('guid')
            }

            function createGuid() {
                function guid() {
                    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                        s4() + '-' + s4() + s4() + s4();
                }

                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                }
                var Guid = guid();
                console.log(Guid);
                localStorage.setItem('guid', Guid);
                return Guid;
            }

            function random(length) {
                var text = '';
                var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                var password = sessionStorage.getItem('pwd');
                length = 20;
                for (var i = 0; i < length; i++) {
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                    sessionStorage.setItem('pwdToken', text);
                    if (sessionStorage.getItem('pwdToken') != null) {
                        var genHash = (password + sessionStorage.getItem('pwdToken')).replace(/=/, '');
                        sessionStorage.setItem('passHash', genHash);
                        console.log(genHash);
                    }
                }
                return text;
            }

            return {
                createGuid: createGuid,
                clearGuid: clearGuid,
                random: random
            }
        }];

    });


angular
    .module('sp-manager.sessionManager', [])
    .provider('SessionManager', function() {

        this.$get = ['$rootScope', function($rootScope) {

            function getSessionData(currentUser, currentUserRole) {
                currentUser = $rootScope.currentUser = sessionStorage.getItem('current-user-username');
                currentUserRole = $rootScope.currentUserRole = sessionStorage.getItem('current-user-role');
                $rootScope.isFlashy = true;
                var user = (currentUser + ' : ' + currentUserRole).toString();
                localStorage.setItem('flash', user);
            }

            function unFlashify() {
                $rootScope.isFlashy = false;
                localStorage.removeItem('flash');
            }

            function checkOnRefresh() {
                $rootScope.$on('$viewContentLoaded', function() {
                    if (localStorage.getItem('flash') === 'true') {
                        flashify();
                    }
                })
            }

            return {
                getSessionData: getSessionData,
                unFlashify: unFlashify,
                checkOnRefresh: checkOnRefresh
            }
        }];
    });


angular
    .module('sp-manager.spClock', [])
    .provider('ClockManager', function () {
        this.$get = ['$rootScope', function ($rootScope) {

            $rootScope.showClock = true;

            function getClock() {
                window.onload = function () {
                    printTime();
                };
                function printTime() {
                    var d = new Date();
                    var hours = d.getHours();
                    var mins = d.getMinutes();
                    var secs = d.getSeconds();
                    var day = d.getDay();
                    var month = d.getMonth();
                    var options = {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    };
                    var date = new Date().toLocaleString('en-US', options);
                    switch (day) {
                        case 0:
                            day = "Sunday";
                            break;
                        case 1:
                            day = "Monday";
                            break;
                        case 2:
                            day = "Tuesday";
                            break;
                        case 3:
                            day = "Wednesday";
                            break;
                        case 4:
                            day = "Thursday";
                            break;
                        case 5:
                            day = "Friday";
                            break;
                        case 6:
                            day = "Saturday";
                            break;
                    }
                    if (hours < 10) {
                        hours = "0" + hours;
                    }
                    if (mins < 10) {
                        mins = "0" + mins;
                    }
                    if (secs < 10) {
                        secs = "0" + secs;
                    }
                    month = month + 1;
                    document.getElementById("spNumbers").innerHTML = hours + ":" + mins + ":" + secs;
                    document.getElementById("spDate").innerHTML = date;
                }

                setInterval(printTime, 1000);
            }

            return {
                getClock: getClock
            }
        }];
    });


angular
    .module('sp-manager.userRoles', [])
    .provider('RolesManager', function() {

        this.$get = ['$rootScope', function($rootScope) {

            $rootScope.isRegistered = false;

            /** Role to be created at login. Default role will be user, or guest if the don't register. In order to be
             * an admin user it must be set by the page owner/super user. i.e. ME */
            $rootScope.userRoles = [
                { Id: 1, RoleId: 1, Role: 'Guest' },
                { Id: 2, RoleId: 2, Role: 'User' },
                { Id: 3, RoleId: 3, Role: 'Admin' },
                { Id: 4, RoleId: 4, Role: 'SuperUser' }
            ];

            function assignRole(defaultRole) {
                defaultRole = $rootScope.userRoles[1];
                $rootScope.isRegistered = true;
                localStorage.setItem('role', defaultRole);
            }

            /** Removing role flag will be handled at logout */
            function stripRole () {
                localStorage.removeItem('role')
            }

            function checkOnRefresh() {
                $rootScope.$on('$viewContentLoaded', function() {
                    if (localStorage.getItem('flash') === 'true') {
                        flashify();
                    }
                })
            }

            return {
                assignRole: assignRole,
                stripRole: stripRole,
                checkOnRefresh: checkOnRefresh
            }
        }];
    });
}());