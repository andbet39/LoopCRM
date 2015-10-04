module.exports = function(Room) {

     
    Room.getremote = function(cb) {
      	Room.app.wubook.getRooms('1377875938',function(data){
	      	console.log(data);
	      	var rooms = data[1];
	      		rooms.forEach(function(room) {
	      			Room.create(room);
	      		});
	      	cb(rooms);
      	})
      
    }
     
    Room.remoteMethod(
        'getremote', 
        {
          returns: { arg: 'data', type: 'object', http: { source: 'body' } }
        }
    );

};
