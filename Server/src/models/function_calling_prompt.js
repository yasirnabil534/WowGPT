const mongoose = require("mongoose");

const functionCallingPromptSchema = mongoose.Schema(
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

const FunctionCallingPrompt = mongoose.model('FunctionCallingPrompt', functionCallingPromptSchema);
module.exports = FunctionCallingPrompt;