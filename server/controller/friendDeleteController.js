'use strict';
let request = require('request');
let db = require('../models/db');


//addFriend Friend List to DB
module.exports.deleteFriend = (req, res) => {
  var currentUser = req.params.userId;
  let reqId = req.params.friendId;



  db('friends')
  .where({'user_id':reqId, 'user_id2':currentUser})
  .del()
  .then(()=>{
    db('friends')
    .where({'user_id':currentUser, 'user_id2':reqId})
    .del()
      .then(() => {
        db('users').where({user_id:currentUser}).join('friends', 'users.id', '=', 'friends.user_id2')
        .select('users.id', 'users.userName', 'users.email')
        .then((data) => {
          console.log(data, ': data, after friendDelete');
          res.send(data);
        })
      })
  })
  .catch((err)=> {
    console.log(err)
  })
}


