var NShop = angular.module('NShop', ['ui.router']);

NShop.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('', '/admin/categories');

    $stateProvider
        .state('admin', {
            url: '/admin',
            templateUrl: 'src/js/app/admin/admin.html',
            controller: function ($rootScope) { $rootScope.bodyClass = 'admin'; }
        })
        // Admin Categories
        .state('admin.categories', {
            url: '/categories',
            templateUrl: 'src/js/app/admin/categories/list.html',
            controller: 'AdminCategoriesList'
        })
        .state('admin.categories.detail', {
            url: '/:categoryId',
            templateUrl: 'src/js/app/admin/categories/detail.html'
        })
        // Admin Category Products
        .state('admin.category-products', {
            url: '/categories/:categoryId/products',
            templateUrl: 'src/js/app/admin/categoryProducts/list.html',
            controller: 'AdminCategoryProductsList'
        })
        .state('admin.category-products.detail', {
            url: '/:productId',
            templateUrl: 'src/js/app/admin/categoryProducts/detail.html'
        })
        // Admin Products
        .state('admin.products', {
            url: '/products',
            templateUrl: 'src/js/app/admin/products/list.html',
            controller: 'AdminProductsList'
        })
        .state('admin.products.detail', {
            url: '/:productId',
            templateUrl: 'src/js/app/admin/products/detail.html'
        })
        // Admin Users
        .state('admin.users', {
            url: '/users',
            templateUrl: 'src/js/app/admin/users/list.html',
            controller: 'AdminUsersList'
        })
        // Admin Orders
        .state('admin.orders', {
            url: '/orders',
            templateUrl: 'src/js/app/admin/orders/list.html',
            controller: 'AdminOrdersList'
        });
});