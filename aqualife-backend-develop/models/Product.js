const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const productSchema = new mongoose.Schema(
    {
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        imgURL: {
            type: String,
            required: true
        },
        status: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
)

// statuses
// 0 = Pending
// -4  = Rejected
// 4 = Approved

productSchema.plugin(AutoIncrement, {
    inc_field: 'product',
    id: 'productNums',
    start_seq: 500
})

module.exports = mongoose.model('Product', productSchema)