
import './App.css'
import user from "./assets/user.png";
import robot from "./assets/robot.png";
import { useState, useEffect}  from 'react';

function ChatInput({chatMessages, setChatMessages}){
  const [inputText, setInputText] = useState('');
  
  function saveInputText(e){
    setInputText(e.target.value);
  }

  function sendMessage(){
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: "user",
        id: crypto.randomUUID()
      }
    ]
    setChatMessages(newChatMessages);

    const response = window.Chatbot.getResponse(inputText);
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: "robot",
        id: crypto.randomUUID()
      }
    ]);
    
    setInputText("")
  }
  return (
    <>
      <input 
        placeholder='Send a message to Chatbot' 
        size="30"
        onChange={saveInputText}
        value={inputText}
      />
      
      <button onClick={sendMessage}>Send</button>
    </>
    
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
    <div>
      {sender === 'robot' && (
        <img src={robot} width="50"/>
      )}
      
      {message} 
      
      {sender === 'user' && (
        <img src={user} width="50"/>
      )} 
      
    </div>
    
  )
}

function ChatMessages({chatMessages}){
  return(
  <>
    {chatMessages.map((chatMessage) => {
          return (
            <ChatMessage
              message={chatMessage.message}
              sender={chatMessage.sender}
              key={chatMessage.id}
            />
          )
    })}
  </>
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

  return (
    <>
      <ChatInput 
        chatMessages = {chatMessages}
        setChatMessages = {setChatMessages}
      />
      <ChatMessages 
        chatMessages = {chatMessages}
      />
    </>
  )
}

export default App
