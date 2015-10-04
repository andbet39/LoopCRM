module.exports = function(Reservation) {


 Reservation.getremote = function(cb) {
      	Reservation.app.wubook.fetchReservation('1377875938',function(data){
	      	console.log(data);
	      	var reservation = data[1];
	      		reservation.forEach(function(reservation) {
	      			Reservation.create(reservation);
	      		});
	      	cb();
      	})
      
    }
     
    Reservation.remoteMethod(
        'getremote', 
        {
          returns: { arg: 'data', type: 'object', http: { source: 'body' } }
        }
    );
};
