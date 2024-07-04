import React, { useEffect, useState } from 'react';
import styles from './ChatWindow.module.css';
import { v4 as uuidv4 } from 'uuid';

const ChatWindow = ({ username, roomId, socket }) => {
    const [currentMessage, setCurrentMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("message", ({ username, text }) => {
            const uuid = uuidv4();
            setMessages(prevMessages => [...prevMessages, {
                id: uuid,
                username,
                text
            }])
        })
        return () => {
            socket.off("message");
        };
    }, [socket])

    const handleSendMessage = (e) => {
        e.preventDefault()
        socket.emit("send_message", {
            username,
            roomId,
            text: currentMessage,
        })
    }

    return (
        <div className={styles.chatContainer}>
            <div className={styles.chatHeader}>
                <h2>Room ID: {roomId}</h2>
                <p>Welcome, <span>{username}</span></p>
            </div>
            <div className={styles.chatMessages}>
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`${styles.chatMessage} ${message.username === username ? styles.myMessage : styles.otherMessage
                            }`}
                    >
                        <div className={styles.messageText}>
                            <span className={styles.messageName}>{message.username}&#x3a;</span>
                            <span>{message.text}</span>
                        </div>
                        <div className={styles.time}>7:19 AM</div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSendMessage} className={styles.messageForm}>
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    className={styles.messageInput}
                    required
                />
                <button type="submit" className={styles.sendButton}>Send</button>
            </form>
        </div>
    );
};

export default ChatWindow;
