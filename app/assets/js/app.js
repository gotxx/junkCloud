console.log("script 1");

var myApp = {
	mojaWlasciwosc: 'vojadiv',
	init: function(){
		this.mojaMetoda();	
	},
	mojaMetoda: function g() {
		var _mayApp = this;
		$('.btn').on('click', '.selector', function(event) {
			event.preventDefault();
			/* Act on the event */
			_mayApp.innaMetoda();
		});
	},
	jakisObiekt : {
		wlasciwosc: "123",
		nastepnaMetoda: function(){
			myApp.jakisObiekt.mojaMetoda();
		}
	}
};

function Person(){
	var _name="asdasd";

	function fun1(){ fun2()}
	function fun2(){
		console.log('fun2')
	}

	this.m1 = function(){
		this.m2();
	};

	this.m2 = function(){
		console.log('m2');
	};

	this.f1 = fun1;
	this.f2 = fun2;

	this.getName = functon f(){
		console.log(this);
		return _name;
	};
}