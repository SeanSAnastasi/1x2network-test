import * as PIXI from 'pixi.js';
import 'pixi-spine';
import {Load} from './Load';
import {Symbol} from './Reel/Symbol';
import {Reel} from './Reel/Reel';
import {Spin} from './Spin';
import {UI} from './UI';
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
    const centerX = app.screen.width/2;
    const centerY = app.screen.height/2;


    await loader.loadAssets();
    const reel: Reel = new Reel(app,Constants.slot.defaultSymbols, centerX, centerY);
    const ui: UI = new UI(app, centerX, app.screen.height - 100, reel);
    
    app.start();

})

