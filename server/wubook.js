var xmlrpc = require('xmlrpc');

var client;
var token;

 exports.startClient = function(){
 		   console.log ("Starting RPC client Wubook");
      client = xmlrpc.createSecureClient({host: 'wubook.net',port:443,path:'/xrws/'},1); 
 	     console.log("Acquire Token from WUbook");

      token = client.methodCall('acquire_token', ['AT035','Luglio2015','bamboo:rome'], 
          function (error, value) {
              if(error) {
                console.log(error);
                console.log('Error received');
                console.log('error:', error);
                console.log('req headers:', error.req && error.req._header);
                console.log('res code:', error.res && error.res.statusCode);
                console.log('res body:', error.body);

              }else{

                console.log(value);
                token=value[1];
                console.log(token);
              }
      });
 	}

  exports.getRooms =  function(lcode,cb,ecb){

      var rooms = client.methodCall('fetch_rooms', [token,lcode], 
          function (error, value) {
              if(error) {
                console.log(error);
                console.log('Error received');
                console.log('error:', error);
                console.log('req headers:', error.req && error.req._header);
                console.log('res code:', error.res && error.res.statusCode);
                console.log('res body:', error.body);
                ecb(error);
              }else{
                cb(value);
          }

      });

      return rooms;
  }

    exports.fetchReservation =  function(lcode,cb,ecb){

      var reservation = client.methodCall('fetch_new_bookings', [token,lcode,0], 
          function (error, value) {
              if(error) {
                console.log(error);
                console.log('Error received');
                console.log('error:', error);
                console.log('req headers:', error.req && error.req._header);
                console.log('res code:', error.res && error.res.statusCode);
                console.log('res body:', error.body);
                ecb(error);
              }else{
                cb(value);
          }

      });

      return reservation;
  }