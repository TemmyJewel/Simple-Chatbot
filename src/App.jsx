
import {useState, useEffect}  from 'react';
import ChatInput from './components/ChatInput';
import ChatMessage from './components/ChatMessage';
import {ChatMessages} from './components/ChatMessages';
import {Chatbot} from 'supersimpledev';

import './App.css'

function App() {
  const [chatMessages, setChatMessages] = useState([]);

  const [loading, setLoading] = useState(false);
  const [pendingMessage, setPendingMessage] = useState('')

  useEffect(() => {
    Chatbot.addResponses({
      'What is your name?' : 'I am SuperSimpleDev Chatbot!',
      'What can you do?' : "I can chat with you, flip a coin, roll a dice, or get today's date",
      'Pick a number between 1 and 10' : function(){
        const randomNum = Math.floor(Math.random() * 10) + 1;
        return `I pick ${randomNum}`;
      },
      'I got white, I got black, what you want?' : 'Hop outside a Ghost and hop up in a Phantom',
      
    })
  })

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
        setPendingMessage = {setPendingMessage}
      />
    </div>
  )
}

export default App
