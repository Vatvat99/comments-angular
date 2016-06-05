'use strict';

/**
 * Controlleurs gérant la liste des articles
 */
app.controller('PostsCtrl', function ($scope, $rootScope, Posts) {

    // On affiche un message de chargement
    $rootScope.loading = true;
    // On interroge la factory pour récupèrer les articles
    Posts.findAll()
        .then(
            // Le chargement des articles a réussi
            function(posts) {
                // On masque le message de chargement
                $rootScope.loading = false;
                // On passe les articles à la vue
                $scope.posts = posts;
            },
            // Le chargement des articles a échoué
            function(message) {
                // On affiche une alerte
                alert(message);
            }
        )
    ;

});
