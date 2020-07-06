import React, { useState } from 'react'

const goToRoom = (history, roomId) => {
    history.push(`/${roomId}`)
};

export function SelectRoom({history}) {
    let [roomId, setRoomId] = useState(1);

    return (<div className="enter-room-container">
        <form>
            <input type="text" value={roomId} placeholder="Room id" onChange={(event) => {
                setRoomId(event.target.value)
            }}/>
            <button onClick={() => {
                goToRoom(history, roomId)
            }}>Enter</button>
        </form>
    </div>)
}