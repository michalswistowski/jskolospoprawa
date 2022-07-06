console.log(test)

tutaj ci wklejam zadania

https://inf.ug.edu.pl/~atejszerska/jp2/kolokwium/21-22/p1.html

class Tile {
    constructor(x,y,type){
        this.type = type;
        this.x = x;
        this.y = y;
    }
    getTileInfo(){
        console.log(`x: ${this.x} y: ${this.y} type:${this.type}`)
    }
}
  
class Grid {
    height = null; // liczba całkowita
    width = null; // liczba całkowita
    grid = null; // tablica dwuwymiarowa
    ships = null; // tablica jednowymiarowa
    generate(height,width){
        this.height = height
        this.width = width
        const types = [ "LAND", "WATER", "ICE"];
        const itemType = types[Math.floor(Math.random()*types.length)];
        for(let x = 0 ; x < this.width ; x++){
            if(this.grid === null) this.grid = []
            this.grid.push([])
            for(let y = 0 ; y < this.height ; y++){
                this.grid.push(new Tile(x,y,itemType))
            }
        }
    }
    generatePredefined(height,width,predefinedTiles){
        this.height = height
        this.width = width
        const types = [ "LAND", "WATER", "ICE"];
        const itemType = types[Math.floor(Math.random()*types.length)];
        for(let x = 0 ; x < this.width ; x++){
            if(this.grid === null) this.grid = []
            this.grid.push([])
            for(let y = 0 ; y < this.height ; y++){
                for(let z = 0 ; z < predefinedTiles.length ; z++){
                    if(predefinedTiles[z].x == x && predefinedTiles[z].y == y) this.grid.push(predefinedTiles[z]) 
                }
                if(this.grid[x][y] === undefined) this.grid.push(new Tile(x,y,itemType))
            }
        }
    }
    getTile(x,y){
        if(this.grid[x][y] === undefined){
            return null
        } else {
            return this.grid[x][y]
        }
    }
    
}
  
class Ship {
    constructor(direction,x,y,grid){
        this.direction = direction
        this.x = x
        this.y = y
        this.grid = grid
    }
    turn(theWay){
        if(theWay === "P"){
            if(this.direction === "N") this.direction = "W"
            if(this.direction === "S") this.direction = "E"
            if(this.direction === "E") this.direction = "N"
            if(this.direction === "W") this.direction = "S"
        }
        if(theWay === "L"){
            if(this.direction === "N") this.direction = "E"
            if(this.direction === "S") this.direction = "W"
            if(this.direction === "E") this.direction = "S"
            if(this.direction === "W") this.direction = "N"
        }
    }
    sail(){
        if(this.direction === "N" && this.grid[this.x-1][this.y].type !== "LAND" && this.grid[this.x-1][this.y].type !== "ICE") {
            this.x-=1
        } else {
            return "nie możesz tędy płynąć"
        }
        if(this.direction === "S" && this.grid[this.x+1][this.y].type !== "LAND" && this.grid[this.x-1][this.y].type !== "ICE") {
            this.x+=1
        } else {
            return "nie możesz tędy płynąć"
        }
        if(this.direction === "E" && this.grid[this.x][this.y-1].type !== "LAND" && this.grid[this.x-1][this.y].type !== "ICE") {
            this.y+=1
        } else {
            return "nie możesz tędy płynąć"
        }
        if(this.direction === "W" && this.grid[this.x][this.y+1].type !== "LAND" && this.grid[this.x-1][this.y].type !== "ICE") {
            this.y-=1
        } else {
            return "nie możesz tędy płynąć"
        }
    }

}

class IcebreakerShip extends Ship {
    constructor(x,y,grid){
        super("N",x,y,grid)
    }
    turn(){
        if(this.direction === "N") this.direction = "S"
        if(this.direction === "S") this.direction = "N"
        if(this.direction === "E") this.direction = "W"
        if(this.direction === "W") this.direction = "E"
    }
    sail(){
        if(this.direction === "N" && this.grid[this.x-1][this.y].type !== "LAND") {
            this.x-=1
        } else {
            Ship.turn("P")
        }
        if(this.direction === "S" && this.grid[this.x+1][this.y].type !== "LAND") {
            this.x+=1
        } else {
            Ship.turn("P")
        }
        if(this.direction === "E" && this.grid[this.x][this.y-1].type !== "LAND") {
            this.y+=1
        } else {
            Ship.turn("P")
        }
        if(this.direction === "W" && this.grid[this.x][this.y+1].type !== "LAND") {
            this.y-=1
        } else {
            Ship.turn("P")
        }
    }
}

const grid = new Grid();
grid.generate(10, 10); 
console.log(grid.getTile(2,2)) // 2,2 LAND
grid.generate(10, 5); 

const predefTiles = [
    new Tile(1, 2, "LAND"),
    new Tile(2, 2, "WATER"),
    new Tile(5, 5, "ICE")
];

grid.generate(10, 10, predefTiles);
console.log(grid.getTile(2,2)) // 2,2 WATER

const ship = new Ship(2, 4, "N", grid);
const ship2 = new Ship(1,2, "N", grid); // błąd
const icebreaker = new IcebreakerShip(3,5, grid);

ship.turn("P"); // Statek obrócony o 90 st. w prawo
ship.sail(); // Statek poruszyl się o 1 kafele na wschód
ship.sail(); // Statek napotkał ląd, pozostał w miejscu
ship.turn("L")  // Statek obrócony o 90 st. w lewo
ship.sail(); // Statek napotkał inny statek, pozostał w miejscu

icebreaker.sail(); // Statek napotkał lądolód, przedarł się przez niego
console.log(icebreaker.getShipInfo()); // "N", 3,6

wez ten kod z dolu polecenia sprawdz bo pelno bledow

dalej sa bledy ale mniej
