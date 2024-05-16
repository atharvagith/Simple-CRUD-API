const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/productmodels');
const app = express()

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes

app.get('/', (req, res) => {
    res.send('Hello API server')
});

// app.post('/product', (req, res) => {
//     console.log(req.body);
//     res.send(req.body);
// });

//get all products
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//get specific product
app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//update a product
app.put('/products/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);

        if (!product) {
            return res.status(404).json({message: "Product not found"});
        }

        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//delete a product
app.delete('/products/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            res.status(404).json({message: "Product not found"})
        }

        res.status(200).json({message: "Product deleted successfully"})

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


mongoose.connect('mongodb+srv://Abubakar10:Mongo123456@nodeapidb.ixyy92j.mongodb.net/Node-API?retryWrites=true&w=majority&appName=NodeAPIDB')
    .then(() => {
        console.log("Connected to Database");
        app.listen(3000, () => {
            console.log('Server is running on port 3000')
        });
    })
    .catch(() => {
        console.log("Connection Error!");
    })