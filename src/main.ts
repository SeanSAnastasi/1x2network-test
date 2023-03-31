import * as PIXI from 'pixi.js';
import 'pixi-spine';
import data from '../assets/mocks/data.json';
import {Load} from './Load';
import {Symbol} from './Reel/Symbol';
import {Reel} from './Reel/Reel';
import * as Constants from './Constants';

// simple application configuration
let config  = {width: 1920, height: 1080}


let app: PIXI.Application;

// wait for DOM before creating application
window.addEventListener('load', async function() {
    //Create a Pixi Application
    app = new PIXI.Application(config);

    //Add the canvas that Pixi automatically created for you to the HTML document
    document.body.appendChild(app.view);

    const loader: Load = new Load();
    await loader.loadAssets();
    const reel: Reel = new Reel(app,Constants.slot.defaultSymbols, app.screen.width/2, app.screen.height/2);
    
    app.start();
    document.addEventListener('keydown', (key)=>{
        if (key.keyCode === 32 && !reel.isAnimating()) {
           reel.showSpinResult(getRandomData()); 
           reel.animateAll();
        }
    });
})

function getRandomData(){
    const randNum = Math.floor(Math.random()*(data.length-1));
    console.warn(randNum);
    return data[randNum].response.results.symbolIDs;
}