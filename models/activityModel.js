const mongoose = require('mongoose');

const { Schema } = mongoose;

const ActivityModel = new Schema(
  {
    title: { type: String },
    created_by: { type: String }
  }
);

module.exports = mongoose.model('Activity', ActivityModel);
