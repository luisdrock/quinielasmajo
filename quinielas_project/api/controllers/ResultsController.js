/**
 * ResultsController
 *
 * @description :: Server-side logic for managing Results, manages the final results' week
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var date = new Date();

module.exports = {
	find: function(req,res){
		Results.find(function(err,find){
			if(err){
				res.json({
					message: 'Error while finding weeks'
				})
			}
			if(find){
				res.json({
					message:'Weeks successfuly found',
					weeks:find
				})
			}
		})
	},

	findOne: function(req,res){
		body = req.body;

		Results.find({semana:body.semana}, function(err, find){
			if(err){
				res.json({
					message: 'Error while finding weeks'
				})
			}
			if(find){
				res.json({
					message:'Weeks successfuly found',
					weeks:find
				})
			}
		})
	},

	add: function(req, res){
		body = req.body;
		Results.find(function (err,find){
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
					Results.create(body,function(err, week){
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
				
				Results.create(body,function(err, week){
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

		Results.destroy({id:id}, function(err,deleted){
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

		Results.update({semana:body.semana},body,function(err,updated){
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
	},

	finalResults: function(req,res){

	}
};

