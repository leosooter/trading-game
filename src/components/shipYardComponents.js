import React from 'react';
import ReactDOM from 'react-dom';
import * as gameActions from '../actions/gameActions';
import world from '../data/world';

class ShipYard extends React.Component{
  render(){
    var shipList = [];
    for(let key in this.props.ships){
      let ship = this.props.ships[key];
      var isPlayerShip = (ship.type === this.props.playerShip.type);
      if(!ship.enemy){
        shipList.push( <ShipForSale key={ship.id} ship={ship} buyAction={gameActions.buyShip.bind(this, ship.type)} isPlayerShip={isPlayerShip} /> );
      }
    }

    return(
      <div className="ship-yard-wrapper">
        <div className="ship-yard">
          <h3>Shipyard</h3>
          {shipList}
        </div>
        <button onClick={gameActions.toggleShipYard}>Back to Market</button>
      </div>
    )
  }
}

class ShipForSale extends React.Component{
  render(){
    var ship = this.props.ship;
    return(
      <div className="ship-for-sale">
        <img src={ship.imgUrl} alt={ship.type + " icon"}></img>
        <h4>{ship.type} ~ <em>{this.props.isPlayerShip ? 'Current Ship' : ''}</em></h4>
        <p>Price: {ship.price}</p>
        <p>Attack: {ship.attack}</p>
        <p>Damage Points: {ship.initialDamage}</p>
        <button onClick={this.props.buyAction} >Buy Ship</button>
      </div>
    )
  }
}

export default ShipYard;
