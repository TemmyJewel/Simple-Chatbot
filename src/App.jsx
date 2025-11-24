
import './App.css'
import user from "./assets/user.png";
import robot from "./assets/robot.png";
import {useEffect, useState, useRef}  from 'react';

function ChatInput({chatMessages, setChatMessages, setLoading, loading, pendingMessage, setPendingMessage}){
  const [inputText, setInputText] = useState('');
  
  function saveInputText(e){
    setInputText(e.target.value);
  }

  async function sendMessage(){
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: "user",
        id: crypto.randomUUID()
      }
    ]

    setLoading(true);
    setChatMessages(newChatMessages);
   
    setPendingMessage({message: "Loading...", sender: "robot"})

    const response = await window.Chatbot.getResponseAsync(inputText);
   
    setPendingMessage(null)
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: "robot",
        id: crypto.randomUUID()
      }
    ]);
    
    setInputText("");
    setLoading(false);
  }

  
  function keyDownEvent(e){
    if(e.key === "Enter"){
      sendMessage();
      setInputText("")
    }
    if(e.key === "Escape"){
      setInputText("")
    }
  }
  
 
  return (
    <div className='chat-input-container'>
      <input 
        disabled={loading}
        className='input-box'
        placeholder='Send a message to Chatbot' 
        size="30"
        onChange={saveInputText}
        value={inputText}
        onKeyDown={keyDownEvent}
      />
      
      <button 
        onClick={sendMessage} 
        className='send-btn'
      >Send</button>
    </div>
    
  )
}

function ChatMessage({message, sender}){
  /*const message = props.message;
  const sender = props.sender;
  const { message, sender } = props;

  if(sender === 'robot'){
    return (
    <div>
      <img src={user} width="50"/>
      {message}
    </div>
    
  )
  }*/
  
  return (
    <div className={
        sender === 'user' 
          ? 'chat-message-user' 
          : 'chat-message-robot'
      }>
      {sender === 'robot' && (
        <img src={robot} className='chat-message-profile'/>
      )}
      
      <div className='chat-message-text'>
      {message}
      </div>

      {sender === 'user' && (
        <img src={user} className='chat-message-profile'/>
      )} 
      
    </div>
    
  )
}

function ChatMessages({chatMessages, pendingMessage}){
  const chatMessagesRef = useRef(null);
  useEffect(() => {
    const containerElem = chatMessagesRef.current;
    if (containerElem){
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [chatMessages]);

  
  return(
  <div 
    className='chat-message-container'
    ref={chatMessagesRef}>
    {chatMessages.map((chatMessage) => {
          return (
            <ChatMessage
              message={chatMessage.message}
              sender={chatMessage.sender}
              key={chatMessage.id}
            />
          )
    })}
    {pendingMessage && (
      <ChatMessage 
        sender="robot" message={pendingMessage.message}/>
    )}
  </div>
  )
}

function App() {
  const [chatMessages, setChatMessages] = useState([{
    message: "Hello Chatbot",
    sender:"user",
    id: "id1"
    },
    {
      message:"Hello! How can I help you today?",
      sender: "robot",
      id: "id2"
    },
    {
      message:"Can you get me today's date?",
      sender:"user",
      id: "id3"
    },
    {
      message:"Today is Friday the 13th",
      sender:"robot",
      id: "id4"
    }
  ]);

  const [loading, setLoading] = useState(false);
  const [pendingMessage, setPendingMessage] = useState('')

  return (
    <div className='App-container'>
      <ChatMessages 
        chatMessages = {chatMessages}
        pendingMessage={pendingMessage}
      />
      <ChatInput 
        chatMessages = {chatMessages}
        setChatMessages = {setChatMessages}
        loading = {loading}
        setLoading = {setLoading}
        pendingMessage = {pendingMessage}
        setPendingMessage = {setPendingMessage}
      />
    </div>
  )
}

export default App
