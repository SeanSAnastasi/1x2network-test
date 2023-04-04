import { Reel } from "./Reel/Reel";
import data from '../assets/mocks/data.json';
import * as PIXI from "pixi.js";
import {WinResult} from './Interfaces';


export class Spin extends PIXI.Graphics{
    private radius:number;
    private reels: Reel[];
    public disabled: boolean
    constructor(x:number, y:number, radius:number, reels:Reel[]){
        super();
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.reels = reels;
        this.interactive = true;
        this.disabled = false;
        this.create();

    }
    private create(){
        this.beginFill(0xffffff);
        this.drawCircle(this.radius, this.radius, this.radius);
        this.endFill()
    }

    public updateFill(color:number=0xffffff, alpha:number=1){
        this.clear();
        this.beginFill(color, alpha);
        this.drawCircle(this.radius, this.radius, this.radius);
        this.endFill()
    }

    public async spin(): Promise<WinResult> {
        this.disabled = true;
        const data: WinResult = this.getRandomData();
        const spinPromises = this.reels.map(async (reel, index) => {
            await new Promise((resolve) => setTimeout(resolve, index * 200));
            await reel.showSpinResult(data.symbolIDs[index]);
            
        });
      
        await Promise.all(spinPromises);
        this.disabled = false;
        if (data.win > 0) {
            this.animateReels();
        }
        return data;
    }
    private animateReels(){
        this.reels.forEach(reel=>{
            reel.animateAll();
        })
    }
    private getRandomData():WinResult{
        const randNum = Math.floor(Math.random()*(data.length-1));
        return data[randNum].response.results;
    }
        
}