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

