angular.module('starter.controllers', ['ionic-datepicker'])
.controller('AppCtrl', function($scope, $ionicSideMenuDelegate) {
   $scope.toggleLeftSideMenu = function() {
      $ionicSideMenuDelegate.toggleLeft();
   };
})
  .controller('ListCtrl', function ($scope,$ionicPlatform, $state,$stateParams,$ionicPopup, NotesDataService) {
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
    }
  })
  .controller('ListCtrl2', function ($scope, $ionicPlatform, $stateParams, $state,$ionicPopup, NotesDataService) {
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
    }

  })

  .controller('FormCtrl', function ($scope, $stateParams, $ionicPopup, $state, NotesDataService, ionicDatePicker) {
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
    }
    $scope.saveNote = function(){

      if(!$scope.noteForm.id){
        if($scope.pushNotification.checked==false){
          NotesDataService.createNote($scope.noteForm).then(onSaveSuccess)
        }
        else{
        $scope.noteForm.finished=document.getElementById("date2").value;
        $scope.noteForm.pages=document.getElementById("pages").value;
        NotesDataService.createNote2($scope.noteForm).then(onSaveSuccess)
      }
      } else {
        NotesDataService.updateNote($scope.noteForm).then(onSaveSuccess)
      }
      //  $state.go('app.add');
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
    var d1=new Date(val);
    d = d1.toString().slice(4,15);
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

  .controller('FormCtrl2', function ($scope, $stateParams, $ionicPopup, $state, NotesDataService,ionicDatePicker,$filter) {
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
        document.getElementById('type2').value=$scope.noteForm2.type;
      }
    } /*,{
      text: 'Close',
      type: 'button-calm',
      onTap: function (e) {
        $state.go('shoppingCart');
      }
    }*/]
  });
  //document.getElementById('type2').value=$scope.noteForm2.type;
}

//-------------------------------------------------------------------------------------

  /*Art
Biography
Business
Chick Lit
Children's
Christian
Classics
Comics
Contemporary
Cookbooks
Crime
Ebooks
Fantasy
Fiction
Gay and Lesbian
Graphic Novels
Historical Fiction
History
Horror
Humor and Comedy
Manga
Memoir
Music
Mystery
Nonfiction
Paranormal
Philosophy
Poetry
Psychology
Religion
Romance
Science
Science Fiction
Self Help
Suspense
Spirituality
Sports
Thriller
Travel
More genres…
*/
  //----------------------------------------------------------------------------------
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
        $scope.noteForm2.period=d;
        NotesDataService.createNote2($scope.noteForm2).then(onSaveSuccess)
      } else {
        NotesDataService.updateperiod($scope.noteForm2).then(onSaveSuccess)
      }
    }

    $scope.confirmDelete = function(idNote) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Delete Book',
        template: 'are you sure you want to delete this book from the list ?'
      })

      confirmPopup.then(function(res) {
        if(res) {
          NotesDataService.deleteNote2(idNote).then(onSaveSuccess)
        }
      })
    }
    //-------------------Datapicker part--------------------------------------------------------------------
        var d;
        var ipObj1 = {
      callback: function (val) {
        var d1=new Date(val);
        d = d1.toString().slice(4,15);
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


  .controller('AddCtrl', function ($scope, $stateParams, $ionicPopup, $state, NotesDataService,ionicDatePicker,$filter) {
    $scope.choice = {
  value: '2'
};

$scope.open = function () {
  $ionicPopup.confirm({
    templateUrl: 'orderPopup.html',
    scope: $scope,
    buttons: [{
      text: 'Close',
      type: 'button-positive',
      onTap: function (e) {
       if (($scope.choose.type)=='1'){
           $state.go('app.form');
       }

        document.getElementById('type2').value=$scope.choose.type;
        console.log($scope.choice);
      }
    }]
  });

}
    $scope.$on('$ionicParentView.enter', function(e) {
      initForm2()
    })

    function initForm2(){
        $scope.choose = {type: ''}
    }
    function onSaveSuccess(){
      $state.go('app.Reading')
    }
    /*$scope.saveNote2 = function(){

      if(!$scope.noteForm2.id){
        $scope.noteForm2.period=d;
        NotesDataService.createNote2($scope.noteForm2).then(onSaveSuccess)
      } else {
        NotesDataService.updateperiod($scope.noteForm2).then(onSaveSuccess)
      }
    }

    $scope.confirmDelete = function(idNote) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Delete Book',
        template: 'are you sure you want to delete this book from the list ?'
      })

      confirmPopup.then(function(res) {
        if(res) {
          NotesDataService.deleteNote2(idNote).then(onSaveSuccess)
        }
      })
    }
    //-------------------Datapicker part--------------------------------------------------------------------
        var d;
        var ipObj1 = {
      callback: function (val) {
        var d1=new Date(val);
        d = d1.toString().slice(4,15);
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
    };*/
  })
