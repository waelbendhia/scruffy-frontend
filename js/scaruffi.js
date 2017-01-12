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

	$scope.scores = [];
	$scope.bandsInfluential = []
	$scope.max = 0;
	$scope.total = 0;
	$scope.dataLoading = true;

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
		},
		function(data){
			$scope.loadingError = true;
		}
	);
	MusicService.getBandTotal().then(
		function(response){
			$scope.bandsTotal = response.data;
		},
		function(data){
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
.controller('bandsController', function($scope, $timeout, MusicService, selectionService){
	selectionService.selectMusic();

	var itemsPerPage = 12;
	var bandsFiltered = [];
	var _timeout;
	var loadBands = function(keepPage){
		if(!keepPage){
			$scope.searchRequest.page = 0;
			MusicService.searchBandsCount($scope.searchRequest).then(
				function(response){
					$scope.maxPage = Math.ceil(response.data / itemsPerPage);
				},
				function(data){
					$scope.loadingError = true;
				});
		}
		MusicService.searchBands($scope.searchRequest).then(
			function(response){
				$scope.bands = response.data;
				$scope.dataLoading = false;
				$scope.loadingError = false;
			},
			function(data){
				$scope.dataLoading = false;
				$scope.loadingError = true;
			});
	}

	$scope.searchRequest = {
		name: "",
		page: 0,
		numberOfResults: itemsPerPage
	};

	$scope.bands = [];
	$scope.dataLoading = true;
	$scope.loadingError = false;
	$scope.maxPage = 0;

	$scope.updateFilter = function(keepPage){
		$scope.dataLoading = true;
		if(_timeout){
			$timeout.cancel(_timeout);
		}
		_timeout = $timeout(function(){
			loadBands(keepPage);
	      _timeout = null;
	    },500);
	};

	$scope.changePage = function(pages){
		$scope.searchRequest.page = Math.min(Math.max($scope.searchRequest.page + pages, 0), $scope.maxPage-1);
		$scope.updateFilter(true);
	}

	loadBands(false);
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
	$scope.paragraphs = [];

	MusicService.getFullBand(postBand).then(
		function success(response){
			$scope.band = response.data;
			$scope.paragraphs = $scope.band.bio.split(/(\r|\n){3}/)
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
	var itemsPerPage = 9;
	var date = new Date();

	var loadAlbums = function(keepPage){
		if(!keepPage){
			$scope.searchRequest.page = 0;
			MusicService.searchAlbumsCount($scope.searchRequest).then(
				function success(response){
					$scope.maxPage = Math.ceil(response.data / itemsPerPage);
				},
				function error(response){
					$scope.loadingError = true;
				});
		}
		MusicService.searchAlbums($scope.searchRequest).then(
			function success(response){
				console.log(response.data[0])
				$scope.albums = response.data;
				$scope.dataLoading = false;
				$scope.loadingError = false;
			},
			function error(response){
				$scope.dataLoading = false;
				$scope.loadingError = true;
			});
	}
	
	$scope.albums = [];
	$scope.dataLoading = true;
	$scope.maxPage = 0;

	if(typeof $routeParams.rating == "undefined"){
		$scope.searchRequest = {
			name: "",
			yearLower: 1950,
			yearHigher: date.getFullYear(),
			ratingLower: 0,
			ratingHigher: 10,
			includeUnknown: true,
			page: 0,
			numberOfResults: itemsPerPage,
			sortBy: 0,
			sortOrderAsc: false
		};
	}else{
		$scope.searchRequest = {
			name: "",
			yearLower: 1950,
			yearHigher: date.getFullYear(),
			ratingLower: Math.min(Math.max($routeParams.rating, 0), 10),
			ratingHigher: Math.min(Math.max($routeParams.rating, 0), 10),
			includeUnknown: true,
			page: 0,
			numberOfResults: itemsPerPage,
			sortBy: 0,
			sortOrderAsc: false
		};
	}

	$scope.getFullYear = function(){
		return date.getFullYear();
	}
	
	$scope.changePage = function(pages){
		$scope.searchRequest.page = Math.min(Math.max($scope.searchRequest.page + pages, 0), $scope.maxPage-1);
		$scope.updateFilter(true);
	}

	$scope.updateFilter = function(keepPage){
		$scope.dataLoading = true;
		if(_timeout){
			$timeout.cancel(_timeout);
		}
		_timeout = $timeout(function(){
			loadAlbums(keepPage);
	      _timeout = null;
	    },500);
	};

	loadAlbums(false);
})
.service('MusicService', function($http, $cacheFactory){

	this.searchBands = function(searchRequest){
		return $http.post('../MusicService/bands/search', searchRequest);	
	}

	this.searchBandsCount = function(searchRequest){
		return $http.post('../MusicService/bands/searchCount', searchRequest);	
	}
	
	this.getFullBand = function(band){
		return $http.get('../MusicService/band/'+band.url, {cache: true});
	}

	this.getBandPhoto = function(band){
		return $http.get(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${band.name}&api_key=39720b3f01a98c70c1f32e82b71499e1&format=json`, {cache: true});
	}

	this.getScoreDistribution = function(){
		return $http.get('../MusicService/ratings/distribution', {cache: true});
	}

	this.getBandTotal = function(){
		return $http.get('../MusicService/bands/total', {cache: true});	
	}

	this.getBandsInfluential = function(){
		return $http.get('../MusicService/bands/influential', {cache: true});
	}

	this.searchAlbums = function(searchRequest){
		return $http.post('../MusicService/albums/search', searchRequest);	
	}

	this.searchAlbumsCount = function(searchRequest){
		return $http.post('../MusicService/albums/searchCount', searchRequest);	
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
})
.directive('convertSortByToString', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function(val) {
        return val;
      });
      ngModel.$formatters.push(function(val) {
        return '' + val;
      });
    }
  };
})
.filter('ampersand', function(){
	return function(input){
		return input ? input.replace(/&amp;/g, '&') : '';
	}
})
.filter('trim', function(){
	return function(input){
		if(!angular.isString(input)) {
			return input;
		}
		return input.trim();
	}
})
.filter('initials', function(){
	return function(input){
		if(!angular.isString(input)){
			return input;
		}
		var words = input.match(/\b\w/g) || [];
		var initials = ''
		while(words.length > 0)
			initials += words.shift() || ''
		return initials.toUpperCase();
	}
});