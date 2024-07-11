import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { ChatField, TextBox } from "../components";

const StreamPrompt = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [toggle, setToggle] = useState(false);
  const [isStream, setStream] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const eventSource = useRef(null);
  useEffect(() => {
    const callAPI = async () => {
      const res = await axios.get("http://localhost:3000/stream/get-all");
      const messageList = res.data.messageList;
      setMessages(messageList);
      setTrigger(!trigger);
    }
    callAPI();
  }, [toggle]);

  const generateAns = async (message) => {
    if (!message) {
      console.log('Nothing here');
      return;
    }
    // * Do the API calling
    setLoading(true);
    const prompt = {
      systemPrompt:
        "You are a helpful assistant. You talk like a bangladeshi and help people solve coding problems. And your name is BotGPT",
      mainPrompt: message,
    };
    setStream(true);
    eventSource.current = new EventSource("http://localhost:3000/stream/prompt?systemPrompt="+encodeURIComponent(prompt.systemPrompt)+"&mainPrompt="+encodeURIComponent(prompt.mainPrompt));
    eventSource.current.onmessage = function(event) {
      if (event.data === 'undefined') {
        eventSource.current.close();
        setLoading(false);
        setStream(false);
        setText('');
        setToggle(!toggle);
      }
      else {
        const part = event.data.toString('utf16');
        setText(prevText => prevText + part);
      }
    }
    eventSource.current.onerror = function() {
      eventSource.current.close();
      setLoading(false);
      setStream(false);
      setToggle(!toggle);
      setText('');
    }
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
        isLoading={isLoading}
        isStream={isStream}
      />
      <ChatField
        messages={messages}
        text={text}
        setMessages={setMessages}
        trigger={trigger}
        isStream={isStream}
      />
    </div>
  );
};

export default StreamPrompt;
