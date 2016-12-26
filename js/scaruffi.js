var app = angular.module('scaruffiApp', ['ngAnimate', 'ngRoute']);

var bands = [];

app.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl:'bandsView.html',
		controller: 'bandsController'
	})
	.when('/band/:volume/:url', {
		templateUrl:'bandView.html',
		controller: 'bandController'
	})
	.otherwise({
		templateUrl:'error.html'
	});
})
.controller('scaruffiController', function($scope, $http, musicSelected){
	$scope.musicSelected = musicSelected.selected;
})
.controller('bandsController', function($scope, $http, $timeout, BandService, musicSelected){
	musicSelected.selected = false;
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
.controller('bandController', function($scope, $http, $routeParams, $cacheFactory, BandService, musicSelected){
	musicSelected.selected = true;

	var postBand = {
		url:  $routeParams.volume + "/" + $routeParams.url
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
.service('BandService', function($http, $cacheFactory){
	this.getAllBands = function(){
		var cache = $cacheFactory.get('$http');
		console.log(cache.get('../ScruffyScrape/Scruffy/BandService/bands'));
		if(bands.length == 0){
			//
			//data/bands.json
			return $http.get('../ScruffyScrape/Scruffy/BandService/bands', {cache: true});
		}else{
			return new Promise(function(resolve, reject){
				resolve({data: bands});
			});
		}
	}
	this.getFullBand = function(band){
		var cache = $cacheFactory.get('$http');
		console.log(cache.get('../ScruffyScrape/Scruffy/BandService/band/'+band.url));
		return $http.get('../ScruffyScrape/Scruffy/BandService/band/'+band.url, {cache: true});
	}
})
.factory("musicSelected",function(){
	return {selected: true};
});;