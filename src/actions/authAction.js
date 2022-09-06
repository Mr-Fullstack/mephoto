import config from "../Config.js";
import { loadPage } from "../helpers/loadPage";
import { modalMain } from "../plugins/Modal";
import { Action } from "./../plugins/action";

export function authAction (tabs){
const btn_auth = Config.BODY.querySelectorAll('.js-auth-toggle')

const action_tabs =  new Action({
        elements:[...btn_auth],
        events:[
            {
                name:"click",
                script:( { target } )=> {
                    let hero_copy,hero_wrapper,hero_grid_image;
                    modalMain.closeAll()
                    if(Config.SITE.current_page !== 'home'){
                        loadPage('home');
                    }
                    let time1 = setTimeout( ()=> {
                        hero_copy = Config.BODY.querySelectorAll('.hero__copy')[0]
                        hero_wrapper = Config.BODY.querySelectorAll('.hero__wrapper')[0]
                        hero_grid_image = Config.BODY.querySelectorAll('.grid__image')[0]
                        clearTimeout(time1)
                    },100)
                    let time2 = setTimeout( ()=> {
                        const tabsAuth = Config.BODY.querySelector('#auth')
                        tabsAuth.classList.remove('hidden')
                        hero_copy.classList.add('hidden')
                        if( window.innerWidth < 1200 ){
                            hero_grid_image.classList.add('hidden')
                            hero_wrapper.style.justifyContent="center";
                        }
                        if( target.classList.contains('js-show-signin')){
                            tabs.activeTab('tab-1')
                        }
                        if( target.classList.contains('js-show-signup') ){
                            tabs.activeTab('tab-2')
                        }
                        window.scrollTo(0,0)
                        clearTimeout(time2)
                       
                    },200)
                }
            }
        ]
    })
}