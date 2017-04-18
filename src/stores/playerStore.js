import EventEmitter from 'events';
import dispatcher from '../dispatcher';
import world from '../data/world';

class PlayerStore extends EventEmitter{
  constructor(){
    super();
    this.state = {
      name : 'Leo',
      gold : 100,
      ship : world.ships.sloop,
      inventory : [],
      goods : [],
    }
  }

  addGold(amount){
    this.state.gold += amount;
  }

  removeGold(amount){
    this.state.gold -= amount;
  }

  handleAction(action){
    switch(action.type){
      case 'ADD_GOLD': {
        this.addGold(action.amount);
      }
      case 'REMOVE_GOLD': {
        this.removeGold(action.amount);
      }
    }
  }
}
