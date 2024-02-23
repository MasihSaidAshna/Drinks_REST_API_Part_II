const app = require("express")(); 

//Our list of drinks
let drinks = ["Coffee", "Tea", "Juice", "Water"];

//Create operation to add new drinks to the list
app.get("/create/:drinkname", (req, res) => {
    drinks.push(req.params.drinkname);
    res.send({data: drinks});
});

//Retrieve a list of all drinks
app.get("/", (req, res) => {
    res.send({data: drinks});
});

//Auxiliary function to help search for a drink by name
function findDrinkByName(drinkName) {
    return drinks.find(drink => drink.toLowerCase() === drinkName.toLowerCase());
}

//Auxiliary function for update and delete
function findIndexByName(drinks, drinkName) {
    return drinks.findIndex(drink => drink.toLowerCase() === drinkName.toLowerCase());
}


// Retrieve a specific drink by name
app.get("/:drinkname", (req, res) => {
    const drinkName = req.params.drinkname;
    const foundDrink = findDrinkByName(drinkName);

    if (foundDrink) {
        res.send({ data: foundDrink });
    } else {
        res.status(404).send({ error: "Drink not found" });
    }
});

//Update operation for drinks
app.get("/drinks/:oldname/:newname", (req, res) => {
    const oldName = req.params.oldname;
    const newName = req.params.newname;
    const foundIndex = findIndexByName(drinks, oldName)

    if (foundIndex !== -1) {
        drinks[foundIndex] = newName;
        res.send({ data: `You have now updated ${oldName} to be ${newName}: ` + drinks });
    } else {
        res.status(404).send({ error: "Drink not found" });
    }
});

//Delete operation for drinks
app.get("/delete/:drinkName", (req, res) => {
    const drinkName = req.params.drinkName;
    const foundIndex = findIndexByName(drinks, drinkName)

    if (foundIndex !== -1) {
        drinks = drinks.filter(drink => drink.toLowerCase() !== drinkName.toLowerCase());
        res.send({ data: "Drink deleted. Updated drinks list: " + drinks });
    } else {
        res.status(404).send({ error: "Drink not found" });
    }    
    res.send({data: drinks});
});


//http://localhost:8080/
app.listen(8080); 