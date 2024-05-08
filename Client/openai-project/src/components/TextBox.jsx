import {useState} from "react"

const TextBox = (props) => {
  
  const [message, setMessage] = useState('');

  return (
    <div className="flex">
      <textarea
        type="text"
        className="border border-gray-200 ring-1 ring-gray-200 py-2.5 px-3.5 ml-2 mr-1 w-full rounded-md bg-white text-base placeholder-gray-200 h-12 resize-none whitespace-pre-wrap"
        placeholder={props.placeholder}
        onChange={(e) => setMessage(e.target.value)}
        rows={40}
        cols={300}
      />
      <button
        type="button"
        className="bg-black text-white px-4 ml-1 mr-2 h-12 rounded-md font-bold"
        onClick={async (e) => {
          props.setValue([...props.messages, {
            name: "Me",
            time: "1:15",
            message: message
          }
        ]);
        const aiMessage = await props.generateAns(message);
        setMessage("");
        props.setToggle(!props.toggle);
        }}
      >
        Send
      </button>
    </div>
  );
};

export default TextBox;
