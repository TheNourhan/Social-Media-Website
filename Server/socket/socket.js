const io = require("socket.io")(8900, {
    cors: {
      origin: "http://localhost:3000",
    },
  });
  
  let users = [];
  
  const add_user = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };
  
  const remove_user = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };
  
  const get_user = (userId) => {
    return users.find((user) => user.userId === userId);
  };
  
io.on("connection", (socket) => {
    console.log("a user connected.");
  
    socket.on("addUser", (userId) => {
      add_user(userId, socket.id);
      io.emit("getUsers", users);
    });
  
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      const user = get_user(receiverId);
      if(user){
        io.to(user.socketId).emit("getMessage", {
          senderId,
          text,
        });
      }else{
        console.log("user does not connected")
      }
    });
  
    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      remove_user(socket.id);
      io.emit("getUsers", users);
    });
});