import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		items: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
					required: true,
				},
				quantity: {
					type: Number,
					required: true,
				},
				price: {
					type: Number,
					required: true,
				},
			},
		],
		totalPrice: {
			type: Number,
			required: true,
		},
		isPaid: { 
			type: Boolean,
			default: false,
		},
		paidAt: Date,
		deliveryStatus: {
			type: String,
			enum: ["pending", "shipped", "delivered"],
			default: "pending",
		},
		deliveredAt: Date,
	},
	{ timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
  