export function loading (){
    const loading = document.createElement("div")
    loading.classList.add("loading")
    loading.innerHTML = `
        <div class="loading">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin:auto;display:block; width: 50px;" width="197px" height="197px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <circle cx="50" cy="50" fill="none" stroke="#66cc55" stroke-width="4" r="41" stroke-dasharray="193.20794819577225 66.40264939859075">
                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="0.5s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                </circle>
            </svg>
        </div>
    `
    return loading
}