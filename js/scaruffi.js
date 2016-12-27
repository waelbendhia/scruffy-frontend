var app = angular.module('scaruffiApp', ['ngAnimate', 'ngRoute']);

var bands = [];

app.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl:'landing.html',
		controller: 'landingController'
	})
	.when('/bands', {
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
.controller('scaruffiController', function($scope, $http, selectionService){
	$scope.musicSelected = false;
	$scope.filmSelected = false;
	$scope.$on('handleBroadcast', function() {
		$scope.musicSelected = selectionService.music;
		$scope.filmSelected = selectionService.film;
	});
	
})
.controller('landingController', function($scope, BandService, selectionService){
	selectionService.selectNone();
	$scope.hello = "Hello";
	$scope.scores = [];
	$scope.bandsInfluential = []
	$scope.max = 0;
	$scope.total = 0;
	BandService.getScoreDistribution().then(
		function(response){
			for (var i = 0; i <= 20; i ++) {
				var number = response.data[(i/2).toFixed(1)];
				$scope.scores[i] = number == null ? 0 : number;
				$scope.max = Math.max($scope.scores[i], $scope.max);
				$scope.total += $scope.scores[i];
			}
			for (var i = 0; i <= 20; i ++) {
				$scope.scores[i] = Math.round(($scope.scores[i]/$scope.total)*10000)/100;
			}
			$scope.dataLoading = false;
			$scope.loadingError = false;
		},
		function(data){
			$scope.dataLoading = false;
			$scope.loadingError = true;
		}
	);
	BandService.getBandTotal().then(
		function(response){
			$scope.bandsTotal = response.data;
			$scope.dataLoading = false;
			$scope.loadingError = false;
		},
		function(data){
			$scope.dataLoading = false;
			$scope.loadingError = true;
		}
	);
	BandService.getBandsInfluential().then(
		function(response){
			$scope.bandsInfluential = response.data;
			$scope.dataLoading = false;
			$scope.loadingError = false;
		},
		function(data){
			$scope.dataLoading = false;
			$scope.loadingError = true;
		}
	);


})
.controller('bandsController', function($scope, $http, $timeout, BandService, selectionService){
	selectionService.selectMusic();
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
.controller('bandController', function($scope, $http, $routeParams, $cacheFactory, BandService, selectionService){
	selectionService.selectMusic();

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
			$scope.selectedSection = $scope.band.albums.length ==0 && $scope.band.relatedBands.length ==0 ? 1 : 0;
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
		return $http.get('../ScruffyScrape/Scruffy/BandService/band/'+band.url, {cache: true});
	}
	this.getScoreDistribution = function(){
		return $http.get('../ScruffyScrape/Scruffy/BandService/ratings/distribution', {cache: true});
	}
	this.getBandTotal = function(){
		return $http.get('../ScruffyScrape/Scruffy/BandService/bands/total', {cache: true});	
	}
	this.getBandsInfluential = function(){
		return $http.get('../ScruffyScrape/Scruffy/BandService/bands/influential', {cache: true});
	}
})
.factory("selectionService",function($rootScope){
	var selection = {music: false, film: false};

	selection.selectMusic = function(){
		this.music = true;
		this.film = false;
		this.broadcastSelection();
	};

	selection.selectFilm = function(){
		this.music = false;
		this.film = true;
		this.broadcastSelection();
	};

	selection.selectNone = function(){
		this.music = false;
		this.film = false;
		this.broadcastSelection();
	};

	selection.broadcastSelection = function() {
		$rootScope.$broadcast('handleBroadcast');
	};

	return selection;
});;