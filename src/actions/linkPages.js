import config from '../config';
import { handlerPage } from '../helpers/loadPage';

export function linkPages(){
    if(Config.SITE.current_page !== ''){
      const linkPages = document.querySelectorAll('.link-page');
      linkPages.forEach(link => {
          link.addEventListener('click',handlerPage)
      }) 
  }
}