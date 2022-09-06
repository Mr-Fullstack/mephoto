export class Tabs{
  tabWrapper = null;
  #tabContentList = null;
  #tabList = []
  config = ( options )=>{
    if( options ){
      this.#setConfig( options )
    }
  }
  #toggleTab= (evt)=> {
    this.#tabList.map( tab => {
      if( evt.target === tab ){
        tab.classList.add('active')
      }else{
        tab.classList.remove('active')
      }
    })
    this.#tabContentList.map( tabContent => {
      if(evt.target.dataset.target === tabContent.id ){
        tabContent.classList.add('active')
      }else{
        tabContent.classList.remove('active')
      }
    })
  }
  activeTab(tabname){
    this.#tabList.map( tab => {
      if( tabname === tab.dataset.target ){
        tab.classList.add('active')
      }else{
        tab.classList.remove('active')
      }
    })
    this.#tabContentList.map( tabContent => {
      if(tabname === tabContent.id ){
        tabContent.classList.add('active')
      }else{
        tabContent.classList.remove('active')
      }
    })
  }
  #setConfig = ( options )=> {
    if( options ){
      if( options.target ){
        this.tabWrapper = document.querySelectorAll( options.target )[0];
        let header = this.tabWrapper.querySelector('.tab__header')
        this.tabWrapper.classList.add('tab')
        if(!header || header === undefined){
          this.#tabContentList = [...this.tabWrapper.children]
          let tabHeader = document.createElement("div")
          tabHeader.classList.add('tab__header')
          this.tabWrapper.children[0].parentNode.insertBefore(tabHeader, this.tabWrapper.children[0])
        }
      }
    }
  }

  init = ( options )=> {
    
    if( options ){
      this.#setConfig( options )
    }
      this.#tabContentList.map( ( tabContent,index ) => {
        if (tabContent.dataset.tabName){
          let tab = document.createElement("div")
          tab.innerHTML = tabContent.dataset.tabName
          tab.classList.add("tab__index")
          tab.setAttribute('data-target',`tab-${index+1}`)
          tab.addEventListener('click',this.#toggleTab)
          tabContent.classList.add('tab__content')
          tabContent.id =`tab-${index+1}`
          if(this.#tabList.length < this.#tabContentList.length){
            this.#tabList.push(tab)
          }
          if(index === 0) {
            tab.classList.add("active")
            tabContent.classList.add('active')
          }
        }
      })
       for(let i = 0; i<= this.#tabList.length-1; i++){
        if(this.tabWrapper.children[0].children.length <= this.#tabList.length-1){
          this.tabWrapper.children[0].appendChild(this.#tabList[i])
        }
       }
    }
}