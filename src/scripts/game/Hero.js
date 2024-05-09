import * as PIXI from "pixi.js";
import * as Matter from "matter-js";
import { App } from '../system/App';

export class Hero
{
    constructor()
    {
        this.createSprite();
        this.createBody();
        App.app.ticker.add(this.update, this);

        this.dy = App.config.hero.jumpSpeed;
        this.maxJumps = App.config.hero.maxJumps;
        this.score = 0;
        this.isJump = false;
    }

    createSprite()
    {
        this.sprite = new PIXI.AnimatedSprite
        (
            [
                App.res("walk1"),
                App.res("walk2")
            ]
        );

        this.sprite.x = App.config.hero.position.x;
        this.sprite.y = App.config.hero.position.y;
        this.sprite.loop = true;
        this.sprite.animationSpeed = 0.1;
        this.sprite.play();
    }

    createBody()
    {
        this.body = Matter.Bodies.rectangle(this.sprite.x + this.sprite.width / 2, this.sprite.y + this.sprite.height / 2, this.sprite.width, this.sprite.height, {friction: 0});
        Matter.World.add(App.physics.world, this.body);
        this.body.gameHero = this;
    }

    startJump()
    {
        if (this.platform) 
        {
            this.platform = null;
            this.isJump = true;
        }
    }
    
    stopJump()
    {
        this.dy = App.config.hero.jumpSpeed;
        this.isJump = false;

        this.sprite.emit("updateJumpSpeed");
    }

    stayOnPlatform(platform) 
    {
        this.platform = platform;
    }

    collectDiamond(diamond)
    {
        this.score ++;
        this.sprite.emit("score");
        Matter.World.remove(App.physics.world, diamond.body);
        diamond.destroy();
    }

    updateJumpSpeed()
    {
        this.dy = Math.max( this.dy - 0.05, 0);
        if(this.dy > 0)
        {
            Matter.Body.setVelocity(this.body, { x: 0, y: -this.dy });
        }
        this.sprite.emit("updateJumpSpeed")
    }

    update()
    {
        this.sprite.x = this.body.position.x - this.sprite.width / 2;
        this.sprite.y = this.body.position.y - this.sprite.height / 2;

        if(this.isJump)
        {
            this.updateJumpSpeed();
        }
        
        if(this.sprite.y > window.innerHeight
           || this.sprite.x < 0)
        {
            this.sprite.emit("die");
        }
    }

    destroy() 
    {
        App.app.ticker.remove(this.update, this);
        Matter.World.add(App.physics.world, this.body);
        this.sprite.destroy();
    }
}
