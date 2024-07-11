import { useState, useRef } from "react"

const TextBox = (props) => {
  const date = new Date();
  const [message, setMessage] = useState('');
  const textRef = useRef(null);

  return (
    <div className="flex">
      <textarea
        type="text"
        ref={ textRef }
        className="border border-gray-200 ring-1 ring-gray-200 py-2.5 px-3.5 ml-2 mr-1 rounded-md bg-white text-base placeholder-gray-200 h-12 resize-none whitespace-pre-wrap w-full"
        placeholder={props.placeholder}
        onChange={(e) => setMessage(e.target.value)}
        row={40}
        column={400}
      />
      <button
        type="button"
        className="bg-black text-white px-4 ml-1 mr-2 h-12 rounded-md font-bold"
        disabled={props.isLoading}
        onClick={async (e) => {
            props.setValue([...props.messages, {
              name: "Me",
              time: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${
                date.getHours()
              }:${date.getMinutes()}`,
              message: message
            }
          ]);
          await props.generateAns(message);
          setMessage("");
          textRef.current.value = '';
          // if (!props.isStream) {
          //   props.setToggle(!props.toggle);
          // }
        }}
      >
        {props.isLoading?'...':'Send'}
      </button>
    </div>
  );
};

export default TextBox;
