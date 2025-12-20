import Cart from "../models/cart.model.js"

export async function getCart(req,res){
    // res.status(200).send("Fetching all Cart Products")
    try{
		const userId = req.user._id; 
		const cart = await Cart.findOne({user: userId}).populate("items.product");

		if(!cart){
            return res.status(200).json({items: []})
        };

		res.status(200).json(cart);
	} catch(err){
		res.status(500).json({ error: err.message });
	}
}

export async function postCart(req,res){
    // res.status(201).send("Cart product added successfully"
    try{
		// console.log("req.user:", req.user); did for checking
		const userId = req.user._id;
		const {productId, quantity} = req.body;

		let cart = await Cart.findOne({user: userId});

		if(!cart){
			cart = await Cart.create({
				user: userId,
				items: [{product: productId, quantity}],
			});
			return res.status(201).json(cart);
		}

		//updating qty
		const item = cart.items.find((i) => i.product.toString() === productId);

		if(item) {
			item.quantity += quantity || 1;
		} else{
			cart.items.push({product: productId, quantity: quantity || 1});
		}

		await cart.save();
		res.status(201).json(cart);
	} catch(err){
		res.status(400).json({error: err.message});
	}
}

export async function putCart(req,res){
    // res.status(200).send("Cart product updated successfully")
    try{
		const userId = req.user._id;
		const {quantity} = req.body;
		const itemId = req.params.id;

		const cart = await Cart.findOne({user: userId});
		if(!cart){
            return res.status(404).json({message: "Cart not found"})
        };

		const item = cart.items.id(itemId);
		if(!item){
            return res.status(404).json({message: "Item not found"})
        };

		item.quantity = quantity;
		await cart.save();

		res.status(200).json(cart);
	} catch(err){
		res.status(400).json({error: err.message});
	}
}

export async function deleteCart(req,res){
    // res.status(200).send("Cart product deleted successfully")
    try {
		const userId = req.user._id;
		const itemId = req.params.id;

		const cart = await Cart.findOne({user: userId});
		if(!cart){
            return res.status(404).json({message: "Cart not found"})
        };

		cart.items.id(itemId).remove();
		await cart.save();

		res.status(200).json({message: "Cart item deleted", cart});
	} catch (err){
		res.status(500).json({error: err.message});
	}
}