/**
 * QuinielaUser.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'Mongodb',
  attributes: {
  	user: {
  		type: 'string'
  	},
  	semana: {
  		type: 'string'
  	},
  	results: Object
  }
};

