import * as utils from '../utils/utils';

class Ship{
  constructor(){
    this.id = utils.newId();
  }
  attack(){
    console.log("Attacking");
  }
}

class Sloop extends Ship{
  constructor(){
    super();
    this.type = 'Sloop';
    this.price = 300;
    this.attack = 5;
    this.initialDamage = 100;
    this.damage = this.initialDamage;
    this.imgUrl = '../client/images/sloop.png';
  }
}

class Schooner extends Ship{
  constructor(){
    super();
    this.type = 'Schooner';
    this.price = 500;
    this.attack = 8;
    this.initialDamage = 200;
    this.damage = this.initialDamage;
    this.imgUrl = '../client/images/schooner.png';
  }
}

class Galley extends Ship{
  constructor(){
    super();
    this.type = 'Galley';
    this.price = 1000;
    this.attack = 12;
    this.initialDamage = 400;
    this.damage = this.initialDamage;
    this.imgUrl = '../client/images/galley.png';
  }
}

class Galleon extends Ship{
  constructor(){
    super();
    this.type = 'Galleon';
    this.price = 5000;
    this.attack = 20;
    this.initialDamage = 600;
    this.damage = this.initialDamage;
    this.imgUrl = '../client/images/galleon.png';
  }
}

class PirateSloop extends Ship{
  constructor(){
    super();
    this.type = 'Sloop';
    this.price = 300;
    this.attack = 3;
    this.initialDamage = 100;
    this.damage = this.initialDamage;
    this.imgUrl = '../client/images/pirate-sloop.png';
  }
}

class PirateSchooner extends Ship{
  constructor(){
    super();
    this.type = 'Schooner';
    this.price = 500;
    this.attack = 6;
    this.initialDamage = 200;
    this.damage = this.initialDamage;
    this.imgUrl = '../client/images/pirate-schooner.png';
  }
}

class PirateGalley extends Ship{
  constructor(){
    super();
    this.type = 'Galley';
    this.price = 1000;
    this.attack = 9;
    this.initialDamage = 400;
    this.damage = this.initialDamage;
    this.imgUrl = '../client/images/pirate-galley.png';
  }
}

class PirateGalleon extends Ship{
  constructor(){
    super();
    this.type = 'Galleon';
    this.price = 5000;
    this.attack = 15;
    this.initialDamage = 600;
    this.damage = this.initialDamage;
    this.imgUrl = '../client/images/pirate-galleon.png';
  }
}



class Item{
  constructor(name, minPrice, maxPrice, materials = null){
    this.id = utils.newId();
    this.name = name;
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;
    this.materials = materials;
    this.count = 0;
    this.price = 0;
  }
}

var sun = new Item('Sunshine', 0, 7);
var rain = new Item('Rainfall', 0, 7);

var grapes = new Item('Grapes', 3, 12, [sun, rain]);
var wine = new Item('Wine', 25, 50, [grapes]);

var hops = new Item('Hops', 2, 6, [sun, rain]);
var wheat = new Item('Wheat', 1, 12, [sun, rain]);
var beer = new Item('Beer', 10, 30, [hops, wheat]);

var cotton = new Item('Cotton', 5, 20, [sun, rain]);
var clothes = new Item('Clothes', 20, 60, [cotton]);


class Town{
  constructor(name, items){
    this.id = utils.newId();
    this.name = name;
    this.items = items;
    this.isTown = true;
  }
}

class Sea{
  constructor(name, threatLevel, threats){
    this.name = name;
    this.threatLevel = threatLevel;
    this.threats = threats;
    this.isTown = false;
  }
}

var sloop = new Sloop();
var schooner = new Schooner();
var galley = new Galley();
var galleon = new Galleon();

var pirateSloop = new PirateSloop();
var pirateSchooner = new PirateSchooner();
var pirateGalley = new PirateGalley();
var pirateGalleon = new PirateGalleon();

var windwardPassage = new Sea('Windward Passage', 8, [pirateSchooner, pirateGalley, pirateGalleon]);
var yucatanChannel = new Sea('Yucatan Channel', 6, [pirateSloop, pirateSchooner, pirateGalley]);
var golfoDeMorrosquillo = new Sea('Golfo de Morrosquillo', 3, [pirateSloop, pirateSchooner]);

var kingston = new Town('Kingston', [grapes, wine, cotton, clothes]);
var havana = new Town('Havana', [hops, beer, cotton, clothes]);
var colon = new Town('Colon', [grapes, wine, hops, beer, cotton, clothes]);
var sanJuan = new Town('San Juan', [hops, beer, cotton, clothes]);

kingston.routes = [ [yucatanChannel, havana], [golfoDeMorrosquillo, colon] ];
havana.routes = [ [yucatanChannel, kingston], [yucatanChannel, golfoDeMorrosquillo, colon] ];
colon.routes = [ [golfoDeMorrosquillo, yucatanChannel, havana], [golfoDeMorrosquillo, kingston] ];
sanJuan.routes = [ [windwardPassage, kingston] ];

var world = {
  locations : {
    kingston : kingston,
    havana : havana,
    colon : colon,
    golfoDeMorrosquillo : golfoDeMorrosquillo,
    yucatanChannel : yucatanChannel,
    windwardPassage : windwardPassage,
  },
  ships : {
    sloop : sloop,
    schooner : schooner,
    galley : galley,
    galleon : galleon,
    pirateSloop : pirateSloop,
    pirateSchooner : pirateSchooner,
    pirateGalley : pirateGalley,
    pirateGalleon : pirateGalleon,
  }
}

// kingston.generateMarket();
export default world;
