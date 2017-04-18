import React from 'react';
import ReactDOM from 'react-dom';
import * as gameActions from './actions/gameActions';
import world from './data/world';
import gameStore from './stores/gameStore';
import Town from './components/townComponents';
import ShipYard from './components/shipYardComponents';
import Sea from './components/seaComponents';
import TravelMap from './components/travelMapComponents';
import InfoBar from './components/infoBarComponents';


class Game extends React.Component{
  constructor(){
    super();
    this.state = _.cloneDeep(gameStore.getState());
    this.updateState = this.updateState.bind(this);
  }

  updateState(){
    var state = _.cloneDeep(gameStore.getState());
    this.setState(state);
  }

  componentWillMount(){
    gameStore.on('change', this.updateState);
  }

  componentWillUnmount(){
    gameStore.removeListener('change', this.updateState);
  }

  showScreen(){
    if(!this.state.location.isTown){
      return ( <Sea location={this.state.location} player={this.state.player} sea={this.state.sea} route={this.state.route} />) ;
    }
    if(this.state.mapOpen){
      return ( <TravelMap location={this.state.location} /> );
    }
    if(this.state.shipYard){
      return (<ShipYard ships={world.ships} playerShip={this.state.player.ship} />);
    }
    return ( <Town location={this.state.location} market={this.state.market} player={this.state.player} />);
  }

  render(){
    return(
      <div className="game-screen">
        <InfoBar player={this.state.player} />
        {this.showScreen()}
      </div>

    )
  }
}


ReactDOM.render(<Game />, document.getElementById('game-screen'))
