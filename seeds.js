var mongoose = require("mongoose");
var Food = require("./models/food");
var data = [
    {
        name: "Fish Tacos",
        description: "Not one taco, but two! Golden fried basa filet, Asian slaw, mozzarella cheese, mango, and fresh cut salsa served on a soft flour tortilla. Served with a side of fries.",
        image: "http://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/fish-tacos-lime-cilantro-crema-ck.jpg?itok=k9Ur5-v7",
        price: "9",
        type: "Snack",
    },
    {
        name: "Chicken Tenders",
        description: "Classic Chicken Tenders served with our classic plum sauce and a side of fries",
        image: "https://images-gmi-pmc.edge-generalmills.com/8b648fc0-1cf6-46f2-b923-a48d16923eb9.jpg",
        price: "12",
        type: "Snack",
        radioInput: [{
            name: "Dipping Sauce",
            items: [
                "Sweet and Sour",
                "Honey Mustard",
                "Barbecue"
            ]
        }]
    },
    {
        name: "Grilled Cheese",
        description: "A delicious combo of dry-cured capicollo, mozzarella, cheddar cheese, salt chips, and red pepper spread.",
        image: "https://atmedia.imgix.net/c3a8c1079c6970caf7188768531f20699d22f0d7?auto=format&q=45&w=600.0&h=800.0&fit=max&cs=strip",
        price: "10",
        type: "Sandwich",
    },
    {
        name: "Spaghetti",
        description: "Our signature house-made meat sauce made with petit filet and ground chuck with a roasted trio of mushrooms and baby spinach, tossed with fettuccini noodles, and topped with Asiago cheese.",
        image: "https://cdn5.norecipes.com/wp-content/uploads/2012/10/23052346/recipespaghetti-meat-sauce-recipe.1024x1024-1.jpg",
        price: "15",
        type: "Pasta",
    },
    {
        name: "Seafood Linguine",
        description: "Salmon, basa, shrimp tossed in a lobster butter sauce with roasted red onions, mushrooms, spinach, roasted tomato chutney, and vermicelli noodles topped with Asiago cheese.",
        image: "http://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/8/4/1/IG0511_linguine-with-shrimp-scampi_s4x3.jpg.rend.hgtvcom.616.462.suffix/1384540894943.jpeg",
        price: "15",
        type: "Pasta",
    },
    {
        name: "Clubbin Sub",
        description: "A contemporary twist on the classic club with a delicious blend of bacon, turkey, lettuce, tomatoes, cheddar, garlic aioli, and spicy mayo.",
        image: "http://img.taste.com.au/OX2Wle32/taste/2016/11/marinated-chicken-club-sandwich-1970-1.jpeg",
        price: "10",
        type: "Sandwich",
    },
    {
        name: "Surfside Salad",
        description: "Grilled salmon, shrimp seasoned with chili salt on a bed of greens with fresh avocado, grilled pineapple, sweet peppers, crisp rice noodles, fresh cut salsa, and tossed in our honey citrus vinaigrette.",
        image: "https://ssmscdn.yp.ca/image/resize/c4fbb98f-5400-4c9e-9ec5-662ff9cb7e70/ypui-d-mp-pic-gal-lg/milestones-7.jpg",
        price: "17",
        type: "Salad",
    },
    {
        name: "Spring Salad",
        description: "A tasty combination of fresh arugula, sun-dried tomatoes, artichokes, red onions, goat cheese, olive oil, and crema balsamic.",
        image: "http://www.giverecipe.com/wp-content/uploads/2015/05/spring-salad-5.jpg",
        price: "10",
        type: "Salad",
    },
    {
        name: "Garden Burger",
        description: "A delicious vegetarian burger, avocado, roasted red pepper relish, lettuce, tomato, onion, and our signature house made burger sauce, and on a toasted egg bun. Served with golden fries.",
        image: "http://images.meredith.com/content/dam/bhg/Images/recipe/41/R055343.jpg.rendition.largest.ss.jpg",
        price: "12",
        type: "Sandwich",
    },
    {
        name: "Caeser Salad",
        description: "Romaine lettuce and baby kale, tossed with smoked bacon, parmesan cheese, focaccia croutons, and our signature Caesar dressing.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Caesar_salad_%282%29.jpg/1200px-Caesar_salad_%282%29.jpg",
        price: "10",
        type: "Salad",
    },
    {
        name: "Poutine",
        description: "Crispy fries served with our thick gravy and squeaky cheese",
        image: "http://www.macleans.ca/wp-content/uploads/2017/05/MAC06_CANADA_PROJECT_RICHLER_POST01.jpg",
        price: "8",
        type: "Snack",
    },
    {
        name: "Milkshake",
        description: "Creamy, delicious and in a variety of flavours.",
        image: "https://fthmb.tqn.com/sHI14VwgA58daPo0TSY-ishRJk8=/2122x1415/filters:fill(auto,1)/172192393-56a20fea3df78cf7727188b7.jpg",
        price: "4",
        type: "Beverage",
    },
    {
        name: "Coke",
        description: "",
        image: "https://groceries.morrisons.com/productImages/212/212235011_0_640x640.jpg?identifier=8ee90eab73b2d549581c44809d115a08",
        price: "3",
        type: "Beverage",
    },
    {
        name: "Diet Coke",
        description: "",
        image: "https://www.ocado.com/productImages/228/228701011_0_640x640.jpg?identifier=43fc049af27f7f9bc2e021ea4d6ac594",
        price: "3",
        type: "Beverage",
    },
    {
        name: "Iced Tea",
        description: "",
        image: "https://ctsecure.saveonfoods.com/legacy/productimagesroot/DJ/2/1301072.jpg",
        price: "3",
        type: "Beverage",
    },
    {
        name:"Mountain Dew",
        description: "",
        image: "http://www.mountaindew.com/assets/content/38195/20881/21892-grew-dew-product.png",
        price: "3",
        type: "Beverage",
    },
    {
        name: "Dr Pepper",
        description: "",
        image: "https://cdn.bmstores.co.uk/images/hpcProductImage/imgFull/124490-Dr-Pepper-500ml1.jpg",
        price: "3",
        type: "Beverage",
    },
    {
        name: "Apple Juice",
        description: "",
        image: "https://www.minutemaid.com/content/dam/minutemaid/hero/AppleJuice_15.2flozBottle_Hero.png",
        price: "3",
        type: "Beverage",
    },
    {
        name: "Orange Juice",
        description: "",
        image: "https://www.minutemaid.com/content/dam/minutemaid/hero/PremiumOriginalOrangeJuice_15.2flozBottle_Hero.png",
        price: "3",
        type: "Beverage",
    },
    {
        name: "Frozen Lemonade",
        description: "Ice cold refreshing frozen lemonade",
        image: "https://wwwcache.wral.com/asset/5oys/smartshopper/2016/06/06/15758601/Sonic_frozen_lemonade_small-302x480.jpg",
        price: "4",
        type: "Beverage",
    },
    {
        name: "Pork Sliders",
        description: "Pork shoulder, hand carved to order, crisp buttermilk onion strings, herb jus, and garlic horseradish aioli come together on a soft egg bun to create the perfect slider.",
        image: "http://images.meredith.com/content/dam/bhg/Images/recipe/38/R156350.jpg.rendition.largest.jpg",
        price: "7",
        type: "Snack",
    },
    {
        name: "Grilled Chicken Sandwich",
        description: "Whole white meat chicken breast flame-grilled to perfection and served on a fresh, lightly toasted bun.",
        image: "http://www.seriouseats.com/recipes/assets_c/2014/04/20140421-grilled-chicken-sandwich-colombian-bacon-potato-chip-green-sauce-recipe-primary-thumb-625xauto-395903.jpg",
        price: "12",
        type: "Sandwich",
    },
    {
        name: "Steak Sandwich",
        description: "A full-packed sandwich filled with rib steak, provolone, garlic aioli, spicy mayo, bell peppers, red onions, and jalapenos.",
        image: "http://img.taste.com.au/FLzevmBs/taste/2016/11/smokey-bbq-steak-sandwich-109693-1.jpeg",
        price: "14",
        type: "Sandwich",
    },
    {
        name: "Banh Mi",
        description: "Classic Vietnamese sandwich with a mouthwatering mix of beef brisket, Asian marinade, pickled carrots, cilantro, jalapenos, and garlic aioli.",
        image: "http://www.seriouseats.com/recipes/assets_c/2011/09/20110925-172243-steak-banh-mi-thumb-625xauto-189048.jpg",
        price: "12",
        type: "Sandwich",
    }
];

function seedDB(){
    Food.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("Removed all food items.");
            data.forEach(function(seed){
                Food.create(seed, function(err, food){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("Added a food item.")
                    }
                });
            });
        }
    });
}

module.exports = seedDB;
