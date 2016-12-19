// defining these up top so we can easily change these later if we need to.


// For Regenerate Currency Example
var CHANCE_TO_DIE = 0.3333;     // % chance to lose a life during battle, this could also be set in TitleData
var GEM_MAX = 20;      // maximum limit on the gold that can be found, this could also be set in TitleData
var GEM_MIN = 10;      // maximum limit on the gold that can be found, this could also be set in TitleData
var LIVES_CURRENCY_CODE = "LV";     // currecny code for our Lives VC
var GEMS_CURRENCY_CODE = "GM";      // currency code for our Gems VC


// FootUnited
var ENERGY_CURRENCY_CODE = "EY";	// currecny code for our ENERGY Bar VC

handlers.UpdatePlayerEnergy = function(args)
{
	// get the calling player's inventory and VC balances
	var GetUserInventoryRequest =
	{
		"PlayFabId": currentPlayerId
	};

	var GetUserInventoryResult = server.GetUserInventory(GetUserInventoryRequest);
//	var userInventory = GetUserInventoryResult.Inventory;
	var userVcBalances = GetUserInventoryResult.VirtualCurrency;
	var userVcRecharge = GetUserInventoryResult.VirtualCurrencyRechargeTimes;

	// make sure the player has > 0 energy bar before proceeding
	try
	{
		if (!CheckEnergy(userVcBalances))
		{
			// throw "No energy remaining. Please wait a moment for recharging.."
			// + userVcRecharge[ENERGY_CURRENCY_CODE].SecondsToRecharge + " seconds.";
			throw userVcRecharge[ENERGY_CURRENCY_CODE].SecondsToRecharge;
		}
	}
	catch(ex)
	{
		return JSON.stringify(ex);
	}

	SubtractVc(userVcBalances, ENERGY_CURRENCY_CODE, 1);
	log.info("You have used an energy unit.");

	var userDataResults = {};
	userDataResults.currentUserVcBalances = userVcBalances[ENERGY_CURRENCY_CODE];
	userDataResults.currentUserVcRecharge = userVcRecharge[ENERGY_CURRENCY_CODE];

	// parseInt(userVcBalances)

	return JSON.stringify(userDataResults);
}


// // For Regenerate Currency Example
// handlers.Battle = function(args) 
// {
// 	// get the calling player's inventory and VC balances
// 	var GetUserInventoryRequest = 
//     {
//         "PlayFabId": currentPlayerId
//     };

//     var GetUserInventoryResult = server.GetUserInventory(GetUserInventoryRequest);
// 	var userInventory = GetUserInventoryResult.Inventory;
// 	var userVcBalances = GetUserInventoryResult.VirtualCurrency;
// 	var userVcRecharge = GetUserInventoryResult.VirtualCurrencyRechargeTimes;

// 	// make sure the player has > 0 lives before proceeding. 
// 	try
// 	{
// 		if(!CheckLives(userVcBalances))
// 		{
// 			throw "No lives remaining. Purchase additional lives or wait: " 
//             + userVcRecharge[LIVES_CURRENCY_CODE].SecondsToRecharge + " seconds.";
// 		}
// 	}
// 	catch(ex)
// 	{
// 		return JSON.stringify(ex);
// 	}


// 	// calculate the battle using our 'global' params...
// 	var gemsFound = Math.floor(Math.random() * (GEM_MAX - GEM_MIN + 1) + GEM_MIN);
// 	AddVc(userVcBalances, GEMS_CURRENCY_CODE, gemsFound);
// 	log.info("You found " + gemsFound + " gems.");

// 	var rollOfFate =  Math.floor(Math.random() * (10 - 1 + 1) + 1);
// 	var lostALife = rollOfFate <= Math.floor(10 * CHANCE_TO_DIE) ? true : false; 

// 	if(lostALife)
// 	{
// 		SubtractVc(userVcBalances, LIVES_CURRENCY_CODE, 1);
// 		log.info("You lost a life.");
// 	}

// 	var battleResults = {};
// 		battleResults.gemsFound = gemsFound;
// 		battleResults.lostALife = lostALife;

// 	return JSON.stringify(battleResults);
// };


// For Regenerate Currency Example
// function CheckLives(vcBalnces)
// {
// 	if(vcBalnces != null && vcBalnces.hasOwnProperty(LIVES_CURRENCY_CODE) && vcBalnces[LIVES_CURRENCY_CODE] > 0)
// 	{
// 		return true;
// 	}
// 	else
// 	{
// 		return false;
// 	}
// }


function CheckEnergy(vcBalnces)
{
	if (vcBalnces != null && vcBalnces.hasOwnProperty(ENERGY_CURRENCY_CODE) && vcBalnces[ENERGY_CURRENCY_CODE] > 0)
	{
		return true;
	}
	else
	{
		return false;
	}
}



function AddVc(vcBalnces, code, qty)
{ 
	if(vcBalnces != null && vcBalnces.hasOwnProperty(code) &&  vcBalnces[code] > 0)
	{
		vcBalnces[code] += qty;
	}

	var AddUserVirtualCurrencyRequest = {
	    "PlayFabId" : currentPlayerId,
	    "VirtualCurrency": code,
	    "Amount": qty
    };
    var AddUserVirtualCurrencyResult = server.AddUserVirtualCurrency(AddUserVirtualCurrencyRequest);
}

function SubtractVc(vcBalnces, code, qty)
{
	if(vcBalnces != null && vcBalnces.hasOwnProperty(code) &&  vcBalnces[code] > 0)
	{
		vcBalnces[code] -= qty;
	}

	var SubtractUserVirtualCurrencyRequest = {
	    "PlayFabId" : currentPlayerId,
	    "VirtualCurrency": code,
	    "Amount": qty
    };

    var SubtractUserVirtualCurrencyResult = server.SubtractUserVirtualCurrency(SubtractUserVirtualCurrencyRequest);
}

handlers.EasyLogEvent = function (args)
{
    log.info("This info was appended to the log");
    log.error("This error was appended to the log");
}

// handlers.GetPlayerStats = function (args)
// {
//     var playerStatResult = server.GetPla
// }

// handlers.UpdatePlayerStats = function (args, context) 
// {
//     var playerStatResult = server.UpdatePlayerStatistics(
//     {
//         PlayFabId: currentPlayerId,
//         Statistics: [{StatisticName: "SpecialTrick_TEST", Value: 2 }]
//     });
// }

// handlers.GetPlayerData = function (args)
// {
//     var playerDataResult = server.GetPlayerData(
//     {
//         PlayFabId: currentPlayerId,
//         Keys: ["secretshoes","secrettrick"]
//     });
    
// 	var playerDataResults = {};
// 		playerDataResults.gemsFound = gemsFound;
// 		playerDataResults.lostALife = lostALifesce

// 	return JSON.stringify(battleResults);    
    
// }

// handlers.UpdatePlayerData = function (args, context)
// {
//     var playerDataResult = server.UpdateUserData(
//     {
//         PlayFabId: currentPlayerId,
//         Data: { secretshoes: "golden boots 2", secrettrick: "scissor kick 2"},
//         Permission: "Public"
//     });
// }

// handlers.helloWorld = function (args)
// {
//   //var message = "Hello " + currentPlayerId + "!";
    
//   var message = "Hello " + args.name;    
    
//   log.info(message);
//   return { messageValue: message };
// }

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
