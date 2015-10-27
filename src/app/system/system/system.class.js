var os = require('os');

function main() {
	var _defaultAddress = '127.0.0.1';
	var _currAddress = null;
	var interfaces = os.networkInterfaces();
	var cl = K.getComponent('console');

	cl.log(' - Initializing system class');

	Object.keys(interfaces).forEach(function(i) {
		interfaces[i].forEach(function(e) {
			if (!_currAddress) {
				if (e.family === 'IPv4' && !e.internal) {
					_currAddress = e.address;
				}
			}
		});
	});

	this.location = _currAddress || _defaultAddress;
	this.arch = os.arch();
	this.platform = os.platform();

	K.onReady.add(function(){

		setTimeout(function() {
			var services = K.getComponent('services');

			//call friend
			services.create('friend', {
				port:'i16177'
			}).socket().send('hello');
		}, 1000);
	});
}

module.exports = {
	pkgName: 'system',
	attributes: {},
	methods: {
		_init: main
	}
};