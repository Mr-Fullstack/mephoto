import { BODY, DOCUMENT, PATH } from "./consts.js";
import { InputControl, InputPasswordControl } from "./formControl.js";
import { IconCloseSVG } from "./icons/iconCLose.js";
import { IconLinesSVG } from "./icons/iconLines.js";
import { Person } from "./models/Person.js";
import { Action } from "./plugins/action.js";
import { imageGrid } from "./plugins/ImageGrid.js";
import { slider } from "./plugins/slider.js";
import { Tabs } from "./plugins/tabs.js";


const newUser = new Person()

/* #region IMAGE GRID CONFIG */
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

/*#endregion */

/* #region SLIDER CONFIG */
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

/* #endregion  */ 

/* #region AUTH TAB CONFIG */
    const tabsAuth = new Tabs()
    tabsAuth.init({
        target:'#tab-auth'
    })
    
    const authAction = new Action({
        target:".js-auth-toggle",
        events:[
            {
                name:"click",
                script:({target})=> {
    
                    const auth = tabsAuth.tabWrapper.parentNode 
                    const hero_copy = BODY.querySelectorAll('.hero__copy')[0]
                    const hero_wrapper = BODY.querySelectorAll('.hero__wrapper')[0]
                    const hero_grid_image = BODY.querySelectorAll('.grid__image')[0]
    
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
/* #endregion  */ 

/* #region INPUT FORM CONFIG */
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
/* #endregion */

/* #region MENU CONFIG */

const menu = BODY.querySelector("#menu")
const button_menu_open = BODY.querySelector("#js-menu-open")
const button_menu_close = BODY.querySelector("#js-menu-close")

button_menu_open.innerHTML = IconLinesSVG
button_menu_open.style.color = "#66CC55"
button_menu_close.innerHTML = IconCloseSVG
button_menu_close.style.color = "var(--quarternary)"
button_menu_close.style.alignSelf = "flex-end"

function openMenu(){
    menu.style.right= '0vw';
    BODY.classList.add('menu-open')
}

function closeMenu(){
    menu.style.right= '-100vw';
    BODY.classList.remove('menu-open')
}

function actionMenu(target){
    // console.log(target)
    switch(target){
        case button_menu_close:
        case button_menu_open:
            toggleMenu()
            break;
        case menu:
            openMenu()
            break;
        default:
            closeMenu()
            break;
    }

}

function toggleMenu(){
    if(BODY.classList.contains('menu-open')){
        closeMenu()
    }else{
        openMenu()
    }
}

const menu_actions = new Action({
    elements:[DOCUMENT],
    events:[
        {
            name:"click",
            script:({target}) =>  actionMenu(target) 
        }
    ]
})

const menu_links = BODY.querySelectorAll('.menu-list li a')

const menu_links_actions = new Action({
    elements:[...menu_links],
    events:[
        {
            name:"click",
            script:({target}) =>  {
                menu_links.forEach(menu =>{
                    if(menu === target){
                        menu.parentNode.classList.add("active")
                    }else{
                        menu.parentNode.classList.remove("active")
                    }
                })
                
            }
        }
    ]
})

/* #endregion */