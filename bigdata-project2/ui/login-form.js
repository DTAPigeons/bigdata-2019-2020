var fs = require('fs');
login = function(){
    var id = document.getElementById("id").value;
    var raw = fs.readFileSync('my-wallet/wallet.json');
    var waller = JSON.parse(raw);
    if(id = waller.id){
        window.alert("Loged in");
    }
    else{
        window.alert("Invalid id!");
    }
}