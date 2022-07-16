export class Tabs{
  #tabWrapper = null;
  #tabContentList = null;
  #tabList = []
  config = (options)=>{
    if(options){
      this.#setConfig(options)
    }
  }
  #toggleTab=(evt)=>{
    this.#tabList.map( tab => {
      if(evt.target === tab ){
        evt.target.classList.add('active')
      }else{
        tab.classList.remove('active')
      }
    })
    this.#tabContentList.map (tabContent=>{
      if(evt.target.dataset.target === tabContent.id ){
        tabContent.classList.add('active')
      }else{
        tabContent.classList.remove('active')
      }
    })
  }
  #setConfig = (options)=>{
    if(options){
      if(options.target){
        let tabHeader = document.createElement("div")
        tabHeader.classList.add('tab__header')
        this.#tabWrapper = document.querySelectorAll(options.target)[0];
        this.#tabWrapper.classList.add('tab')
        this.#tabContentList = [ ...this.#tabWrapper.children]
        this.#tabWrapper.children[0].parentNode.insertBefore(tabHeader, this.#tabWrapper.children[0]);
      }
    }
  }

  init = (options)=> {
    if(options){
      this.#setConfig(options)
    }
    this.#tabContentList.map((tabContent,index) =>{
      let tab = document.createElement("div")
      tab.innerHTML = tabContent.dataset.tabName
      tab.classList.add("tab__index")
      tab.setAttribute('data-target',`tab-${index+1}`)
      tab.addEventListener('click',this.#toggleTab)
      tabContent.classList.add('tab__content')
      tabContent.id =`tab-${index+1}`
      this.#tabList.push(tab)
      if(index === 0){
        tab.classList.add("active")
        tabContent.classList.add('active')
      }
    })
     for(let i = 0;  i <= this.#tabList.length-1; i++){
      this.#tabWrapper.children[0].appendChild(this.#tabList[i]);
     }
  }
}