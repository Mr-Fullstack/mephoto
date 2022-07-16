import Swiper from 'https://unpkg.com/swiper@8/swiper-bundle.esm.browser.min.js';

class Slider {
  #options=null;
  config = (options)=> {
    this.#options = options;
  }
  init = ()=>{
    const swiper = new Swiper('.swiper',this.#options );
  }
}

export const slider = new Slider();