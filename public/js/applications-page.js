async function loadApplicationsPage() {
  const token = JSON.parse(window.localStorage.getItem("token"))
  if (!token){
    showPage("/entry/login")
  }else{
  const response = await fetch('http://localhost:3000/api/applications',{
    headers: {"Content-Type": "application/json",
              "Authorization": "Bearer "+token
              }
  })
  .then (function(response){
    return response.json()

      .then(function(applications){
        const bodyDiv = document.querySelector('.container#entry-page')
        bodyDiv.innerHTML = ""
        const title = document.createElement("h3")
        title.innerText = " Applications"
        bodyDiv.appendChild(title)

        const table = document.createElement('table')
        bodyDiv.appendChild(table)

        const thead = document.createElement('thead')
        table.appendChild(thead)

        const trh = document.createElement('tr')
        thead.appendChild(trh)

        const tdh1 = document.createElement('td')
        tdh1.innerText = "Event title"
        trh.appendChild(tdh1)

        const tdh2 = document.createElement('td')
        tdh2.innerText = "Start date"
        trh.appendChild(tdh2)

        const tdh3 = document.createElement('td')
        tdh3.innerText = "End date"
        trh.appendChild(tdh3)


        const tbody = document.createElement('tbody')
        table.appendChild(tbody)



        for (const application of applications){

          const tr = document.createElement('tr')
          tbody.appendChild(tr)

          const td1 = document.createElement('td')
          td1.innerText = application.title
          tr.appendChild(td1)

          const td2 = document.createElement('td')
          td2.innerText = application.startDate
          tr.appendChild(td2)

          const td3 = document.createElement('td')
          td3.innerText = application.endDate
          tr.appendChild(td3)

          const td4 = document.createElement("td")
          tr.appendChild(td4)

          const subTr1 = document.createElement("tr")
          td4.appendChild(subTr1)

          const subTd1 = document.createElement('td')
          subTr1.appendChild(subTd1)
          
          const eventAnchor = document.createElement('a')
          eventAnchor.innerText = "See Event"
          const url = "/events/"+application.eventId
          handleAnchorOnClick(eventAnchor,url)
          subTd1.appendChild(eventAnchor)

          if(isOrganizationLoggedin()){
            const subTd2 = document.createElement('td')
            subTr1.appendChild(subTd2) 
  
            const appAnchor = document.createElement('a')
            appAnchor.innerText = "See applications"
            const appUrl = "/applications/"+application.eventId
            handleAnchorOnClick(appAnchor,appUrl)
            subTd2.appendChild(appAnchor)
  
            const subTr2 = document.createElement("tr")
            td4.appendChild(subTr2)
  
            const subTd3 = document.createElement('td')
            subTr2.appendChild(subTd3)
  
            const UpdateEventAnchor = document.createElement('a')
            UpdateEventAnchor.innerText = "Update Event"
            const UpdateEventUrl = "/events/update/"+application.eventId
            handleAnchorOnClick(UpdateEventAnchor,UpdateEventUrl)
            subTd3.appendChild(UpdateEventAnchor)
  
            const subTd4 = document.createElement('td')
            subTr2.appendChild(subTd4)        
  
            const deleteEventAnchor = document.createElement('a')
            deleteEventAnchor.innerText = "Delete Event"
            const deleteEventUrl = "/events/delete/"+application.eventId
            handleAnchorOnClick(deleteEventAnchor,deleteEventUrl)
            subTd4.appendChild(deleteEventAnchor)

          }
        }
      })
      
    }).catch (function(error){
      const bodyDiv = document.querySelector('.container#entry-page')
      const p = document.createElement("p")
      p.innerText=error
      bodyDiv.appendChild(p)
    })
  }   
}