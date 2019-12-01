const WALLETS_DIR = "../projects/bigdata-project2/wallets/";
var CurrencyManager = require('./currency-manager');
var UserModel = require("../models/user-model");
var fs = require('fs');

userList = [];
currentUser = {};
LogInUser  = function(userId){
    var userFiles = fs.readdirSync(WALLETS_DIR);
    userFiles.forEach(function(file){
        var userWallets = CurrencyManager.LoadWalletsForUser(file);
        var user = new UserModel(file, userWallets);
        if(file==userId){
            currentUser = user;            
        }
        else{
            userList.push(user);
        }
    })
}

GetUserList = function(){
    return userList;
}

GetCurrentUser = function(){
    return currentUser;
}

module.exports = {
    LogInUser: LogInUser,
    GetCurrentUser: GetCurrentUser,
    GetUserList: GetUserList
}
