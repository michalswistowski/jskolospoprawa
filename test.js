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
            if(this.grid === null) grid = []
            this.grid.push([])
            for(let y = 0 ; y < this.height ; y++){
                this.grid.push(Tile(i,y,itemType))
            }
        }
    }
    generatePredefined(height,width,predefinedTiles){
        this.height = height
        this.width = width
        const types = [ "LAND", "WATER", "ICE"];
        const itemType = types[Math.floor(Math.random()*types.length)];
        for(let x = 0 ; x < this.width ; x++){
            if(this.grid === null) grid = []
            this.grid.push([])
            for(let y = 0 ; y < this.height ; y++){
                for(let z = 0 ; z < predefinedTiles.length ; z++){
                    if(predefinedTiles[z].x == x && predefinedTiles[z].y == y) this.grid.push(predefinedTiles[z]) 
                }
                if(this.grid[x][y] === undefined) this.grid.push(Tile(i,y,itemType))
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
        if(this.grid[x-1][y].type === "LAND" && this.grid[x-1][y].type === "ICE") return "nie możesz tędy płynąć"
        if(this.grid[x+1][y].type === "LAND" && this.grid[x-1][y].type === "ICE") return "nie możesz tędy płynąć"
        if(this.grid[x][y-1].type === "LAND" && this.grid[x-1][y].type === "ICE") return "nie możesz tędy płynąć"
        if(this.grid[x][y+1].type === "LAND" && this.grid[x-1][y].type === "ICE") return "nie możesz tędy płynąć"
        if(this.direction === "N") this.x-=1
        if(this.direction === "S") this.x+=1
        if(this.direction === "E") this.y+=1
        if(this.direction === "W") this.y-=1
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
        if(this.direction === "N" && this.grid[x-1][y].type !== "LAND") {
            this.x-=1
        } else {
            Ship.turn("P")
        }
        if(this.direction === "S" && this.grid[x+1][y].type !== "LAND") {
            this.x+=1
        } else {
            Ship.turn("P")
        }
        if(this.direction === "E" && this.grid[x1][y-1].type !== "LAND") {
            this.y+=1
        } else {
            Ship.turn("P")
        }
        if(this.direction === "W" && this.grid[x][y+1].type !== "LAND") {
            this.y-=1
        } else {
            Ship.turn("P")
        }
    }
}
