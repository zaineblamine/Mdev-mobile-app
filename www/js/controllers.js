angular.module('starter.controllers', [])
.controller('AppCtrl', function($scope, $ionicSideMenuDelegate) {
   $scope.toggleLeftSideMenu = function() {
      $ionicSideMenuDelegate.toggleLeft();
   };
})
  .controller('ListCtrl', function ($scope,$ionicPlatform, $state, NotesDataService) {
    $scope.$on('$ionicView.enter', function(e) {
        NotesDataService.getAll(function(data){
          $scope.itemsList = data
        })
    })

    $scope.gotoEdit = function(idNote){
      $state.go('app.form', {id: idNote})
    }
  })
  .controller('ListCtrl2', function ($scope,$ionicPlatform, $state, NotesDataService) {
    $scope.$on('$ionicView.enter', function(e) {
        NotesDataService.getAll2(function(data){
          $scope.itemsList2 = data
        })
    })

    $scope.gotoEdit = function(idNote){
      $state.go('app.form2', {id: idNote})
    }
  })

  .controller('FormCtrl', function ($scope, $stateParams, $ionicPopup, $state, NotesDataService) {
    $scope.$on('$ionicParentView.enter', function(e) {
      initForm()
    })

    function initForm(){
      if($stateParams.id){
        NotesDataService.getById($stateParams.id, function(item){
          $scope.noteForm = item
        })
      } else {
        $scope.noteForm = {}
      }
    }
    function onSaveSuccess(){
      $state.go('app.toRead')
    }
    $scope.saveNote = function(){

      if(!$scope.noteForm.id){
        NotesDataService.createNote($scope.noteForm).then(onSaveSuccess)
      } else {
        NotesDataService.updateNote($scope.noteForm).then(onSaveSuccess)
      }
    }

    $scope.confirmDelete = function(idNote) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Supprimer une note',
        template: 'êtes vous sûr de vouloir supprimer ?'
      })

      confirmPopup.then(function(res) {
        if(res) {
          NotesDataService.deleteNote(idNote).then(onSaveSuccess)
        }
      })
    }


  })

  .controller('FormCtrl2', function ($scope, $stateParams, $ionicPopup, $state, NotesDataService) {
    $scope.$on('$ionicParentView.enter', function(e) {
      initForm2()
    })

    function initForm2(){
      if($stateParams.id){
        NotesDataService.getById2($stateParams.id, function(item){
          $scope.noteForm2 = item
        })
      } else {
        $scope.noteForm2 = {}
      }
    }
    function onSaveSuccess(){
      $state.go('app.Reading')
    }
    $scope.saveNote2 = function(){

      if(!$scope.noteForm2.id){
        NotesDataService.createNote2($scope.noteForm2).then(onSaveSuccess)
      } else {
        NotesDataService.updateperiod($scope.noteForm2).then(onSaveSuccess)
      }
    }

    $scope.confirmDelete = function(idNote) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Supprimer une note',
        template: 'êtes vous sûr de vouloir supprimer ?'
      })

      confirmPopup.then(function(res) {
        if(res) {
          NotesDataService.deleteNote2(idNote).then(onSaveSuccess)
        }
      })
    }


  })
