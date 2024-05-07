import Chatbubble from './Chatbubble';

const ChatField = (props) => {
  return (
    <div className='w-[95vw] h-chat-field mx-4 mt-4 mb-2'>
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
  )
}

export default ChatField;