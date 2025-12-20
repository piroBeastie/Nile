import Product from "../models/product.model.js"

export async function getProducts(req,res){
    // res.status(200).send("Fetching all Products")
    try{
        const products = await Product.find()

        res.status(200).json(products)
    } catch(err){
        console.log("Error in getProducts controller", err.message);

        res.status(500).json({error: err.message})
    }

}

export async function getProduct(req, res){
    // res.status(200).send("Fetching one product")
    try{
        const product = await Product.findById(req.params.id)

        res.status(200).json(product)
    } catch(err){
        console.log("Error in getProduct controller", err.message);

        res.status(500).json({error:err.message})
    }
}

export async function postProducts(req,res){
    // res.status(201).send("Product created successfully")
    try{
        const product = await Product.create(req.body);

        res.status(201).json(product)
    } catch(err){
        console.log("Error in postProducts controller", err.message);

        res.status(400).json({error: err.message})
    }
}

export async function putProducts(req,res){
    // res.status(200).send("Product updated successfully")
    try{
		const updatedProduct = await Product.findByIdAndUpdate(
			req.params.id,
			req.body,
			{new: true}
		);

		if(!updatedProduct){
            return res.status(404).json({ message: "Product not found" });
        }
			
        res.status(200).json(updatedProduct);
	} catch(err){
		res.status(400).json({error: err.message});
	}

}

export async function deleteProducts(req,res){
    // res.status(200).send("Product deleted successfully")
    try {
		const deletedProduct = await Product.findByIdAndDelete(req.params.id);

		if(!deletedProduct){
            return res.status(404).json({ message: "Product not found" });
        }
			
		res.status(200).json({ message: "Product deleted successfully" });
	} catch(err){
		res.status(500).json({ error: err.message });
	}
}