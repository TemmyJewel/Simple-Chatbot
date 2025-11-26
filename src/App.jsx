
import {useState, useEffect}  from 'react';
import ChatInput from './components/ChatInput';
import ChatMessage from './components/ChatMessage';
import {ChatMessages} from './components/ChatMessages';
import {Chatbot} from 'supersimpledev';

import './App.css'

function App() {
  const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('chatMessages')) || []);

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
      'you are awesome' : 'No, you are awesome!',
      'Tell me a joke' : 'Why did the developer go broke? Because he used up all his cache.',
      'Tell me a fun fact' : 'Did you know that the first computer bug was an actual bug? In 1947, a moth was found causing issues in the Mark II computer at Harvard University.',
      'Thank you' : "You're welcome!",
      'hi' : 'Hello! How can I assist you today?',
      'hey' : 'Hey there! What would you like to know?',
      'yo' : 'Yo! How can I help you?',
      "what's up?" : 'Not much! How about you?',
      'Pick a color' : function(){
        const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'indigo', 'violet', 'turquoise', 'brown', 'black', 'white', 'gray'];
        const randomIndex = Math.floor(Math.random() * colors.length);
        return `I pick ${colors[randomIndex]}`; 
      },
      "I know I'm 'bout to blow, I ain't dumb" : "They try to take my flow, I take they - for ransom",
      "I know that I'm gone" : "They see me blowin' up, now they say they want some"
    })
  })

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
    setChatMessages(chatMessages);
  }, [chatMessages])

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
