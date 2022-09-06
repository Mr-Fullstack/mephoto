export function ImageMainGrid(){
    const col = document.createElement('div')
    col.classList.add('col-md-4')
    col.innerHTML = `<div class="main-images-grid"></div>` 
    return col
}