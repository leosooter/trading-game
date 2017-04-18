import dispatcher from '../dispatcher/dispatcher';
//Dispatch call can be here or in Dispatcher file.
//Only advantage to storing Dispatch

export function buyItem(itemId){
  dispatcher.dispatch({
    type : 'BUY_ITEM',
    itemId,
  })
}

export function buyAll(itemId){
  dispatcher.dispatch({
    type : 'BUY_All',
    itemId,
  })
}

export function sellItem(itemId){
  dispatcher.dispatch({
    type : 'SELL_ITEM',
    itemId,
  })
}

export function sellAll(itemId){
  dispatcher.dispatch({
    type : 'SELL_All',
    itemId,
  })
}

export function toggleMap(){
  dispatcher.dispatch({
    type : 'TOGGLE_MAP',
  })
}

export function toggleShipYard(){
  dispatcher.dispatch({
    type : 'TOGGLE_SHIPYARD',
  })
}

export function buyShip(shipType){
  dispatcher.dispatch({
    type : 'BUY_SHIP',
    shipType,
  })
}

export function fixShip(amount){
  dispatcher.dispatch({
    type : 'FIX_SHIP',
    amount,
  })
}

export function changeLocation(route){
  dispatcher.dispatch({
    type : 'CHANGE_LOCATION',
    route,
  })
}

export function startBattle(route){
  dispatcher.dispatch({
    type : 'START_BATTLE',
    route,
  })
}

export function runAway(route){
  dispatcher.dispatch({
    type : 'RUN_AWAY',
    route,
  })
}

export function resetGame(){
  dispatcher.dispatch({
    type : 'RESET_GAME',
  })
}
