var xmlrpc = require('xmlrpc');

var client;
var token='1983945456.8066';

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
                token=value[1];
                console.log(token);
              }
      });
 	}

  exports.getRooms =  function(lcode,cb,ecb){

      client.methodCall('fetch_rooms', [token,lcode], 
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

  }

    exports.fetchNewReservation =  function(lcode,cb,ecb){

       client.methodCall('fetch_new_bookings', [token,lcode,1,1], 
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
  }

    exports.fetchReservation =  function(lcode,dfrom,dto,cb,ecb){

       client.methodCall('fetch_bookings', [token,lcode,dfrom,dto,0,1], 
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
  }