import { InputControl, InputPasswordControl } from "./formControl.js";
import { Person } from "./models/Person.js";
import { Action } from "./plugins/action.js";
import { imageGrid } from "./plugins/ImageGrid.js";
import { slider } from "./plugins/slider.js";
import { Tabs } from "./plugins/tabs.js";


const newUser = new Person()

// plugins configs 

imageGrid.config({
    targetWrapper:'.grid__image',
    customClassImageGrid:'grid__image-item',
    setMillisecondsImageChange:5000,
    imageList:[ 
        './images/01.jpg',
        './images/02.jpg',
        './images/03.jpg',
        './images/04.jpg',
        './images/05.jpg',
        './images/06.jpg',
        './images/07.jpg' 
     ]
});
imageGrid.init();

slider.config({
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    direction: 'horizontal',
    loop: false,
    slidesPerView: 1,
    speed: 400,
    spaceBetween: 0,
    breakpoints: {
        769: {
            freeMode: true,
            slidesPerView: 2,
            spaceBetween: 16,
        },
        1200: {
            slidesPerView: 3,
            spaceBetween: 16,
        },
    }
});

slider.init();

const tabsAuth = new Tabs()
tabsAuth.init({
    target:'#tab-auth'
})

// controle de formulários 

export function checkValueInput(input){

    if( input.value === "" ){
       input.parentNode.parentNode.classList.add('input-error')
    }else{
        input.parentNode.parentNode.classList.remove('input-error')
        switch(input.type){
            case 'text':
                newUser.username = input.value
                break;
            case 'email':
                newUser.email = input.value
                break;
            case 'password':
                newUser.password = input.value
                break;

            default:
                console.log('tipos de dados inválidos')
                break;

        }
    }
    // console.log(newUser)
}

const signup_password = new InputPasswordControl({
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


const input_term = new InputControl( {
    inputTarget:"#terms",
    events:[
        {
            name:"change",
            script:({ target } )=> {
                newUser.acceptTerms = target.checked
                // console.log(newUser)
            }
        }
    ]
})

const inputs = new InputControl( {
    inputTarget:".input-value",
    events:[
        {
            name:"blur",
            script:({ target } )=> checkValueInput(target)
        }
    ]
})


const authAction = new Action({
    target:".js-auth-toggle",
    events:[
        {
            name:"click",
            script:({target})=> {

                const auth = tabsAuth.tabWrapper.parentNode 
                const hero_copy = document.querySelectorAll('.hero__copy')[0]
                const hero_wrapper = document.querySelectorAll('.hero__wrapper')[0]
                const hero_grid_image = document.querySelectorAll('.grid__image')[0]

                auth.classList.remove('hidden')
                hero_copy.classList.add('hidden')

                if(window.innerWidth < 1200){
                    hero_grid_image.classList.add('hidden')
                    hero_wrapper.style.paddingBottom = '0px'
                    hero_wrapper.style.justifyContent="center";
                }

                if( target.classList.contains('js-show-signin')){
                    tabsAuth.activeTab('tab-1')
                }
                if( target.classList.contains('js-show-signup') ){
                    tabsAuth.activeTab('tab-2')
                }
                     
                if(target.parentNode.classList.contains('auth')){
                    window.scrollTo(0,0)
                }
            }
        }
    ]
})
