'use strict';

/**
 * Factory pour servir les articles (données)
 *
 * $http : service permettant de faire de l'ajax
 * $q : service permettant de faire des promesses
 * $timeout : service permettande délayer l'éxécution du code (simule un délai de chargement)
 */
app.factory('Posts', function($http, $q, $timeout) {

    var factory = {

        posts: false,

        findAll: function() {
            // On initialise la promesse
            var deferred = $q.defer();
            // Si les articles on déjà été chargé
            if (factory.posts != false) {
                // On les renvoie directement
                deferred.resolve(factory.posts);
            } else {
                // Sinon, on récupère les articles an interrogeant l'url "data/posts.json"
                // On pourrait se contenter de simplement retourner le
                // $http.get() directement, car il renvoie en fait une promesse
                // Le code pourrait donc être simplifié, le code actuel détaille
                // le fonctionnement des promesses
                $http.get('data/posts.json')
                    .success( function(data, status) {
                        // L'appel a bien fonctionné, on stocke les
                        // articles dans la factory
                        factory.posts = data;
                        // On signale que l'appel à bien fonctionné, avec un faux délai
                        $timeout(function() {
                            deferred.resolve(factory.posts);
                        }, 1000);
                    })
                    .error( function(data, status) {
                        // L'appel a échoué, on le signal
                        deferred.reject('Impossible de récupérer les articles');
                    })
                ;
            }

            // On retourne le résultat de la promesse
            return deferred.promise;
        },

        getOne: function(id) {
            // On initialise la promesse
            var deferred = $q.defer();
            var thePost = {};
            // On récupère les articles
            factory.findAll()
                .then(
                    // Le chargement des articles à réussi
                    function(posts) {
                        // On parcours les articles afin de trouver celui correspondant à l'id
                        angular.forEach(posts, function(post, key) {
                            if (post.id == id) {
                                thePost = post;
                            }
                        });
                        deferred.resolve(thePost);
                    },
                    // Le chargement des articles a échoué
                    function(message) {
                        // On ne fait rien
                        deferred.reject(message);
                    }
                )
            ;
            // On retourne le résultat de la promesse
            return deferred.promise;
        },

        addComment: function(comment) {
            // On initialise la promesse
            var deferred = $q.defer();
            // Envoi au serveur
            // ...
            deferred.resolve();
            // On retourne le résultat de la promesse
            return deferred.promise;

        }
    };

    return factory;

});
