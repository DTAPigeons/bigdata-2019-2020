//var myWallet = require('./wallet');
var fs = require('fs');
var crypto = require('crypto')

var register = function(){
    var data = {
        email: '',
        password: ''
    };
    data.email = document.getElementById("email").value;
    data.password = document.getElementById("password").value;
    if(fs.existsSync("my-wallet")){
        window.alert("wallet exists");
        return;
    }
    createDir("my-wallet");
    createWallet("my-wallet", data);
    console.log(done);
}

var createDir = function(path){
    fs.mkdir( path, { recursive: true }, (err) => {
        if (err) throw err;
      })
}

var createWallet = function(path, data){
    var wallet = { 
       id: require("crypto").createHmac("sha256", data.password).update(data.email).digest("hex")
    };

    fs.writeFileSync(path+"/wallet.json", JSON.stringify(wallet));
}