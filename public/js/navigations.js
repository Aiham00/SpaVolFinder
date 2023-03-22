document.addEventListener('DOMContentLoaded', function(){
    
    const anchors = document.querySelectorAll('.vol-menu')

    for(const anchor of anchors){
        
        anchor.addEventListener('click', function(event){
            event.preventDefault()
            
            const url = anchor.getAttribute('href')
            
            history.pushState(null, "", url)
            
            hideCurrentPage()
            showPage(url)
        })
        
    }
    showPage(location.pathname)
    
})

window.addEventListener('popstate', function(){

    hideCurrentPage()
    showPage(location.pathname)
    
})

function hideCurrentPage(){
    document.querySelector('.current-page').classList.remove('current-page')

    
}

function showPage(url){
    updateBarLogStatus()
    let nextPageId
    
    switch(url){
        
        case '/':
            nextPageId = 'home-page'
            loadHomePage()
            break
        
        case '/events':
            nextPageId = 'events-page'
            loadEventsPage()
            break
        case '/events/create':
            nextPageId = 'events-page'
            loadCreateEventPage()
            break  
        case '/applications':
            nextPageId = 'applications-page'
            loadApplicationsPage()
            break
        case '/entry/logout':
            nextPageId = 'logout-page'
            loadLogoutPage()
            break
        case '/entry':
            nextPageId = 'entry-page'
            loadEntry()
            break
        case '/entry/login':
            nextPageId = 'entry-page'
            loadLoginPage()
            break
        case '/entry/volunteer-sign-up':
            nextPageId = 'entry-page'
            loadSignupVolunteerPage()
            break
        case '/entry/organizer-sign-up':
            nextPageId = 'entry-page'
            loadSignupOrganizationPage()
            break
            
        default:

            if(url.startsWith("/events/create/")){
                const [empty, events, creat, id] = url.split("/")
                nextPageId = 'events-page'
                loadCreateEventPage(id)

            }else if(url.startsWith("/events/delete/")){
                const [empty, events,comand, id] = url.split("/")
                nextPageId = 'events-page'
                loadDeleteEvent(id)

            }else if(url.startsWith("/events/update/")){
                const [empty, events,comand, id] = url.split("/")
                nextPageId = 'events-page'
                loadUpdateEventPage(id)

            }else if(url.startsWith("/events/")){
                const [empty, events, id] = url.split("/")
                nextPageId = 'events-page'
                loadEventPage(id)

            }else if(url.startsWith("/applications/create/")){
                const [empty, applications, comand, id] = url.split("/")
                nextPageId = 'applications-page'
                loadCreateApplicationPage(id)
            }else if(url.startsWith("/applications/")){
                const [empty, applications, id] = url.split("/")
                nextPageId = 'applications-page'
                loadEventApplicationsPage(id)
                
            }else if(url.startsWith("/entry/")){
                const [empty, entry, id] = url.split("/")
                nextPageId = 'entry-page'
                loadAccountInfoPage(id)
            }else{
                nextPageId = 'not-found-page'
            }
        
    }
    
    document.getElementById(nextPageId).classList.add('current-page')
    
}
function loadHomePage(){
    const bodyDiv = document.querySelector('.container#entry-page')
    bodyDiv.innerHTML=""

    const title = document.createElement("H3")
    title.innerText ="Home"
    bodyDiv.appendChild(title)
}

function updateBarLogStatus(){

    const logOutbutton = document.querySelector("a#logout-page ")
    const entrybutton = document.querySelector("a#entry-page ")
    if (window.localStorage.getItem("token")){
        logOutbutton.classList.remove("vol-menu-hidden")
        entrybutton.classList.add("vol-menu-hidden")
    }else{
        entrybutton.classList.remove("vol-menu-hidden")
        logOutbutton.classList.add("vol-menu-hidden")
    }
}
function handleAnchorOnClick(anchor,url){
    anchor.setAttribute('href', url)
    anchor.addEventListener('click', function(e){
      e.preventDefault()
                  
      history.pushState(null, "", url)
      
      hideCurrentPage()
      showPage(url)
      
    })
  }
 function isOrganizationLoggedin(){
    const token = JSON.parse(window.localStorage.getItem("token"))
    if(token){
        return JSON.parse(decode(token)).isOrg
    }else{
        return false
    }
 }
 function isVolunteerLoggedin(){
    const token = JSON.parse(window.localStorage.getItem("token"))
    if (token){
        return  JSON.parse(decode(token)).isVolunteer
    }else{
        return false
    }
 }

function getLoggedinAccountId(){
    const token = JSON.parse(window.localStorage.getItem("token"))
    if (token){
        return  JSON.parse(decode(token)).id
    }else{
        return false
    } 
}
const decode = token =>
decodeURIComponent(atob(token.split('.')[1].replace('-', '+').replace('_', '/')).split('').map(c =>
`%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`).join(''));