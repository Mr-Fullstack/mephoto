import config from "../config";
import { IconCloseSVG } from "../icons/iconCLose";
import { IconLinesSVG } from "../icons/iconLines";
import { Action } from './action';

export class MainMenu {
  #menu;
  #button_menu_open ;
  #button_menu_close;
  #menu_section_links;
  #openMenu = () =>{
    this.#menu.style.right= '0vw';
    Config.BODY.classList.add('menu-open')
  } 
  #closeMenu = () =>{
    this.#menu.style.right= '-100vw';
    Config.BODY.classList.remove('menu-open')
  }

  init = () => {
    this.#menu =  Config.BODY.querySelector("#menu")
    this.#button_menu_open =  Config.BODY.querySelector("#js-menu-open")
    this.#button_menu_close =  Config.BODY.querySelector("#js-menu-close")
    this.#button_menu_open.innerHTML = IconLinesSVG
    this.#button_menu_open.style.color = "#55CC8C "
    this.#button_menu_close.innerHTML = IconCloseSVG
    this.#button_menu_close.style.color = "var(--quarternary)"
    this.#button_menu_close.style.alignSelf = "flex-end"
    this.#menu_section_links = Config.BODY.querySelectorAll('.menu-list li a');
    new Action({
      elements:[ Config.DOCUMENT],
      events:[
          {
              name:"click",
              script:({target}) =>  this.#toggle(target) 
          }
      ]
    }) 
    new Action({
      elements:[...this.#menu_section_links],
      events:[
          {
              name:"click",
              script:({target}) =>  {
                this.#menu_section_links.forEach(menu => {
                      if( menu === target ){
                          menu.parentNode.classList.add("active")
                      }else{
                          menu.parentNode.classList.remove("active")
                      }
                  })
              }
          }
      ]
    })
    let width = window.innerWidth
    let fix_page_name =  Config.SITE.current_page.includes('explore-') ? 'explore-main' : 'home' 
    if( width >= 1200 ){
        this.#menu_section_links.forEach(menu => {
            if( fix_page_name.includes('explore-') ){
                if(!menu.href.includes('home')){
                    menu.parentNode.style.display = 'none'
                }
            }else{
                menu.parentNode.style.display = 'initial'
            }
        })
    }
   } 
    #toggle = (target)=>{
      switch(target){
        case this.#button_menu_close:
        case this.#button_menu_open:
            this.#toggleMenu()
            break;
        case this.#menu:
            this.#openMenu()
            break;
        default:
            this.#closeMenu()
            break;
       }
    }
   #toggleMenu = ( )=>{
    if( Config.BODY.classList.contains('menu-open')){
        this.#closeMenu()
    }else{
        this.#openMenu()
    }
  }
}

const Menu = new MainMenu()

export default Menu;