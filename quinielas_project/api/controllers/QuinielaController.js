/**
 * QuinielaController
 *
 * @description :: Server-side logic for managing quinielas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 var date = new Date();

module.exports = {
	find: function(req,res){
		Quiniela.find(function(err,find){
			if (err){
				res.json({
					message: 'Error while finding user'
				})
			}
			if(find){
				res.json({
					message: 'Users found',
					Users: Users
				})
			}
		})
	},

	findOne: function(req, res){
		
		var user = req.params.id

		Quiniela.find({id:id}, function(err,quiniela){

			if(err){
				res.json({
					message: 'Error while finding user'
				})
			}
			if(quiniela){
				res.json({
					message: 'User found',
					user: user
				})
			}
		})
	},

	add: function(req,res){
		body = req.body;
		Quiniela.find(function (err,find){
			if(err){
				res.json({
					message: 'Error while creating results'
				})
			}
			if(find.length>0){
				year = date.getFullYear();
				year = year.toString();
				semana = year + body.semana
				body.semana = semana.substring(semana.length - 6)
				for(i = 0; i < find.length; i++){
					if(find[i].semana == body.semana){
						res.json({
							message: 'Already exists this week, just update it'
						})
						break;
					}
				}
				if(find.length == i){
					Quiniela.create(body,function(err, week){
						if(err){
							res.json({
								message: 'Error while creating results'
							})
						}
						if(week){
							res.json({
								message: 'Week successfuly created',
								week:week
							})
						}
					})
				}
			}
			else{
				year = date.getFullYear();
				year = year.toString();
				semana = year + body.semana
				body.semana = semana.substring(semana.length - 6)
				
				Quiniela.create(body,function(err, week){
					if(err){
						res.json({
							message: 'Error while creating results'
						})
					}
					if(week){
						res.json({
							message: 'Week successfuly created',
							week:week
						})
					}
				})
			}
		})
	},

	delete: function(req, res){
		id = req.params.id;

		Quiniela.destroy({id:id}, function(err,deleted){
			if(err){
				res.json({
					message: 'Error while deleting results'
				})
			}
			if(deleted){
				res.json({
					message: 'Week successfuly deleted',
					week:deleted
				})
			}
		})
	},

	update: function(req,res){
		body = req.body;

		Quiniela.update({semana:body.semana},body,function(err,updated){
			if(err){
				res.json({
					message: 'Error while updating week'
				})
			}
			if(updated){
				res.json({
					message: 'Week successfuly updatede',
					week:updated
				})
			}
		})
	}

};

