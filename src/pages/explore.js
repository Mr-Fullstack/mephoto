import config from "../config";
import { exploreMenuCategory } from "../components/exploreMenuCategory";
import { cardFigure } from "../components/cardFigure";
import { loading } from "../components/loading";
import { images } from "../data/global";
import { ImageMainGrid } from "../components/ImageMainGrid";
import { modalMain } from "../plugins/Modal";

/* #region main CONFIG */
 function scriptExplore() {
    const Images = {
        loadingPull : false,
        listPull: [],
        loadingPullList:[]
    };
    let search_input_value = null
    const search_input_images = document.querySelector('#search-image')
    const limite_image_loading_at_a_time = 6
    const explore_grid_images = Config.DOCUMENT.querySelector('.explore-grid-images')
    const explore_menu_category = Config.DOCUMENT.querySelector('.explore-menu-category > div')
    const explore_main_images = Config.DOCUMENT.querySelector('.main-images > .container > .row')
    const explore_title = Config.DOCUMENT.querySelector('.title-search-page > h2')
    const explore_search_image = Config.DOCUMENT.querySelector('.explore-search-image')
    const title_page = document.head.getElementsByTagName('title') 
    const explore_main_images_children = explore_main_images.children
    let page_name = Config.SITE.current_page.split("-")[1]
    let offsetStartLoadingImage = 0
    let offsetEndLoadingImage = limite_image_loading_at_a_time
    title_page.innerHTML = page_name

    if(Config.SITE.current_page === 'explore-main'){
        explore_grid_images.style.display = 'flex'
        explore_menu_category.display = 'none'
        explore_search_image.display = 'none'
    }else{
        explore_grid_images.style.display = 'none'
        explore_menu_category.display = 'block'
        explore_search_image.display = 'block'
        let last_page_history = Config.HISTORY[Config.HISTORY.length - 1].split('-')[1]
        if(explore_search_image.classList.contains(last_page_history)){
            explore_search_image.classList.remove(last_page_history)
        }
        explore_search_image.classList.add(page_name)
        explore_title.innerHTML = `Explore ${page_name}`
    }
    if(explore_menu_category){
        
        explore_menu_category.appendChild(exploreMenuCategory())
        let new_position_scroll_menu_category = explore_menu_category.children[0].querySelector('.active').getBoundingClientRect().x - (window.innerWidth / 2)
        explore_menu_category.children[0].scrollTo(new_position_scroll_menu_category,0)
    }

    async function getDataImage(url,img_container,index){
        const request = await fetch(url)
        const response = await request.blob()
        const source_image = URL.createObjectURL(response)
        img_container.src = source_image 
        img_container.parentNode.children[0].children[1].children[1].children[2].children[0].href = source_image 
        img_container.parentNode.children[0].children[1].children[1].children[2].children[0].download = source_image.split("/")[3] + ".jpg" 
    } 

   function pullImages(){
        let current_page = Config.SITE.current_page.split("-")[1]
        let loadingImage = document.querySelector(".loading")
        let count_col = 0
        let countImage = 1;
        let filterImages;
        
        if(search_input_value === 'limpou'){
            Images.listPull = []
            explore_main_images.innerHTML = ''
            for(let i=1; i<=3; i++){
                explore_main_images.appendChild(ImageMainGrid())
            }
            search_input_value = null
        }

        if( current_page !== page_name){
            Images.listPull = []
        }

        if(search_input_value && search_input_value !== '')
        {
            if(Images.listPull.length <= 0 ){
                explore_main_images.innerHTML = ''
                for(let i=1; i<=3; i++){
                    explore_main_images.appendChild(ImageMainGrid())
                } 
            }
            offsetStartLoadingImage = 0
            filterImages = getImageMatch(search_input_value).images
        }
        else
        {
            filterImages = images.filter( image => ( image.category.includes(current_page) || Config.SITE.current_page === 'explore-main' ) )
        }

        if( !loadingImage && Images.listPull.length < filterImages.length ){
            explore_main_images.appendChild( loading() )
        }

        if(Images.listPull.length < filterImages.length){
            filterImages.map( (image, index) => {
                let figure = cardFigure(image)
                let regex_get_width = /w=(\d+)&q/gmi
                let image_width = regex_get_width.exec(image.url)[1]
                let img = document.createElement('img');
                figure.classList.add('figure-image')
                figure.classList.add('img-loading')
                img.width=image_width
                if( index >= offsetStartLoadingImage ){
                    
                    if ( index < offsetEndLoadingImage ){
                     
                        if( countImage === limite_image_loading_at_a_time ){
                            offsetStartLoadingImage += limite_image_loading_at_a_time 
                            offsetEndLoadingImage += limite_image_loading_at_a_time
                        }
                        if(countImage <= limite_image_loading_at_a_time ){
                            
                            if( Images.listPull.length < filterImages.length )
                            {
                                
                                getDataImage(image.url,img,index) 
                                figure.appendChild(img)
                                Images.listPull.push(figure)
                                img.setAttribute("id",index)
                                img.setAttribute("data-col",count_col)
                                img.addEventListener('load',(e)=> { 
                                    let target = e.target
                                    let loadingImage = explore_main_images.querySelector(".loading")
                                    if(loadingImage)
                                    {
                                        if( explore_main_images.children.length >= 1 ){
                                            explore_main_images.removeChild(loadingImage)
                                        } 
                                    }
                                    if(Images.listPull.length > 0)
                                    {
                                        if(Images.listPull[target.id]){
                                            explore_main_images.children[target.dataset.col].children[0].appendChild(Images.listPull[target.id]) 
                                            modalMain.reload()
                                        }
                                    }
                                    let time1 = setTimeout( ()=> {
                                            target.parentNode.classList.add('blur') 
                                            clearTimeout(time1) 
                                    },1000)
                                    let time2 = setTimeout( ()=> {
                                            target.parentNode.classList.remove('img-loading')
                                            target.parentNode.classList.remove('blur')
                                            clearTimeout(time2) 
                                    },2000)
                                })
                                countImage++
                            }
                        }
                    }
                }
                count_col++
                
                if(count_col >= 3){
                    count_col = 0
                }
            
        })
        }
       
        if(Images.listPull.length <= 0 && search_input_value && search_input_value !== 'limpou' ){
            let message = document.createElement("p")
            message.classList.add('text')
            message.innerText = 'not found image.'
            explore_main_images.appendChild(message)
        }
   }

   const options = {
        root:null,
        rootMargins:0,
        threshold:0.5
   }

   pullImages()

   const getImageMatch = (s) => { 
    let current_page = Config.SITE.current_page.split("-")[1]
    const p = Array.from(s).reduce((a, v, i) => `${a}[^${s.substr(i)}]*?${v}`, '');
    const re = RegExp(p,'gmi');
    let tags_set = new Set()
    let images_set = new Set()
    images.map(image => {
        if(image.tags){
            // incluido categorias na busca por tags 
            image.category.map(category => {
                tags_set.add(category)
                if(category.toLowerCase().match( re )){
                    if( image.category.includes(current_page) || Config.SITE.current_page === 'explore-main' ){
                        images_set.add(image)
                    }
                }
            }) 
            image.tags.map(tag => {
                tags_set.add(tag)
                if(tag.toLowerCase().match( re )){
                    if( image.category.includes(current_page) || Config.SITE.current_page === 'explore-main' ){
                        images_set.add(image)
                    }
                }
            } )   
        }
    } );
    let tags = Array.from(tags_set)
    let images_list = Array.from(images_set)
    return {
        images:images_list,
        tags: tags.filter( v => v.toLowerCase().match( re ) ) 
    };
   };

   search_input_images.addEventListener('change',(e)=>{
        const {value} = e.target
        search_input_value = value.toLowerCase()
        if(value === ''){
            search_input_value = 'limpou'
        }
        Images.listPull = []
        pullImages()
   })

   search_input_images.addEventListener('keyup',(e)=>{
        const {value} = e.target
        search_input_value = value.toLowerCase()
   })
   
   function handlerInterscet(entries,observe){
    if(entries[0].isIntersecting){
        if(Images.listPull.length < images.length)
        {
            pullImages()
        }                
     }
   }
    const io = new IntersectionObserver(handlerInterscet,options);
    io.observe(document.querySelector('footer'));
}

export default scriptExplore;

