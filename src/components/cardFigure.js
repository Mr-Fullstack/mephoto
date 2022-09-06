export function cardFigure(data){
    let figure = document.createElement('figure');
    figure.innerHTML = `
        <figcaption>
            <div class="figure-image-header">
                <button class="figure-action figure-favorite" target-modal="modal-signin">
                    <img class="figure-author-image" src="images/favorite_icon.png">
                </button>
                <button class="figure-action figure-save" target-modal="modal-signin">
                    <img class="figure-author-image" src="images/add_icon.png">
                </button>
            </div>
            <div class="figure-author-box">
                <div class="figure-author-box-main">
                    <img class="figure-author-image" src="images/${data.photo_autor}">
                    <div>
                        <span class="figure-author-name">
                            ${data.name_autor}
                        </span>
                    </div>
                </div>
                <div>
                    <button class="figure-action figure-favorite show-xs" target-modal="modal-signin">
                        <img class="figure-author-image" src="images/favorite_icon.png">
                    </button>
                    <button class="figure-action figure-save show-xs" target-modal="modal-signin">
                        <img class="figure-author-image" src="images/add_icon.png">
                    </button>
                    <button class="figure-action figure-download">
                        <a href="/path/to/image.jpg" download="FileName.jpg">
                            <img class="figure-author-image" src="images/file_download_icon.png">
                        </a>
                    </button>
                </div>
            </div>
        </figcaption>
     `
    return figure;
}