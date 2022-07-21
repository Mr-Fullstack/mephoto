export class Action {
    #target
    constructor(options){
        if(options){
            this.#setConfig(options);
        }
    }
    #addEvents=(options)=>{
        if(options.events){
            for(let i=0; i < options.events.length; i++ ){
                for(let j=0; j < this.#target.length; j++ ){
                    this.#target[j].addEventListener(options.events[i].name,(evt)=>options.events[i].script(evt))
                }
            }
        }   
    }   
        
    #setConfig = (options)=>{
        if(options.target){
            this.#target = document.querySelectorAll(options.target)
        }
        if(options.elements){
            this.#target = options.elements
        }
        this.#addEvents(options) 
    }
}