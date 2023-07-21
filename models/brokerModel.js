const mongoose = require("mongoose");
const { Schema } = mongoose;

const brokerSchema = new Schema({
  broker_id: { type: Number },
  group_ids: [Number],
  license: { type: String },
  date_license_issued: { type: Date },
  yearly_commissions: { type: Number },
  monthly_commissions: { type: Number },
  weekly_commissions: { type: Number },
  yearly_transactions: { type: Number },
  monthly_transactions: { type: Number },
  weekly_transactions: { type: Number },
});

module.exports = mongoose.model('User', brokerSchema)