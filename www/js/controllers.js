angular.module('starter.controllers', ['ionic-datepicker'])
.controller('AppCtrl', function($scope, $ionicSideMenuDelegate) {
   $scope.toggleLeftSideMenu = function() {
      $ionicSideMenuDelegate.toggleLeft();
   };
})
  .controller('ListCtrl', function ($scope,$ionicPlatform, $state,$stateParams,$ionicPopup, $location,NotesDataService) {
    $scope.$on('$ionicView.enter', function(e) {
        NotesDataService.getAll(function(data){
          $scope.itemsList = data
        })
    })
    $scope.gotoEdit = function(idNote){
            location.reload();
            $state.go('form', {id: idNote});

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
        $state.go('app.toRead');
        $state.reload();
      }
    }
    $scope.goForm=function(){
      $state.reload();
      $state.go('form')

    }
  })
  .controller('ListCtrl2', function ($scope, $ionicPlatform,$location, $stateParams, $state,$ionicPopup, NotesDataService) {
    $scope.$on('$ionicView.enter', function(e) {
        NotesDataService.getAll2(function(data){
          $scope.itemsList2 = data;
        })
    })
    $scope.goForm=function(){
      //location.reload()
      $state.go('form')
    }
    $scope.gotoEdit = function(idNote){
      location.reload();
      $state.go('form', {id: idNote})
        }
    $scope.delete2 = function() {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Delete All Books',
        template: 'are you sure you want to delete All Books from the list ?'
      });

      confirmPopup.then(function(res) {
        if(res) {
          NotesDataService.deleteNotes2().then(onSaveSuccess);
        }
      })
      function onSaveSuccess(){
        $state.reload();
        $state.go('app.reading');
      }
      }
  })

  .controller('ListCtrl3', function ($scope, $ionicPlatform, $stateParams, $state,$ionicPopup, NotesDataService) {
    $scope.$on('$ionicView.enter', function(e) {
        NotesDataService.getAll3(function(data){
          $scope.itemsList3 = data
        })
    })
    $scope.goForm=function(){
            $state.reload();
      $state.go('form')

    }
    $scope.gotoEdit = function(idNote){
      $state.reload();
      $state.go('form', {id: idNote})

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
        $state.go('app.Read');
        $state.reload();
      }
      }
  })

  .controller('FormCtrl', function ($scope, $stateParams, $ionicPopup,$location, $state, NotesDataService, ionicDatePicker) {
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
        //document.getElementById('type1').value=$scope.noteForm.type;
      }
    }]
  });
}
    $scope.$on('$ionicParentView.enter', function(e) {
      initForm()
    })

    function initForm(){

        $scope.pushNotification = { checked: false };
        $scope.pushNotification2 = { checked: false };
      if($stateParams.id){
        NotesDataService.getById($stateParams.id, function(item){
          $scope.noteForm = item
          if($scope.noteForm.status=='1'){
            $scope.pagetitle="To Read";
          }
          if($scope.noteForm.status=='2'){
            $scope.pagetitle="Currently Reading";
            $scope.pushNotification = { checked: true };
          }
          if($scope.noteForm.status=='3'){
            $scope.pagetitle="Read";
            $scope.pushNotification2 = { checked: true };
          }
        })
      } else {
        $scope.pagetitle="Add a new book";
        $scope.noteForm = {};
      }
    }
    function onSaveSuccess(){
      $state.go('app.toRead');
      $state.reload();
      $scope.pagetitle="To Read";
    }
    function onSaveSuccess2(){
      $state.go('app.reading');
      //$window.location.reload()
      $scope.pagetitle="Currently Reading";
    }
    function onSaveSuccess3(){
      $state.go('app.Read');
      //$window.location.reload()
      $scope.pagetitle="Read";

    }
    $scope.onCancel= function(){
      //$window.location.reload()
      $state.go('app.toread');
    }

    $scope.saveNote = function(){
      //var getDate=document.getElementById("date2").value;
      var d0=new Date();
      var startDate=d0.toString().slice(4,15);
      $scope.noteForm.started=startDate;
      //$scope.noteForm.finished=getDate;
      if(!$scope.noteForm.id){
        if(!$scope.pushNotification.checked&&!$scope.pushNotification2.checked){
          NotesDataService.createNote($scope.noteForm)
          $location.path('/toRead');
        }
        else{
          $scope.noteForm.pages=document.getElementById("pages").value;
          $scope.noteForm.pagesRead=document.getElementById("pagesRead").value;
          if($scope.pushNotification.checked&&!$scope.pushNotification2.checked){
              NotesDataService.createNote2($scope.noteForm)
              $location.path('reading');
          }
          else {
                $scope.noteForm.finished=new Date().toString().slice(4,15);
                NotesDataService.createNote3($scope.noteForm).then(onSaveSuccess3);
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
          //$scope.noteForm.finished=getDate;
          NotesDataService.startReading($scope.noteForm).then(onSaveSuccess2);
        }
        else {
              $scope.noteForm.finished=new Date().toString().slice(4,15);
              NotesDataService.read($scope.noteForm).then(onSaveSuccess3);
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
          NotesDataService.deleteNote(idNote).then(onSaveSuccessDelete)
        }
      })
    }
    function onSaveSuccessDelete(){
      if($scope.noteForm.status==1){
        $state.go('app.toRead')
      }
      else if ($scope.noteForm.status==2){
        $state.go('app.reading')
      }
      else{
        $state.go('app.Read')
      }
    }

    var d;
    var ipObj1 = {
  callback: function (val) {
    var d0=new Date();
    var d1=new Date(val);
    d = d1.toString().slice(4,15);
    //var startDate=d0.toString().slice(4,15);
    console.log('Return value from the datepicker popup is : ' + val, d);
    /*var x=document.getElementById("date2");
    x.value=  d;*/
    $scope.noteForm.finished=d;
  },
  from: new Date(2016, 1, 1), //Optional
  to: new Date(2020, 12, 12),
  titleLabel: 'Expected Finish Reading Date',          //Optional
  inputDate: new Date(),      //Optional
  mondayFirst: true,
  closeOnSelect: false,
  showTodayButton:false,
  closeLabel: 'Cancel',
  templateType: 'popup'       //Optional
};
$scope.openDatePicker = function(){
  ionicDatePicker.openDatePicker(ipObj1);
};

  })
