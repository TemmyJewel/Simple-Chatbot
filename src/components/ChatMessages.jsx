import {useEffect, useRef}  from 'react';
import ChatMessage from './ChatMessage';
import './ChatMessages.css'

function useAutoScroll(dependency){
    const dependencyRef = useRef(null);
    useEffect(() => {
        const containerElem = dependencyRef.current;
        if (containerElem){
        containerElem.scrollTop = containerElem.scrollHeight;
        }
    }, [dependency]);

    return dependencyRef;
}

export function ChatMessages({chatMessages, pendingMessage}){
    const chatMessagesRef = useAutoScroll(chatMessages);
    return(
    <div 
        className='chat-message-container'
        ref={chatMessagesRef}>
        {chatMessages.length === 0 && (
        <h2 className="welcome-message">
            Welcome to the chatbot project! Send a message using the textbox below.
        </h2>
        )}
        {chatMessages.map((chatMessage) => {
            return (
                <ChatMessage
                message={chatMessage.message}
                sender={chatMessage.sender}
                time={chatMessage.time}
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
