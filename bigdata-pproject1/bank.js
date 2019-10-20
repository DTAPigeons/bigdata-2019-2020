//Архитектура на проекта:

var dbw = {
    //Служители
    insertEmployee : function(document){
       if(!validator.emloyeeIsValid(document)){
           print('Please enter valid employee data');
           return;
       }

       if(!document.additionalName){
        document.additionalName = '';
     }
    
     document.departmentId = db.departments.find({name: departmentName})[0]._id;

     db.employees.insert(document);
    },

     //Отдели
    insertDepartment : function(document){
        if(!validator.departmentIsValid(document)){
            print('Please enter valid department data');
           return;
        }

        db.departments.insert(document);
    },

    //Клиенти
    insertClient: function(document){
        if(!validator.personIsValid(document)){
            print('Please enter valid client data');
           return;
        }

        db.clients.insert(document);
        var clientId = db.clients.find({}).sort({_id:-1}).limit(1);
        this.insertAccountForClient(clientId);

    },

    //Сметки
    insertAccountForClient: function(clientIdToInsert, currencyToInsert = 'BGN'){
        var accountName = generateAccountName();
        while(!validator.accountNameIsValid(accountName)){
            accountName = generateAccountName();
        }
        var account = {
            name: accountName,
            clientId: clientIdToInsert,
            currency: currencyToInsert
        };

        if(!validator.accountIsValid(account)){
            print('Please enter valid account data');
            return;
        }

        db.accounts.insert(account);
    }
}

var validator = {
    //Служители
    emloyeeIsValid : function(document){
        var isValid = true;

        isValid = this.personIsValid(document);

        if(!isValid){
            return isValid;
        }

        if(!document.position || document.position ==''){
            print('Please enter valid position!');
            isValid =  false;
        }

        if(!document.departmentName || document.departmentName ==''){
            print('Please enter valid departmentName!');
            isValid =  false;
            return isValid;
        }

        var department = db.departments.find({name: departmentName})[0]

        if(!department){
            print('Please enter valid departmentName!');
            isValid =  false;
        }

        if(document.superiorId){
            var superior = db.employees.find({_id: superiorId})[0];
            if(!superior){
                print('Please enter valid superiorId!');
                isValid =  false;
            }
        }

        return isValid;
    },

    //Отдели
    departmentIsValid: function(document){
        var isValid = true;
        if(!document.name || document.name==''){
            isValid = false;
            print('Please enter valid deparment name!');
        }

        return isValid;
    },

    //Клиенти
    personIsValid: function(document){
        var isValid = true;
        if(!document.firstName || document.firstName ==''){
            print('Please enter valid first name!');
            isValid = false;
        }

        if(!document.lastName || document.lastName ==''){
            print('Please enter valid last name!');
            isValid =  false;
        }

        if(!document.address || document.address ==''){
            print('Please enter valid address!');
            isValid =  false;
        }

        if(!document.phoneNumber || document.phoneNumber ==''){
            print('Please enter valid phoneNumber!');
            isValid =  false;
        }

        if(!document.email || document.email ==''){
            print('Please enter valid email!');
            isValid =  false;
        }

        return isValid;
    },

    //Сметки
    accountIsValid: function(document){
        var isValid = true;

        if(!document.userId){
            print('Please enter valid client id!');
            isValid = false;
            return isValid;
        }

        if(!document.currency || document.currency==''){
            print('Please enter valid currency!');
            isValid = false;
        }

        var user = db.clients.find({_id: document.userId})[0];
        if(!user){
            print('Please enter valid client id!');
            isValid = false;
        }

        if(!this.accountNameIsValid(document.name)){
            print('Account name is taken!');
            isValid = false;
        }

        return isValid;
    },

    accountNameIsValid: function(nameTocheck){
        var account = db.accounts.find({name: nameTocheck})[0];
        if(!account){return true};
        return false;
    }
}

var generateAccountName = function(){
    var posibleLeters = ['A','B','C','D','E','F','G'];
    var number =  Math.floor(Math.random() * 10000);
    var accountId = '' + number;
    for(var i = 0;i<10; i++){
        var currentLetterIndex = Math.floor(Math.random() * posibleLeters.length)
        accountId+= posibleLeters[currentLetterIndex];
    }
    return accountId;
}