import * as PIXI from "pixi.js";
import { Reel } from "./Reel/Reel";
import { Spin } from "./Spin";
import {Win} from './Win';

export class UI extends PIXI.Container{
    private balance:number = 100000;
    private curBet:number = 4; 
    private betIncrements: number[] = [10,20,50,100,200,500,1000,2000,5000,10000];
    private balanceText: PIXI.Text;
    private betText: PIXI.Text;
    private plus: PIXI.Text;
    private minus: PIXI.Text;
    private app: PIXI.Application;
    private spin: Spin;
    private reels: Reel[];
    constructor(app:PIXI.Application, x:number, y:number, reels: Reel[]){
        super();
        this.x = x;
        this.y = y;
        this.app = app;
        this.reels = reels;
        this.app.stage.addChild(this);
        this.create()
    }
    create() {
        const fontBalance = new PIXI.TextStyle({
            fill: '#ffffff',
            fontSize: 48,
            align: 'center'
        });
        const fontBet = new PIXI.TextStyle({
            fill: '#000000',
            fontSize: 38,
            align: 'center',
            fontWeight: "bolder"
        });

        
        
        this.balanceText = new PIXI.Text("€"+(this.balance/100).toFixed(2),fontBalance);
        this.balanceText.x -= this.app.screen.width/2 - 100;

        this.spin = new Spin(-60,-100,60, this.reels);
        this.spin.on('mousedown', ()=>{this.startSpin()});
        this.spin.on('touchstart', ()=>{this.startSpin()});

        this.betText = new PIXI.Text("€"+(this.betIncrements[this.curBet]/100).toString(),fontBet);
        this.betText.x = this.spin.x+60;
        this.betText.y = this.spin.y+60;
        this.betText.anchor.set(0.5);


        this.createButtons();

        this.addChild(this.balanceText, this.spin, this.betText, this.plus, this.minus);
    }
    private createButtons(){
        this.plus = new PIXI.Text('+',{
            fill: '#ffffff',
            fontSize: 100,
            align: 'center',
            fontWeight: "bolder"
        });
        this.plus.x = this.spin.x + 150;
        this.plus.y = this.spin.y;
        this.plus.interactive = true;
        this.plus.buttonMode = true;
        this.plus.on('mousedown', ()=>{this.updateBet(this.curBet+1)});
        this.plus.on('touchstart', ()=>{this.updateBet(this.curBet+1)});

        this.minus = new PIXI.Text('-',{
            fill: '#ffffff',
            fontSize: 100,
            align: 'center',
            fontWeight: "bolder"
        });
        this.minus.x = this.spin.x - 90;
        this.minus.y = this.spin.y - 10;
        this.minus.interactive = true;
        this.minus.buttonMode = true;
        this.minus.on('mousedown', ()=>{this.updateBet(this.curBet-1)});
        this.minus.on('touchstart', ()=>{this.updateBet(this.curBet-1)});
    }

    private updateBet(betIndex:number){
        this.checkDisable();
        if (betIndex < 0 || betIndex > this.betIncrements.length - 1 || this.checkReelAnimating() || this.spin.disabled) {
            return;
        }
        this.curBet = betIndex;
        this.betText.text = "€"+(this.betIncrements[this.curBet]/100).toString();
    }
    private checkDisable(force:boolean=false){
        if(this.checkReelAnimating() || this.spin.disabled || force){
            this.minus.style.fill = 0x999999;
            this.plus.style.fill = 0x999999;
            this.spin.updateFill(0x999999);
            return;
        }
        if(this.curBet === 0){
            this.minus.style.fill = 0x999999;
            return;
        }
        if(this.curBet === this.betIncrements.length - 1){
            this.plus.style.fill = 0x999999;
            return;
        }
        this.plus.style.fill = 0xFFFFFF;
        this.minus.style.fill = 0xFFFFFF;
        this.spin.updateFill(0xFFFFFF);


    }
    private async startSpin() {
        if (this.balance >= this.betIncrements[this.curBet] && !this.checkReelAnimating() && !this.spin.disabled) {
            this.checkDisable(true);
            this.updateBalance(this.balance - this.betIncrements[this.curBet]);
            const win = new Win(this.app.screen.width / 2, this.app.screen.height / 2 - 400);
            this.app.stage.addChild(win);
            const data = await this.spin.spin();
      
          if (data.win > 0) {
            win
              .showWin(data.win, this.betIncrements[this.curBet])
              .then(() => {
                this.updateBalance(this.balance + this.betIncrements[this.curBet] * data.win);
                this.checkDisable();
                this.app.stage.removeChild(win);
              });
          }
        }
        this.checkDisable();
      }   
      
    private updateBalance(balance:number){
        this.balance = balance;
        this.balanceText.text = "€"+(this.balance/100).toFixed(2);
        
    }
    private checkReelAnimating(): boolean{
        let animating = false;
        this.reels.forEach(reel=>{
            if(reel.isAnimating()){
                animating = true;
            }
        })
        return animating;
    }
}