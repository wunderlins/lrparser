"use strict";
var lrparser = angular.module("lrparser", []);

// Use [[ and ]] for angular templates, flask uses {{ and }}
lrparser.config(function($interpolateProvider) {
	$interpolateProvider.startSymbol('[[');
	$interpolateProvider.endSymbol(']]');
});

lrparser.factory("fetch_playlist", function($window, $http) {
	var factory = {};
		
	factory.fetch = function(url, callback, err_callback) {
		$http.get(url).then(callback, err_callback);
	};
	
	return factory;
});

lrparser.factory("globals", function($window, $http) {
	var factory = {
		urls: {
			playlist: "/playlist.json"
		}
	};
	
	return factory;
});

function _appController($scope, $window, fetch_playlist, globals) {
	//$scope.node = node.data;
	$scope.tree = []
	
	/*
	$scope.$watch(function(){
		return node.response;
	}, function(newValue, oldValue){
		$scope.node = node.data;
	});
	*/
	
	$scope.get_all = function() {
		console.log(globals.urls.playlist)
		fetch_playlist.fetch(globals.urls.playlist, function(response) {
			$scope.tree = response.data;
			
		}, function(response) {
			$scope.tree = [];
		});	
	}
	
	/*
	$scope.init = function(u){
		globals.urls = u;
		$scope.get_all();
	}
	*/
	
	$scope.get_all();
}
lrparser.controller("appController", ['$scope', '$window', 'fetch_playlist', 'globals', _appController]);
