import { useEffect, useRef } from "react";
import Chatbubble from "./Chatbubble";
import "../App.css";

const ChatField = (props) => {
  const date = new Date();
  const chatField = useRef("chat");
  useEffect(() => {
    if (props.text) {
      const lastMessage = {
        name: 'Bot',
        time: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${
          date.getHours()
        }:${date.getMinutes()}`,
        message: props.text,
      }
      props.setMessages([...props.messages, lastMessage]);
    }
    console.log('Hitted');
    chatField.current.scrollTop = chatField.current.scrollHeight - chatField.current.clientHeight;
  }, [props.trigger]);
  return (
    <div
      ref={chatField}
      className="w-[calc(100%-16px)] h-chat-field mx-4 mt-4 mb-2 overflow-y-auto scroll-smooth chats"
    >
      {props.messages.map((item, idx) => (
        <Chatbubble
          key={idx}
          name={item?.name}
          time={item?.time}
          message={item?.message}
          extra={item?.extra}
        />
      ))}
      {props.isStream && <Chatbubble
        name="Bot"
        time={`${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${
          date.getHours()
        }:${date.getMinutes()}`}
        message={props.text}
        />}
    </div>
  );
};

export default ChatField;
