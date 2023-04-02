import gsap from "gsap";
import * as PIXI from "pixi.js";

export class Win extends PIXI.Container{
    private winText: PIXI.Text;    
    private duration: number;
    constructor(x:number, y: number){
        super();
        this.x = x;
        this.y = y;
    }
    public showWin(multiplier:number, betAmount: number): Promise<any>{
        if(multiplier > 0){

        return new Promise((resolve)=>{
            this.winText = new PIXI.Text(multiplier+"X\n€"+((betAmount*multiplier)/100).toFixed(2),{
                fill: '#ffffff',
                fontSize: 100,
                align: 'center',
                fontWeight: "bolder"
            });
            this.winText.anchor.set(0.5);
            this.winText.scale.set(0);
            this.addChild(this.winText);
            let tween = gsap.to(this.winText.scale, {
                duration: 0.5, 
                ease: "power1.inOut", 
                x: 1, 
                y: 1, 
                onComplete: ()=>{
                    tween.kill();
                    tween =gsap.to(this.winText.scale, {
                        duration: 0.9, 
                        
                        repeat: 5, 
                        yoyo: true, 
                        x: 1.2, 
                        y: 1.2, 
                        onComplete: ()=>{
                            tween.kill();
                            tween =gsap.to(this.winText.scale, {
                                duration: 0.5, 
                                x: 0, 
                                y: 0, 
                                onComplete: ()=>{
                                    tween.kill();
                                    this.removeChild(this.winText);
                                    resolve(true);
                                }
                              });
                        }
                      });
                }
              });
        })
    }
    return null;
    }
}