require("./SpinalServerStatusService");
require("./ServerStatusCtrl");
(function () {
  angular.module('app.spinal-pannel')
    .run(["$templateCache", "$http", "goldenLayoutService",
      function ($templateCache, $http, goldenLayoutService) {
        let load_template = (uri, name) => {
          $http.get(uri).then((response) => {
            $templateCache.put(name, response.data);
          }, (errorResponse) => {
            console.log('Cannot load the file ' + uri);
          });
        };
        let toload = [{
          uri: '../templates/spinal-env-admin-pannel-hub-status/hub-status-pannel.html',
          name: 'hub-status-pannel.html'
        }];
        for (var i = 0; i < toload.length; i++) {
          load_template(toload[i].uri, toload[i].name);
        }

        goldenLayoutService.registerPannel({
          id: "drag-hub-status-pannel",
          name: "SpinalHub Status",
          cfg: {
            isClosable: true,
            title: "SpinalHub Status",
            type: 'component',
            width: 20,
            componentName: 'SpinalHome',
            componentState: {
              template: 'hub-status-pannel.html',
              module: 'app.spinal-pannel',
              controller: 'ServerStatusCtrl'
            }
          }
        });
      }
    ]);

})();