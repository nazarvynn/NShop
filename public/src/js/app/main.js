var NShop = angular.module('NShop', ['ui.router']);

NShop.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('', '/admin');

    $stateProvider
        .state('admin', {
            url: '/admin',
            templateUrl: 'src/js/app/admin/admin.html'
        })
        .state('admin.categories', {
            url: '/categories',
            templateUrl: 'src/js/app/admin/categories/list.html',
            controller: 'AdminCategoriesList'
        })
        .state('admin.categories.detail', {
            url: '/:categoryId',
            templateUrl: 'src/js/app/admin/categories/detail.html',
            controller: 'AdminCategoriesDetail'
        })
        .state('admin.users', {
            url: '/users',
            templateUrl: 'src/js/app/admin/users/users.html',
            controller: 'AdminUsers'
        });
});