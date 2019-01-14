var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://admin:mygod12345@ds155864.mlab.com:55864/mytasklist',['tasks']);

// get all tasks
router.get('/tasks', (req, res, next) => {
   // res.send('tasks api');
   db.tasks.find( (err, tasks) => {
      if(err) {
         res.send(err);
      }
      res.json(tasks);
   });
});

// get single task
router.get('/tasks/:id', (req, res, next) => {
   // res.send('tasks api');
   db.tasks.findOne( {_id: mongojs.ObjectId(req.params.id)} , (err, task) => {
      if(err) {
         res.send(err);
      }
      res.json(task);
   });
});

// save task
router.post('/task', (req, res, next) => {
   var task = req.body;
   // console.log(req.body);
   if(!task.title || !(task.isDone + '')) {
      console.log(task);
      res.status(400);
      res.json({"error": "Bad Data."});
   } else {
      db.tasks.save(task, (err, task)  => err? res.send(err): res.json(task));
   }
});

// delete single task
router.delete('/tasks/:id', (req, res, next) => {
   // res.send('tasks api');
   db.tasks.remove( {_id: mongojs.ObjectId(req.params.id)} , (err, task) => {
      if(err) {
         res.send(err);
      }
      res.json(task);
   });
});

// update task
router.put('/tasks/:id', (req, res, next) => {
   // res.send('tasks api');
   var task = req.body;
   var upTask = {};

   // update value..
   if(task.isDone) { upTask.isDone = task.isDone; }
   if(task.title) {upTask.title = task.title; }

   //
   if(!upTask) {
      res.status(400);
      res.json({ "error" : "Bad data." });
   } else {
      db.tasks.update( {_id: mongojs.ObjectId(req.params.id)}, upTask, {}, (err, task) => {
         if(err) {
            res.send(err);
         }
         res.json(task);
      });
   }
});

module.exports = router;