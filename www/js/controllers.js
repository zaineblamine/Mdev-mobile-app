angular.module('starter.controllers', ['ionic-datepicker'])
.controller('AppCtrl', function($scope, $ionicSideMenuDelegate) {
   $scope.toggleLeftSideMenu = function() {
      $ionicSideMenuDelegate.toggleLeft();
   };
})
  .controller('ListCtrl', function ($scope,$ionicPlatform, $state,$stateParams,$ionicPopup, $window,NotesDataService) {
    $scope.$on('$ionicView.enter', function(e) {
        NotesDataService.getAll(function(data){
          $scope.itemsList = data
        })
    })
    $scope.gotoEdit = function(idNote){
      $state.go('app.form', {id: idNote})
    }
    $scope.delete = function() {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Delete All Books',
        template: 'are you sure you want to delete All Books from the list ?'
      })

      confirmPopup.then(function(res) {

        if(res) {
          NotesDataService.deleteNotes().then(onSaveSuccess)
        }
      })
      function onSaveSuccess(){
        $state.go('app.toRead')
        $window.location.reload();
      }
    }
  })
  .controller('ListCtrl2', function ($scope, $ionicPlatform, $stateParams, $state,$ionicPopup,$window, NotesDataService) {
    $scope.$on('$ionicView.enter', function(e) {
        NotesDataService.getAll2(function(data){
          $scope.itemsList2 = data
        })
    })
    $scope.gotoEdit = function(idNote){
      $state.go('app.form', {id: idNote})
    }
    $scope.delete2 = function() {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Delete All Books',
        template: 'are you sure you want to delete All Books from the list ?'
      })

      confirmPopup.then(function(res) {
        if(res) {
          NotesDataService.deleteNotes2().then(onSaveSuccess)
        }
      })
      function onSaveSuccess(){
        $state.go('app.toRead')
        $window.location.reload();
      }
      }
  })

  .controller('FormCtrl', function ($scope, $stateParams, $ionicPopup, $state,$window, NotesDataService, ionicDatePicker) {
//------------------checkbox--------------------------------------------------------------------------------------
  $scope.pushNotificationChange = function() {

    console.log('Push Notification Change', $scope.pushNotification.checked);
  };

  $scope.pushNotification = { checked: false };
  //-------------------------------------------------------------------------------------------------------------------
    $scope.choice = {
  value: '2'
};
$scope.open = function () {
  $ionicPopup.confirm({
    templateUrl: 'orderPopup.html',
    title: 'Type',
    scope: $scope,
    buttons: [{
      text: 'Close',
      type: 'button-calm',
      onTap: function (e) {

        console.log($scope.choice);
        document.getElementById('type1').value=$scope.noteForm.type;
      }
    }]
  });
}
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
      $state.go('app.add')
      $window.location.reload();
    }

    $scope.saveNote = function(){
      var getDate=document.getElementById("date2").value;
      var d0=new Date();
      var startDate=d0.toString().slice(4,15);

      if(!$scope.noteForm.id){
        if(getDate==""){
          NotesDataService.createNote($scope.noteForm).then(onSaveSuccess)
        }
        else{
        $scope.noteForm.started=startDate;
        $scope.noteForm.finished=getDate;
        $scope.noteForm.pages=document.getElementById("pages").value;
        $scope.noteForm.pagesRead=document.getElementById("pagesRead").value;
        NotesDataService.createNote2($scope.noteForm).then(onSaveSuccess)
      }
      }
      else {
        if(getDate==""){
        NotesDataService.updateNote($scope.noteForm).then(onSaveSuccess)
      }
      else{
        $scope.noteForm.started=startDate;
        $scope.noteForm.finished=getDate;
        $scope.noteForm.pages=document.getElementById("pages").value;
        $scope.noteForm.pagesRead=document.getElementById("pagesRead").value;
        NotesDataService.startReading($scope.noteForm).then(onSaveSuccess)
      }
      }


    }

    $scope.confirmDelete = function(idNote) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Delete Book',
        template: 'are you sure you want to delete this book from the list ?'
      })

      confirmPopup.then(function(res) {
        if(res) {
          NotesDataService.deleteNote(idNote).then(onSaveSuccess)
        }
      })
    }

    var d;
    var ipObj1 = {
  callback: function (val) {
    var d0=new Date();
    var d1=new Date(val);
    d = d1.toString().slice(4,15);
    var startDate=d0.toString().slice(4,15);
    console.log('Return value from the datepicker popup is : ' + val, d);
    var x=document.getElementById("date2");
    x.value=  d;
  },
  from: new Date(2012, 1, 1), //Optional
  to: new Date(2016, 10, 30), //Optional
  inputDate: new Date(),      //Optional
  mondayFirst: true,          //Optional
  closeOnSelect: false,       //Optional
  templateType: 'popup'       //Optional
};
$scope.openDatePicker = function(){
  ionicDatePicker.openDatePicker(ipObj1);
};

  })
