var app = angular.module('scaruffiApp', ['ngAnimate', 'ngRoute']);

var bands = [];
var band = {name: "Empty", url: "Empty"};

app.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl:'bandsView.html',
		controller: 'bandsController'
	})
	.when('/band/', {
		templateUrl:'bandView.html',
		controller: 'bandController'
	});
});

app.controller('scaruffiController', function($scope, $http){
	$scope.shown = true;
	$scope.hideMe = function(){
		$scope.shown = false;
	}
})
.controller('bandsController', function($scope, $http){
	$scope.dataLoading = true;
	$scope.pageNumber = 1;
	var itemsPerPage = 60;
	var maxPage;
	if(bands.length == 0){
		//../ScruffyScrape/Scruffy/BandService/bands
		$http.get('data/bands.json').success(function(response){
			bands = response;
		}).finally( function(){
			$scope.dataLoading = false;
			$scope.bandsDisplay = bands.slice( ($scope.pageNumber-1)*itemsPerPage, $scope.pageNumber*itemsPerPage);
			maxPage = Math.ceil(bands.length / itemsPerPage);
		});
	}else{
		$scope.dataLoading = false;
		$scope.bandsDisplay = bands.slice( ($scope.pageNumber-1)*itemsPerPage, $scope.pageNumber*itemsPerPage);
		maxPage = Math.ceil(bands.length / itemsPerPage);
	}
	$scope.changePage = function(ind){
		console.log($scope.pageNumber + " " + maxPage);
		$scope.pageNumber += ind;
		$scope.pageNumber = Math.max(Math.min($scope.pageNumber, maxPage), 1);
		$scope.bandsDisplay = bands.slice( ($scope.pageNumber-1)*itemsPerPage, $scope.pageNumber*itemsPerPage);
	}

	$scope.pickMe = function(pickedBand){
		band = pickedBand;
	}
})
.controller('bandController', function($scope, $http){
	$scope.dataLoading = true;
	$http.post('../ScruffyScrape/Scruffy/BandService/band', band).success(function(response){
		band = response;
		console.log(band);
	}).finally(function(){
		$scope.band = band;
		$scope.dataLoading = false;
	});
});