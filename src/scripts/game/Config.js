import { Game } from "./Game";
import { Tools } from "../system/Tools";

export const Config = {
    loader: Tools.massiveRequire(require["context"]('./../../sprites/', true, /\.(mp3|png|jpe?g)$/)),
    scenes: 
    {
        "Game": Game
    },
    bgSpeed: 2,

    hero:
    {
        position:
        {
            x: 350,
            y: 595
        },
        jumpSpeed: 10,
        maxJumps : 2
    },

    platforms: 
    {
        ranges: {
            rows: {
                min: 2,
                max: 6
            },
            cols: {
                min: 3,
                max: 9
            },
            offset: {
                min: 60,
                max: 200
            }
        },
        moveSpeed: -1.5, 
        accelaration: -0.01,
        deccelaration: -0.005
    },
    diamonds: 
    {
        chance: 0.4,
        offset: {
            min: 100,
            max: 200
        }
    },
    score: 
    {
        x: 10,
        y: 10,
        anchor: 0,
        style: {
            fontFamily: "Verdana",
            fontWeight: "bold",
            fontSize: 44,
            fill: ["#FF7F50"]
        }
    },
    progress: {
        bar: {
          backgroundColor: '#D4F1F4',
          border: 1,
          borderColor: '#FFFFFF',
          fillColor: '#e55039',
          height: 30,
          radius: 25,
          width: 300,
        },
        text: {
          visible: true,
          fill: 0xffffff,
          fontSize: 30,
        }
      }
};