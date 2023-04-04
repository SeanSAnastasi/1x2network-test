import { Symbol } from "./Symbol";
import * as Constants from '../Constants';
import gsap from "gsap";

export class Reel extends PIXI.Container{
    private symbols: Symbol[] = [];
    private app: PIXI.Application;
    private maskRectangle: PIXI.Graphics;
    private spinSymbolCount: number;
    constructor(app:PIXI.Application,keys: number[], x: number, y: number){
        super();
        console.assert(keys.length === Constants.slot.rows, "Number of symbol keys not equal to row count");
        
        this.x = x;
        this.y = y;
        this.app = app;
        this.spinSymbolCount = 30;

        keys.forEach((key, index)=>{
            const symbol = new Symbol(key, 0,this.getSymbolPositionY(index))
            this.symbols.push(symbol);
            this.addChild(symbol);
        })

        this.createMask();

        this.app.stage.addChild(this);
    }
    private createMask() {
        this.maskRectangle = new PIXI.Graphics();
        this.maskRectangle.x = 0;
        this.maskRectangle.y = 0;

        this.addChild(this.maskRectangle);
    
        this.mask = this.maskRectangle;
    
        this.updateMask(); // Add this line to initialize the maskRectangle
    }
    
    private getSymbolPositionY(index: number): number {
        let posX: number = -((Math.floor(Constants.slot.rows / 2)) * Constants.slot.symbolHeight) + index * Constants.slot.symbolHeight;
        if (Constants.slot.rows % 2 === 0) {
            posX += Constants.slot.symbolWidth / 2;
        }
        return posX;
    }
    public animateAll(){
        this.symbols.forEach((symbol)=>{
            symbol.startWin();
        })
    }
    public showSpinResult(keys: number[]): Promise<any>{
        console.assert(keys.length === Constants.slot.rows, "Number of symbol keys not equal to row count");

        return new Promise((resolve)=>{
        for (let index = -1; index > -this.spinSymbolCount; index--) {
            const randSymbol = Math.floor(Math.random()*(Constants.slot.symbolOrder.length-1));
            const symbol = new Symbol(randSymbol, 0, this.getSymbolPositionY(index))
            this.symbols.push(symbol); 
            this.addChild(symbol);           
        }
        keys.forEach((key,index)=>{
            const symbol = new Symbol(key, 0, this.getSymbolPositionY(-this.spinSymbolCount-index))
            this.symbols.push(symbol); 
            this.addChild(symbol);
        })

        let tween = gsap.to(this.symbols, {
            duration: 2, 
            ease: 'back.inOut(0.6)',
            y: `+=${Math.abs(this.getSymbolPositionY(-this.spinSymbolCount-1))}`, 
            onComplete:()=>{
                for (let i = 0; i < this.symbols.length - 3; i++) {
                    const symbol = this.symbols[i];
                    this.removeChild(symbol);
                    symbol.destroy();
                }
                  
                this.symbols.splice(0, this.symbols.length - 3);
                resolve(true);
            }
        });
    });
    }
    public isAnimating(): boolean{
        let animating: boolean = false
        this.symbols.forEach((symbol)=>{
            if(symbol.getIsAnimating()){
                animating = true;
            }
        })
        return animating;
    }
    private updateMask(){
        this.maskRectangle.beginFill(0xffffff, 1);
        const width = Constants.slot.symbolWidth;
        const height = Constants.slot.symbolHeight*Constants.slot.rows;
        this.maskRectangle.drawRect(0, 0, width, height);
        this.maskRectangle.pivot.set(width/2,height/2);
        this.maskRectangle.endFill();
    }
}