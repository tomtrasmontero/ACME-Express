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


function addID(){
	var idNum = 2; //current product is #2, idNum is unique identifier
	idNum++;
	return idNum;
} 

function editName(id,name){
	for( var i = 0; i < products.length; i++){
		if(products[i].id === id){
			products[i].name = name;
		}
	}		
}


module.exports = {
	getProducts: function(){
		return products;
	},
	deleteProduct: function(id){
		var toDelete = this.getProducts().filter(function(item){
			return item.id === id;
		})[0];
		var idx = this.getProducts().indexOf(toDelete);
		this.getProducts().splice(idx, 1);

	},
	addProduct: function(item){
		var newID = addID();
		this.getProducts().push({id: newID, name: item});

	},
	editProduct: function(id, name){
		editName(id,name);	
	}
};

