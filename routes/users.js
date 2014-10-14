var express = require('express');
var router  = express.Router();
var mysql   = require('mysql');
var user_id = 0;

/* Socket.io Events */


/* GET users listing. */
router.get('/', function(req, res) {
  var new_user = 0;
  
  if (user_id != 0){
    new_user  = user_id;
    user_id   = 0;
  }
  res.render('users/index', {title: 'Agregar Usuario', user: new_user});
});

router.post('/add/', function(req, res, next) {
  var name  = req.body.name;
  user_id   = 0;
  
  if (name.length == 0){
    res.redirect('/users/'); return;
  }
  
  var connection  = mysql.createConnection({
    host:     '127.0.0.1',
    user:     'root',
    password: 'm1SQL!22',
    database: 'test',
    debug:    true
  });
  
  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
  
    connection.beginTransaction(function(err){
      
      if (err) {
        throw err;
      }
      
      connection.query('INSERT INTO users set name = ?', name, function(err, result){
        if (err) {
          connection.rollback(function(){ throw err; });
        }
        
        user_id  = result.insertId;
        connection.commit(function(err) {
          if (err) {
            user_id  = 0;
            connection.rollback(function() { throw err; });
          }
          
          res.redirect('/users/');
        
        });
        
      });
    });
  });
  
});

module.exports = router;
