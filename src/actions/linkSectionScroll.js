import config from "../config"
import { loadPage } from "../helpers/loadPage"
import { Action } from "../plugins/action"

export function linkSectionScroll(section_links){
  const link_section = new Action({
    elements:[...section_links],
    events:[{
        name:'click',
        script:(evt) => {
            evt.preventDefault()
                if(!window.location.pathname.includes('home') && !evt.target.hash.includes("home") ){
                    loadPage('home')
                }
              let time =  setTimeout( ()=> {
                    if(evt.target.hash !==''){
                      let section = Config.BODY.querySelector(evt.target.hash).getBoundingClientRect()
                      let fixOffsetScrollTop;
                        if(evt.target.classList.contains('btn__primary')){
                          let positionTargetUpdated = Config.BODY.querySelector('.btn__primary.link-section').getBoundingClientRect().top
                          fixOffsetScrollTop = Config.BODY.getElementsByTagName('footer')[0].getBoundingClientRect().top
                          fixOffsetScrollTop = fixOffsetScrollTop + positionTargetUpdated
                        }else{
                          fixOffsetScrollTop =  section.top
                        }
                        window.scrollTo({
                        top: fixOffsetScrollTop,
                        left: 0
                    });
                    }
                    clearTimeout(time)
                },200)
            }
        }]
    })  
}


