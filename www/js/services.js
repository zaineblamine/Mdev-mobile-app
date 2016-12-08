angular.module('starter.services', ['ngCordova'])
  .factory('NotesDataService', function ($cordovaSQLite, $ionicPlatform) {
    var db, dbName = "ReadingChallenge.db"

    function useWebSql() {
      db = window.openDatabase(dbName, "1.0", "ReadingChallenge database", 200000)
      console.info('Using webSql')
    }

    function useSqlLite() {
      db = $cordovaSQLite.openDB({name: dbName, location : 1})
      console.info('Using SQLITE')
    }

    function initDatabase(){
      $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS books (id integer primary key, title TEXT, type TEXT, pages integer, pagesRead integer, started TEXT, finished TEXT, frequence integer, status integer);')
        .then(function(res){

        }, onErrorQuery)
    }

    $ionicPlatform.ready(function () {
      if(window.cordova){
        useSqlLite()
      } else {
        useWebSql()
      }
/*ready([callback])
Trigger a callback once the device is ready, or immediately if the device is already ready.
Returns: promise A promise which is resolved when the device is ready.
*/
      initDatabase()
    })

    function onErrorQuery(err){
      console.error(err)
    }

    return {
//To read---------------------------------------------------------------------
      createNote: function (note) {
        return $cordovaSQLite.execute(db, 'INSERT INTO books (title,type,pages,pagesRead,started,finished,frequence,status) VALUES(?, ?,?,"","","","","1")', [note.title, note.type, note.pages])
      },
      updateNote: function(note){
        return $cordovaSQLite.execute(db, 'UPDATE books set title = ?, type = ? where id = ?', [note.title, note.type, note.id])
      },
      getAll: function(callback){
        $ionicPlatform.ready(function () {
          $cordovaSQLite.execute(db, 'SELECT * FROM books where status="1"').then(function (results) {
            var data = []

            for (i = 0, max = results.rows.length; i < max; i++) {
              data.push(results.rows.item(i))
            }
            callback(data)
          }, onErrorQuery)
        })
      },
      deleteNote: function(id){
        return $cordovaSQLite.execute(db, 'DELETE FROM books where id = ?', [id])
      },
      getById: function(id, callback){
        $ionicPlatform.ready(function () {
          $cordovaSQLite.execute(db, 'SELECT * FROM books where id = ?', [id]).then(function (results) {
            callback(results.rows.item(0))
          })
        })
      },
//Reading------------------------------------------------------------------------------------------
createNote2: function (note) {
  return $cordovaSQLite.execute(db, "INSERT INTO books (title, type, pages,pagesRead,started, finished,frequence,status) VALUES(?,?,?,?,?,?,'1','2')", [note.title, note.type, note.pages,note.pagesRead,note.started ,note.finished])
},
createNote3: function (note) {
  return $cordovaSQLite.execute(db, "INSERT INTO books (title, type, pages,pagesRead,started, finished,frequence,status) VALUES(?,?,?,?,?,?,'1','3')", [note.title, note.type, note.pages,note.pagesRead,note.started ,note.finished])
},
startReading: function(note){
  return $cordovaSQLite.execute(db, 'UPDATE books set title=?, type=?,started=?, finished = ?, pages= ?,pagesRead=?, status="2" where id = ?', [note.title, note.type,note.started, note.finished, note.pages,note.pagesRead,note.id])
},
read: function(note){
  return $cordovaSQLite.execute(db, 'UPDATE books set title=?, type=?,started=?, finished = ?, pages= ?,pagesRead=?, status="3" where id = ?', [note.title, note.type,note.started, note.finished, note.pages,note.pagesRead,note.id])
},
getAll2: function(callback){
  $ionicPlatform.ready(function () {
    $cordovaSQLite.execute(db, 'SELECT * FROM books where status="2"').then(function (results) {
      var data = []

      for (i = 0, max = results.rows.length; i < max; i++) {
        data.push(results.rows.item(i))
      }

      callback(data)
    }, onErrorQuery)
  })
},
getAll3: function(callback){
  $ionicPlatform.ready(function () {
    $cordovaSQLite.execute(db, 'SELECT * FROM books where status="3"').then(function (results) {
      var data = []

      for (i = 0, max = results.rows.length; i < max; i++) {
        data.push(results.rows.item(i))
      }

      callback(data)
    }, onErrorQuery)
  })
},
deleteNotes : function(){
  return $cordovaSQLite.execute(db, "DELETE FROM books where status='1'")
},
deleteNotes2 : function(){
  return $cordovaSQLite.execute(db, "DELETE FROM books where status='2'")
},
deleteNotes3 : function(){
  return $cordovaSQLite.execute(db, "DELETE FROM books where status='3'")
},

getById2: function(id, callback){
  $ionicPlatform.ready(function () {
    $cordovaSQLite.execute(db, 'SELECT * FROM books where id = ?', [id]).then(function (results) {
      callback(results.rows.item(0))
    })
  })
},
    }
})
