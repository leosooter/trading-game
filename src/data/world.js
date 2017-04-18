import * as utils from '../utils/utils';

class Ship{
  constructor(){
    this.id = utils.newId();
    this.fire = false;
    this.enemy = false;
  }
  attack(){
    console.log("Attacking");
  }
}

class Sloop extends Ship{
  constructor(){
    super();
    this.type = 'Sloop';
    this.price = 500;
    this.attack = 5;
    this.initialDamage = 200;
    this.damage = this.initialDamage;
    this.imgUrl = '../client/images/sloop.png';
  }
}

class Schooner extends Ship{
  constructor(){
    super();
    this.type = 'Schooner';
    this.price = 1000;
    this.attack = 8;
    this.initialDamage = 300;
    this.damage = this.initialDamage;
    this.imgUrl = '../client/images/schooner.png';
  }
}

class Galley extends Ship{
  constructor(){
    super();
    this.type = 'Galley';
    this.price = 3000;
    this.attack = 12;
    this.initialDamage = 500;
    this.damage = this.initialDamage;
    this.imgUrl = '../client/images/galley.png';
  }
}

class Galleon extends Ship{
  constructor(){
    super();
    this.type = 'Galleon';
    this.price = 10000;
    this.attack = 20;
    this.initialDamage = 800;
    this.damage = this.initialDamage;
    this.imgUrl = '../client/images/galleon.png';
  }
}

class PirateSloop extends Ship{
  constructor(){
    super();
    this.type = 'Sloop';
    this.enemy = true;
    this.price = 250;
    this.attack = 4;
    this.initialDamage = 100;
    this.damage = this.initialDamage;
    this.imgUrl = '../client/images/pirate-sloop.png';
  }
}

class PirateSchooner extends Ship{
  constructor(){
    super();
    this.type = 'Schooner';
    this.enemy = true;
    this.price = 400;
    this.attack = 7;
    this.initialDamage = 200;
    this.damage = this.initialDamage;
    this.imgUrl = '../client/images/pirate-schooner.png';
  }
}

class PirateGalley extends Ship{
  constructor(){
    super();
    this.type = 'Galley';
    this.enemy = true;
    this.price = 700;
    this.attack = 11;
    this.initialDamage = 400;
    this.damage = this.initialDamage;
    this.imgUrl = '../client/images/pirate-galley.png';
  }
}

class PirateGalleon extends Ship{
  constructor(){
    super();
    this.type = 'Galleon';
    this.enemy = true;
    this.price = 1500;
    this.attack = 18;
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
var wheat = new Item('Wheat', 3, 12, [sun, rain]);
var beer = new Item('Beer', 10, 30, [hops, wheat]);

var cotton = new Item('Cotton', 5, 20, [sun, rain]);
var clothes = new Item('Clothes', 30, 60, [cotton]);

var silks = new Item('Silks', 50, 100);
var cacao = new Item('Cacao', 40, 80);

var gems = new Item('Gems', 500, 1000);
var silver = new Item('Silver', 200, 400);


class Town{
  constructor(name, region, items, xCoord, yCoord){
    this.id = utils.newId();
    this.name = name;
    this.region = region;
    this.xCoord = xCoord,
    this.yCoord = yCoord,
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

var windwardPassage = new Sea('Windward Passage', 7, [pirateSloop,pirateSchooner, pirateGalley, pirateGalleon]);
var yucatanChannel = new Sea('Yucatan Channel', 5, [pirateSloop, pirateSchooner, pirateGalley]);
var golfoDeMorrosquillo = new Sea('Golfo de Morrosquillo', 3, [pirateSloop, pirateSchooner]);
var golfoDeCampeche = new Sea('Golfo de Campeche', 3, [pirateSloop, pirateSchooner]);
var monaPassage = new Sea('Mona Passage', 4, [pirateSloop, pirateSchooner, pirateGalley]);
var golfoDeVenezuela = new Sea('Golfo de Venezuela', 5, [pirateSloop, pirateSchooner, pirateGalley, pirateGalleon]);

var portRoyal = new Town('Port Royal', 'Jamaica', [grapes, wine, cotton, clothes, cacao, gems], 520, 370);
var havana = new Town('Havana', 'Cuba', [hops, beer, cotton, clothes, silver, gems], 400, 230);
var portobelo = new Town('Portobelo', 'Panama', [grapes, wine, hops, beer, cotton, cacao, clothes, silks, gems], 420, 560);
var santaDomingo = new Town('Santa Domingo', 'Hispaniola', [grapes, wine, clothes, cacao, silks, silver], 640, 330);
var sanJuan = new Town('San Juan', 'Puerto Rico', [hops, beer, cotton, clothes, cacao, silver, gems], 790, 350);

var veracruz = new Town('Veracruz', 'Mexico', [hops, beer, cotton, clothes, silver, silks, gems], 60, 270);
var campeche = new Town('Campeche', 'Mexico', [cotton, clothes, cacao, silks, silver, gems], 220, 310);
var maracaibo = new Town('Maracaibo', 'Venezuela', [grapes, wine, hops, beer, cotton, cacao, clothes, silks, gems], 660, 540);

portRoyal.routes = [ ['yucatanChannel', 'havana'], ['golfoDeMorrosquillo', 'portobelo'], ['windwardPassage', 'santaDomingo'] ];
havana.routes = [ ['yucatanChannel', 'portRoyal'], ['yucatanChannel', 'golfoDeMorrosquillo', 'portobelo'], ['yucatanChannel', 'campeche'] ];
portobelo.routes = [ ['golfoDeMorrosquillo', 'yucatanChannel', 'havana'], ['golfoDeMorrosquillo', 'portRoyal'], ['golfoDeMorrosquillo', 'golfoDeVenezuela', 'maracaibo'] ];
santaDomingo.routes = [ ['windwardPassage', 'portRoyal'], ['monaPassage', 'sanJuan'], ['monaPassage', 'golfoDeVenezuela', 'maracaibo'] ];
sanJuan.routes = [ ['monaPassage', 'santaDomingo'], ['golfoDeVenezuela', 'maracaibo'], ['golfoDeVenezuela', 'golfoDeMorrosquillo', 'portobelo'] ];
veracruz.routes = [ ['golfoDeCampeche', 'campeche'] ];
campeche.routes = [ ['golfoDeCampeche', 'veracruz'], ['yucatanChannel', 'havana'] ];
maracaibo.routes = [['golfoDeVenezuela', 'sanJuan'], ['golfoDeVenezuela', 'golfoDeMorrosquillo', 'portobelo'], ['golfoDeVenezuela', 'monaPassage', 'santaDomingo']];


var world = {
  startingLocation : portRoyal,
  locations : {
    portRoyal : portRoyal,
    havana : havana,
    portobelo : portobelo,
    santaDomingo : santaDomingo,
    sanJuan : sanJuan,
    veracruz : veracruz,
    campeche : campeche,
    maracaibo : maracaibo,

    golfoDeMorrosquillo : golfoDeMorrosquillo,
    yucatanChannel : yucatanChannel,
    windwardPassage : windwardPassage,
    golfoDeCampeche : golfoDeCampeche,
    golfoDeVenezuela : golfoDeVenezuela,
    monaPassage : monaPassage,
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
export default world;
