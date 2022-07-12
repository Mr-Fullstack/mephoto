import { imageGrid } from "./ImageGrid.js";

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