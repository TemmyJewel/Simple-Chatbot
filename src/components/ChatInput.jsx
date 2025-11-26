import {useState}  from 'react';
import spinner from "../assets/loading-spinner.gif";
import {Chatbot} from 'supersimpledev';
import './ChatInput.css'

function ChatInput({chatMessages, setChatMessages, setLoading, loading, setPendingMessage}){
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
  
    setPendingMessage({message: <img src= {spinner} className='spinner'/>, sender: "robot"})

    const response = await Chatbot.getResponseAsync(inputText);
  
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
        disabled={loading}
        className='send-btn'
      >Send</button>
    </div>
    
  )
}

export default ChatInput