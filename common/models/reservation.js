var moment = require('moment');


module.exports = function(Reservation) {


 Reservation.getremote = function(cb) {

  //function(lcode,dfrom,dto,cb,ecb){
      	Reservation.app.wubook.fetchReservation('1377875938','20/09/2015','01/11/2015',function(data){
	      	var reservation = data[1];
	      		reservation.forEach(function(reservation) {

            var date_arrival = moment(reservation.date_arrival,"DD/MM/YYYY").toDate();
            var date_departure = moment(reservation.date_departure,"DD/MM/YYYY").toDate();
            var date_received = moment(reservation.date_received,"DD/MM/YYYY").toDate();

             reservation.date_arrival=new Date(date_arrival);
            reservation.date_departure=new Date(date_departure);
            reservation.date_received=new Date(date_received);


	      			Reservation.create(reservation);
	      		});
	      	cb(data);
      	})
      
    }
     
    Reservation.remoteMethod(
        'getremote', 
        {
          returns: { arg: 'data', type: 'object' }, 
          http: {path:'/getremote', verb: 'get'}
        }
    );


  Reservation.updatedate = function(res_id,cb) {
      Reservation.find(function(err,oldres){
        //console.log(oldres);
        oldres.forEach(function(res){

            console.log("OLD DATE" + res.date_arrival);
            var date_arrival = moment(res.date_arrival,"DD/MM/YYYY").toDate();
            var date_departure = moment(res.date_departure,"DD/MM/YYYY").toDate();
            var date_received = moment(res.date_received,"DD/MM/YYYY").toDate();
            console.log("NEW DATE" + date_arrival);
            console.log("Date()" + new Date(date_arrival));
           res.date_arrival=new Date(date_arrival);
            res.date_departure=new Date(date_departure);
            res.date_received=new Date(date_received);


            res.save();
            console.log("SAVED" + moment(res.date_arrival).format("dddd, MMMM Do YYYY, h:mm:ss a"));
        });

        cb();
      });
    }
     
    Reservation.remoteMethod(
        'updatedate', {
        accepts: [
            {arg: 'res_id', type: 'string'}
        ],
          returns: { arg: 'success', type: 'string' }, 
          http: {path:'/updatedate', verb: 'get'}
        }
    );



};
