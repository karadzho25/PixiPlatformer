import * as Matter from "matter-js";
import { App } from "../system/App";
import { Scene } from "../system/Scene";
import { Background } from "./Background";
import { Platforms } from "./Platforms";
import { Hero } from "./Hero";
import { LabelScore } from "./LabelScore";
import { AssetsProgressBar } from './AssetsProgressBar.js'

export class Game extends Scene {
    create() {
        this.createBackground();
        this.createPlatforms();
        this.createHero();
        this.createUI();

        this.setEvents();
    }

    createBackground() {
        this.bg = new Background();
        this.container.addChild(this.bg.container);
    }

    createPlatforms()
    {
        this.platforms = new Platforms();
        this.container.addChild(this.platforms.container);
    }

    createHero()
    {
        this.hero = new Hero();
        this.container.addChild(this.hero.sprite);
        this.container.interactive = true;
        this.container.on
        (
            "pointerdown", () =>
            {
                this.hero.startJump();
            }
        );
        
        this.container.on
        (
            "pointerup", () =>
            {
                this.hero.stopJump();
            }
        )

        this.hero.sprite.once("die", () =>
        {
            App.scenes.start("Game");
        });
    }

    createUI()
    {
        this.labelScore = new LabelScore();
        this.container.addChild(this.labelScore);
        this.hero.sprite.on("score", () =>
        {
            this.labelScore.renderScore(this.hero.score);
        });
        
        this.progressBar = new AssetsProgressBar();
        this.container.addChild(this.progressBar.container);

        this.hero.sprite.on("updateJumpSpeed", () =>
        {
            this.progressBar.setProgress(this.hero.dy)
        });
    }

    setEvents()
    {
        Matter.Events.on(App.physics, "collisionStart", this.onCollisionStart.bind(this));
        Matter.Events.on(App.physics, "collisionEnd", this.onCollisionEnd.bind(this));
    }

    onCollisionStart(event)
    {
        const colliders = [event.pairs[0].bodyA, event.pairs[0].bodyB];
        const hero = colliders.find(body => body.gameHero);
        const platform = colliders.find(body => body.gamePlatform);
        const diamond = colliders.find(body => body.gameDiamond);

        if(hero && platform)
        {
            this.hero.stayOnPlatform(platform.gamePlatform);
            this.platforms.setIsCollided(true);
        }

        if(hero && diamond)
        {
            this.hero.collectDiamond(diamond.gameDiamond);
        }
    }

    onCollisionEnd(event)
    {
        const colliders = [event.pairs[0].bodyA, event.pairs[0].bodyB];
        const hero = colliders.find(body => body.gameHero);
        const platform = colliders.find(body => body.gamePlatform);

        if(hero && platform)
        {
            this.platforms.setIsCollided(false);
        }
    }

    update(dt) 
    {
        this.bg.update(dt);
        this.platforms.update(dt);
    }

    destroy() 
    {
        Matter.Events.off(App.physics, 'collisionStart', this.onCollisionStart.bind(this));
        Matter.Events.off(App.physics, 'collisionEnd', this.onCollisionStart.bind(this));
        App.app.ticker.remove(this.update, this);
        this.bg.destroy();
        this.hero.destroy();
        this.platforms.destroy();
        this.labelScore.destroy();
    }
}
