import React from "react";
import { io } from "socket.io-client";


export const socket = io("https://chat-api-001.herokuapp.com");
export const SocketContext = React.createContext<any>(null);