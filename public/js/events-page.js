async function loadEventsPage() {
  const response = await fetch('http://localhost:3000/api/events')
  .then (function(response){
    return response.json()
      .then(function(events){
        const bodyDiv = document.querySelector('.container#entry-page')
        bodyDiv.innerHTML = ""
        const title = document.createElement("h3")
        title.innerText = " Events"
        bodyDiv.appendChild(title)
        if (isOrganizationLoggedin()){
          const createEventAnchor = document.createElement('a')
          createEventAnchor.innerText = "Create new event"
          handleAnchorOnClick(createEventAnchor,"/events/create")
          bodyDiv.appendChild(createEventAnchor)
        }
        for (const event of events){
          const div = document.createElement('div')
          bodyDiv.appendChild(div)

          const span = document.createElement('span')
          div.appendChild(span)
          span.innerText = event.title

          const anchor = document.createElement('a')
          anchor.innerText = "See information"
          const url = "/events/"+event.eventId
          handleAnchorOnClick(anchor,url)
          span.appendChild(anchor)

          const table = document.createElement('table')
          div.appendChild(table)

          const tbody = document.createElement('tbody')
          table.appendChild(tbody)

          const tr1 = document.createElement('tr')
          tbody.appendChild(tr1)

          const td11 = document.createElement('td')
          td11.innerText = "Start date"
          tr1.appendChild(td11)

          const td12 = document.createElement('td')
          td12.innerText = event.startDate
          tr1.appendChild(td12)

          const tr2 = document.createElement('tr')
          tbody.appendChild(tr2)

          const td21 = document.createElement('td')
          td21.innerText = "End date"
          tr2.appendChild(td21)

          const td22 = document.createElement('td')
          td22.innerText = event.endDate
          tr2.appendChild(td22)

        }
      })
      
    }).catch (function(error){
      const bodyDiv = document.querySelector('.container#entry-page')
      const p = document.createElement("p")
      p.innerText=error
      bodyDiv.appendChild(p)
    })
    
}

async function loadEventPage(id) {
  const token = JSON.parse(window.localStorage.getItem("token"))
  const response = await fetch('http://localhost:3000/api/events/'+id,{
    headers: {"Content-Type": "application/json",
              "Authorization": "Bearer "+token
              }
  })
  .then (function(response){
    return response.json()
      .then(function(event){
        const bodyDiv = document.querySelector('.container#entry-page')
        bodyDiv.innerHTML = ""
        const title = document.createElement("h3")
        title.innerText = event.title
        bodyDiv.appendChild(title)

          const div = document.createElement('div')
          bodyDiv.appendChild(div)

          const table = document.createElement('table')
          div.appendChild(table)

          const thead = document.createElement("thead")
          table.appendChild(thead)

          const tr = document.createElement("tr")
          thead.appendChild(tr)

          const th1 = document.createElement("th")
          th1.innerText= "Organisation"
          tr.appendChild(th1)

          const th2 = document.createElement("th")
          tr.appendChild(th2)

          const orgAnchor = document.createElement("a")
          orgAnchor.innerText = event.name
          const orgLinkUrl = "/entry/"+ event.accountId
          orgAnchor.setAttribute("href",orgLinkUrl)
          th2.appendChild(orgAnchor)
          handleAnchorOnClick(orgAnchor,orgLinkUrl)

          const td = document.createElement("td")
          tr.appendChild(td)

          if (isVolunteerLoggedin()){
            if (event.isApplied){
            
              td.innerText="You are applied"
            }else{
              const applyAnchor = document.createElement('a')
              applyAnchor.innerText = "Applay now"
              handleAnchorOnClick(applyAnchor,"/events/create/"+id)
              td.appendChild(applyAnchor)
            }
          }

          const tbody = document.createElement('tbody')
          table.appendChild(tbody)

          const tr1 = document.createElement('tr')
          tbody.appendChild(tr1)

          const td11 = document.createElement('td')
          td11.innerText = "Start date"
          tr1.appendChild(td11)

          const td12 = document.createElement('td')
          td12.innerText = event.startDate
          tr1.appendChild(td12)

          const tr2 = document.createElement('tr')
          tbody.appendChild(tr2)

          const td21 = document.createElement('td')
          td21.innerText = "End date"
          tr2.appendChild(td21)

          const td22 = document.createElement('td')
          td22.innerText = event.endDate
          tr2.appendChild(td22)

          const p = document.createElement("p")
          p.innerText = event.description
          div.appendChild(p)

      })
      
    }).catch (function(error){
      const bodyDiv = document.querySelector('.container#entry-page')
      const p = document.createElement("p")
      p.innerText=error
      bodyDiv.appendChild(p)
    })
    
}
function loadCreateEventPage(){
  const bodyDiv = document.querySelector('.container#entry-page')
  bodyDiv.innerHTML=""

  const pageTitle = document.createElement("h3")
  pageTitle.innerText = "Create event"
  bodyDiv.appendChild(pageTitle)

  const inlineDivTitle = creatInlineInputDiv("title","title","text","Title")
  bodyDiv.appendChild(inlineDivTitle)

  const inlineDivStartDate = creatInlineInputDiv("start-date-input","startDate","date","Start Date")
  inlineDivStartDate.classList.add("datepicker")
  bodyDiv.appendChild(inlineDivStartDate)

  const inlineDivEndDate = creatInlineInputDiv("end-date-input","endDate","date","End Date")
  inlineDivEndDate.classList.add("datepicker")
  bodyDiv.appendChild(inlineDivEndDate)

  const inlineDivLink = creatInlineInputDiv("link","link","text","Link... (OPTIONAL)")
  bodyDiv.appendChild(inlineDivLink)

  const inlineDivDescription= document.createElement("div")
  inlineDivDescription.classList.add("input-field")
  inlineDivDescription.classList.add("col")
  
  const textareaDescription = document.createElement("textarea")
  textareaDescription.id = "description"
  textareaDescription.classList.add("materialize-textarea")
  textareaDescription.name = "description"
  inlineDivDescription.appendChild(textareaDescription)

  const label = document.createElement("label")
  label.setAttribute("for","description")
  label.innerText = "Description.. (OPTIONAL)"
  inlineDivDescription.appendChild(label)
  bodyDiv.appendChild(inlineDivDescription)

  const button = document.createElement("button")
  button.innerText = "Submit"
  bodyDiv.appendChild(button)
  button.addEventListener('click', function(e){
      e.preventDefault()

      const event = {
        title: inlineDivTitle.firstChild.value,
        startDate: inlineDivStartDate.firstChild.value,
        endDate: inlineDivEndDate.firstChild.value,
        description: textareaDescription.value,
        link: inlineDivLink.firstChild.value
      }

    if (event.title.length == 0){
      document.querySelector('.helper-text-title').innerHTML = "required"
    }else{
      createEvent(event)
    }
      
    })
}
async function createEvent(event){
  const token = JSON.parse(window.localStorage.getItem("token"))
  const bodyDiv = document.querySelector('.container#entry-page')
  const errorDiv = document.createElement("div")
  bodyDiv.appendChild(errorDiv)
    const response = await fetch("http://localhost:3000/api/events/",{
    method: "POST",
    headers: {"Content-Type": "application/json",
              "Authorization": "Bearer "+token
              },
    body: JSON.stringify(
      { title: event.title,
        startDate: event.startDate,
        endDate: event.endDate,
        description: event.description,
        link: event.link
      })
  }).then (async function(response){
    return response.json()
  
    .then(function(result){
      showPage("/events")

    })
    
  }).catch (function(error){
    errorDiv.innerHTML = ""
    const p = document.createElement("p")
    p.innerText=error
    errorDiv.appendChild(p)
  })
}

function loadDeleteEvent(id){
  const bodyDiv = document.querySelector('.container#entry-page')
  bodyDiv.innerHTML=""
  const errorDiv = document.createElement("div")
  bodyDiv.appendChild(errorDiv)
  const p = document.createElement("p")
  p.innerText = "Are you sure you want to delete this event"
  bodyDiv.appendChild(p)

  const noAnchor = document.createElement("a")
  noAnchor.innerText = "No, go to Events page!"
  noAnchor.setAttribute("href", "/events")
  bodyDiv.appendChild(noAnchor)
  handleAnchorOnClick(noAnchor,"/events")

  const yesAnchor = document.createElement("a")
  yesAnchor.innerText = "Yes, delete it"
  yesAnchor.setAttribute("href", "/events")
  bodyDiv.appendChild(yesAnchor)
  
    yesAnchor.addEventListener('click', async function(e){
    e.preventDefault()
    const token = JSON.parse(window.localStorage.getItem("token"))
    const response = await fetch("http://localhost:3000/api/events/"+id,{
      method: "DELETE",
      headers: {"Content-Type": "application/json",
                "Authorization": "Bearer "+token
                }
    }).then (function(response){
      return response.json()
    
      .then(function(result){
        showPage("/events")
  
      })
      
    }).catch (function(error){
      errorDiv.innerHTML = ""
      const p = document.createElement("p")
      p.innerText=error
      errorDiv.appendChild(p)
    })
    hideCurrentPage()
    showPage("/events")
    })
}

async function loadUpdateEventPage(id){
  const bodyDiv = document.querySelector('.container#entry-page')
  bodyDiv.innerHTML=""
  const errorDiv = document.createElement("div")
  bodyDiv.appendChild(errorDiv)

  const token = JSON.parse(window.localStorage.getItem("token"))
  const response = await fetch('http://localhost:3000/api/events/'+id,{
    headers: {"Content-Type": "application/json",
              "Authorization": "Bearer "+token
              }
  })
  .then (function(response){
    return response.json()
      .then(function(event){
        const pageTitle = document.createElement("h3")
        pageTitle.innerText = "Update" +event.title+" event "
        bodyDiv.appendChild(pageTitle)
      
        const inlineDivTitle = creatInlineInputDiv("title","title","text","Title")
        bodyDiv.appendChild(inlineDivTitle)
      
        const inlineDivStartDate = creatInlineInputDiv("start-date-input","startDate","date","Start Date")
        inlineDivStartDate.classList.add("datepicker")
        bodyDiv.appendChild(inlineDivStartDate)
      
        const inlineDivEndDate = creatInlineInputDiv("end-date-input","endDate","date","End Date")
        inlineDivEndDate.classList.add("datepicker")
        bodyDiv.appendChild(inlineDivEndDate)
      
        const inlineDivLink = creatInlineInputDiv("link","link","text","Link... (OPTIONAL)")
        bodyDiv.appendChild(inlineDivLink)
      
        const inlineDivDescription= document.createElement("div")
        inlineDivDescription.classList.add("input-field")
        inlineDivDescription.classList.add("col")
        
        const textareaDescription = document.createElement("textarea")
        textareaDescription.id = "description"
        textareaDescription.classList.add("materialize-textarea")
        textareaDescription.name = "description"
        inlineDivDescription.appendChild(textareaDescription)
      
        const label = document.createElement("label")
        label.setAttribute("for","description")
        label.innerText = "Description.. (OPTIONAL)"
        inlineDivDescription.appendChild(label)
        bodyDiv.appendChild(inlineDivDescription)

        inlineDivTitle.firstChild.value = event.title
        inlineDivStartDate.firstChild.value = event.startDate
        inlineDivEndDate.firstChild.value = event.endDate
        textareaDescription.value = event.description
        inlineDivLink.firstChild.value = event.link

        const button = document.createElement("button")
        button.innerText = "Submit"
        bodyDiv.appendChild(button)
        button.addEventListener('click', function(e){
            e.preventDefault()
      
            const event = {
              id ,
              title: inlineDivTitle.firstChild.value,
              startDate: inlineDivStartDate.firstChild.value,
              endDate: inlineDivEndDate.firstChild.value,
              description: textareaDescription.value,
              link: inlineDivLink.firstChild.value
            }
                        
            updateEvent(event)
            
          })

      })
      
    }).catch (function(error){
      const bodyDiv = document.querySelector('.container#entry-page')
      const p = document.createElement("p")
      p.innerText=error
      bodyDiv.appendChild(p)
    })
}

async function updateEvent(event){
  const token = JSON.parse(window.localStorage.getItem("token"))
  const bodyDiv = document.querySelector('.container#entry-page')
  const errorDiv = document.createElement("div")
  bodyDiv.appendChild(errorDiv)
    const response = await fetch("http://localhost:3000/api/events/"+event.id,{
    method: "PUT",
    headers: {"Content-Type": "application/json",
              "Authorization": "Bearer "+token
              },
    body: JSON.stringify(
      { id: event.id,
        title: event.title,
        startDate: event.startDate,
        endDate: event.endDate,
        description: event.description,
        link: event.link
      })
  }).then ( function(response){
  
      showPage("/events/"+event.id)
    
  }).catch (function(error){
    errorDiv.innerHTML = ""
    const p = document.createElement("p")
    p.innerText=error
    errorDiv.appendChild(p)
  })
}

function loadEventApplicationsPage(){

}