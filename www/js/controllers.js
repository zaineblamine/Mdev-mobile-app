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
        $state.go('app.Reading')
        $window.location.reload();
      }
      }
  })

  .controller('ListCtrl3', function ($scope, $ionicPlatform, $stateParams, $state,$ionicPopup,$window, NotesDataService) {
    $scope.$on('$ionicView.enter', function(e) {
        NotesDataService.getAll3(function(data){
          $scope.itemsList3 = data
        })
    })
    $scope.gotoEdit = function(idNote){
      $state.go('app.form', {id: idNote})
    }
    $scope.delete3 = function() {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Delete All Books',
        template: 'are you sure you want to delete All Books from the list ?'
      })

      confirmPopup.then(function(res) {
        if(res) {
          NotesDataService.deleteNotes3().then(onSaveSuccess)
        }
      })
      function onSaveSuccess(){
        $state.go('app.Read')
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
  $scope.pushNotificationChange2 = function() {


    console.log('Push Notification2 Change', $scope.pushNotification2.checked);
  };

  $scope.pushNotification2 = { checked: false };
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
          if($scope.noteForm.status=='2'){
            $scope.pushNotification = { checked: true };
          }
          if($scope.noteForm.status=='3'){
            $scope.pushNotification2 = { checked: true };
          }
        })
      } else {
        $scope.noteForm = {}
      }
    }
    function onSaveSuccess(){
      $state.go('app.toRead')
      $window.location.reload();
    }
    function onSaveSuccess2(){
      $state.go('app.Reading')
      $window.location.reload();
    }
    function onSaveSuccess3(){
      $state.go('app.Read')
      $window.location.reload();
    }
    $scope.saveNote = function(){
      var getDate=document.getElementById("date2").value;
      var d0=new Date();
      var startDate=d0.toString().slice(4,15);

      if(!$scope.noteForm.id){
        if(!$scope.pushNotification.checked&&!$scope.pushNotification2.checked){
          NotesDataService.createNote($scope.noteForm).then(onSaveSuccess)
        }
        else{
          $scope.noteForm.started=startDate;
          $scope.noteForm.finished=getDate;
          $scope.noteForm.pages=document.getElementById("pages").value;
          $scope.noteForm.pagesRead=document.getElementById("pagesRead").value;
          if($scope.pushNotification.checked&&!$scope.pushNotification2.checked){
              NotesDataService.createNote2($scope.noteForm).then(onSaveSuccess2)
          }
          else {
                $scope.noteForm.finished=new Date().toString().slice(4,15);
                NotesDataService.createNote3($scope.noteForm).then(onSaveSuccess3)
          }
      }

      }
      else {//update part
        if(!$scope.pushNotification.checked&&!$scope.pushNotification2.checked){
        NotesDataService.updateNote($scope.noteForm).then(onSaveSuccess)
      }
      else{
        $scope.noteForm.started=startDate;
        $scope.noteForm.pages=document.getElementById("pages").value;
        $scope.noteForm.pagesRead=document.getElementById("pagesRead").value;
        if($scope.pushNotification.checked&&!$scope.pushNotification2.checked){
          $scope.noteForm.finished=getDate;
          NotesDataService.startReading($scope.noteForm).then(onSaveSuccess2)
        }
        else {
              $scope.noteForm.finished=new Date().toString().slice(4,15);
              NotesDataService.read($scope.noteForm).then(onSaveSuccess3)
        }
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
  from: new Date(2016, 1, 1), //Optional
  to: new Date(2020, 12, 12), //Optional
  inputDate: new Date(),      //Optional
  mondayFirst: true,          //Optional
  closeOnSelect: true,
  showTodayButton:false,      //Optional
  templateType: 'popup'       //Optional
};
$scope.openDatePicker = function(){
  ionicDatePicker.openDatePicker(ipObj1);
};

  })
