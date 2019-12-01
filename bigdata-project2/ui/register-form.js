var currencyManager = require('../managers/currency-manager');

var currencyCheckList = document.getElementById("currencies");
var currencyList = currencyManager.GetCurrencyList();

currencyList.forEach(function(currency){
    var checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.name = 'checkbox';
    checkBox.id = currency;
    var currencyText = document.createTextNode(" "+currency);
    currencyCheckList.appendChild(checkBox);
    currencyCheckList.appendChild(currencyText);
    linebreak = document.createElement("br");
    currencyCheckList.appendChild(linebreak);
})

var register = function(e){
    e.preventDefault();
    var data = {
        email: '',
        password: ''
    };
    data.email = document.getElementById("email").value;
    data.password = document.getElementById("password").value;
    var checkedCurrencies = GetCheckedCurrencyIndexes();

    currencyManager.CreateWalletsForUser(data, checkedCurrencies);
}


var GetCheckedCurrencyIndexes = function(){
    var checkCurrencies = [];
    var checkBoxList = currencyCheckList.getElementsByTagName('input');
    for(var i = 0; i<checkBoxList.length;i++){
        if(checkBoxList[i].checked){
            checkCurrencies.push(i);
        }
    }

    return checkCurrencies;
}
