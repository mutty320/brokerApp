const { Int32 } = require('mongodb');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const clientSchema = new Schema(

    {
        num_transactions: { type: Number, default: 0 },
        client_id: { type: Number },
        group_id: { type: Number},
        revenue: { type: Number, default: 0 },
        loss: { type: Number, default: 0 },
        balance: { type: Number },// = investment_sum;
        paid_commission_w: { type: Number },
        paid_commission_m: { type: Number },
        paid_commission_y: { type: Number }
    }
)

module.exports = mongoose.model('User', clientSchema)