var app = angular.module('ticTacToe', ["ngMockE2E", "ngRoute"]);

app.run(function ($httpBackend) {
    var games = [
        {
            gameToken: "123abc",
            owner: "Criss Parotisse", // автор игры
            opponent: "", // присоединенный игрок
            size: 3, // размер игорового поля
            gameDuration: 42000, // сколько уже идет игра в миллисекундах
            gameResult: "", // кто выиграл партию
            state: "ready" // статус игры
    },
        {
            gameToken: "123abc",
            owner: "Man Rouse",
            opponent: "",
            size: 3,
            gameDuration: 42000,
            gameResult: "",
            state: "ready"
	},
        {
            gameToken: "123abc",
            owner: "Criss Parotisse",
            opponent: "",
            size: 3,
            gameDuration: 42000,
            gameResult: "",
            state: "ready"
	},
        {
            gameToken: "123abc",
            owner: "Jason Moore",
            opponent: "",
            size: 3,
            gameDuration: 42000,
            gameResult: "",
            state: "ready"
	},
        {
            gameToken: "123abc",
            owner: "Clark Fran",
            opponent: "",
            size: 3,
            gameDuration: 42000,
            gameResult: "",
            state: "ready"
	},
        {
            gameToken: "123abc",
            owner: "Chuck Norris",
            opponent: "Jerry Berry",
            size: 3,
            gameDuration: 323000,
            gameResult: "",
            state: "playing"
	},
        {
            gameToken: "123abc",
            owner: "Morris Noore",
            opponent: "Block Rob",
            size: 3,
            gameDuration: 323000,
            gameResult: "",
            state: "playing"
	},
        {
            gameToken: "123abc",
            owner: "Rabbit",
            opponent: "Jane Simon",
            size: 3,
            gameDuration: 323000,
            gameResult: "",
            state: "playing"
	},
        {
            gameToken: "123abc",
            owner: "Apply C",
            opponent: "Tom Wayne",
            size: 3,
            gameDuration: 12323,
            gameResult: "",
            state: "playing"
	},
        {
            gameToken: "123abc",
            owner: "Jonny B",
            opponent: "Tommy Lee",
            size: 3,
            gameDuration: 323000,
            gameResult: "opponent",
            state: "done"
	},
        {
            gameToken: "123abc",
            owner: "Jonnatan Broock",
            opponent: "Tommy Lee",
            size: 3,
            gameDuration:323000,
            gameResult: "owner",
            state: "done"
	}
];

    $httpBackend.whenGET('/games/list').respond(200, games);
});

app.directive('modalDialog', function () {
    return {
        restrict: 'E',
        scope: {
            show: '='
        },
        replace: true,
        transclude: true,
        link: function (scope, element, attrs) {
            scope.dialogStyle = {};

            if (attrs.width) {
                scope.dialogStyle.width = attrs.width;
            }

            if (attrs.height) {
                scope.dialogStyle.height = attrs.height;
            }

            scope.hideModal = function () {
                scope.show = false;
            };
        },
        template: "<div ng-show='show'><div class='modal-overlay' ng-click='hideModal()'></div><div class='modal-dialog' ng-style='dialogStyle'><div class='modal-close' ng-click='hideModal()'> <i class='fa fa-times' aria-hidden='true'></i></div><div class='modal-dialog-content' ng-transclude></div></div></div>"
    };
});

app.controller('listCtrl', function ($http, $scope, $timeout) {
    $http.get("/games/list")
        .then(function successCallback(response) {
            console.log('success', response);
            $scope.games = response.data;
        }, function errorCallback(response) {
            console.log('error');
        });

    // create modal window
    $scope.modalShown = false;
    $scope.toggleModal = function () {
        $scope.modalShown = !$scope.modalShown;
    };

    // create game set and field
    $scope.cells = ['', '', '', '', '', '', '', '', ''];
    $scope.winner = '';
    $scope.moves = 0;
    $scope.gameover = false;

    // assume o is +1 and x is -1
    // row row row, col col col, diagonal diagonal = 8 win conditions
    // if any of them total 3 or -3, winner is found
    $scope.scores = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0
    };

    $scope.resetBoard = function () {
        $scope.winner = '';
        $scope.resetScores();
        $scope.resetCells();
        $scope.resetMoves();
    }

    $scope.resetScores = function () {
        for (var i = 0; i < 8; i++) {
            $scope.scores[i] = 0;
        }
    }

    $scope.resetCells = function () {
        $scope.cells.forEach(function (ele, index) {
            $scope.cells[index] = '';
        });

        $scope.gameover = false;
    }

    $scope.resetMoves = function () {
        $scope.moves = 0;
    }

    $scope.fillCell = function (index) {
        if ($scope.moves >= 9) {
            $scope.checkWinner();
        }

        if ($scope.cells[index] !== '' || $scope.gameover === true) {
            return;
        }

        if ($scope.moves % 2 === 0) {
            $scope.cells[index] = 'x';
            $scope.updateScore(index, +1);
        } else {
            $scope.cells[index] = 'o';
            $scope.updateScore(index, -1);
        }
        $scope.checkWinner();
        $scope.moves++;
    }

    $scope.updateScore = function (index, updateBy) {
        // rows
        if (index / 3 < 1)
            $scope.scores[0] += updateBy; // first row
        else if (index / 3 < 2)
            $scope.scores[1] += updateBy; // second row
        else if (index / 3 < 3)
            $scope.scores[2] += updateBy; // third row

        if (index % 3 === 0)
            $scope.scores[3] += updateBy; // first col
        else if (index % 3 === 1)
            $scope.scores[4] += updateBy; // second col
        else if (index % 3 === 2)
            $scope.scores[5] += updateBy; // third col

        if (index === 0 || index === 4 || index === 8)
            $scope.scores[6] += updateBy; // left to right diag

        if (index === 2 || index === 4 || index === 6)
            $scope.scores[7] += updateBy; // right to left diag
    }

    $scope.checkWinner = function () {
        for (var i = 0; i < 8; i++) {
            if ($scope.scores[i] === 3)
                $scope.winner = 'x';
            else if ($scope.scores[i] === -3)
                $scope.winner = 'o';
        }

        if ($scope.moves >= 8 && $scope.winner == '') {
            $scope.winner = 'Draw!';
        }
    }

    $scope.$watch('winner', function (newVal, oldVal) {
        if (newVal !== '') {
            $scope.gameover = true;
            return $scope.stopCounter();
        }
    });

    // create game timer
    var timer;
    $scope.counter = 0;
    $scope.format = 'hh:mm:ss';
    $scope.stopCounter = function () {
        $timeout.cancel(timer);
    };
    var updateCounter = function () {
        $scope.counter++;
        timer = $timeout(updateCounter, 1000);
    };
    updateCounter();
});

app.filter('formatDuration', function () {
    return function (s) {
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;

        return hrs + ':' + mins + ':' + secs;
    };

});

