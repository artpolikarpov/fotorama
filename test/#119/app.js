'use strict';


angular


    .module('app', [])


    .controller('AppController', function ($scope) {

      var model = $scope.model = {
        items: [
          [
            { img: '1-lo.jpg' },
            { img: '2-lo.jpg' },
          ],
          [
            { img: '3-lo.jpg' },
            { img: '4-lo.jpg' },
          ]
        ],
        index: 0
      };

      var controller = $scope.Controller = {
        change: function () {
          model.index = model.index ? 0 : 1;
          console.log('model', model);
        }
      };

    })


    .directive('ngFotorama', function () {
      return {
        link: function (scope, element, attributes) {
          element.fotorama();

          scope.$watch(attributes.data, function (data) {
            var fotorama = element.data('fotorama');
            fotorama.load(data);
            console.log('fotorama.data', fotorama.data);
          });

        }
      };
    });
    