var app = angular.module('scaruffiApp', ['ngAnimate', 'ngRoute']);

var bands = [];

app.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl:'bandsView.html',
		controller: 'bandsController'
	})
	.when('/band/:name/:volume/:url', {
		templateUrl:'bandView.html',
		controller: 'bandController'
	})
	.otherwise({
		templateUrl:'error.html'
	});
});

app.controller('scaruffiController', function($scope, $http){
})
.controller('bandsController', function($scope, $http, $timeout, BandService){
	$scope.pageClass = 'page-bands';
	var itemsPerPage = 64;
	var bandsFiltered = [];

	$scope.dataLoading = true;
	$scope.loadingError = false;
	$scope.pageNumber = 1;
	$scope.maxPage;
	$scope.filterText = "";
	$scope.changingBands = false;

	function filterArtist(artist){
		return artist.name.toLowerCase().includes($scope.filterText.toLowerCase());
	}

	function updateBandsDisplay(){
		bandsFiltered = bands.filter(filterArtist);
		$scope.maxPage = Math.ceil(bandsFiltered.length / itemsPerPage);
		$scope.pageNumber = Math.min($scope.maxPage, Math.max($scope.pageNumber, 1));
		$scope.bandsDisplay = bandsFiltered.slice( ($scope.pageNumber-1)*itemsPerPage, $scope.pageNumber*itemsPerPage);
	}

	BandService.getAllBands().then(
		function(response){
			bands = response.data;
			updateBandsDisplay();
			$scope.dataLoading = false;
			$scope.loadingError = bands.length == 0;
		},
		function(data){
			$scope.dataLoading = false;
			$scope.loadingError = true;
		});

	$scope.changePage = function(ind){
		$scope.pageNumber += ind;
		updateBandsDisplay()
	}

	$scope.updateFilter = function(){
		updateBandsDisplay();
	}
})
.controller('bandController', function($scope, $http, $routeParams, BandService){

	var postBand = {
		name: $routeParams.name,
		url:  $routeParams.volume + "/" + $routeParams.url + ".html"
	};

	$scope.pageClass = 'page-band';
	$scope.dataLoading = true;
	$scope.loadingError = false;
	$scope.selectedSection = 0;

	BandService.getFullBand(postBand).then(
		function success(response){
			$scope.band = response.data;
			$scope.dataLoading = false;
			$scope.loadingError = (typeof $scope.band.name) == "undefined";
		},
		function error(response){
			console.log(response);
			$scope.dataLoading = false;
			$scope.loadingError = true;
		});

	$scope.selectSection = function(ind){
		$scope.selectedSection = ind;
	}
})
.service('BandService', function($http){
	this.getAllBands = function(){
		if(bands.length == 0){
			//../ScruffyScrape/Scruffy/BandService/bands
			return $http.get('data/bands.json');
		}else{
			return new Promise(function(resolve, reject){
				resolve({data: bands});
			});
		}
	}
	this.getFullBand = function(band){
		return $http.post('../ScruffyScrape/Scruffy/BandService/band', band);
	}
	this.getZappa = function(){
		return $http.post('data/defaultBand.json');
	}
});