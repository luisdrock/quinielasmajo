/**
 * QuinielaUserController
 *
 * @description :: Server-side logic for managing Quinielausers, manages the results' users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	findOne: function(req, res){

	},

	find: function(req,res){

	},

	add: function(req, res){
		body = req.body;

		QuinielaUser.create(body,function(err,created){
			if(err){
				res.json({
					err:'Error while creting quiniela'
				})
			}
			if(created.length == 0){
				res.json({
					err:'Error while creting quiniela'
				})
			}
			else{
				res.json({
					message: 'Success creating quiniela'
				})
			}
		})
	},

	update: function(req, res){

	},

	delete: function(req, res){

	},

	points: function(req, res){
		body = req.body;
		user = body.user;
		semana = body.semana;
		QuinielaUser.find({user:user,semana:semana}, function(err, quiniela){
			if(err){
				res.json({
					err: 'Error finding the userr'
				})
			}
			if(quiniela.length == 0){
				res.json({
					err: 'User not found'
				})
			}
			else{
				Results.find({semana:semana},function(err, results){
					if(err){
						res.json({
							err: 'Error finding the user'
						})
					}
					if(results.length == 0){
						res.json({
							err: 'User not found'
						})
					}
					else{
						points = 0
						for(i=0;i<quiniela.results.length;i++){
							if(results[0].results == quiniela[0].results){
								points++
							}
						}
						quiniela[0].points = points
						QuinielaUser.update({user:user,semana:semana},quiniela[0], function(err, updated){
							if(err){
								res.json({
									err: 'Error while counting points'
								})
							}
							if(updated.length == 0){
								res.json({
									err: 'Error while counting points'
								})
							}
							else{
								res.json({
									message: 'Points counted',
									quiniela:updated
								})
							}
						})
					}
				})
			}
		})
	}
};

