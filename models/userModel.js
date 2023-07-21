const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(

    {
        f_name: { type: String },
        l_name: { type: String },
        email: { type: String },
        phone_number: { type: Number },
        id: { type: Number },
        country: { type: String },
        city: { type: String },
        date_of_birth: { type: Date },
        date_of_join: { type: Date, default: Date.now()}, //add aoutomaticly
        //date_of_leave: { type: Date },
    }
)

module.exports = mongoose.model('User', userSchema, 'clients')