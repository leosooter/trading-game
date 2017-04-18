import React from 'react';
import ReactDOM from 'react-dom';
import * as gameActions from '../actions/gameActions';
import world from '../data/world';

class TravelMap extends React.Component{
  render(){
    var routeList = [];

    this.props.location.routes.map(function(route){
      var destination = world.locations[route[route.length - 1]]
      routeList.push(
        <span  style={ {marginLeft : destination.xCoord + 'px', marginTop : destination.yCoord + 'px'} } className="destination" key={destination.name} onClick={gameActions.changeLocation.bind(this, route)}>{destination.name}</span>
      )}.bind(this)
    );

    return(
      <div className="travel-map-wrapper">
        {routeList}
        <span style={ {marginLeft : this.props.location.xCoord + 'px', marginTop : this.props.location.yCoord + 'px'} } id="current-location" className="destination" >{this.props.location.name}</span>
        <img className="travel-map" src='../client/images/map2.jpg' alt='travel map'></img>
        <button onClick={gameActions.toggleMap}>Back to Market</button>
      </div>
    )
  }
}

export default TravelMap;
