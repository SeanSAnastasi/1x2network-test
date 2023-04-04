import { Load } from '../Load';
import * as Constants from '../Constants';

export class Symbol extends PIXI.Container{
    private key: string
    private img: PIXI.spine.Spine;
    private numLoops = 0;
    private isAnimating: boolean = false;
    constructor(key:number, x: number=0, y: number=0){
        super();
        this.key = Constants.slot.symbolOrder[key];
        this.x = x;
        this.y = y;
        this.create();
    }
    private create(): void {
        if(this.img){
            this.removeChild(this.img);
        }
        const texture = Load.getAsset(this.key);        
        this.img = new PIXI.spine.Spine(texture.spineData);
        this.startStatic();
        this.addChild(this.img);
    }
    public startWin(){
        this.isAnimating = true;
        this.img.state.setAnimation(0,'win', true);
        this.img.state.tracks[0].listener = { 
            complete: ()=> {
                this.numLoops++;
                if(this.numLoops >= Constants.slot.animationLoopCount){
                    this.startStatic();
                    this.numLoops = 0;
                }
            }
        }
    }
    public startStatic(){
        this.isAnimating = false;
        this.img.state.setAnimation(0,'static', true);
        
    }
    public setSymbol(key:number){
        this.key = Constants.slot.symbolOrder[key];
        this.create()
    }
    public getIsAnimating(): boolean{
        return this.isAnimating;
    }
}