var crypto = require('crypto');

module.exports = {
	crypt: function(name, pass){
		var hmac = crypto.createHmac('sha1', name).update(pass).digest('hex')
  		return hmac
	},

	decrypt: function(name, pass){
		var hmac = crypto.createHmac('hex', name).update(pass).digest('sha1')
  		return hmac;
	}
}