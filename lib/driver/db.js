'use strict';

const pg = require('pg');
exports = module.exports = (conString) => {
  conString = conString || "postgres://username:password@127.0.0.1:5432/dbone";
  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
  });
  
  function db(){}
  /**
   * 
   * @param {string} sql 
   * @param {array} params 
   */
  db.query = function(sql,params){
    return new Promise((resolve,reject) =>{
      client.query(sql,params, function(err, result) {
        if(err) {
          return reject(err);
        }
        return resolve(result.rows);
      });
    });
  }
  return db;
}


