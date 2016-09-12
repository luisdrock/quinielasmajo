/**
 * UsersController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {

	findAll: function(req, res){
		Users.find(function(err,Users){
			if (err){
				res.json({
					message: 'Error while finding user'
				})
			}
			if(Users){
				res.json({
					message: 'Users found',
					Users: Users
				})
			}
		})
	},

	findOne: function(req, res){
		
		var user = req.params.id

		Users.find({id:id}, function(err,user){

			if(err){
				res.json({
					message: 'Error while finding user'
				})
			}
			if(user){
				res.json({
					message: 'User found',
					user: user
				})
			}
		}

		)

	},

	alta: function(req,res){
		
		body = req.body
		user = body.user
		
		Users.find({user:user},function(err, find){
			if(err){
				res.json({
					message: 'Error while creating user'
				})
			}

			if(find.length != 0){
				res.json({
					message: 'User exists',
					user: find
				})
			}

			else{
				Users.create(body,function(err,created){		
					if(err){
						res.json({
							message: 'Error while creating user'
						})
					}
					if(created){
						res.json({
							message: 'Success creating user',
							user: created
						})
					}
				})
			}	
		})
	},

	update: function (req, res){
		id = req.params.id;
		body = req.body;
		Users.find({id:id}, function(err,find){
			if(err){
				res.json({
					message: 'Error while updating user'
				})
			}
			if(find.length > 0){
				
				userpast ={
					name: find[0].name,
					user: find[0].user,
					pass: find[0].pass,
					tipo: find[0].tipo
				}
				if(body.user == userpast.user){
					Users.update({id:id},body, function (err,newname){
						if(err){
							res.json({
								message: 'Error while updating user'
							})
						}
						if(newname){
							res.json({
								message: 'User updated',
								user: newname
							})
						}
					})
				}
				else{
					Users.find({user:body.user},function (err,newuser){
						if(err){
							res.json({
								message: 'Error while updating user'
							})
						}
						if(newuser.length > 0){
							res.json({
								message: 'Already exists this username'
							})
						}
						else{
							Users.update({id:id},body, function (err,newname){
								if(err){
									res.json({
										message: 'Error while updating user'
									})
								}
								if(newname){
									res.json({
										message: 'User updated',
										user: newname
									})
								}
							})
						}
					})
				}
			}
		})
	},

	delete: function (req, res){
		body= req.body;
		user = body.user;
		Users.find({user:user},function(err,find){
			if(err){
				res.json({
					message: 'Error while deleting user'
				})
			}
			if(find.length == 1){
				if(find[0].tipo == 'admin'){
					Users.find({tipo:'admin'},function(err,users){
						if(err){
							res.json({
								message: 'Error while deleting user'
							})
						}
						if(users.length == 1){
							res.json({
								message: 'Only exists this admin, it can´t be deleted',
								user:users
							})
						}
						else{
							Users.destroy({user: user}, function (err, deleted1){
								if(err){
									res.json({
										message: 'Error while deleting user'
									})
								}
								if(deleted){
									res.json({
										message: 'User deleted',
										user: deleted1
									})
								}
							})
						}
					})
				}
				else{
					Users.destroy({user: user}, function (err, deleted){
						if(err){
							res.json({
								message: 'Error while deleting user'
							})
						}
						res.json({
							message: 'User deleted',
							user: deleted
						})
					})
				}
			}
			else{
				res.json({
					message: 'User not found'
				})
			}
		})
	}
};

