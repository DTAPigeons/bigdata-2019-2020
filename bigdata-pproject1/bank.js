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
    
     document.departmentId = db.departments.find({name: document.departmentName})[0]._id;

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
        var client = db.clients.find({}).sort({_id:-1}).limit(1)[0];
        this.insertAccountForClient(client._id);

    },

    //Сметки
    insertAccountForClient: function(clientIdToInsert, currencyToInsert = 'BGN', balanceToAdd = 1){
        var accountName = generateAccountName();
        while(!validator.accountNameIsValid(accountName)){
            accountName = generateAccountName();
        }
        var account = {
            name: accountName,
            clientId: clientIdToInsert,
            currency: currencyToInsert,
            balance: balanceToAdd
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
            print('Please enter valid department Name!');
            isValid =  false;
            return isValid;
        }

        var department = db.departments.find({name: document.departmentName})[0]

        if(!department){
            print('Please enter valid departmentName!');
            isValid =  false;
        }

        if(document.superiorId){
            var superior = db.employees.find({_id: document.superiorId})[0];
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

        if(!document.clientId){
            print('Please enter valid client id!');
            isValid = false;
            return isValid;
        }

        if(!document.balance && document.balance!==0){
            print('Please enter valid balance value!');
            isValid = false;
            return isValid;
        }

        if(!document.currency || document.currency==''){
            print('Please enter valid currency!');
            isValid = false;
        }

        var user = db.clients.find({_id: document.clientId})[0];
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

//#region Валидни Данни за отдели
//Валидни Данни за отдели
dbw.insertDepartment({
    name: 'Corporate'
})

dbw.insertDepartment({
    name: 'Private'
})

dbw.insertDepartment({
    name: 'HR'
})

dbw.insertDepartment({
    name: 'Security'
})

//Невалидни Данни за отдели
dbw.insertDepartment({
    name: ''
})

dbw.insertDepartment({
})
//#endregion

//#region Данни за служители
//Данни за служители
dbw.insertEmployee({
    firstName: 'Ivan',
    lastName: 'Ivanov',
    address:'str. Duruburu 1',
    email: 'ii@brb.bg',
    phoneNumber: '080908u9',
    position: 'banker',
    departmentName: 'Corporate'
})

dbw.insertEmployee({
    firstName: 'Dragan',
    lastName: 'Ivanov',
    address:'str. Duruburu 1',
    email: 'di@brb.bg',
    phoneNumber: '08090849',
    position: 'banker',
    departmentName: 'Private'
})

dbw.insertEmployee({
    firstName: 'Ivan',
    lastName: 'Draganov',
    address:'str. Duruburu 3',
    email: 'id@brb.bg',
    phoneNumber: '08090859',
    position: 'guard',
    departmentName: 'Security'
})

dbw.insertEmployee({
    firstName: 'Stoian',
    lastName: 'Ivanov',
    address:'str. Duruburu 5',
    email: 'si@brb.bg',
    phoneNumber: '08090149',
    position: 'guard',
    departmentName: 'Private',


})


dbw.insertEmployee({
    firstName: 'Uvuvle',
    lastName: 'Vuvle',
    additionalName:"VuvlevuvuVleVuvuvVlebuVuvlav",
    address:'str. Duruburu 10',
    email: 'vvv@brb.bg',
    phoneNumber: '18090149',
    position: 'guard',
    departmentName: 'HR',


})

dbw.insertEmployee({
    firstName: 'Rajit',
    lastName: 'Budala',
    additionalName:"Tuzu",
    address:'str. Duruburu 13',
    email: 'bigdaddybuge420@brb.bg',
    phoneNumber: '18090169',
    position: 'CS',
    departmentName: 'HR',


})

dbw.insertEmployee({
    firstName: 'Petkan',
    lastName: 'Ivanov',
    address:'str. Duruburu 1',
    email: 'Pi@brb.bg',
    phoneNumber: '08090879',
    position: 'banker',
    departmentName: 'Corporate'
})

dbw.insertEmployee({
    firstName: 'Jeliasko',
    lastName: 'Kamenov',
    address:'str. Duruburu 69',
    email: 'testiculartunder@brb.bg',
    phoneNumber: '08090666',
    position: 'guard',
    departmentName: 'Security'
})

//Не валидни данни за служители
dbw.insertEmployee({
    firstName: 'Stoian',
    lastName: 'Ivanov',
    address:'str. Duruburu 5',
    email: 'si@brb.bg',
    phoneNumber: '08090149',
    position: 'guard',
    departmentName: 'Private',

})

dbw.insertEmployee({
    firstName: '',
    lastName: 'Kamenov',
    address:'str. Duruburu 69',
    email: 'testiculartunder@brb.bg',
    phoneNumber: '08090666',
    position: 'guard',
    departmentName: 'Security'
})

dbw.insertEmployee({
    firstName: 'Jeliasko',
    address:'str. Duruburu 69',
    email: 'testiculartunder@brb.bg',
    phoneNumber: '08090666',
    position: 'guard',
    departmentName: 'Security'
})

dbw.insertEmployee({
    firstName: 'Jeliasko',
    lastName: 'Kamenov',
    email: 'testiculartunder@brb.bg',
    phoneNumber: '08090666',
    position: 'guard',
    departmentName: 'Security'
})

dbw.insertEmployee({
    firstName: 'Jeliasko',
    lastName: 'Kamenov',
    address:'str. Duruburu 69',
    phoneNumber: '08090666',
    position: 'guard',
    departmentName: 'Security'
})

dbw.insertEmployee({
    firstName: 'Jeliasko',
    lastName: 'Kamenov',
    address:'str. Duruburu 69',
    email: 'testiculartunder@brb.bg',
    position: 'guard',
    departmentName: 'Security'
})

dbw.insertEmployee({
    firstName: 'Jeliasko',
    lastName: 'Kamenov',
    address:'str. Duruburu 69',
    email: 'testiculartunder@brb.bg',
    phoneNumber: '08090666',
    departmentName: 'Security'
})

dbw.insertEmployee({
    firstName: 'Jeliasko',
    lastName: 'Kamenov',
    address:'str. Duruburu 69',
    email: 'testiculartunder@brb.bg',
    phoneNumber: '08090666',
    departmentName: 'Trust and safety'
})
//#endregion

//#region Данни за клиенти
dbw.insertClient({
    firstName: 'Ivan',
    lastName: 'Ivanov',
    address:'str. Duruburu 1',
    email: 'ii@brb.bg',
    phoneNumber: '080908u9'
})

dbw.insertClient({
    firstName: 'Ivan',
    lastName: 'Ivanov',
    address:'str. Duruburu 1',
    email: 'ii@brb.bg',
    phoneNumber: '080908u9',
})

dbw.insertClient({
    firstName: 'Dragan',
    lastName: 'Ivanov',
    address:'str. Duruburu 1',
    email: 'di@brb.bg',
    phoneNumber: '08090849'
})

dbw.insertClient({
    firstName: 'Ivan',
    lastName: 'Draganov',
    address:'str. Duruburu 3',
    email: 'id@brb.bg',
    phoneNumber: '08090859',
})

dbw.insertClient({
    firstName: 'Stoian',
    lastName: 'Ivanov',
    address:'str. Duruburu 5',
    email: 'si@brb.bg',
    phoneNumber: '08090149',
})


//#endregion