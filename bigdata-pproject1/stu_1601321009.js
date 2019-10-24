use stu_1601321009
var dbw = {
    insertCar: function(document){
        if(!validator.carIsValid(document)){
            print("Please enter valid car data!");
            return;
        }

        db.cars.insert(document);
    },

    insertCargo: function(document){
        if(!validator.cargoIsValid(document)){
            print("Please enter valid cargo data!");
            return;
        }

        if(validator.isPriorityCargo(document)){
            db.priorityCargo.insert(document);
        }

        db.cargo.insert(document);
    }
}

var validator = {
    carIsValid: function(document){
        if(!document.InStockId || document.InStockId==''){
            print("Please enter valid in stock Id");
            return false;
        }

        if(!document.model || document.model== ''){
            print("Please enter valid car model");
            return false;
        }

        return true;
    },

    cargoIsValid: function(document){
        if(!document.name || document.name==''){
            print('Please enter valid cargo name!');
            return false;
        }

        if(!document.category || document.category==''){
            print('Please enter valid cargo category!');
            return false;
        }

        if(!document.weight || document.weight<0){
            print('Please enter valid cargo weight!');
            return false;
        }

        if(!document.carId || document.carId==''){
            print('Please enter valid cargo shiping car Id!');
            return false;
        }

        var shipingCar  = db.cars.find({InStockId: document.carId})[0];

        if(!shipingCar){
            print('Please enter valid cargo shiping car Id!');
            return false;
        }

        return true;
    },

    isPriorityCargo: function(document){
        if(!this.cargoIsValid(document)){
            print("Please enter valid cargo data!");
            return false;
        }

        var cat =  db.priorityCategories.find({name: document.category})[0];
        
        if(!cat){
            return false;
        }
        return true;
    }    

}

dbw.insertCar({
    model: 'BMW',
    InStockId: '12412412'
});

dbw.insertCar({
    model: 'Lada',
    InStockId: '3243242'
});

dbw.insertCar({
    model: 'Mercedice',
    InStockId: '213141'
});

dbw.insertCar({
    model: 'Panzer V',
    InStockId: '1488'
});

dbw.insertCar({
    model: 'Shagin Wagen',
    InStockId: '32131'
});

db.cars.find().forEach(function(car){
    db.cars.update({_id:car._id},{$set:{
        minCapacity: 2
    }})
});

dbw.insertCargo({
    name: 'Potatos',
    category: 'Vegetables',
    weight: 200,
    carId: '3243242'
})

dbw.insertCargo({
    name: 'Potatos',
    category: 'Vegetables',
    weight: 323,
    carId: '213141'
})


dbw.insertCargo({
    name: 'Tomatoes',
    category: 'Vegetables',
    weight: 150,
    carId: '213141'
})

dbw.insertCargo({
    name: 'Soap',
    category: 'Prisoner of war',
    weight: 215,
    carId: '1488'
})

dbw.insertCargo({
    name: 'Weed',
    category: 'Herb',
    weight: 420,
    carId: '32131'
})

db.cars.find().forEach(function(car){

    var shipments  = [];
    db.cargo.find({carId: car.InStockId}).forEach(function(cargo){
        shipments.push(cargo);
    })

    db.priorityCargo.find({carId: car.InStockId}).forEach(function(cargo){
        shipments.push(cargo);
    })

    db.carShipmentAgregation.insert({
        shipingCar: car,
        carShipment: shipments
    })
});

db.carShipmentAgregation.find().pretty()

db.priorityCategories.insert({
    name: 'Fruits'
});

db.priorityCategories.insert({
    name: 'Vegetables'
});

db.priorityCategories.insert({
    name: 'Meat'
});

db.priorityCategories.insert({
    name: 'Milk'
});

db.priorityCategories.insert({
    name: 'Dairy'
});

db.cargo.find().forEach(function(cargo){
    if(validator.isPriorityCargo(cargo)){
        db.priorityCargo.insert(cargo);
        db.cargo.remove({_id:cargo._id}, true)
    }
})