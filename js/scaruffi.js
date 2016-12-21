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
.controller('bandsController', function($scope, $http, $timeout, BandService){
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
			$scope.loadingError = true;
		});

	$scope.changePage = function(ind){
		$scope.pageNumber += ind;
		updateBandsDisplay()
	}

	$scope.updateFilter = function(){
		updateBandsDisplay();
	}

	$scope.pickMe = function(pickedBand){
		band = pickedBand;
	}
})
.controller('bandController', function($scope, $http, BandService){
	$scope.dataLoading = true;
	$scope.loadingError = false;
	BandService.getFullBand(band).then(
		function success(response){
			band = response.data;
			$scope.band = band;
			$scope.dataLoading = false;
			$scope.loadingError = (typeof band.name) == "undefined";
		},
		function error(response){
			$scope.dataLoading = false;
			$scope.loadingError = true;
		});
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
});