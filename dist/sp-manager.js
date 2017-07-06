(function() {
	'use strict';


/**
 * Provides a means of attaching animations only if user 'Is Flashy'
 * Meaning only if they navigate to a certain page by way of a specific button
 */

angular
    .module('sp-manager', [
        'sp-manager.root',
        'sp-manager.guid'
    ]);

angular
    .module('sp-manager.guid', [])
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

            return {
                createGuid: createGuid,
                clearGuid: clearGuid
            }
        }];

    });


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
}());