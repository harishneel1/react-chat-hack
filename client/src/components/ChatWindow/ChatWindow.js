import React, { useEffect, useRef, useState } from 'react';
import styles from './ChatWindow.module.css';
import { v4 as uuidv4 } from 'uuid';

const ChatWindow = ({ username, roomId, socket }) => {
    const [currentMessage, setCurrentMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const hasJoinedMessageBeenAdded = useRef(false);


    useEffect(() => {
        if (!hasJoinedMessageBeenAdded.current) {
            const uuid = uuidv4();
            setMessages(prev => [...prev, {
                id: uuid,
                type: "notif",
                text: `You have joined the room ${roomId}`
            }])
            hasJoinedMessageBeenAdded.current = true;
        }

    }, [roomId])


    useEffect(() => {
        socket.on("user_join_room", (message) => {
            const uuid = uuidv4();
            setMessages(prev => [...prev, {
                id: uuid,
                type: "notif",
                text: message
            }])
        })

        return () => {
            socket.off("user_join_room");
        }
    }, [socket])


    useEffect(() => {
        socket.on("message", ({ username, text, type }) => {
            const uuid = uuidv4();
            setMessages(prevMessages => [...prevMessages, {
                id: uuid,
                username,
                text,
                type
            }])
        })
        return () => {
            socket.off("message");
        };
    }, [socket])

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            socket.emit('user_left_room', { username, roomId });
            event.returnValue = ''; // Required for Chrome to trigger the event
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [username, roomId, socket])

    const handleSendMessage = (e) => {
        e.preventDefault();

        const uuid = uuidv4();

        setMessages(prevMessages => [...prevMessages, {
            id: uuid,
            username,
            text: currentMessage
        }])

        socket.emit("send_message", {
            username,
            roomId,
            text: currentMessage,
        })

        setCurrentMessage("")
    }

    return (
        <div className={styles.chatContainer}>
            <div className={styles.chatHeader}>
                <h2>Room ID: {roomId}</h2>
                <p>Welcome, <span>{username}</span></p>
            </div>
            <div className={styles.chatMessages}>
                {messages.map((message) => {

                    if (message.type == "notif") {
                        return (
                            <div key={message.id} className={styles.notif}>{message.text}</div>
                        )
                    } else {
                        return (
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
                        )
                    }
                })
                }
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
