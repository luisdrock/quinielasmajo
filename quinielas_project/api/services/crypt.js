var bcrypt = require('bcrypt-nodejs');

module.exports = {
	crypt: function(pass){
		var hmac = bcrypt.hashSync(pass);
  		return hmac
	},

	decrypt: function(passcom, passfin){
		correct = bcrypt.compareSync(passcom, passfin)
  		return correct;
	}
}