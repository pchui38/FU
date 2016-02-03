handlers.helloWorld = function (args)
{
  //var message = "Hello " + currentPlayerId + "!";
    
  var message = "Hello " + args.name;    
    
  log.info(message);
  return { messageValue: message };
}

handlers.SetUserReadOnlyData = function (args)
{
    var result = server.UpdateUserReadOnlyData
    ({
        PlayFabId: currentPlayerId,
        Data: args.data
    });
    
    log.info(result);
    return result;
}

handlers.GetAllUserReadOnlyData = function (args)
{
    var result = server.GetUserReadOnlyData
    ({
        PlayFabId: currentPlayerId
    })
    return result;
}

