import { Reel } from "./Reel/Reel";
import data from '../assets/mocks/data.json';
import * as PIXI from "pixi.js";
import {WinResult} from './Interfaces';


export class Spin extends PIXI.Graphics{
    private radius:number;
    private reel: Reel;
    constructor(x:number, y:number, radius:number, reel:Reel){
        super();
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.reel = reel;
        this.interactive = true;
        this.create();

    }
    private create(){
        this.beginFill(0xffffff);
        this.drawCircle(this.radius, this.radius, this.radius);
        this.endFill()
    }

    public spin(): WinResult{
        const data: WinResult = this.getRandomData();
        this.reel.showSpinResult(data.symbolIDs); 
        if(data.win > 0){
            this.reel.animateAll();
        }
        return data;
    }
    private getRandomData():WinResult{
        const randNum = Math.floor(Math.random()*(data.length-1));
        return data[randNum].response.results;
    }
        
}