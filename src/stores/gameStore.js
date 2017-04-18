import EventEmitter from 'events';
import dispatcher from '../dispatcher/dispatcher';
import world from '../data/world';
import * as utils from '../utils/utils';
import _ from 'lodash';

class GameStore extends EventEmitter{
  constructor(){
    super();
    this.initialState = {
      location : world.startingLocation,
      market : {},
      sea : {
        enemy : null,
        battle : false,
      },
      player : {
        name : 'Eli',
        gold : 100,
        inventory : {},
        ship : world.ships.sloop,
        flashColor : '',
      },
      mapOpen : false,
      shipYard : false,
      route : [],
    }
    this.state = _.cloneDeep(this.initialState);
    this.startBattle = this.startBattle.bind(this);
  }

  resetMarket(){
    var market = {};
    this.state.location.items.map(function(item){
      var upperCount = Math.ceil((this.state.player.ship.price / item.minPrice) / 1.5) + 1;
      upperCount = (upperCount > 100) ? 100 : upperCount;
      var lowerCount = Math.ceil((this.state.player.ship.price / item.maxPrice) / 2);
      lowerCount = (lowerCount > 30) ? 30 : lowerCount;
      item.count = _.random(lowerCount, upperCount);
      item.price = _.random(item.minPrice, item.maxPrice);
      market[item.id] = item;
    }.bind(this));
    this.state.market = market;
    this.emit('change');
  }

  changeLocation(route = this.state.route){
    this.state.sea.enemy = null;
    this.state.sea.battle = false;
    this.emit('change');
    if(route.length){
      var newRoute = _.cloneDeep(route);
      var newLocation = world.locations[newRoute.shift()];

      this.state.location = newLocation;
      this.state.route = newRoute;

      if(this.state.location.isTown){
        this.resetMarket();
        this.state.mapOpen = false;
      }

      else{
        this.checkForEnemy(newLocation);
      }
      this.emit('change');
    }
  }

  checkForEnemy(location){
    var rand = _.random(1,10);
    if(rand < location.threatLevel){
      var enemyShip = location.threats[_.random(0, location.threats.length -1)];
      this.state.sea.enemy = enemyShip;
    }
  }

  checkDamage(attack){
    return new Promise(
      function(resolve){
        setTimeout(function(resolve){
          resolve( (_.random(0, 10) * attack) );
        }.bind(this, resolve), 1600)
      }
    )
  }

  runAway(){
    var enemyShip = _.cloneDeep(this.state.sea.enemy);
    var playerShip = _.cloneDeep(this.state.player.ship);

    enemyShip.fire = true;
    playerShip.fire = false;
    this.state.sea.enemy = enemyShip;
    this.state.player.ship = playerShip;
    this.emit('change');

    this.checkDamage(enemyShip.attack).then(function(damage){
      playerShip.damage -= damage;
      if(playerShip.damage <= 0){
        this.state.player.ship = playerShip;
        this.emit('change');
        setTimeout(this.resetGame.bind(this), 2000);
      }
      else{
        this.state.player.ship = playerShip;
        this.emit('change');
        setTimeout(this.changeLocation.bind(this), 1000);
      }
    }.bind(this))
  }

  startBattle(){
    this.state.sea.battle = true;
    var enemyShip = _.cloneDeep(this.state.sea.enemy);
    var playerShip = _.cloneDeep(this.state.player.ship);

    enemyShip.fire = false;
    playerShip.fire = true;
    this.state.sea.enemy = enemyShip;
    this.state.player.ship = playerShip;
    this.emit('change');

    this.checkDamage(playerShip.attack).then(function(damage){
      enemyShip.damage -= damage;
      if(enemyShip.damage <= 0){
        this.addGold(Math.floor( _.random(enemyShip.price/2, enemyShip.price) ));
        playerShip.fire = false;
        this.state.sea.enemy = enemyShip;
        this.state.player.ship = playerShip;
        this.emit('change');
        setTimeout(this.changeLocation.bind(this), 2000);
      }
      else{
        enemyShip.fire = true;
        playerShip.fire = false;
        this.state.sea.enemy = enemyShip;
        this.state.player.ship = playerShip;
        this.emit('change');

        this.checkDamage(enemyShip.attack).then(function(damage){
          playerShip.damage -= damage;
          if(playerShip.damage <= 0){
            this.state.player.ship = playerShip;
            this.emit('change');
            setTimeout(this.resetGame.bind(this), 2000);
          }
          else{
            this.startBattle();
          }
        }.bind(this))
      }
    }.bind(this))
  }

  resetGame(){
    this.state = this.initialState;
    gameStore.resetMarket();
    this.emit('change');
  }

  toggleMap(){
    this.state.mapOpen = !this.state.mapOpen;
    this.emit('change');
  }

  toggleShipYard(){
    this.state.shipYard = !this.state.shipYard;
    this.emit('change');
  }

  fixShip(amount){
    var playerGold = this.state.player.gold;
    amount = (amount < playerGold) ? amount : playerGold;
    playerGold -= amount;
    this.state.player.gold = playerGold;
    this.state.player.ship.damage += amount;
    this.emit('change');
  }



  notEnoughGold(){
    this.state.player.flashColor = 'red';
    this.emit('change');
    setTimeout(function(){
      this.state.player.flashColor = '';
      this.emit('change');
    }.bind(this), 200);
  }

  buyShip(type){
    var newShip = world.ships[(type).toLowerCase()];
    if(this.state.player.gold > newShip.price){
      this.subGold(newShip.price)
      this.state.player.ship = newShip;
      this.toggleShipYard();
      this.emit('change');
    }
    else{
      this.notEnoughGold();
    }
  }

  getState(){
    return this.state;
  }

  buyItem(itemId, amount = this.state.market[itemId].count){
    if(this.state.market[itemId].count){
      var playerGold = this.state.player.gold;
      var newItem = _.cloneDeep(this.state.market[itemId]);
      var buyAmount = Math.floor(playerGold / newItem.price);
      console.log("buyAmount", buyAmount);

      if(buyAmount >= 1){
        buyAmount = ( buyAmount > newItem.count ) ? newItem.count : buyAmount;
        buyAmount = amount === 1 ? amount : buyAmount;
        this.addToInventory(newItem, buyAmount);
        this.subGold(newItem.price * buyAmount);

        var market = _.cloneDeep(this.state.market);
        market[itemId].count -= buyAmount;
        this.state.market = market;
        this.emit('change');
      }
    }
  }

  addToInventory(newItem, amount){
    var inventory = _.cloneDeep(this.state.player.inventory);
    if(inventory[newItem.id]){
      inventory[newItem.id].count += amount;
    }
    else{
      inventory[newItem.id] = newItem;
      inventory[newItem.id].count = amount;
    }
    this.state.player.inventory = inventory;
  }

  sellItem(itemId, amount = this.state.player.inventory[itemId].count){
    if(this.state.market[itemId]){
      var inventory = _.cloneDeep(this.state.player.inventory);
      inventory[itemId].count -= amount;

      var newItem = _.cloneDeep(inventory[itemId]);
      this.addToMarket(newItem, amount);

      this.addGold(this.state.market[itemId].price * amount);

      if(!inventory[itemId].count){
        delete inventory[itemId];
      }

      this.state.player.inventory = inventory;
      this.emit('change');
    }
  }

  addToMarket(newItem, amount){
    var market = _.cloneDeep(this.state.market);
    market[newItem.id].count += amount;
    this.state.market = market;
  }

  addGold(amount){
    this.state.player.gold += amount;
    this.state.player.flashColor = 'gold';
    this.emit('change');
    setTimeout(function(){
      this.state.player.flashColor = '';
      this.emit('change');
    }.bind(this), 200);
  }

  subGold(amount){
    this.state.player.gold -= amount;
  }

  //Action handler or reducer
  handleAction(action){
    console.log("gameStore recieved action:", action.type);
    switch(action.type){
      case "BUY_ITEM": {
        this.buyItem(action.itemId, 1);
        break;
      }
      case "BUY_All": {
        this.buyItem(action.itemId);
        break;
      }
      case "SELL_ITEM": {
        this.sellItem(action.itemId, 1);
        break;
      }
      case "SELL_All": {
        this.sellItem(action.itemId);
        break;
      }
      case "CHANGE_LOCATION": {
        this.changeLocation(action.route);
        break;
      }
      case "START_BATTLE": {
        this.startBattle(action.route);
        break;
      }
      case "RUN_AWAY": {
        this.runAway(action.route);
        break;
      }
      case "TOGGLE_MAP": {
        this.toggleMap();
        break;
      }
      case "TOGGLE_SHIPYARD": {
        this.toggleShipYard();
        break;
      }
      case "FIX_SHIP": {
        this.fixShip(action.amount);
        break;
      }
      case "BUY_SHIP": {
        this.buyShip(action.shipType);
        break;
      }
      case "RESET_MARKET": {
        this.resetMarket();
        break;
      }
      case 'ADD_GOLD': {
        this.addGold(action.amount);
      }
      case 'REMOVE_GOLD': {
        this.subGold(action.amount);
      }
      case 'RESET_GAME': {
        this.resetGame();
      }
    }
  }
}

const gameStore = new GameStore();
gameStore.resetMarket();

dispatcher.register(gameStore.handleAction.bind(gameStore));

export default gameStore;
