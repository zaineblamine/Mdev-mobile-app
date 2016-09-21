angular.module('starter.services', ['ngCordova'])
  .factory('NotesDataService', function ($cordovaSQLite, $ionicPlatform) {
    var db, dbName = "noteDemo.db"

    function useWebSql() {
      db = window.openDatabase(dbName, "1.0", "Note database", 200000)
      console.info('Using webSql')
    }

    function useSqlLite() {
      db = $cordovaSQLite.openDB({name: dbName, location : 1})
      console.info('Using SQLITE')
    }

    function initDatabase(){
      $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS toRead (id integer primary key, title, type);')
        .then(function(res){

        }, onErrorQuery)

        $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS Reading (id integer primary key, title, type, period , pages);')
          .then(function(res){

          }, onErrorQuery)

          $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS Read (id integer primary key, title, type, started, finished, pages);')
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
        return $cordovaSQLite.execute(db, 'INSERT INTO toRead (title, type) VALUES(?, ?)', [note.title, note.type])
      },
      updateNote: function(note){
        return $cordovaSQLite.execute(db, 'UPDATE toRead set title = ?, type = ? where id = ?', [note.title, note.type, note.id])
      },
      getAll: function(callback){
        $ionicPlatform.ready(function () {
          $cordovaSQLite.execute(db, 'SELECT * FROM toRead').then(function (results) {
            var data = []

            for (i = 0, max = results.rows.length; i < max; i++) {
              data.push(results.rows.item(i))
            }

            callback(data)
          }, onErrorQuery)
        })
      },

      deleteNote: function(id){
        return $cordovaSQLite.execute(db, 'DELETE FROM toRead where id = ?', [id])
      },

      getById: function(id, callback){
        $ionicPlatform.ready(function () {
          $cordovaSQLite.execute(db, 'SELECT * FROM toRead where id = ?', [id]).then(function (results) {
            callback(results.rows.item(0))
          })
        })
      },
//Reading------------------------------------------------------------------------------------------
createNote2: function (note) {
  return $cordovaSQLite.execute(db, 'INSERT INTO Reading (title, type, period ,pages) VALUES(?, ?, ?,?)', [note.title, note.type, note.period, note.pages])
},
updateperiod: function(note){
  return $cordovaSQLite.execute(db, 'UPDATE Reading set period = ?', [note.period])
},
getAll2: function(callback){
  $ionicPlatform.ready(function () {
    $cordovaSQLite.execute(db, 'SELECT * FROM Reading').then(function (results) {
      var data = []

      for (i = 0, max = results.rows.length; i < max; i++) {
        data.push(results.rows.item(i))
      }

      callback(data)
    }, onErrorQuery)
  })
},

deleteNote2: function(id){
  return $cordovaSQLite.execute(db, 'DELETE FROM Reading where id = ?', [id])
},

getById2: function(id, callback){
  $ionicPlatform.ready(function () {
    $cordovaSQLite.execute(db, 'SELECT * FROM Reading where id = ?', [id]).then(function (results) {
      callback(results.rows.item(0))
    })
  })
}
    }
  })
