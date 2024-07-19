import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
export const URL: string =  'https://chat-back-2928.onrender.com';

export const socket = io(URL);