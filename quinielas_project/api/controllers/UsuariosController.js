/**
 * UsuariosController
 *
 * @description :: Server-side logic for managing Usuarios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {

	findAll: function(req, res){
		Usuarios.find(function(err,usuarios){
			if (err){
				res.send(500)
			}
			if(usuarios){
				res.json({
					message: 'Users found',
					usuarios: usuarios
				})
			}
		})
	},

	findOne: function(req, res){
		
		var user = req.params.id

		Usuarios.find({id:id}, function(err,user){

			if(err){
				res.send(500)
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
		
		Usuarios.find({user:user},function(err, find){
			if(err){
				res.send(500)
			}

			if(find.length != 0){
				res.json({
					message: 'User exists',
					user: find
				})
			}

			else{
				Usuarios.create(body,function(err,created){		
					if(err){
						res.send(500)
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
		Usuarios.find({id:id}, function(err,find){
			if(err){
				res.send(500)
			}
			if(find.length > 0){
				
				userpast ={
					name: find[0].name,
					user: find[0].user,
					pass: find[0].pass,
					tipo: find[0].tipo
				}
				if(body.user == userpast.user){
					Usuarios.update({id:id},body, function (err,newname){
						if(err){
							res.send(500)
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
					Usuarios.find({user:body.user},function (err,newuser){
						if(err){
							res.send(500)
						}
						if(newuser.length > 0){
							res.json({
								message: 'Already exists this username'
							})
						}
						else{
							Usuarios.update({id:id},body, function (err,newname){
								if(err){
									res.send(500)
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
		Usuarios.find({user:user},function(err,find){
			if(find.length == 1){
				if(find[0].tipo == 'admin'){
					Usuarios.find({tipo:'admin'},function(err,users){
						if(users.length == 1){
							res.json({
								message: 'Only exists this admin, it can´t be deleted',
								user:users
							})
						}
						else{
							Usuarios.destroy({user: user}, function (err, deleted){
								res.json({
									message: 'User deleted',
									user: deleted
								})
							})
						}
					})
				}
				else{
					Usuarios.destroy({user: user}, function (err, deleted){
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

