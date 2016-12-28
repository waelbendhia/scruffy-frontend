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
	.when('/albums', {
		templateUrl:'albumSearchView.html',
		controller: 'albumSearchController'
	})
	.when('/albums/:rating', {
		templateUrl:'albumSearchView.html',
		controller: 'albumSearchController'
	})
	.otherwise({
		templateUrl:'error.html'
	});
})
.controller('scaruffiController', function($scope, selectionService){
	$scope.hideHeader = false;
	$scope.musicSelected = false;
	$scope.filmSelected = false;
	$scope.$on('handleBroadcast', function() {
		$scope.hideHeader = selectionService.hideHeader;
		$scope.musicSelected = selectionService.music;
		$scope.filmSelected = selectionService.film;
	});
	
})
.controller('landingController', function($scope, MusicService, selectionService){
	selectionService.selectNone();
	$scope.hello = "Hello";
	$scope.scores = [];
	$scope.bandsInfluential = []
	$scope.max = 0;
	$scope.total = 0;
	MusicService.getScoreDistribution().then(
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
	MusicService.getBandTotal().then(
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
	MusicService.getBandsInfluential().then(
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
.controller('bandsController', function($scope, MusicService, selectionService){
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

	MusicService.getAllBands().then(
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
.controller('bandController', function($scope, $routeParams, MusicService, selectionService){
	selectionService.selectMusic();

	var postBand = {
		url:  $routeParams.volume + "/" + $routeParams.url
	};

	$scope.pageClass = 'page-band';
	$scope.dataLoading = true;
	$scope.loadingError = false;
	$scope.selectedSection = 0;

	MusicService.getFullBand(postBand).then(
		function success(response){
			$scope.band = response.data;
			$scope.dataLoading = false;
			$scope.loadingError = (typeof $scope.band.name) == "undefined";
			$scope.selectedSection = $scope.band.albums.length == 0 && $scope.band.relatedBands.length == 0 ? 1 : 0;
		},
		function error(response){
			$scope.dataLoading = false;
			$scope.loadingError = true;
		});

	$scope.selectSection = function(ind){
		$scope.selectedSection = ind;
	}
})
.controller('albumSearchController', function($scope, $routeParams, $timeout, MusicService, selectionService){
	selectionService.selectMusic();

	var _timeout;
	var itemsPerPage = 64;
	
	$scope.albums = [];

	$scope.searchRequest = {
		name: "",
		yearLower: 0,
		yearHigher: 0,
		ratingLower: $routeParams.rating,
		ratingHigher: $routeParams.rating,
		includeUnknown: true
	};

	$scope.updateFilter = function(){
		if(_timeout){
			$timeout.cancel(_timeout);
		}
		_timeout = $timeout(function(){
			MusicService.searchAlbums($scope.searchRequest).then(
			function success(response){
				console.log(response.data);
				$scope.albums = response.data;
				$scope.maxPage = Math.ceil($scope.albums.length / itemsPerPage);
				$scope.dataLoading = false;
				$scope.loadingError = false;
			},
			function error(response){
				$scope.dataLoading = false;
				$scope.loadingError = true;
			});
	      _timeout = null;
	    },500);
	};

	MusicService.searchAlbums($scope.searchRequest).then(
		function success(response){
			$scope.albums = response.data;
			$scope.maxPage = Math.ceil($scope.albums.length / itemsPerPage);
			$scope.dataLoading = false;
			$scope.loadingError = false;
		},
		function error(response){
			$scope.dataLoading = false;
			$scope.loadingError = true;
		});
})
.service('MusicService', function($http, $cacheFactory){

	this.getAllBands = function(){
		return $http.get('../ScruffyScrape/Scruffy/MusicService/bands', {cache: true});
	}

	this.getFullBand = function(band){
		return $http.get('../ScruffyScrape/Scruffy/MusicService/band/'+band.url, {cache: true});
	}

	this.getScoreDistribution = function(){
		return $http.get('../ScruffyScrape/Scruffy/MusicService/ratings/distribution', {cache: true});
	}

	this.getBandTotal = function(){
		return $http.get('../ScruffyScrape/Scruffy/MusicService/bands/total', {cache: true});	
	}

	this.getBandsInfluential = function(){
		return $http.get('../ScruffyScrape/Scruffy/MusicService/bands/influential', {cache: true});
	}

	this.searchAlbums = function(searchRequest){
		return $http.post('../ScruffyScrape/Scruffy/MusicService/albums/search', searchRequest);	
	}

})
.factory("selectionService",function($rootScope){
	var selection = {music: false, film: false, hideHeader: false};

	selection.selectMusic = function(){
		this.hideHeader = false;
		this.music = true;
		this.film = false;
		this.broadcastSelection();
	};

	selection.selectFilm = function(){
		this.hideHeader = false;
		this.music = false;
		this.film = true;
		this.broadcastSelection();
	};

	selection.selectNone = function(){
		this.hideHeader = true;
		this.music = false;
		this.film = false;
		this.broadcastSelection();
	};

	selection.broadcastSelection = function() {
		$rootScope.$broadcast('handleBroadcast');
	};

	return selection;
});;