/**
 * QuinielaController
 *
 * @description :: Server-side logic for managing quinielas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 var date = new Date();
 var session = require('client-sessions');

module.exports = {
	login: function (req, res) {
		body = req.body;
		Users.findOne({user:body.user},function(err,user){
			sess = req.session
			if(err){
				res.json({
					err: 'Error while loging in'
				})
			}
			if(!user){
				res.json({
					err: 'User not found'
				})
			}
			else{
				if(body.pass === user.pass){
					if(user.tipo == 'admin'){
						user.pass = '';
						sess.user = user;
						res.redirect('/dashmin');
					}
					else{
						user.pass = '';
						sess.user = user;
						res.redirect('/dashboard')
					}
				}
			}
		})
	},

}