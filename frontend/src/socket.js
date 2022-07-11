import { io } from "socket.io-client";

const socket = io("ws://localhost:3001/", {
    reconnectionDelayMax: 10000
});

export default socket