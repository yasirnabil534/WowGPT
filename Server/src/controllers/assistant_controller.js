const mongoose = require("mongoose");
const { EventEmitter } = require("events");
const {
  runAssistant,
  getAllPrompt,
  createAssistant,
} = require("../services/assistant_services");
const { threadId } = require("worker_threads");

const create = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const assistant = await createAssistant(
      "gpt-3.5-turbo",
      req?.body?.name,
      req?.body?.instructions,
      req?.body?.tools,
      session
    );
    if (assistant) {
      await session.commitTransaction();
      session.endSession();
      res.status(200).json({assistant});
    } else {
      await session.abortTransaction();
      session.endSession();
      res.status(500).json({ message: "Assistant is not created" });
    }
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: "Something went wrong" });
  }
};

const callGPT = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    res.sseSetup();

    const eventEmitter = new EventEmitter();
    eventEmitter.on("event", (data) => {
      if (data.event === "thread.message.delta") {
        res.sseSend(data.data.delta.content[0].text.value);
      } else if (data.event === "thread.run.completed") {
        res.sseStop();
      }
    });

    req.on("close", () => {
      eventEmitter.removeAllListeners("event");
    });

    const mainPrompt = req?.query?.mainPrompt;
    const id = req?.query?.id;
    const botPrompt = await runAssistant(
      id,
      mainPrompt,
      eventEmitter,
      session,
      res
    );
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
  create,
  callGPT,
  getHistory,
};
