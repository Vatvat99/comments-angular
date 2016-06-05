'use strict';

/**
 * Directive affichant un commentaire
 */
app.directive('appComment', function() {

    return {
        restrict: 'E',
        templateUrl: 'views/comment.html',
        scope: {
            comment: '='
        }
    };

});
