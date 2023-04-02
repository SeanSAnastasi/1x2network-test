import 'pixi-spine';
export class Load{
    private loader: PIXI.Loader;
    constructor(){
        this.loader = PIXI.Loader.shared;
        
    }
    public loadAssets(): Promise<any>{
        return new Promise((resolve) => {
            this.loader.add('cherry', '../assets/symbols/symbol_00.json');
            this.loader.add('lemon', '../assets/symbols/symbol_01.json');
            this.loader.add('orange', '../assets/symbols/symbol_02.json');
            this.loader.add('plum', '../assets/symbols/symbol_03.json');
            this.loader.add('grapes', '../assets/symbols/symbol_04.json');
            this.loader.add('watermelon', '../assets/symbols/symbol_05.json');

            this.loader.onLoad.add(this.loaded);
            this.loader.onError.add(this.loadError);
            this.loader.load(() => { return resolve(true); });
        });
    }
    private loaded(loader, resource){
        console.log('Loaded asset '+resource.name);
    }
    private loadError(err, loader, resource){
        console.error('Failed to load asset '+resource.name, err);
    }
    public static getAsset(key:string){
        return PIXI.Loader.shared.resources[key];
    }
}