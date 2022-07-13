class ImageGrid {

    #image_grid_list = null;
    #image_change_effect = ['left','right','bottom', 'top'];
    #image_grid = document.querySelectorAll('.grid__image')[0];
    #image_time_change = 8000;
    #imagesGridShuffle = () => {
        this.#image_grid_list =  this.#image_grid_list.sort( () => Math.random() - 0.9 );
        this.#setImagesGrid();
    }
    #getEffectShuffle = () => {
        return this.#randomInteger(0, this.#image_change_effect.length-1);
    }

    #randomInteger=(min, max) => {
        return Math.floor( Math.random() * (max - min + 1) ) + min;
    }

    #setImagesGrid = ()=>{
        this.#image_grid_list.map((img,index) =>{
            this.#image_grid.children[index].classList.remove('img-offset-top');
            this.#image_grid.children[index].style.backgroundPosition='unset'
            this.#image_grid.children[index].classList.remove('--image-change-left','--image-change-right','--image-change-bottom', '--image-change-top')
            this.#image_grid.children[index].style.backgroundPosition=this.#getEffectShuffle();
            this.#image_grid.children[index].style.backgroundImage = `url(${img})`;

            let time = setTimeout( ()=> {
                this.#image_grid.children[index].style.backgroundPosition='center'
                if( img.includes('04') && index ===  2  
                    || img.includes('04') && index ===  4  
                    || img.includes('07') && index ===  4  
                    || img.includes('04') && index ===  5  
                    || img.includes('02') && index ===  2 
                    || img.includes('02') && index ===  5
                    || img.includes('02') && index ===  4  ){
                    this.#image_grid.children[index].classList.add('img-offset-top');
                    this.#image_grid.children[index].style.backgroundPosition='initial'
                }
                clearTimeout(time)
            },200)
        })
    }
    
    config = (options)=> {

        if(options){
            this.#setConfig(options);
        }
    }
    #setConfig = (options)=>{
        if(options.imageList){
            this.#image_grid_list = options.imageList;
        }
        if(options.targetWrapper){
            this.#image_grid = document.querySelectorAll(options.targetWrapper)[0];
            for(let i = 0; i< this.#image_grid_list.length; i++){
              let newDivImage = document.createElement('div');
              if(options.customClassImageGrid){
                newDivImage.classList.add(options.customClassImageGrid)
              }
              newDivImage.style.backgroundImage = `url(${this.#image_grid_list[i]})`;
              this.#image_grid.appendChild(newDivImage)
            }
        }
        if(options.setMillisecondsImageChange){
            this.#image_time_change = options.setMillisecondsImageChange
        }

    }
    init = (options) =>{
        if(options){
            this.#setConfig(options);
        }
        setInterval( ()=> this.#imagesGridShuffle(),this.#image_time_change );
    }

}

export const imageGrid = new ImageGrid()

