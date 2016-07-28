var products = [
	{
		id: 1,
		name: 'Shoe'
	},
	{
		id:2,
		name: 'Bike'
	}
];

module.exports = {
	getProduct: function(id){
		return this.getProducts().filter(function(item){
			return item.id === id;
		})[0];
	},
	getProducts: function(){
		return products;
	},
	deleteProduct: function(id){
		var idx = this.getProducts().indexOf(this.getProduct(id));
		this.getProducts().splice(idx, 1);

	},
	addProduct: function(item){
    var max = this.getProducts().reduce(function(max, product){
      if(product.id > max)
        max = product.id;
      return max;
    }, 0);
    max++;
		this.getProducts().push({id: max, name: item});
	},
	editProduct: function(id, name){
    var product = this.getProduct(id);
    product.name = name;
	}
};

