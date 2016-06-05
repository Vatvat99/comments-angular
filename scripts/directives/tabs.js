'use strict';

/**
 * Directive affichant des onglets
 */
app.directive('appTabs', function() {

    return {
        restrict: 'E',
        templateUrl: 'views/tabs.html',
        transclude: true, // injecte le code html à l'intérieur de la directive
        scope: {},
        controller: function($scope) {
            $scope.tabs = [];

            // Pour chaque onglet
            this.add = function(tab) {
                // On sélectionne le premier onglet qui va être affiché par défaut
                if ($scope.tabs.length == 0) {
                    $scope.select(tab);
                }
                // On ajoute à la liste des onglet l'onglet
                $scope.tabs.push(tab);
            }

            // Sélectionne l'onglet sur lequel on a cliqué
            $scope.select = function(tab) {
                angular.forEach($scope.tabs, function(t) {
                    t.selected = false;
                });
                tab.selected = true;
            }
        }
    };

});

/**
 * Directive affichant des onglets
 */
app.directive('appTab', function() {

    return {
        restrict: 'E',
        templateUrl: 'views/tab.html',
        transclude: true,
        scope: {
            title: '@' // récupère la valeur de l'attribut "title" au format texte
        },
        require: '^appTabs', // inclus le contrôleur de la directive appTabs
        link: function(scope, element, attrs, tabsCtrl) {
            // L'onglet est déselectionné par défaut
            scope.selected = false;
            // Pour chaque onglet, on envoie le scope au controlleur de la directive parent
            tabsCtrl.add(scope);
        }
    };

});
