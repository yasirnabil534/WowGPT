const { OpenAI } = require("openai");
const StreamPrompt = require("../models/stream_prompt");
require("dotenv").config();
const config = {
  apiKey: process.env.OpenAI_API,
};

const openai = new OpenAI(config);

const savePrompt = async (name, message, extra, session) => {
  try {
    const date = new Date();
    const prompt = {
      name,
      time: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${
        date.getHours()
      }:${date.getMinutes()}`,
      message,
    };
    if (extra) {
      prompt.extra = "Generated by, OpenAI";
    }
    const streamPromptCollection = await new StreamPrompt(prompt);
    const streamPrompt = await streamPromptCollection.save({session});
    return streamPrompt;
  } catch (err) {
    throw err;
  }
};

const getAllPrompt = async (session) => {
  try {
    const streamPrompts = await StreamPrompt.find().session(session).lean();
    if (streamPrompts) {
      return streamPrompts;
    } else {
      return [];
    }
  } catch (err) {
    throw err;
  }
};

const runPrompt = async (systemPrompt, mainPrompt, session, res) => {
  const messages = [
    { role: "system", content: `${systemPrompt}` },
    { role: "user", content: `${mainPrompt}` },
  ];
  try {
    const userPrompt = await savePrompt("Me", mainPrompt, false, session);
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      max_tokens: 1000,
      temperature: 0.9,
      stream: true,
    });
    console.log(completion);
    let sentence = "";
    for await (const chunk of completion) {
      console.log(chunk);
      res.write(`data: ${chunk.choices[0]?.delta?.content}\n\n`);
      if (chunk.choices[0]?.delta?.content === undefined) {
        res.end();
        if (sentence === "") {
          sentence = "Sorry, no info is found on this topic";
        }
        const botPrompt = await savePrompt("Bot", sentence, true, session);
        return botPrompt;
      } else {
        sentence += chunk.choices[0]?.delta?.content;
      }
    }
  } catch (err) {
    throw err;
  }
};


module.exports = {
  getAllPrompt,
  runPrompt,
};