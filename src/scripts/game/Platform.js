import * as PIXI from "pixi.js"
import * as Matter from "matter-js";
import { App } from "../system/App"
import { Diamond } from "./Diamond";

export class Platform
{
    constructor(rows, cols, x, dx)
    {
        this.rows = rows;
        this.cols = cols;

        this.tileSize = PIXI.Texture.from("tile").width;
        this.width = this.tileSize * this.cols;
        this.height = this.tileSize * this.rows;

        this.createContainer(x);
        this.createTiles();

        this.createBody();

        this.diamonds = [];
        this.createDiamonds();
    }

    createContainer(x)
    {
        this.container = new PIXI.Container();
        this.container.x = x;
        this.container.y = window.innerHeight - this.height;
    }

    createTiles()
    {
        for(let tile = 0; tile < this.rows * this.cols; tile++)
        {
            this.createTile(Math.floor(tile/this.cols), tile%this.cols);
        }
    }

    createTile(row, col)
    {
        const texture = row === 0 ? "platform" : "tile";
        const tile = App.sprite(texture);
        this.container.addChild(tile);
    
        tile.x = col * tile.width;
        tile.y = row * tile.height;
    }

    createBody()
    {
        this.body = Matter.Bodies.rectangle(this.width/2 + this.container.x, this.height/2 + this.container.y, this.width, this.height, {friction : 0, isStatic: true});
        Matter.World.add(App.physics.world, this.body);
        this.body.gamePlatform = this;
    }

    createDiamonds()
    {
        const y = App.config.diamonds.offset.min + Math.random() * (App.config.diamonds.offset.max - App.config.diamonds.offset.min);

        for(let i = 0; i < this.cols; i++)
        {
            if(Math.random() < App.config.diamonds.chance)
            {
                const diamond = new Diamond(this.tileSize * i, -y);
                this.container.addChild(diamond.sprite);
                diamond.createBody();
                this.diamonds.push(diamond);
            }
        }
    }

    move(dx)
    {
        if(this.body)
        {
            Matter.Body.setPosition(this.body, {x : this.body.position.x + dx, y: this.body.position.y});
            this.container.x = this.body.position.x - this.width/2;
            this.container.y = this.body.position.y - this.height/2;
        }
    }

    destroy() 
    {
        Matter.World.remove(App.physics.world, this.body);
        this.diamonds.forEach(diamond => diamond.destroy());
        this.container.destroy();
    }
}