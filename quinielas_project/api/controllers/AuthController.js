/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 var passport = require('passport');

module.exports = {

	login: function(req, res) {

        passport.authenticate('local', function(err, user, info) {
            if ((err) || (!user)) {
                return res.send({
                    message: info.message,
                    user: user
                });
            }

            req.logIn(user, function(err) {
                if (err) res.send(err);
                tipo = req.user.user.tipo
                if(tipo == 'admin'){
                    res.redirect('/dashmin');
                }
                else{
                    res.redirect('/dashboard')
                }
            });

        })(req, res);
    },

    logout: function(req, res) {
        req.logout();
        res.redirect('/');
    }
	
};

