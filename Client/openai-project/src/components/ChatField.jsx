import { useEffect } from "react";
import Chatbubble from "./Chatbubble";

const ChatField = (props) => {
  useEffect(() => {
    props.setToggle(!props.toggle);
  }, []);
  return (
    <div className="w-[99vw] h-chat-field mx-4 mt-4 mb-2 overflow-y-auto scroll-smooth scroll-mt-auto">
      {props.messages.map((item, idx) => (
        <Chatbubble
          key={idx}
          name={item?.name}
          time={item?.time}
          message={item?.message}
          extra={item?.extra}
        />
      ))}
    </div>
  );
};

export default ChatField;
