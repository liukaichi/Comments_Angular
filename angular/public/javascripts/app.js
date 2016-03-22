angular.module('comment', [])
.controller('MainCtrl', [
  '$scope','$http',
  function($scope, $http){
      $scope.comments = [];	
		
		 $scope.addComment = function() {
			if($scope.formContent === '') { return; }
		  console.log("In addComment with "+$scope.formContent);
		  var tagArray = ($scope.tags).split(",");
		  $scope.create({
			title: $scope.formContent,
			upvotes: 0,
			tags: tagArray
		  });
		  console.log(tagArray);
		  console.log($scope.tags);
		  $scope.formContent = '';
		};
			
		 $scope.incrementUpvotes = function(comment) {
		  $scope.upvote(comment);
		};
		
		  $scope.upvote = function(comment) {
      return $http.put('/comments/' + comment._id + '/upvote')
        .success(function(data){
          comment.upvotes += 1;
        });
    };
		  
		
	  $scope.create = function(comment) {
		return $http.post('/comments', comment).success(function(data){
		  $scope.comments.push(data);
		});
	  };
	  
		$scope.getAll = function() {
		return $http.get('/comments').success(function(data){
		  angular.copy(data, $scope.comments);
		});
	  };
	  $scope.getAll();
  }
  
  
  
  
]);

