import config from "../config";

export function handlerPage(e){
    e.preventDefault()
    const resquest_url_page = e.target.href.split("/")
    let resquest_page;
    if(resquest_url_page.length > 1){
        resquest_page =  resquest_url_page[resquest_url_page.length - 1]
    }else{
        resquest_page = resquest_url_page[0]
    } 

    Config.BODY.parentNode.style.scrollBehavior="unset";
    setTimeout(()=>{
        window.scrollTo(0,0)
    },10)
    
    setTimeout(()=>{
        loadPage(resquest_page)
    },11)
    
}

export async function loadPage(page_name,active_history=true,page_index=null){
    let fix_fetch_page = page_index  ? Config.HISTORY[page_index] : page_name ;

    if(active_history){
        Config.HISTORY.push(page_name)
        history.pushState(null,null,'')
        Config.SITE.current_page = page_name 
    }else{
        Config.SITE.current_page = Config.HISTORY[page_index]
        Config.SITE.current_page_index = page_index ? page_index : Config.HISTORY.length - 1
    }

    const request = await fetch( Config.ROUTES[fix_fetch_page] );
    const page = await request.text()
    replaceContentHtml(page)
    Config.BODY.parentNode.style.scrollBehavior="smooth";
}

function replaceContentHtml(page){
    const new_html = document.createElement('div')
    new_html.innerHTML = page
    const title_page = new_html.querySelector('title').innerText
    const new_content_html = new_html.querySelector('main').innerHTML
    const old_html = document.body
    const old_content_html = old_html.querySelector('main')
    old_content_html.innerHTML = new_content_html
    const old_title_html = document.querySelector('title')
    old_title_html.innerText = title_page
}


