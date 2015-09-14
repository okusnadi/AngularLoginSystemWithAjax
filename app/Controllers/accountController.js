

function AccountController($scope, $rootScope, $location,$http) {


    
    $scope.resetUser = {};

    $scope.isAddOrEdit = false;

    function getByName(name) {
        $http.get('http://localhost:57878/api/users?name=' + name).success(function (data) {
            $scope.selectedUser = data;
        }).error(function () { alert("error") });
    }


    function init() {

        $http.get('http://localhost:57878/api/users').success(function (data) {
            $scope.users = data;
           

        }).error(function (data) { alert('error'); });


        if (sessionStorage.username != "" && sessionStorage.username != undefined) {
            $rootScope.loginStatus = true;
            $rootScope.loggedUsername = sessionStorage.username;

            if (sessionStorage.username == 'admin') {
                $rootScope.isAdmin = true;
            }
            else {
                $rootScope.isAdmin = false;
            }

            getByName(sessionStorage.username);


        } else {
            $rootScope.loginStatus = false;
        }
    }

    init();





    $scope.addUser = function () {

        $scope.selectedUser.UserId = 0;
        $http.post('http://localhost:57878/api/users', $scope.selectedUser).success(function () { }).error(function () { alert("error"); });
        $location.path("/Login");

    }

    $scope.loginUser = function () {

        var isValid = false;
        for (i = 0; i < $scope.users.length; i++) {
            if ($scope.users[i].Username == $scope.loginUser.Username && $scope.users[i].Password == $scope.loginUser.Password) {
                isValid = true;
                break;
            }
        }
        


        if (isValid) {
           
            $rootScope.loginStatus=true;
            $rootScope.loggedUsername = $scope.loginUser.Username;
            sessionStorage.username = $scope.loginUser.Username;
            $location.path('/UserInfo');
        }
        else{
            $rootScope.loginStatus=false;
            alert("Invalid Login");
        }

    }


    $scope.updateUser = function () {
        $http.put('http://localhost:57878/api/users', $scope.selectedUser).success(function () { }).error(function () { alert('error'); });

        $location.path('/UserInfo');

    },
    $scope.resetPassword = function () {

        if ($scope.selectedUser.Password == $scope.resetUser.oldPassword) {
            $scope.selectedUser.Password = $scope.resetUser.newPassword;
            $http.put('http://localhost:57878/api/users', $scope.selectedUser);
        }
        else {
            alert("Invalid Password ! try again");

        }
        $location.path('/UserInfo');

    }
    $scope.logOut = function () {
        sessionStorage.username = ""
        $scope.selectedUser = null;
        $rootScope.loginStatus = false;
        $scope.loginUser = null;
        $location.path('/Login');
    }



}


webAdminApp.controller('AccountController', AccountController);