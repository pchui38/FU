// defining these up top so we can easily change these later if we need to.


// For Regenerate Currency Example
// var CHANCE_TO_DIE = 0.3333;     // % chance to lose a life during battle, this could also be set in TitleData
// var GEM_MAX = 20;      // maximum limit on the gold that can be found, this could also be set in TitleData
// var GEM_MIN = 10;      // maximum limit on the gold that can be found, this could also be set in TitleData
// var LIVES_CURRENCY_CODE = "LV";     // currecny code for our Lives VC
// var GEMS_CURRENCY_CODE = "GM";      // currency code for our Gems VC


// FootUnited
var ENERGY_CURRENCY_CODE = "EY";	// currecny code for our ENERGY Bar VC

// initialise isPlayerBanned to FALSE
var isPlayerBanned = false;

handlers.SubtractPlayerEnergy = function(args)
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


	// make sure the player is NOT cheated & the player has > 0 energy level before proceeding
	try
	{
		if (CheckIsPlayerCheated(userVcBalances))
		{
			// Ban the Player's PlayFab account
			BanPlayer();

			// Set bool isPlayerBanned to TRUE
			isPlayerBanned = true;

			// Throw an error as bool variable to return to the Player & take the Player back to 'Title' scene
			throw isPlayerBanned;
		}

		// if (!CheckEnergyNotEmpty(userVcBalances))
		// {
		// 	// throw "No energy remaining. Please wait a moment for recharging.."
		// 	throw userVcRecharge[ENERGY_CURRENCY_CODE].SecondsToRecharge;
		// }
	}
	catch(ex)
	{
		return JSON.stringify(ex);
	}

	SubtractVc(userVcBalances, ENERGY_CURRENCY_CODE, 1);
	log.info("You have used an energy unit.");

	var userDataResults = {};
	userDataResults.currentUserVcBalances = userVcBalances[ENERGY_CURRENCY_CODE];
	userDataResults.currentUserVcRecharge = userVcRecharge[ENERGY_CURRENCY_CODE].SecondsToRecharge;

	// parseInt(userVcBalances)

	return JSON.stringify(userDataResults);
}


handlers.AddPlayerEnergy = function(args)
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

	// make sure the player do not have full energy (i.e. < 5 energy bar) before proceeding
	try
	{
		if (!CheckEnergyNotFull(userVcBalances))
		{
			// throw "FULL energy. No need for recharging.."
			// + userVcRecharge[ENERGY_CURRENCY_CODE].SecondsToRecharge + " seconds.";
			throw userVcRecharge[ENERGY_CURRENCY_CODE].SecondsToRecharge;
		}
	}
	catch(ex)
	{
		return JSON.stringify(ex);
	}

	AddVc(userVcBalances, ENERGY_CURRENCY_CODE, 1);
	log.info("You have received a new energy unit.");

	var userDataResults = {};
	userDataResults.currentUserVcBalances = userVcBalances[ENERGY_CURRENCY_CODE];
	userDataResults.currentUserVcRecharge = userVcRecharge[ENERGY_CURRENCY_CODE].SecondsToRecharge;

	return JSON.stringify(userDataResults);
}

handlers.AddPlayerFullEnergy = function(args)
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

	// make sure the player do not have full energy (i.e. < 5 energy bar) before proceeding
	try
	{
		if (!CheckEnergyNotFull(userVcBalances))
		{
			// throw "FULL energy. No need for recharging.."
			// + userVcRecharge[ENERGY_CURRENCY_CODE].SecondsToRecharge + " seconds.";
			throw userVcRecharge[ENERGY_CURRENCY_CODE].SecondsToRecharge;
		}
	}
	catch(ex)
	{
		return JSON.stringify(ex);
	}

	AddFullVc(userVcBalances, ENERGY_CURRENCY_CODE);
	log.info("You have received Full energy unit.");

	var userDataResults = {};
	userDataResults.currentUserVcBalances = userVcBalances[ENERGY_CURRENCY_CODE];
	userDataResults.currentUserVcRecharge = userVcRecharge[ENERGY_CURRENCY_CODE].SecondsToRecharge;

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

// Ban the Player's PlayFab Account
function BanPlayer()
{
	var BanPlayerRequest = {
		"Bans" : [
			{ 
				"PlayFabId": currentPlayerId,
			// "IPAddress": "192.168.1.1",
				"Reason": "You cheated!",
		 		"DurationInHours": 1
			}
		]
	};
	var BanPlayerResult = server.BanUsers(BanPlayerRequest);
}

// Check if the Player is cheating
function CheckIsPlayerCheated(vcBalnces)
{
	if (vcBalnces != null && vcBalnces.hasOwnProperty(ENERGY_CURRENCY_CODE) && vcBalnces[ENERGY_CURRENCY_CODE] <= 0)
	{
		// Player is cheated
		return true;
	}
	else
	{
		// Player is NOT cheated
		return false;
	}
}

// Check if the Player's Energy level is NOT empty 
function CheckEnergyNotEmpty(vcBalnces)
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

// Check if the Player's Energy level is NOT Full yet 
function CheckEnergyNotFull(vcBalnces)
{
	if (vcBalnces != null && vcBalnces.hasOwnProperty(ENERGY_CURRENCY_CODE) && vcBalnces[ENERGY_CURRENCY_CODE] < 5)
	{
		return true;
	}
	else
	{
		return false;
	}
}

// Add a certain quantity of virtual currency to the Player's PlayFab account
function AddFullVc(vcBalnces, code)
{ 
	var fullQty = 5;
	var diffQty = fullQty - vcBalnces[code];

	if(vcBalnces != null && vcBalnces.hasOwnProperty(code) &&  vcBalnces[code] < 5)
	{
		vcBalnces[code] = fullQty;

		var AddUserVirtualCurrencyRequest = {
		    "PlayFabId" : currentPlayerId,
		    "VirtualCurrency": code,
		    "Amount": diffQty
	    };
	    var AddUserVirtualCurrencyResult = server.AddUserVirtualCurrency(AddUserVirtualCurrencyRequest);
	}    
}

// Add a certain quantity of virtual currency to the Player's PlayFab account
function AddVc(vcBalnces, code, qty)
{ 
	if(vcBalnces != null && vcBalnces.hasOwnProperty(code) &&  vcBalnces[code] < 5)
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

// Subtract a certain quantity of virtual currency from the Player's PlayFab account
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
