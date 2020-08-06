let getSocket;

try {
    // condtional import only will get socket.io-client instance
    // when the window is defined
    if (window) getSocket = import('./client');
} catch (err) {
    console.log('socket not available');
}

export default (getSocket || null);