module.exports = function(Token) {


  Token.renewToken = function(username,password,key,cb) {
    Token.app.wubook.renewToken(username,password,key,function(token,error){
      if(!error){
          DBtoken = Token.create({content:token, created:new Date()},
            function (record){
               cb();
          });
      }else{
              cb();
      }
    });
  };

  Token.remoteMethod('renewToken', {
    accepts: [
       {arg: 'username', type: 'string'},
       {arg: 'password', type: 'string'},
       {arg: 'key', type: 'string'}
    ],
       returns: {arg: 'token', type: 'object'},
       http: {path:'/renewtoken', verb: 'get'}
  });
};
