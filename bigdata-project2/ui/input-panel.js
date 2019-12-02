var fs = require('fs');
var UserManager = require("../managers/user-manager");
var walletsPath;

var inputForm;
var inputLabel;
var inputText;
var inputListener;

var loginListener = function(e){
    e.preventDefault();
    var id = inputText.value;
    var userPath = walletsPath + id;
    if(fs.existsSync(userPath)){
        UserManager.LogInUser(id);
        inputLabel.innerText = "Enter amount: ";
        inputText.value = "";
        inputForm.addEventListener("submit", transactionListener);
        inputListener();
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

var SetDomElements = function(doc){
    inputForm = doc;
    inputLabel = doc.querySelector("#input-label");
    inputText = doc.querySelector("#input-text");

    inputForm.addEventListener("submit", loginListener);
}

var SetInputListener = function(lister){
    inputListener = lister;
}

var SetWalletPath = function(path){
    walletsPath = path;
}

module.exports = {
    SetDomElements: SetDomElements,
    SetInputListener: SetInputListener,
    SetWalletPath: SetWalletPath
};


