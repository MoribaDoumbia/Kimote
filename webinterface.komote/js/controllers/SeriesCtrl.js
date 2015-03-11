app.controller('SeriesCtrl', function($scope,$http,$location) {
	
	$scope.showSeries = function() {
		method = "VideoLibrary.GetTVShows";
		params = '{"limits": { "start" : 0, "end": 100}, "properties": ["art", "genre", "plot", "title", "originaltitle", "year", "rating", "thumbnail", "playcount", "file"], "sort": { "order": "ascending", "method": "label" } }, "id": "libTvShows"';
	
		getSeries($http,method,params);
	};

	function getSeries($http,method,params) {

		param_url = '/jsonrpc?request={"jsonrpc":"2.0","method":"' + method + '", "params":' + params + '}';
		complete_url = window.base_url + param_url;

		$http.jsonp(complete_url, {params: {callback: 'JSON_CALLBACK', format: 'json'}})
		.success(function(data, status, headers, config) {
			$scope.tvshows = data.result.tvshows;
		})
		.error(function(data, status, headers, config) {
			console.log('Data: ' + data);
            console.log('Status: ' + status);
            console.log('Headers: ' + headers);
            console.log('Config: ' + config);
		});
	}

	$scope.Math = window.Math;

	$scope.toHours = function (duration) {
		//var sec_num = parseInt(duration, 10);
		var hours = Math.floor(duration/3600);
		var minutes = Math.floor((duration - (hours*3600))/60);
		//var seconds = duration - (hours*3600) - (minutes*60);

		if (minutes < 10) {
			minutes = "0" + minutes;
		}
		var time = hours + 'h' + minutes;
		return time;
	};

	$scope.getThumbnailSeries = function (thumbnailUri) {
		thumbnailUri = thumbnailUri.replace("image://","").replace("jpg/","jpg");
		$scope.thumbnailUriDecoded = decodeURIComponent(thumbnailUri);
		
		return $scope.thumbnailUriDecoded;
	};

	$scope.selectedSeries = undefined;
	$scope.selectSeries = function (index) {
		if ($scope.selectedSeries !== index) {
			$scope.selectedSeries = index;
		}
		else {
			$scope.selectedSeries = undefined;
		}
	};
});