/**
 * Usuarios.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
connection: 'Mongodb',
  attributes: {
  	name:{
  		type: 'string'
  	},
  	user:{
  		type: 'string'
  	},
  	pass:{
  		type: 'string'
  	},
  	tipo:{
  		type: 'string'
  	},
    totalpoints:{
      type: 'int'
    },
    allpoints: Object
  },
  beforeCreate: function (user, cb){
    user.pass = crypt.crypt(user.pass);
    cb()
  }
};

