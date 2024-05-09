import * as PIXI from "pixi.js";
import { ProgressBar } from '@pixi/ui';
import { App } from "../system/App";

export class AssetsProgressBar
{
  constructor() 
  {
      this.defaultArgs = {
        animate: true,
        value: 0,
        vertical: window.matchMedia("(orientation: portrait)").matches
      }

      this.options = { ...this.defaultArgs, ...App.config.progress.bar }

      this.container = new PIXI.Container();

      this.initProgressBar();
  }

  initProgressBar()
  {
    var box = new PIXI.Graphics();
    box.beginFill(this.options.backgroundColor, 100);
    box.lineStyle(this.options.border , this.options.borderColor);
    box.drawRoundedRect(0, 0, this.options.width, this.options.height, this.options.radius);
    box.endFill();
    box.position.x = 250 + this.options.border/2;
    box.position.y = 20 + this.options.border/2;

    this.container.addChild(box);

    this.fill = new PIXI.Graphics();
    this.fill.beginFill(0x000000, 100);
    this.fill.lineStyle(this.options.border , this.options.borderColor);
    this.fill.drawRoundedRect(0, 0, this.options.width, this.options.height, this.options.radius);
    this.fill.endFill();
    this.fill.position.x = 250 + this.options.border/2;
    this.fill.position.y = 20 + this.options.border/2;

    this.container.addChild(this.fill);
  }    

  setProgress(dy)
  {
    console.log(dy)
    this.fill.width = this.options.width * (dy/App.config.hero.jumpSpeed)
  }

  // initProgressBar()
  // {
  //   const background =  new PIXI.Graphics()
  //   .beginFill(this.options.borderColor)
  //   .drawRoundedRect(0, 0, this.options.width, this.options.height, this.options.radius)
  //   .beginFill(this.options.backgroundColor)
  //   .drawRoundedRect(this.options.border, this.options.border, this.options.width - (this.options.border * 2), this.options.height - (this.options.border * 2), this.options.radius)
  
  //   const filler = new PIXI.Graphics()
  //     .beginFill(this.options.borderColor)
  //     .drawRoundedRect(0, 0, this.options.width, this.options.height, this.options.radius)
  //     .beginFill(this.options.fillColor)
  //     .drawRoundedRect(this.options.border, this.options.border, this.options.width - (this.options.border * 2), this.options.height - (this.options.border * 2), this.options.radius)

  //   this.progressBar = new ProgressBar();
  //   this.progressBar.options = this.options;
  //   this.progressBar.bg = background;
  //   this.progressBar.filler = filler;
  //   this.progressBar.progress = this.options.progress;

  //   const loadingTxtStyle = new PIXI.TextStyle({ ...App.config.progress.text, fontWeight: 'bold' })

  //   this.progressBar.width = this.options.width;
  //   this.progressBar.height = this.options.height;

  //   this.progressText = new PIXI.Text('', loadingTxtStyle)
  //   this.progressText.visible = App.config.progress.text.visible
  //   this.progressText.position.set(
  //     this.progressBar.width / 2,
  //     this.progressBar.height
  //   )
    
  //   if(this.options.vertical) {
  //     this.rotation = Math.PI / 2;
  //     this.position.set(this.y, this.x)
  //   }
    
  //   this.container.addChild(this.progressBar, this.progressText)
  // }

  // setProgress(progress) {
  //   this.progressBar.progress = Math.floor(progress * 100)
  //   this.progressText.text = `${Math.floor(progress * 100)}%`
  //   this.progressText.x = this.progressBar.width / 2 - this.progressText.width / 2
  //   if(progress === 1) this.destroy()
  // }
}