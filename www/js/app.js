angular.module('starter', ['ionic','starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true)
      cordova.plugins.Keyboard.disableScroll(true)
    }
    if(window.StatusBar) {
      StatusBar.styleDefault()
    }
  })
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

    .state('app.toRead', {
      url: '/toRead',
        views: {
          'menuContent': {
            templateUrl: 'templates/toRead.html',
            controller: 'ListCtrl'
        }
        }
      })

      .state('app.form', {
      url: '/form/{id}',
      params: {
        id: {value: null},
      },
      views: {
        'menuContent': {
      templateUrl: 'templates/form.html',
      controller: 'FormCtrl',
      }
      }
    })
    .state('app.Reading', {
    url: '/Reading',
    views: {
      'menuContent': {
        templateUrl: 'templates/Reading.html',
        controller: 'ListCtrl2'
      }
    }
  })
  .state('app.form2', {
      url: '/form2/{id}',
      params: {
        id: {value: null},
      },
      views: {
        'menuContent': {
      templateUrl: 'templates/form2.html',
      controller: 'FormCtrl2',
      }
      }
    })


  $urlRouterProvider.otherwise('/app/toRead')
})
