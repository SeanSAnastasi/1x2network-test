import { Symbol } from "./Symbol";
import * as Constants from '../Constants';
export class Reel extends PIXI.Container{
    private symbols: Symbol[] = [];
    constructor(app:PIXI.Application,keys: number[], x: number, y: number){
        super();
        console.assert(keys.length === Constants.slot.columns, "Number of symbol keys not equal to column count");
        
        this.x = x;
        this.y = y;
        

        keys.forEach((key, index)=>{
            this.symbols.push(new Symbol(app,key, this.getSymbolPositionX(index), this.y));
        })
    }
    private getSymbolPositionX(index:number): number{
        let posX: number = this.x - (Math.floor(Constants.slot.columns/2))*Constants.slot.symbolWidth + index*Constants.slot.symbolWidth;
        if(Constants.slot.columns % 2 === 0){
            posX += Constants.slot.symbolWidth/2;
        }
        return posX
    }
    public animateAll(){
        this.symbols.forEach((symbol)=>{
            symbol.startWin();
        })
    }
    public showSpinResult(keys: number[]){
        console.assert(keys.length === Constants.slot.columns, "Number of symbol keys not equal to column count");

        keys.forEach((key, index)=>{
            this.symbols[index].setSymbol(key);
        })
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
}