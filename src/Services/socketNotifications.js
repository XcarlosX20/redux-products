import io from "socket.io-client";
const socketNotifications = (company) => {
    const socket = io(process.env.REACT_APP_MYAPP_SOCKET);
        socket.emit('notifications', company);
        socket.on('notifications', data => {
            console.log(data)
        })
}
 
export default socketNotifications;