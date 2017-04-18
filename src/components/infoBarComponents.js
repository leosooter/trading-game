import React from 'react';
import ReactDOM from 'react-dom';
import * as gameActions from '../actions/gameActions';

class InfoBar extends React.Component{
  render(){
    var flashColor = this.props.player.flashColor;
    var goldStyle = (flashColor.length > 0) ? {
      backgroundColor: flashColor,
      boxShadow: "0px 0px 10px " + flashColor,
    } : {};
    var player = this.props.player;
    return(
      <div className="info-bar"> <span>Player : {player.name}</span> <span style={goldStyle} className="gold" >Gold : {player.gold}</span> <span>Ship : {player.ship.type}</span> <button onClick={gameActions.resetGame}>Start Over</button></div>
    )
  }
}

export default InfoBar;
