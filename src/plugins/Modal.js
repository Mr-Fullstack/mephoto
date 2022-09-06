import config from "../config";

class Modal  {
    allBtnsPopupsOpen;
    allBtnsPopupsClose;
    index;
    addEffectModalClose;
    addEffectModalOpen;
  constructor(){
      this.allBtnsPopupsOpen = document.querySelectorAll('[target-modal]');
      this.allBtnsPopupsClose = document.querySelectorAll('[close]');
  }

  init() {
     this.allBtnsPopupsOpen.forEach((btn => {
       btn.onclick = (e) => {
         let modalOpen = document.querySelectorAll(`[target=${btn.attributes['target-modal'].value}]`)[0]
         this.index = this.index + 9
         modalOpen.style.zIndex = this.index 
         openPopup(btn.attributes['target-modal'].value)
       }
     }))
     this.allBtnsPopupsClose.forEach((btn => {
       if(btn.attributes.close.value!=""){
         if(btn.attributes.close.value === "all"){
           btn.onclick = () =>  closeAllPopup()
         }else{
           btn.onclick = () => closePopup(btn.attributes.close.value)
         }
       }else{
         btn.onclick = () => closePopup(btn.parentElement.parentElement.parentElement.attributes.target.value)
       }
     }))
  }
    reload(){
      this.allBtnsPopupsOpen = document.querySelectorAll('[target-modal]');
      this.allBtnsPopupsClose = document.querySelectorAll('[close]');
      this.init()
    }
    close(target_modal){
      let modal = document.querySelectorAll(`[target=${target_modal}]`);
      Config.DOCUMENT.documentElement.classList.remove('popup-open')
      removeClassModalOpen(modal)
    }
    open(target_modal){
      let modal = document.querySelector(`[target=${target_modal}]`);
      Config.DOCUMENT.documentElement.classList.add('popup-open')
      addClassModalOpen(modal)
    }
    closeAll(){
      closeAllPopup()
    }
 }

 function openPopup(popup) {
   let modal = document.querySelectorAll(`[target=${popup}]`);
   Config.DOCUMENT.documentElement.classList.add('popup-open')
   addClassModalOpen(modal[0])
 }
 function closePopup(popup) {
   let modal = document.querySelectorAll(`[target=${popup}]`);
   Config.DOCUMENT.documentElement.classList.remove('popup-open')
   removeClassModalOpen(modal[0])
 }
 function closeAllPopup() {
   let popups = document.querySelectorAll(".modal-open");
   Config.DOCUMENT.documentElement.classList.remove('popup-open')
   popups.forEach(popup=>{
     removeClassModalOpen(popup)
   })
 }
 function removeClassModalOpen(popup){
   popup.classList.add('modal-close')
   setTimeout(() => {
     popup.classList.remove('modal-open')
   }, 300)
   Config.DOCUMENT.documentElement.classList.remove('popup-open')
 }
 function addClassModalOpen(popup){
   setTimeout(() => {
     popup.classList.remove('modal-close')
     popup.classList.add('modal-open')
     popup.scrollTo(0,0)
   }, 1)
 }
 
export const modalMain = new Modal()