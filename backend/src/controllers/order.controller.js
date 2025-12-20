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

		const totalPrice = items.reduce(
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

//for admins only
export async function updateOrderStatus(req, res) {
	try {
		const { status } = req.body;
		const orderId = req.params.id;

		const order = await Order.findById(orderId);
		if (!order) {
			return res.status(404).json({ message: "Order not found" });
		}

		order.status = status;
		await order.save();

		res.status(200).json(order);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}

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
