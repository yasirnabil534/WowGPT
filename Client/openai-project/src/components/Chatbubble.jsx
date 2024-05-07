const Chatbubble = (props) => {
  return (
    <div className={`flex flex-col w-fit leading-1.5 py-4 pl-4 pr-16 my-4 border-gray-200 rounded-e-xl rounded-es-xl ${props.name == 'Me'? 'bg-gray-100': 'bg-gray-800'}`}>
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <span className={`text-sm font-semibold ${props.name == 'Me'? 'text-gray-900': 'text-white'}`}>
          {props.name}
        </span>
        <span className={`text-sm font-normal ${props.name == 'Me'?  'text-gray-500' :'text-gray-400'}`}>
          {props.time}
        </span>
      </div>
      <p className={`text-sm font-normal py-2.5 ${props.name == 'Me'?'text-gray-900' : 'text-white'}`}>
        {props.message}
      </p>
      {props.extra && (
        <span className={`text-sm font-normal ${props.name == 'Me'? 'text-gray-500': 'text-gray-400'}`}>
          {props.extra}
        </span>
      )}
    </div>
  );
};

export default Chatbubble;
