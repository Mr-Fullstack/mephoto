 const BODY =  document.body;
 const DOCUMENT =  document;
 const URL = document.baseURI;
 const HISTORY = [];
 const SITE = {
    current_page:'',
    current_page_index:0,
    screen_width: window.innerWidth,
    screen_height: window.innerWidth
}
const ROUTES = {
    404:'pages/404.html',
    'home':'pages/home.html',
    'explore-nature':'pages/explore.html',
    'explore-sports':'pages/explore.html',
    'explore-objects':'pages/explore.html',
    'explore-main':'pages/explore.html',
    'explore-children':'pages/explore.html',
    'explore-technology':'pages/explore.html',
    'explore-people':'pages/explore.html',
    'explore-animals':'pages/explore.html',
    'explore-business':'pages/explore.html',
    'explore-architecture':'pages/explore.html',
    'explore-wallpapers':'pages/explore.html',
    'explore-film': 'pages/explore.html',
    'explore-street': 'pages/explore.html'
}

 const Config = {
    BODY,
    DOCUMENT,
    ROUTES,
    URL,
    HISTORY,
    SITE
}

export default Config;