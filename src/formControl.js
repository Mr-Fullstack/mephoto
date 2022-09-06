import { newUser } from "./models/Person";

export class InputControl{
    #inputs;
    constructor(options){
        if( options ){
            this.#setConfig( options )
        }
    }
    config=( options )=>{
        if( options ){
          this.#setConfig( options )
        }
    }
    #setConfig=( options )=>{
        if( options ){
            if( options.inputTarget ){
                this.#inputs = document.querySelectorAll(`${options.inputTarget}`)
                if(options.events){
                    for(let i=0; i < options.events.length; i++ ){
                        for(let j=0; j < this.#inputs.length; j++ ){
                            this.#inputs[j].addEventListener(options.events[i].name,(evt)=>options.events[i].script(evt))
                        }
                    }
                }
            }
        }
    }
    init = (options) =>{
        if( options ){
           this.#setConfig(options)
        }
    }
}
export function checkValueInput(input){
    if( input.value === "" ){
       input.parentNode.parentNode.classList.add('input-error')
       return false;
    }else{
       input.parentNode.parentNode.classList.remove('input-error')
       return true;
    }
}


export class InputPasswordControl extends InputControl{
    #input;
    #mainControl;
    constructor(options){
        super(options)
        this.#setConfig(options)
    }
    #setConfig = ( options ) =>{
        if( options ){
            if( options.inputTarget ){
                this.#input = document.querySelectorAll(`[data-control="${options.inputTarget}"]`)[0]
                this.#mainControl = document.querySelectorAll(`[data-target="${options.inputTarget}"]`)[0]
                if(options.events){
                    for(let i=0; i< options.events.length; i++ ){
                        if(options.events[i].input){
                            this.#input.addEventListener(options.events[i].name,(evt)=>options.events[i].script(evt))
                        }else{
                            this.#mainControl.addEventListener(options.events[i].name,(evt)=> options.events[i].script(this.#input,evt) )
                        }
                    }
                }
            }
        }
    }
}


