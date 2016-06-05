'use strict';

/**
 * Controlleur gérant l'affichage d'un article
 */
app.controller('SingleCtrl', function ($scope, $rootScope, Posts, $routeParams) {

    // On affiche un message de chargement
    $rootScope.loading = true;

    Posts.getOne($routeParams.id)
        .then(
            // Le chargement de l'article a réussi
            function(post) {
                // On masque le message de chargement
                $rootScope.loading = false;
                // On passe les données à la vue
                $scope.post = post;
                $scope.comments = post.comments;
            },
            // Le chargement de l'article a échoué
            function(message) {
                // On affiche une alerte
                alert(message);
            }

        )
    ;

    // On passe à la vue un commentaire vide pour le formulaire
    $scope.newComment = {};

    // Lorque le formulaire est posté
    $scope.addComment = function() {
        if (Object.keys($scope.newComment).length != 0) {
            // On ajoute le commentaire à la liste des commentaires
            $scope.comments.push($scope.newComment);
            // On sauvegarde au niveau du serveur
            Posts.addComment($scope.newComment).then(
                function() {

                },
                function() {
                    alert('Votre commentaire n\'a pas été sauvegardé');
                }
            );
            // Et on vide le formulaire
            $scope.newComment = {};
        }
    };

});
