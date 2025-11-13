
import './App.css'
import user from "./assets/user.png";
import robot from "./assets/robot.png";


function ChatInput(){
  return (
    <>
      <input 
        placeholder='Send a message to Chatbot' 
        size="30"
      />
      
      <button>Send</button>
    </>
    
  )
}

function ChatMessage({message, sender}){
  // const message = props.message;
  // const sender = props.sender;
  // const { message, sender } = props;

  // if(sender === 'robot'){
  //   return (
  //   <div>
  //     <img src={user} width="50"/>
  //     {message}
  //   </div>
    
  // )
  // }
  
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

function App() {
  

  return (
    <>
      <ChatInput />
      <ChatMessage  
        message="Hello Chatbot" 
        sender="user"
      />
      <ChatMessage  
        message="Hello! How can I help you today?" 
        sender = "robot"
      />
      <ChatMessage  
        message="Can you get me today's date?" 
        sender="user"
      />
      <ChatMessage  
        message="Today is Friday the 13th" 
        sender = "robot"
      />
    </>
  )
}

export default App
