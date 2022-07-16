import { imageGrid } from "./ImageGrid.js";
import { slider } from "./slider.js";
import { Tabs } from "./tabs.js";

imageGrid.config({
    targetWrapper:'.grid__image',
    customClassImageGrid:'grid__image-item',
    setMillisecondsImageChange:8000,
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

console.log(tabsAuth)