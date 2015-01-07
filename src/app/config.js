define(['./ignisLibriColloqui'],function(ignisLibriColloqui){
  return ignisLibriColloqui.config(['$stateProvider', '$urlRouterProvider',function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController'
      });
      
    $urlRouterProvider.otherwise('/');
  }])
});