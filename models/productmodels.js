const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema (
    {
        name: {
            type: String,
            required: [true, "Please enter a product name"]
        },

        // quantity: {
        //     type: Number,
        //     required: true,
        //     default: 0
        // },

        // price: {
        //     type: Number,
        //     required: true,
        //     default: 0
        // }, 

        image: {
            type: String,
            required: false
        },
        
        summary: {
            type: String,
            required: true,
            default: "NA"
        }
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;