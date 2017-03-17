(function(){

var app = angular.module('broker', []);

app.controller('itemsController', function(){
	this.item = services;
})

var services = [{
	name: 'Life Insurance'
}];



})();