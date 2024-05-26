const mongoose = require("mongoose");

const streamPromptSchema = mongoose.Schema(
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

const StreamPrompt = mongoose.model('StreamPrompt', streamPromptSchema);
module.exports = StreamPrompt;