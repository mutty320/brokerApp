const mongoose = require("mongoose");
const { Schema } = mongoose;

const transactionSchema = new Schema([
  {
    client_id: { type: Number },
    company: { type: String },
    trans_type: { type: String },//buy/sell
    date_of_trans: { type: Date, default: Date.now()},
    num_of_shares: {type: Number},
    out_come: {type: String}//gain/loss
  },
]);

module.exports = mongoose.model("User", transactionSchema);
