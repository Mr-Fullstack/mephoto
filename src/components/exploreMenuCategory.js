import config from "../config"

export function exploreMenuCategory() {
    let ul = Config.DOCUMENT.createElement('ul')
    ul.innerHTML = `
                     <li class= ${Config.SITE.current_page === "explore-main" ? 'active' : ''} >
                        <a href="explore-main" class="link-page">Explore</a>
                    </li>
                    <li class= ${Config.SITE.current_page === "explore-nature" ? 'active' : ''} >
                        <a href="explore-nature" class="link-page">Nature</a>
                    </li>
                    <li class= ${Config.SITE.current_page === "explore-sports" ? 'active' : ''} >
                        <a href="explore-sports" class="link-page">Sports</a>
                    </li>
                    <li class= ${Config.SITE.current_page === "explore-objects" ? 'active' : ''} >
                        <a href="explore-objects" class="link-page">Objects</a>
                    </li>
                    <li class= ${Config.SITE.current_page === "explore-children" ? 'active' : ''} >
                        <a href="explore-children" class="link-page">Children</a>
                    </li>
                    <li class= ${Config.SITE.current_page === "explore-technology" ? 'active' : ''} >
                        <a href="explore-technology" class="link-page">Technology</a>
                    </li>
                    <li class= ${Config.SITE.current_page === "explore-people" ? 'active' : ''} >
                        <a href="explore-people" class="link-page">People</a>
                    </li>
                    <li class= ${Config.SITE.current_page === "explore-animals" ? 'active' : ''} >
                        <a href="explore-animals" class="link-page">Animals</a>
                    </li>
                    <li class= ${Config.SITE.current_page === "explore-business" ? 'active' : ''} >
                        <a href="explore-business" class="link-page">Business & Work</a>
                    </li>
                    <li class= ${Config.SITE.current_page === "explore-architecture" ? 'active' : ''} >
                        <a href="explore-architecture" class="link-page">Architecture</a>
                    </li>
                    <li class= ${Config.SITE.current_page === "explore-wallpapers" ? 'active' : ''} >
                        <a href="explore-wallpapers" class="link-page">Wallpapers</a>
                    </li>
                    <li class= ${Config.SITE.current_page === "explore-film" ? 'active' : ''} >
                        <a href="explore-film" class="link-page">Film</a>
                    </li>
                    <li class= ${Config.SITE.current_page === "explore-street" ? 'active' : ''} >
                        <a href="explore-street" class="link-page">Street Photography</a>
                    </li>`
    return ul
} 
