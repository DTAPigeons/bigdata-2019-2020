var fs = require('fs');
var UserManager = require("../managers/user-manager");
var walletsPath;

var inputForm;
var inputLabel;
var inputText;
var submitButton;
var inputListener;
var toWalletLabel;

var loginListener = function(e){
    e.preventDefault();
    var id = inputText.value;
    var userPath = walletsPath + id;
    if(fs.existsSync(userPath)){
        UserManager.LogInUser(id);
        Refresh();
        inputListener();
    }
    else{
        window.alert("Invalid id!");
    }
}

var EnableTransaction = function(transactionListener, toWalletId){
    Refresh();
    inputLabel.innerText = "Enter amount: ";
    inputText.value = "";
    toWalletLabel.innerText = "Send money to: " + toWalletId;
    submitButton.disabled = false;
    inputForm.addEventListener("submit", function(event){
        event.preventDefault();
        var amount = inputText.value;
        transactionListener(amount);
    });
}


var SetDomElements = function(doc){
    inputForm = doc;
    SetChildElements();    
    inputForm.addEventListener("submit", loginListener);
}

var SetChildElements = function(){
    inputLabel = inputForm.querySelector("#input-label");
    inputText = inputForm.querySelector("#input-text");
    submitButton = inputForm.querySelector("#submit-button");
    toWalletLabel = inputForm.querySelector("#to-wallet-lable");
}

var SetInputListener = function(lister){
    inputListener = lister;
}

var SetWalletPath = function(path){
    walletsPath = path;
}

var Refresh = function(){
    inputLabel.innerText = "";
    toWalletLabel.innerText = "";
    inputText.value = "";
    submitButton.disabled = true;

    var formReset = inputForm.cloneNode(true);
    inputForm.parentNode.replaceChild(formReset, inputForm);
    inputForm = formReset;
    SetChildElements();

}

module.exports = {
    SetDomElements: SetDomElements,
    SetInputListener: SetInputListener,
    SetWalletPath: SetWalletPath,
    EnableTransaction: EnableTransaction,
    Refresh: Refresh
};


