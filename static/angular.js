angular.module('lrparser', []). 
	config(function($routeProvider) {
		$routeProvider.when(
			'/', 
			{
				controller: lrparser_controller, 
				templateUrl:'static/views/main.html'
			}
		);
	}
);

  
function lrparser_controller($scope) {
  //TODO: No model ...
}
