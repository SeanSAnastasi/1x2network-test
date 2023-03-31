//Dummy JSON responses
import data from '../assets/mocks/data.json';
import * as PIXI from 'pixi.js';

// simple application configuration
let config  = {width: 1920, height: 1080}


let app: PIXI.Application;

// wait for DOM before creating application
window.addEventListener('load', function() {
    //Create a Pixi Application
    app = new PIXI.Application(config);

    //Add the canvas that Pixi automatically created for you to the HTML document
    document.body.appendChild(app.view);

    console.warn('data',data);
    console.warn('AWWWW2');
})