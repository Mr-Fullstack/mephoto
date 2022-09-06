import  Config from "./config";
import { loadPage } from "./helpers/loadPage";
import { modalMain } from "./plugins/Modal";
import { authAction } from "./actions/authAction";
import { linkPages } from "./actions/linkPages";
import { Tabs } from "./plugins/tabs";
import { linkSectionScroll } from "./actions/linkSectionScroll";
import  scriptExplore  from './pages/explore';
import  scriptsHome  from './pages/home';
import Menu from './plugins/menu';
import "./css/main.css";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXnkrUQ7cK3Vy_7fqqhIo3Li8KDe7iUsg",
  authDomain: "mephoto-4aeaa.firebaseapp.com",
  projectId: "mephoto-4aeaa",
  storageBucket: "mephoto-4aeaa.appspot.com",
  messagingSenderId: "550268228910",
  appId: "1:550268228910:web:0176baec08c41c4f60d6bf",
  measurementId: "G-1VBBBR6ECH"
};

// // Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const scriptsPages = {
  "home": scriptsHome,
  "explore-main": scriptExplore
}

if( Config.HISTORY.length <= 0 && ( window.location.pathname === '/' || window.location.pathname.includes('/dist/') )){
  loadPage('home')
}

const main = document.querySelector('main')
const tabs = new Tabs()

const main_observer = new MutationObserver(function(mutationsList, observer) {
  const fix_page_name =  Config.SITE.current_page.includes('explore-') ? 'explore-main' : 'home';
  const section_links =  Config.BODY.querySelectorAll('.link-section')
  //script pages
  scriptsPages[fix_page_name]()
  // plugins 
  modalMain.init()
  Menu.init()
  if(fix_page_name === 'home'){    
    tabs.init({
        target:'#tab-auth'
    }) 
  }
  // helpers and actions uniques
  linkPages()
  authAction(tabs)
  linkSectionScroll(section_links)
});
main_observer.observe(main, {characterData: false, childList: true, attributes: false});

// lidando com popstate 
window.addEventListener('popstate',(e)=>{
  const { navigation } = e.currentTarget
  if(navigation){ 
        let fixCurrentEntry = navigation.currentEntry.index > 0 ? (navigation.currentEntry.index - 1)  : navigation.currentEntry.index
      loadPage( Config.HISTORY[ fixCurrentEntry ], false, fixCurrentEntry )
  }
})


