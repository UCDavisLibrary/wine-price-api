drop schema wine cascade;
create schema wine;
set search_path=wine,public;

create type wine.type as
enum('still','sparkling','fortified','dessert');

create type wine.color as
enum('red','white','rosé');

create type wine.bottle as enum (
 'Piccolo','Pony','Split','Quarter Bottle','Snipe',
 'Quarter',
'Chopine',
'Demi','Half Bottle',
'Tenth',
'Jennie','Demie','Pinte',
'Clavelin',
'Standard',
'Fifth',
'Litre',
'Magnum',
'Marie Jeanne',
'Jeroboam',
'Rehoboam',
'McKenzie',
'Imperial',
'Methuselah',
'Salmanazar',
'Balthazar',
'Nebuchadnezzar',
'Melchior',
'Solomon',
'Sovereign',
'Primat','Goliath',
'Melchizedek','Midas',
'Tenths','Pint','Quart'
);

create table wine.bottle_info (
bottle wine.bottle primary key,
volume float,
ratio float,
notes text,
champagne boolean,
bordeaux boolean,
burgandy boolean
);

create table wine.bottle_aka (
 name wine.bottle,
 aka wine.bottle primary key
);

insert into wine.bottle_aka VALUES
('Piccolo','Split'),
('Piccolo','Quarter Bottle'),
('Piccolo','Pony'),
('Piccolo','Snipe');

insert into wine.bottle_info (volume,ratio,bottle,notes,champagne,bordeaux,burgandy)
VALUES
(0.1875,0.25,'Piccolo','"Small" in Italian. Also known as a quarter bottle, pony, snipe or split.',true,null,null),
(0.1875,0.25,'Split',null,true,null,null),
(0.2,0.2667,'Quarter','Used for Champagne',true,null,null),
(0.25,0.33,'Chopine','Traditional French unit of volume',null,true,null),
(0.375,0.5,'Demi','"Half" in French. Also known as a half bottle.',true,true,true),
(0.378,0.505,'Tenth','One tenth of a US gallon*',null,null,null),
(0.5,0.67,'Jennie','Also known as a 50 cl bottle. Used for Tokaj, Sauternes, Jerez, as well as several other types of sweet wines, also common for cheaper wines in Switzerland.',true,null,null),
(0.5,0.67,'Demie',null,true,null,null),
(0.5,0.67,'Pinte',null,true,null,null),
(0.620,0.83,'Clavelin','Primarily used for vin jaune.',null,null,null),
(0.750,1,'Standard','',true,true,true),
(0.757,1.01,'Fifth','One-fifth of a US gallon* (before 1979)',null,null,null),
(1.0,1.33,'Litre','Popular size for Austrian wines.',null,null,null),
(1.5,2,'Magnum','',true,true,true),
(2.25,3,'Marie Jeanne','Also known as a Tregnum or Tappit Hen in the port wine trade.',null,true,null),
(3.0,4,'Jeroboam','Biblical, First king of Northern Kingdom. "Jeroboam" has different meanings (that is, indicates different sizes) for different regions in France.',true,true,true),
(4.5,6,'Rehoboam','Biblical, First king of separate Judea',true,null,true),
(5.0,6.67,'McKenzie','Uncommon, primarily found in France',null,true,null),
(6.0,8,'Imperial','',null,true,null),
(6.0,8,'Methuselah','Biblical, Oldest Man',true,null,true),
(9.0,12,'Salmanazar','Biblical, Assyrian King',true,true,true),
(12.0,16,'Balthazar','One of three Wise Men (according to legend) to present gifts at Jesus'' nativity; Belshazzar can also denote the co-regent of Babylon during the madness of Nebuchadnezzar, for whom the next-larger bottle size is named.',true,true,true),
(15.0,20,'Nebuchadnezzar','Biblical, King of Babylon',true,true,true),
(18.0,24,'Melchior','One of three Wise Men (according to legend) to present gifts at Jesus'' nativity',true,true,true),
(18.0,24,'Solomon','Biblical, King of Israel, Son of David',true,null,null),
(26.25,35,'Sovereign','Reportedly created by Taittinger in 1988 for the launch of the then world''s largest cruise liner Sovereign of the Seas[10]',true,null,null),
(27.0,36,'Primat','Biblical, stoned by David',true,true,null),
(27.0,36,'Goliath',null,true,true,null),
(30.0,40,'Melchizedek','Biblical, King of Salem',true,null,null),
(30.0,40,'Midas','Biblical, King of Salem',true,null,null);
