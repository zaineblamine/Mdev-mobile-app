angular.module('starter', ['ionic','ionic-datepicker','starter.controllers', 'starter.services'])

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
      .state('app.add', {
        url: '/add',
          views: {
            'menuContent': {
              templateUrl: 'templates/add.html',
              controller: 'AddCtrl'
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
  .state('app.Read', {
  url: '/Read',
  views: {
    'menuContent': {
      templateUrl: 'templates/read.html',
      //controller: 'ListCtrl3'
    }
  }
})
/*  .state('app.form2', {
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
    })*/


  $urlRouterProvider.otherwise('/app/add')
})
.config(function (ionicDatePickerProvider) {
    var datePickerObj = {
      inputDate: new Date(),
      titleLabel: 'Select a Date',
      setLabel: 'Set',
      todayLabel: 'Today',
      closeLabel: 'Close',
      mondayFirst: false,
      weeksList: ["S", "M", "T", "W", "T", "F", "S"],
      monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      templateType: 'popup',
      from: new Date(2012, 8, 1),
      to: new Date(2018, 8, 1),
      showTodayButton: true,
      dateFormat: 'dd MMMM yyyy',
      closeOnSelect: false,
      disableWeekdays:[]
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);
  })
