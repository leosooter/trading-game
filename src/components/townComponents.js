import React from 'react';
import ReactDOM from 'react-dom';
import * as gameActions from '../actions/gameActions';

class Town extends React.Component{
  render(){
    var shipDamage = (this.props.player.ship.initialDamage - this.props.player.ship.damage);
    return(
      <div className="town">
        <h1>~ {this.props.location.name} - <em>{this.props.location.region}</em>~</h1>
        <Market market={this.props.market} />
        <Inventory inventory={this.props.player.inventory} />
        <TownActionBar shipDamage={shipDamage} />
      </div>

    )
  }
}

class TownActionBar extends React.Component{
  render(){
    return(
      <div className="town-action-bar">
        {this.props.shipDamage > 0 ? <span className="fix-ship">
          <button onClick={gameActions.fixShip.bind(this, this.props.shipDamage)}>Fix Ship</button>
          <span>For: {this.props.shipDamage} gold</span>
        </span> : null}
        <button onClick={gameActions.toggleMap}>Show Map</button>
        <button onClick={gameActions.toggleShipYard}>Visit Shipyard</button>
      </div>
    )
  }
}

class Market extends React.Component{
  render(){
    var marketList = [];
    for(let key in this.props.market){
      var marketItem = this.props.market[key];
      marketList.push(
        <MarketItem key={marketItem.id} marketItem={marketItem} buyAction={gameActions.buyItem.bind(this, marketItem.id)} buyAllAction={gameActions.buyAll.bind(this, marketItem.id)} />
      )
    }
    return(
      <div className="market">
        <h3>Market</h3>
        {marketList}
      </div>
    )
  }
}

class MarketItem extends React.Component{
  render(){
    var marketItem = this.props.marketItem;
    return(
      <div className="market-item">
        <h3>{marketItem.name}</h3>
        <p>Price: {marketItem.price}</p>
        <p>Quantity: {marketItem.count}</p>
        <button onClick={this.props.buyAllAction}>Buy All</button>
        <button onClick={this.props.buyAction}>Buy</button>
      </div>
    )
  }
}

class Inventory extends React.Component{
  render(){
    var inventoryList = [];
    for(let key in this.props.inventory){
      var inventoryItem = this.props.inventory[key];
      inventoryList.push(
        <InventoryItem key={inventoryItem.id} inventoryItem={inventoryItem} sellAction={ gameActions.sellItem.bind(this, inventoryItem.id) } sellAllAction={ gameActions.sellAll.bind(this, inventoryItem.id) } />
      )
    }
    return(
      <div className="inventory">
        <h3>Player Inventory</h3>
        {inventoryList}
      </div>
    )
  }
}

class InventoryItem extends React.Component{
  render(){
    var inventoryItem = this.props.inventoryItem;
    return(
      <div className="inventory-item">
        <h3>{inventoryItem.name}</h3>
        <p>Quantity: {inventoryItem.count}</p>
        <button onClick={this.props.sellAllAction}>Sell All</button>
        <button onClick={this.props.sellAction}>Sell</button>
      </div>
    )
  }
}

export default Town;
