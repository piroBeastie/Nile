export function validateProduct(req, res, next) {
	const { name, price, description, image, category } = req.body;

	if (!name || !price || !description || !image || !category) {
		return res.status(400).json({ message: "All product fields are required" });
	}

	if (price <= 0) {
		return res.status(400).json({ message: "Price must be greater than 0" });
	}

	next();
}
