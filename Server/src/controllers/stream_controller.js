const mongoose = require("mongoose");
const { runPrompt, getAllPrompt } = require("../services/stream_services");

const callGPT = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const mainPrompt = req?.query?.mainPrompt;
    const systemPrompt = req?.query?.systemPrompt;
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    const botPrompt = await runPrompt(systemPrompt, mainPrompt, session, res);
    await session.commitTransaction();
    session.endSession();
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getHistory = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const messageList = await getAllPrompt(session);
    await session.commitTransaction();
    session.endSession();
    if (messageList) {
      res.status(200).json({ messageList });
    } else {
      res.status(400).json({ message: "Some problem with OpenAI" });
    }
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  callGPT,
  getHistory,
}