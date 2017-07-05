/** I left off starting to add my javascript to the src dir.
The majority of what I have has already been added.
Now its time to start writing more for it.
Note Created On: Tuesday, July 4, 2017, 6:04:36 AM EDT */
(function() {
	'use strict';


/**
 * Provides a means of attaching animations only if user 'Is Flashy'
 * Meaning only if they navigate to a certain page by way of a specific button
 */

angular
    .module('sp-manager', [
        'sp-manager.root'
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
}());
