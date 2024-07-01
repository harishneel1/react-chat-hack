import React, { useState } from 'react';
import styles from './ChatWindow.module.css';

// Dummy data
const messages = [
    { id: 1, userId: 'user1', userName: 'Harish', text: 'Hello!' },
    { id: 2, userId: 'user2', userName: 'Bob', text: 'Hi there!' },
    { id: 3, userId: 'user1', userName: 'Alice', text: 'How are you?' },
    { id: 4, userId: 'user2', userName: 'Bob', text: 'I am good, thanks!' }
];

const ChatWindow = () => {
    const [messageInput, setMessageInput] = useState('');

    const name = "Harish";
    const roomId = "12354"

    const handleSendMessage = (e) => {
        console.log("Message sent")
    }

    return (
        <div className={styles.chatContainer}>
            <div className={styles.chatHeader}>
                <h2>Room ID: {roomId}</h2>
                <p>Welcome, <span>{name}</span></p>
            </div>
            <div className={styles.chatMessages}>
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`${styles.chatMessage} ${message.userName === name ? styles.myMessage : styles.otherMessage
                            }`}
                    >
                        {/* <span className={styles.userName}>{message.userName}</span> */}
                        <p className={styles.messageText}>{message.text}</p>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSendMessage} className={styles.messageForm}>
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    className={styles.messageInput}
                    required
                />
                <button type="submit" className={styles.sendButton}>Send</button>
            </form>
        </div>
    );
};

export default ChatWindow;
