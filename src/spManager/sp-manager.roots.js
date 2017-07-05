angular
    .module('sp-manager.roots', [])
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