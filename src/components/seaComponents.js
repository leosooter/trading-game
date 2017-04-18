import React from 'react';
import ReactDOM from 'react-dom';
import * as gameActions from '../actions/gameActions';

class Sea extends React.Component{

  render(){

    var smokeStart = {
      opacity: '.01',
    }
    var smokeEnd = {
      opacity: '.03',
      transform: 'scale(1.5, 1.5)',
    }

    var playerCannonStart = {
      left : '40%',
      opacity : '1',
      bottom : '8px'
    }
    var playerCannonEnd = {
      left : '670px',
      opacity : '0',
      bottom : '18px'
    }

    var playerCannonStyle = this.props.player.ship.fire ? playerCannonEnd : playerCannonStart;
    var playerSmokeStyle = this.props.player.ship.fire ? smokeEnd : smokeStart;

    var enemyCannonStart = {
      left : '40%',
      opacity : '1',
      bottom : '8px'
    }
    var enemyCannonEnd = {
      left : '-450px',
      opacity : '0',
      bottom : '18px'
    }

    if(this.props.sea.enemy){
      var enemyCannonStyle = this.props.sea.enemy.fire ? enemyCannonEnd : enemyCannonStart;
      var enemySmokeStyle = this.props.sea.enemy.fire ? smokeEnd : smokeStart;
    }

    return(
      <div className="sea">
        <h1>~ {this.props.location.name} ~</h1>
        <Ship position="player-ship" sea={this.props.sea} cannonStyle={playerCannonStyle} smokeStyle={playerSmokeStyle} ship={this.props.player.ship} />

        { this.props.sea.enemy ? <Ship position="enemy-ship" sea={this.props.sea} cannonStyle={enemyCannonStyle} smokeStyle={enemySmokeStyle} ship={this.props.sea.enemy} /> : null }

        <img className="sea-top" src="../client/images/sea-top.jpg" alt="sea background"></img>
        <img className="sea-bottom" src="../client/images/sea-bottom.jpg" alt="sea background"></img>
        <div className="bottom-mask"></div>
        <ActionBar enemy={this.props.sea.enemy} battle={this.props.sea.battle} route={this.props.route}/>
      </div>
    )
  }
}

class ActionBar extends React.Component{
  render(){
    var actionItems = [];

    if(!this.props.enemy){
      actionItems.push( <button key="sail" onClick={gameActions.changeLocation.bind(this, this.props.route)} >Sail On</button> );
    }

    else if(!this.props.battle ){
      actionItems.push( <button key="fight" onClick={gameActions.startBattle.bind(this, this.props.route)} >Fight</button> );
      actionItems.push( <button key="run" onClick={gameActions.runAway.bind(this, this.props.route)} >Run Away</button> );
    }

    return(
      <div className="action-bar">
        {actionItems}
      </div>
    )
  }
}

class Ship extends React.Component{
  render(){
    var ship = this.props.ship;

    var sunk = {
      bottom : '-100px',
      transform: 'rotate(-90deg)',
    }

    var afloat = {
      bottom : '195px',
    }

    return(
      <div className={ "ship " + this.props.position } style={ (ship.damage > 0)?  afloat : sunk }>
        <img src={ship.imgUrl} alt={ship.type + " icon"}></img>
        <div className="damage-bar" style={ { width : (ship.initialDamage / 5 + 100) + "px" } }><div style={ { width : ((ship.damage / ship.initialDamage) * 100) + "%" } }></div></div>
          <div className="cannon" style={ this.props.cannonStyle }></div>
          <img className="smoke" src="../client/images/smoke1.png" style={ this.props.smokeStyle }></img>
      </div>

    )
  }
}

export default Sea;
