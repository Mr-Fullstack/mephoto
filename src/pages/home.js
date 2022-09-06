import  Config from "../config";
import { imageListSlider, photosSlider } from "../data/global";
import { checkValueInput, InputControl, InputPasswordControl } from "../formControl";
import imageGrid  from "../plugins/ImageGrid";
import { Action } from "../plugins/action";
import { modalMain } from "../plugins/Modal";
import { newUser } from "../models/Person";
import Swiper ,{ Navigation } from 'swiper';
import { target } from "../../webpack.config";

function scriptsHome(){
    /* #region IMAGE GRID CONFIG */   
    modalMain.reload()
    imageGrid.init( Config.SITE,{
        targetWrapper:'.grid__image',
        customClassImageGrid:'grid__image-item',
        setMillisecondsImageChange:10000,
        imageList:imageListSlider,
    });
    /*#endregion */
    
    /* #region SLIDER CONFIG */
    const slider = new Swiper('.swiper-books',{
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        modules:[Navigation],
        direction: 'horizontal',
        slidesPerView: 1,
        speed: 400,
        loop: false,
        spaceBetween: 0,
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 16,
            },
            569: {
                slidesPerView: 1.75,
                spaceBetween: 16,
            },
            1200: {
                slidesPerView:2.80,
                spaceBetween: 16,
            },
        }
    });

    let slider_photos;

    const photo_list_item =  Config.BODY.querySelector(".swiper-photos")

    photosSlider.map( async ( photo,index ) => {
        let swiper_slide = Config.DOCUMENT.createElement('div')
        let figure = Config.DOCUMENT.createElement('figure')
        let img = Config.DOCUMENT.createElement("img")
        figure.appendChild(img)
        swiper_slide.appendChild(figure)
        swiper_slide.classList.add("swiper-slide");
        figure.classList.add("img-loading");
        photo_list_item.children[0].appendChild(swiper_slide)
        const request = await fetch(photo)
        const response = await request.blob()
        const source_image = URL.createObjectURL(response) 
        img.src = source_image  
        img.onload = ()=> {
            figure.classList.remove("img-loading");
        }
        if( index === photosSlider.length - 1 ){
            slider_photos  = new Swiper('.swiper-photos',{
                autoplay: {
                    delay: 1000,
                    disableOnInteraction:false
                },
                target:'',
                direction: 'horizontal',
                loop: false,
                speed: 10000,
                spaceBetween: 0,
                freeMode: false,
                simulateTouch:false,
                breakpoints: {
                    320: {
                        slidesPerView: 2,
                        spaceBetween:0,
                    },
                    769: {
                        slidesPerView: 4,
                        spaceBetween: 0,
                    },
                    960: {
                        slidesPerView: 5,
                        spaceBetween: 0,
                    },
                    1200: {
                        slidesPerView: 6,
                        spaceBetween: 0,
                    },
                    1366: {
                        slidesPerView: 7,
                        spaceBetween: 0,
                    },
                    1440: {
                        slidesPerView: 8,
                        spaceBetween: 0,
                    },
                    1920: {
                        slidesPerView: 7,
                        spaceBetween: 0,
                    },
                    2048: {
                        slidesPerView: 10,
                        spaceBetween: 0,
                    },
                }
            });
        }
    })

    /* #endregion  */ 

    /* #region INPUT FORM CONFIG */
    new Action({
        target:"#form-signup",
        events:[
            {
                name:"submit",
                script:(evt) =>  {
                    evt.preventDefault()   
                    // console.log(target)
                    // let data =  window.localStorage.getItem('data');
                    // let user = Object.assign({},newUser)
                    // console.log(user)
                    // if(data){
                    //     console.log(JSON.parse(data))
                    // }else{
                    //     data = JSON.stringify({
                    //         app:[],
                    //         accounts:[newUser]
                    //     })
                    //     window.localStorage.setItem('data',data)
                    // }
                }
            }
        ]
     })
    
    new InputPasswordControl({
    inputTarget:"signup-password",
    events:[
        {
            name:"click",
            script:(inputTarget,evt) => {
                if( inputTarget.type === 'password')
                {
                    inputTarget.type = 'text'
                    evt.target.innerHTML = 'Hide'
                }else
                {
                    inputTarget.type = 'password'
                    evt.target.innerHTML = 'Show'
                }
            }
        }
    ]
    })
    
    new InputControl( {
    inputTarget:"#terms",
    events:[
        {
            name:"change",
            script:({ target } )=> {
                newUser.acceptTerms = target.checked
            }
        }
    ]
    })

    new InputControl( {
        inputTarget:".input-value",
        events:[
            {
                name:"blur",
                script:({ target } )=>{
                    if ( checkValueInput(target) ){
                        switch(target.name){
                            case 'username':
                                newUser.username = target.value
                                break;
                            case 'email':
                                newUser.email = target.value
                                break;
                            case 'pasword':
                                newUser.password = target.value
                                break;
                            default:
                                console.log('formaulário não mapeado, check nome do campo')
                                break;
                        }
                    }
                }
            }
        ]
    })

    /* #endregion */

    /*#region CARD PLAN CONFIG MOBILE*/ 
    if(Config.SITE.screen_width < 560) {
    const card_plan_list = document.querySelectorAll('.card_plan');

    new Action({
        elements:[Config.DOCUMENT],
        events:[
            {
                name:"scroll",
                script:({target}) =>  {
                    card_plan_list.forEach((card,index)=>{
                        let offseTop = card.getBoundingClientRect().top
                        let screenHeight = window.innerHeight
                        if( offseTop >= (screenHeight / 2 ) || offseTop <= ( ( screenHeight  * -1 ) / 3 ) ){
                            card.style.opacity = 0.1
                            card.style.boxShadow = 'unset'  
                        }else{
                            card.style.opacity = 1
                            card.style.boxShadow = '0px 12px 30px -6px rgb(0 ,0 ,0, 33%)'
                        }
                    })  
                }
            }
        ]
    })    
    } 
    /*#endregion*/        

    let photographer_grid  = Config.BODY.querySelectorAll(".photographer_grid")[0]

    Config.DOCUMENT.addEventListener('scroll',()=>{
        photographer_grid  = Config.BODY.querySelectorAll(".photographer_grid")[0]
        if(photographer_grid){
            if(photographer_grid.getBoundingClientRect().top <= 649 ){
                photographer_grid.classList.remove('scroll-up') 
                photographer_grid.classList.add('scroll-down') 
            }else{
                photographer_grid.classList.remove('scroll-down') 
                photographer_grid.classList.add('scroll-up') 
            }
        }
    })
}
export default scriptsHome;

