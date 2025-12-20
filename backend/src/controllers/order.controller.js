import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";

export async function postOrder(req,res){
    // res.status(200).send("Order Created Successfully")
    try {
		const userId = req.user._id;
		// const { items } = req.body;
		const cart = await Cart.findOne({user: userId}).populate("items.product")

		if (!cart || cart.items.length === 0) {
			return res.status(400).json({ message: "No order items" });
		}

		const orderItems = cart.items.map((item)=>{
			return{
				product: item.product._id,
				quantity: item.quantity,
				price: item.product.price
			}
		})

		const totalPrice = orderItems.reduce(
			(acc, item) => acc + item.price * item.quantity,
			0
		);

		const order = await Order.create({
			user: userId,
			items: orderItems,
			totalPrice,
		});

		await Cart.findOneAndDelete({ user: userId });

		res.status(201).json(order);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}

export async function getOrderById(req,res){
    // res.status(200).send("Fetching your Order")
    try {
		const orderId = req.params.id;
		const userId = req.user._id;

		const order = await Order.findById(orderId).populate("items.product");

		if (!order) {
			return res.status(404).json({ message: "Order not found" });
		}

		// owner OR admin
		if (
			order.user.toString() !== userId.toString() &&
			!req.user.isAdmin
		) {
			return res.status(403).json({ message: "Access denied" });
		}

		res.status(200).json(order);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}

export async function getOrder(req,res){
    // res.status(200).send("Fetching your Order")
    try {
		const userId = req.user._id;
		
		const orders = await Order.find({ user: userId }).populate(
			"items.product"
		);

		res.status(200).json(orders);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}

export async function putPay(req,res){
	try{
		const orderId = req.params.id;
		const order = await Order.findById(orderId)

		if (!order) {
			return res.status(404).json({ message: "Order not found" });
		}

		const userId = req.user._id;
		if(userId.toString()!== order.user.toString()){
			return res.status(403).json({message: "Access Denied"})
		}

		if (order.isPaid) {
			return res.status(400).json({ message: "Order already paid" , order});
		}
		
		order.isPaid = true;
		order.paidAt = Date.now()

		await order.save();

		res.status(200).json({message: "Payment Completed", order});

	} catch(err){
		res.status(500).json({ error: err.message });
	}
}

//for admins only
export async function getAllOrders(req, res) {
	try {
		const orders = await Order.find()
			.populate("user", "name email")
			.populate("items.product");

		res.status(200).json(orders);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}


export async function putDeliver(req,res){
	try{
		const orderId = req.params.id;
		const order = await Order.findById(orderId)

		if(!order){
			return res.status(400).json({message: "Order doesnt exist"})
		}

		if (order.deliveryStatus === "delivered") {
			return res.status(400).json({ message: "Order already delivered", order});
		}

		order.deliveryStatus = "delivered"
		order.deliveredAt = Date.now()

		await order.save();

		res.status(200).json({message: "Delivery Completed", order});
	} catch(err){
		res.status(500).json({ error: err.message });
	}
}
