import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';
import world from '../data/world';

//utility functions
import * as utils from '../utils/utils';

class MarketStore extends EventEmitter{
  constructor(){
    super();
    this.state = {
      location : world.locations.kingston,
      market : [],
    }
  }

  resetMarket(){
    var market = [];
    console.log('current location',this.state.location);
    this.state.location.items.map(function(item){
      var count = utils.random(1, 20);
      var price = utils.random(item.minPrice, item.maxPrice);
      market.push({id : item.id, name : item.name, count, price});
    }.bind(this));
    //console.log(this);
    this.state.market = market;
  }

  changeLocation(locationId){
    var newLocation = world.locations.filter((location) => (location.id === locationId));
    this.state.location = newLocation[0];
  }

  getLocation(){
    return this.state.location;
  }

  getMarket(){
    return this.state.market;
  }

  buyItem(itemId){
    this.state.market.map()
  }

  //Action handler or reducer
  handleAction(action){
    console.log("marketStore recieved action:", action);
    switch(action.type){
      case "BUY_ITEM": {
        this.buyItem(action.itemId);
        break;
      }
      case "CHANGE_LOCATION": {
        this.changeLocation(action.locationId);
        break;
      }
      case "RESET_MARKET": {
        this.resetMarket();
        break;
      }
    }
  }

}
