module.exports = function Cart(initCart){
    this.items = initCart.items;
    this.totalQty = initCart.totalQty;
    this.totalPrice = initCart.totalPrice;

    this.add = function(item, id){
        var storedItem = this.items[id];
        if(!storedItem){
            storedItem = this.items[id] = {item: item, qty: 0, price: 0}
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.price;
    };

    this.generateArray = function(){
        var arr = []
        for(var id in this.items){
            arr.push(this.items[id]);
        }
        return arr;
    };
};
