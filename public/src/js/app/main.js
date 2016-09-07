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
        .state('admin.products', {
            url: '/categories/:categoryId/products',
            templateUrl: 'src/js/app/admin/products/list.html',
            controller: 'AdminProductsList'
        })
        .state('admin.users', {
            url: '/users',
            templateUrl: 'src/js/app/admin/users/users.html',
            controller: 'AdminUsers'
        });
});