const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    login: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true,collection: 'users' }
);

const users = mongoose.model('Workout', workoutSchema)

module.exports = {
    users,  
}
