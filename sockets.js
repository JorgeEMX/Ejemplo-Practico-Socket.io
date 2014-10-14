module.exports = function(io) {
    
    io.on('connection', function (socket) {
        socket.on('new_user', function(id_user){
            console.log('Nuevo usuario: ' + id_user);
            io.emit('new_user', id_user);
        });
    });
};
