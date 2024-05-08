import { useState, useEffect } from "react";
import { TextBox, ChatField } from "../components";
import axios from "axios";

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    console.log('rendering');
    const callAPI = async () => {
      const res = await axios.get("http://localhost:3000/text/get-all");
      const messages = res.data.messageList;
      setMessages(messages);
    }
    callAPI();
  }, [toggle]);

  const generateAns = async (message) => {
    // * Do the API calling
    const prompt = {
      systemPrompt:
        "You are a helpful assistant. You talk like a bangladeshi and help people solve coding problems. And your name is BotGPT",
      mainPrompt: message,
    };
    const res = await axios.post("http://localhost:3000/text/prompt", prompt);
    console.log(res);
    return res.data.messageList;
  };

  return (
    <div className="flex flex-col-reverse justify-between">
      <TextBox
        placeholder="Write down your query here"
        setValue={setMessages}
        messages={messages}
        generateAns={generateAns}
        toggle={toggle}
        setToggle={setToggle}
      />
      <ChatField
        messages={messages}
        toggle={toggle}
        setToggle={setToggle}
      />
    </div>
  );
};

export default Home;
