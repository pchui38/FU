handlers.helloWorld = function (args)
{
  //var message = "Hello " + currentPlayerId + "!";
    
  var message = "Hello " + args.name;    
    
  log.info(message);
  return { messageValue: message };
}

handlers.SetUserROData = function (args)
{
    var result = server.UpdateUserReadOnlyData({
        PlayFabId: currentPlayerId,
        Data: args.data
    });
    
    return result;
}