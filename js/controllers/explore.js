angular
    .module('app')
    .controller('ExploreController', ['LocalStorageService', '$scope', '$state','$window', function (LocalStorageService, $scope, $state, $window) {
        $scope.projectList = {
            data: [],
            error: false
        };



        var user = LocalStorageService.getSession();

        var getProjectList = (function () {
            if (LocalStorageService.getProjectList()) {
                $scope.projectList.data = JSON.parse(LocalStorageService.getProjectList());
                $scope.projectList.error = $scope.projectList.data.lenght <= 0;
            }
            else {
                $scope.projectList.error = true;
            }
        })();

        $scope.backProject = function (projectId) {}

        $scope.getUsername = function (userId) {
            var userlist = LocalStorageService.getUserList();
            var user = userlist.filter(function (x) {
                return x._id === userId;
            })
            return user[0].name === user.name ? 'You': user[0].name;
        }

        $scope.sendEth = function(index, amount) {
            
            var eth = amount / 38000;
            if (typeof web3 !== 'undefined') {
                web3 = new $window.Web3(web3.currentProvider);
            } else {
                // set the provider you want from Web3.providers
                web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
            }
            web3.eth.defaultAccount = web3.eth.accounts[0];
            var CoursetroContract = web3.eth.contract([ { "constant": true, "inputs": [ { "name": "", "type": "uint32" } ], "name": "projects", "outputs": [ { "name": "votes", "type": "uint32" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "donate", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [], "name": "fund", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "id", "type": "uint32" } ], "name": "vote", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" } ]);
            var coursetro = CoursetroContract.at('0x14c2c9997d157841afce8e422478832b5674fde0');
            coursetro.donate({
                from: web3.eth.accounts[0],
                gas: 3000000,
                value: web3.toWei(eth, 'ether')
                },
                (error, result)=> {
                if (!error){
                    $scope.projectList.data[index].received = parseInt($scope.projectList.data[index].received) + parseInt(amount);
                    if($scope.projectList.data[index].backers.length <= 0) {
                        $scope.projectList.data[index].backers.push(user)
                    } else {
                        if($scope.projectList.data[index].backers.filter(function(x){ return x._id === user._id}).lenght < 0) {
                            $scope.projectList.data[index].backers.push(user)
                        }
                    }
                    LocalStorageService.saveProjectList($scope.projectList.data);
                    console.log(result)
                    $state.go('app.explore',{}, {reload: true});
                }
                else
                    console.error(error);
                }
            );  

        }
    }]);