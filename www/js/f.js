//var getDate=document.getElementById("date2").value;
var d0=new Date();
var startDate=d0.toString().slice(4,15);
$scope.noteForm.started=startDate;
$scope.noteForm.finished=getDate;
if(!$scope.noteForm.id){
  if(!$scope.pushNotification.checked&&!$scope.pushNotification2.checked){
    NotesDataService.createNote($scope.noteForm)
    $location.path('templates/form.html');
  }
  else{
    $scope.noteForm.pages=document.getElementById("pages").value;
    $scope.noteForm.pagesRead=document.getElementById("pagesRead").value;
    if($scope.pushNotification.checked&&!$scope.pushNotification2.checked){
        NotesDataService.createNote2($scope.noteForm)
        $location.path('templates/reading.html');
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
