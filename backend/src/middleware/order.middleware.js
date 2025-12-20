export function validateOrder(req, res, next) {
	const { items } = req.body;

	if (!items || items.length === 0) {
		return res.status(400).json({ message: "Order must contain items" });
	}

	for (const item of items) {
		if (!item.product || item.quantity < 1 || item.price <= 0) {
			return res.status(400).json({ message: "Invalid order item" });
		}
	}

	next();
}