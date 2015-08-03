var app = angular.module('nbaRoutes').service('teamService', function($http, $q){

    this.addNewGame = function(gameObj) {
        var url = 'https://api.parse.com/1/classes/' + gameObj.homeTeam;
        if (parseInt('gameObj.homeTeamScore') > parseInt('gameObj.opponentScore')) {
            gameObj.won = true;
        } else {
            gameObj.won = false;
        }

        return $http({
            method: 'POST',
            url: url,
            data: gameObj
        });
    };

    this.getTeamData = function(team) {
        var dfd = $q.defer();
        var url = 'https://api.parse.com/1/classes/' + team;
        $http({
            method: 'GET',
            url: url
        }).then(function(data) {
            var results = data.data.results;
            var wins = 0;
            var losses = 0;
            for (var i = 0; i < results.length; i++) {
                if (results[i].won) {
                    wins ++;
                } else if (results[i].won === false) {
                    losses ++;
                }
            }
            results['wins'] = wins;
            results['losses'] = losses;
            dfd.resolve(results);
            console.log(results);
        });
        return dfd.promise;
    }

});