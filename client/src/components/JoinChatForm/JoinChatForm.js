import React, { useState } from 'react';
import styles from './JoinChatForm.module.css';

const JoinChatForm = () => {
    const [name, setName] = useState('');
    const [roomId, setRoomId] = useState('');

    const handleJoinRoom = (e) => {
        e.preventDefault();
        console.log(`Name: ${name}, Room ID: ${roomId}`);
    };

    return (
        <div className={styles.joinChatContainer}>
            <h1 className={styles.heading}>Join a Room to Chat</h1>
            <form onSubmit={handleJoinRoom} className={styles.form}>
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={styles.input}
                    required
                />
                <input
                    type="text"
                    placeholder="Enter a room ID"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    className={styles.input}
                    required
                />
                <button type="submit" className={styles.button}>Join Room Now</button>
            </form>
        </div>
    );
};

export default JoinChatForm;
