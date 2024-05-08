const mongoose = require("mongoose");

const textPromptSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      default: '',
    },
    extra: {
      type: String
    }
  }, {
    timestamps: true,
  }
);

const TextPrompt = mongoose.model('TextPrompt', textPromptSchema);
module.exports = TextPrompt;