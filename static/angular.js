"use strict";
var lrparser = angular.module("lrparser", ['ngRoute']);

// Use [[ and ]] for angular templates, flask uses {{ and }}
lrparser.config(function($interpolateProvider) {
	$interpolateProvider.startSymbol('[[');
	$interpolateProvider.endSymbol(']]');
});

lrparser.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.when(
			'/', {
				controller: "appController", // ['$scope', '$window', 'fetch_playlist', 'globals', _appController], 
				templateUrl:'static/views/main.html'
			}
		)
	}
]);

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
	$scope.playlist = {
		records: null,
		lastupdate: null
	}
	
	/*
	$scope.$watch(function(){
		return node.response;
	}, function(newValue, oldValue){
		$scope.node = node.data;
	});
	*/
	
	$scope.format_date = function(dt) {
		var day    = (dt.getDate() < 10) ? "0"+dt.getDate(): dt.getDate();
		var month  = ((dt.getMonth()+1) < 10) ? "0" + (dt.getMonth()+1) : (dt.getMonth()+1);
		var hour   = (dt.getHours() < 10) ? "0"+dt.getHours(): dt.getHours();
		var minute = (dt.getMinutes() < 10) ? "0"+dt.getMinutes(): dt.getMinutes();
		
		
		var buffer = ""
		buffer += day + ".";
		buffer += month + ".";
		buffer += dt.getFullYear() + " ";
		buffer += hour + ":" + minute;
		 
		return buffer
	}
	
	$scope.get_all = function() {
		//console.log(globals.urls.playlist)
		fetch_playlist.fetch(globals.urls.playlist, function(response) {
			$scope.playlist = response.data;
			//console.log($scope.playlist)
		}, function(response) {
			$scope.playlist = {
				records: null,
				lastupdate: null
			};
		});	
	}
	
	$scope.record = function(rec) {
		var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
		d.setUTCSeconds(rec[1]);
		return {
			id:       rec[0], // INTEGER PRIMARY KEY AUTOINCREMENT,
			dt:       d, // INTEGER, -- unix timestamp
			song:     rec[2], // TEXT,
			artist:   rec[3], // TEXT,
			album:    rec[4], // TEXT, 
			cover_id: rec[5], // INTEGER
		}
	}
	
	$scope.init = function(u){
		;
	}
	
	$scope.get_all();
	//console.log($scope.playlist.records)

}
lrparser.controller("appController", ['$scope', '$window', 'fetch_playlist', 'globals', _appController]);
