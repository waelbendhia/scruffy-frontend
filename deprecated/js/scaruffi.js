"use strict";

var app = angular.module('scaruffiApp', ['ngAnimate', 'ngRoute']);

var bands = [];

app.config(['$routeProvider', function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'landing.html',
				controller: 'landingController',
				resolve: {
					bandsTotal: ['MusicService', function (MusicService) {
						return MusicService.getBandTotal();
					}],
					scoreDistribution: ['MusicService', function (MusicService) {
						return MusicService.getScoreDistribution();
					}],
					bandsInfluential: ['MusicService', function (MusicService) {
						return MusicService.getBandsInfluential();
					}]
				}
			})
			.when('/bands', {
				templateUrl: 'bandsView.html',
				controller: 'bandsController'
			})
			.when('/band/:volume/:url', {
				templateUrl: 'bandView.html',
				controller: 'bandController',
				resolve: {
					bandFull: ['MusicService', '$route', function (MusicService, $route) {
						return MusicService.getFullBand({
							url: $route.current.params.volume + "/" + $route.current.params.url
						});
					}]
				}
			})
			.when('/albums', {
				templateUrl: 'albumSearchView.html',
				controller: 'albumSearchController'
			})
			.when('/albums/:rating', {
				templateUrl: 'albumSearchView.html',
				controller: 'albumSearchController'
			})
			.otherwise({
				templateUrl: 'error.html'
			});
	}])
	.controller('scaruffiController', function ($scope, selectionService) {
		$scope.hideHeader = false;
		$scope.musicSelected = false;
		$scope.filmSelected = false;
		$scope.$on('handleBroadcast', function () {
			$scope.hideHeader = selectionService.hideHeader;
			$scope.musicSelected = selectionService.music;
			$scope.filmSelected = selectionService.film;
		});

	})
	.controller('landingController', function ($scope, selectionService, bandsTotal, scoreDistribution, bandsInfluential) {
		$scope.bandsTotal = bandsTotal.data;
		var max = 0;
		$scope.total = 0;
		$scope.scores = [];
		$scope.bandsInfluential = bandsInfluential.data;
		$scope.dataLoading = true;
		for (let i = 0; i <= 20; i++) {
			const number = scoreDistribution.data[(i / 2).toFixed(1)];
			$scope.scores[i] = number ? number : 0;
			$scope.max = Math.max($scope.scores[i], $scope.max);
			$scope.total += $scope.scores[i];
		}
		for (let i = 0; i <= 20; i++) {
			$scope.scores[i] = Math.round(($scope.scores[i] / $scope.total) * 10000) / 100;
		}
		selectionService.selectNone();
	})
	.controller('bandsController', function ($scope, $timeout, MusicService, selectionService) {
		selectionService.selectMusic();

		var itemsPerPage = 12;
		var _timeout;

		function loadBands(keepPage) {
			if (!keepPage) {
				$scope.searchRequest.page = 0;
				MusicService.searchBandsCount($scope.searchRequest)
					.then(function (response) {
						$scope.maxPage = Math.ceil(response.data / itemsPerPage);
					}).catch(function () {
						$scope.loadingError = true;
					});
			}
			MusicService.searchBands($scope.searchRequest)
				.then(function (response) {
					$scope.bands = response.data;
					$scope.dataLoading = false;
					$scope.loadingError = false;
				})
				.catch(function () {
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

		$scope.updateFilter = function (keepPage) {
			$scope.dataLoading = true;
			if (_timeout) {
				$timeout.cancel(_timeout);
			}
			_timeout = $timeout(function () {
				loadBands(keepPage);
				_timeout = null;
			}, 500);
		};

		$scope.changePage = function (pages) {
			$scope.searchRequest.page = Math.min(Math.max($scope.searchRequest.page + pages, 0), $scope.maxPage - 1);
			$scope.updateFilter(true);
		};

		loadBands(false);
	})
	.controller('bandController', function ($scope, selectionService, bandFull) {
		selectionService.selectMusic();

		$scope.pageClass = 'page-band';
		$scope.band = bandFull.data;
		$scope.paragraphs = $scope.band.bio.split(/(\r|\n){3}/);
		$scope.loadingError = (typeof $scope.band.name) == "undefined";
		$scope.selectedSection = $scope.band.albums.length === 0 && $scope.band.relatedBands.length === 0 ? 1 : 0;

		$scope.selectSection = function (ind) {
			$scope.selectedSection = ind;
		};
	})
	.controller('albumSearchController', function ($scope, $routeParams, $timeout, MusicService, selectionService) {
		selectionService.selectMusic();

		var _timeout;
		var itemsPerPage = 9;
		var date = new Date();

		function loadAlbums(keepPage) {
			if (!keepPage) {
				$scope.searchRequest.page = 0;
				MusicService.searchAlbumsCount($scope.searchRequest)
					.then(function (response) {
						$scope.maxPage = Math.ceil(response.data / itemsPerPage);
					})
					.catch(function () {
						$scope.loadingError = true;
					});
			}
			MusicService.searchAlbums($scope.searchRequest)
				.then(function (response) {
					$scope.albums = response.data;
					$scope.dataLoading = false;
					$scope.loadingError = false;
				}).catch(function () {
					$scope.dataLoading = false;
					$scope.loadingError = true;
				});
		}

		$scope.albums = [];
		$scope.dataLoading = true;
		$scope.maxPage = 0;

		if (typeof $routeParams.rating == "undefined") {
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
		} else {
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

		$scope.getFullYear = function () {
			return date.getFullYear();
		};

		$scope.changePage = function (pages) {
			$scope.searchRequest.page = Math.min(Math.max($scope.searchRequest.page + pages, 0), $scope.maxPage - 1);
			$scope.updateFilter(true);
		};

		$scope.updateFilter = function (keepPage) {
			$scope.dataLoading = true;
			if (_timeout) {
				$timeout.cancel(_timeout);
			}
			_timeout = $timeout(function () {
				loadAlbums(keepPage);
				_timeout = null;
			}, 500);
		};

		loadAlbums(false);
	})
	.service('MusicService', function ($http) {

		this.searchBands = function (searchRequest) {
			return $http.post('../MusicService/bands/search', searchRequest);
		};

		this.searchBandsCount = function (searchRequest) {
			return $http.post('../MusicService/bands/searchCount', searchRequest);
		};

		this.getFullBand = function (band) {
			return $http.get('../MusicService/band/' + band.url, {
				cache: true
			});
		};

		this.getBandPhoto = function (band) {
			return $http.get(`http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${band.name}&api_key=39720b3f01a98c70c1f32e82b71499e1&format=json`, {
				cache: true
			});
		};

		this.getScoreDistribution = function () {
			return $http.get('../MusicService/ratings/distribution', {
				cache: true
			});
		};

		this.getBandTotal = function () {
			return $http.get('../MusicService/bands/total', {
				cache: true
			});
		};

		this.getBandsInfluential = function () {
			return $http.get('../MusicService/bands/influential', {
				cache: true
			});
		};

		this.searchAlbums = function (searchRequest) {
			return $http.post('../MusicService/albums/search', searchRequest);
		};

		this.searchAlbumsCount = function (searchRequest) {
			return $http.post('../MusicService/albums/searchCount', searchRequest);
		};

	})
	.factory("selectionService", function ($rootScope) {
		var selection = {
			music: false,
			film: false,
			hideHeader: false
		};

		selection.selectMusic = function () {
			this.hideHeader = false;
			this.music = true;
			this.film = false;
			this.broadcastSelection();
		};

		selection.selectFilm = function () {
			this.hideHeader = false;
			this.music = false;
			this.film = true;
			this.broadcastSelection();
		};

		selection.selectNone = function () {
			this.hideHeader = true;
			this.music = false;
			this.film = false;
			this.broadcastSelection();
		};

		selection.broadcastSelection = function () {
			$rootScope.$broadcast('handleBroadcast');
		};

		return selection;
	})
	.directive('convertSortByToString', function () {
		return {
			require: 'ngModel',
			link: function (scope, element, attrs, ngModel) {
				ngModel.$parsers.push(function (val) {
					return val;
				});
				ngModel.$formatters.push(function (val) {
					return '' + val;
				});
			}
		};
	})
	.filter('ampersand', function () {
		return function (input) {
			return input ? input.replace(/&amp;/g, '&') : '';
		};
	})
	.filter('trim', function () {
		return function (input) {
			return !angular.isString(input) ? input : input.trim();
		};
	})
	.filter('initials', function () {
		return function (input) {
			if (!angular.isString(input))
				return input;
			var words = input.match(/\b\w/g) || [];
			var initials = '';
			while (words.length > 0) initials += words.shift() || '';
			return initials.toUpperCase();
		};
	});