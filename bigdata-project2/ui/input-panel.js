var fs = require('fs');
var LogedUserPanel = require("../ui/loged-user-panel");
var CurrencyPanel = require("../ui/currency-panel");
var UserManager = require("../managers/user-manager");
var walletsPath = "../projects/bigdata-project2/wallets/";
var inputForm = document.getElementById("input-form");
var inputLabel = document.getElementById("input-label");
var inputText = document.getElementById("input-text");

var loginListener = function(e){
    e.preventDefault();
    var id = inputText.value;
    var userPath = walletsPath + id;
    if(fs.existsSync(userPath)){
        UserManager.LogInUser(id);
        var currentUser  = UserManager.GetCurrentUser();
        document.getElementById("user-id").innerText = currentUser.id;
        inputLabel.innerText = "Enter amount: ";
        inputText.value = "";
        inputForm.addEventListener("submit", transactionListener);
        LogedUserPanel.LogUser();
        CurrencyPanel.Reset();
    }
    else{
        window.alert("Invalid id!");
    }
}


var transactionListener = function(e){
    e.preventDefault();
    var amount = inputText.value;
    window.alert(amount)
}


inputForm.addEventListener("submit", loginListener);