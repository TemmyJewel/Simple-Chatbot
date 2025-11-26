import user from "../assets/profile-1.jpg";
import robot from "../assets/robot.png";
import './ChatMessage.css'

function ChatMessage({message, sender, time}){
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

    console.log(user)
    
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
        <p className="time-stamp">{time}</p>
        </div>

        {sender === 'user' && (
            <img src={user} className='chat-message-profile user-profile'/>
        )} 
        
        
        </div>
        
    )
    }

export default ChatMessage;