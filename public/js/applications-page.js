async function loadApplicationsPage() {
	const token = JSON.parse(window.localStorage.getItem("token"))

	if (!token) {
		showPage("/entry/login")

	} else {
		const response = await fetch('http://localhost:3000/api/applications', {
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + token
			}

		}).then(async function (response) {
			return response.json()
				.then(function (result) {

					if (response.status != 200) {
						throw result

					} else {
						const bodyDiv = document.querySelector('.container#entry-page')
						bodyDiv.innerHTML = ""
						const errorDiv = document.createElement("div")
						errorDiv.id = "error-div"
						bodyDiv.appendChild(errorDiv)

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

						for (const application of result) {

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
							const url = "/events/" + application.eventId
							handleAnchorOnClick(eventAnchor, url)
							subTd1.appendChild(eventAnchor)

							if (isOrganizationLoggedin()) {
								const subTd2 = document.createElement('td')
								subTr1.appendChild(subTd2)

								const appAnchor = document.createElement('a')
								appAnchor.innerText = "See applications"
								const appUrl = "/applications/" + application.eventId
								handleAnchorOnClick(appAnchor, appUrl)
								subTd2.appendChild(appAnchor)

								const subTr2 = document.createElement("tr")
								td4.appendChild(subTr2)

								const subTd3 = document.createElement('td')
								subTr2.appendChild(subTd3)

								const UpdateEventAnchor = document.createElement('a')
								UpdateEventAnchor.innerText = "Update Event"
								const UpdateEventUrl = "/events/update/" + application.eventId
								handleAnchorOnClick(UpdateEventAnchor, UpdateEventUrl)
								subTd3.appendChild(UpdateEventAnchor)

								const subTd4 = document.createElement('td')
								subTr2.appendChild(subTd4)

								const deleteEventAnchor = document.createElement('a')
								deleteEventAnchor.innerText = "Delete Event"
								const deleteEventUrl = "/events/delete/" + application.eventId
								handleAnchorOnClick(deleteEventAnchor, deleteEventUrl)
								subTd4.appendChild(deleteEventAnchor)

							}
						}
					}
				})
		}).catch(function (error) {
			const errorDiv = document.querySelector('#error-div')
			errorDiv.innerHTML = ""
			const p = document.createElement("p")
			p.innerText = error
			errorDiv.appendChild(p)
		})
	}
}


async function loadCreateApplicationPage(id) {
	const token = JSON.parse(window.localStorage.getItem("token"))

	if (!token) {
		showPage("/entry/login")
	} else {
		const bodyDiv = document.querySelector('.container#entry-page')
		bodyDiv.innerHTML = ""
		const errorDiv = document.createElement("div")
		errorDiv.id = "error-div"
		bodyDiv.appendChild(errorDiv)

		const accountId = getLoggedinAccountId()
		const response = await fetch('http://localhost:3000/api/entry/' + accountId)
			.then(async function (response) {
				return response.json()
					.then(function (result) {

						if (response.status != 200) {
							throw result

						} else {
							const div = document.createElement("div")
							bodyDiv.appendChild(div)

							const table = document.createElement("table")
							div.appendChild(table)

							const tbody = document.createElement("tbody")
							table.appendChild(tbody)

							const tr1 = document.createElement("tr")
							tbody.appendChild(tr1)


							const td11 = document.createElement("td")
							td11.innerText = "First name"
							tr1.appendChild(td11)

							const td12 = document.createElement("td")
							td12.innerText = result.firstName
							tr1.appendChild(td12)

							const tr2 = document.createElement("tr")
							tbody.appendChild(tr2)

							const td21 = document.createElement("td")
							td21.innerText = "Last name"
							tr2.appendChild(td21)

							const td22 = document.createElement("td")
							td22.innerText = result.lastName
							tr2.appendChild(td22)

							const tr3 = document.createElement("tr")
							tbody.appendChild(tr3)

							const td31 = document.createElement("td")
							td31.innerText = "Phone number"
							tr3.appendChild(td31)

							const td32 = document.createElement("td")
							td32.innerText = result.phoneNumber
							tr3.appendChild(td32)

							const tr4 = document.createElement("tr")
							tbody.appendChild(tr4)

							const td41 = document.createElement("td")
							td41.innerText = "Email"
							tr4.appendChild(td41)

							const td42 = document.createElement("td")
							td42.innerText = result.email
							tr4.appendChild(td42)

							const divNote = document.createElement("div")
							divNote.classList.add("input-field")
							divNote.classList.add("col")

							const textareaNote = document.createElement("textarea")
							textareaNote.id = "note"
							textareaNote.placeholder = `
							Here you can type you availability during the whole event's time, 
							your suggsetions or any thoughts about the event.              
				`
							textareaNote.classList.add("materialize-textarea")
							textareaNote.name = "note"
							divNote.appendChild(textareaNote)

							const label = document.createElement("label")
							label.setAttribute("for", "note")
							label.innerText = "Note. (OPTIONAL)"
							divNote.appendChild(label)
							bodyDiv.appendChild(divNote)

							const button = document.createElement("button")
							button.innerText = "Apply"
							bodyDiv.appendChild(button)
							button.addEventListener('click', function (e) {
								e.preventDefault()

								const application = {
									accountId: result.accountId,
									eventId: id,
									note: textareaNote.value,
								}
								createApplication(application)
							})
						}
					})

			}).catch(function (error) {
				const errorDiv = document.querySelector('#error-div')
				errorDiv.innerHTML = ""
				const p = document.createElement("p")
				p.innerText = error
				errorDiv.appendChild(p)
			})
	}
}


async function createApplication(application) {
	const token = JSON.parse(window.localStorage.getItem("token"))
	const response = await fetch("http://localhost:3000/api/applications/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer " + token
		},
		body: JSON.stringify(
			{
				accountId: application.accountId,
				eventId: application.eventId,
				note: application.note

			})

	}).then(async function (response) {
		return response.json()
			.then(function (result) {

				if (response.status != 201) {
					throw result

				} else {
					showPage("/events/" + application.eventId)
				}
			})
	}).catch(function (error) {
		const errorDiv = document.querySelector('#error-div')
		errorDiv.innerHTML = ""
		const p = document.createElement("p")
		p.innerText = error
		errorDiv.appendChild(p)
	})

}


async function loadEventApplicationsPage(eventId) {
	const token = JSON.parse(window.localStorage.getItem("token"))

	if (!token) {
		showPage("/entry/login")
	} else {
		const response = await fetch('http://localhost:3000/api/applications/' + eventId, {
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + token
			}
		})
			.then(async function (response) {
				return response.json()
					.then(function (result) {
						if (response.status != 200) {
							throw result

						} else {
							const bodyDiv = document.querySelector('.container#entry-page')
							bodyDiv.innerHTML = ""
							const errorDiv = document.createElement("div")
							errorDiv.id = "error-div"
							bodyDiv.appendChild(errorDiv)

							const cardDiv = document.createElement("div")
							cardDiv.classList.add("card")
							bodyDiv.appendChild(cardDiv)

							const cardContent = document.createElement("div")
							cardContent.classList.add("card-content")
							cardDiv.appendChild(cardContent)

							const table = document.createElement('table')
							cardContent.appendChild(table)

							const tr = document.createElement('tr')
							table.appendChild(tr)

							const th = document.createElement('th')
							tr.appendChild(th)

							const AccountAnchor = document.createElement('a')
							AccountAnchor.innerText = result.firstName + result.lastName
							const url = "/entry/" + result.accountId
							handleAnchorOnClick(AccountAnchor, url)
							th.appendChild(AccountAnchor)

							const td = document.createElement('td')
							tr.appendChild(td)

							const spanMore = document.createElement("span")
							spanMore.classList.add("card-title")
							spanMore.classList.add("activator")
							spanMore.classList.add("grey-text")
							spanMore.classList.add("text-darken-4")
							td.appendChild(spanMore)

							const iMore = document.createElement("i")
							iMore.classList.add("material-icons")
							iMore.classList.add("right")
							iMore.innerText = "more_vert"
							spanMore.appendChild(iMore)

							const cardReveal = document.createElement("div")
							cardReveal.classList.add("card-content")
							cardReveal.classList.add("card-title")
							cardReveal.classList.add("grey-text")
							cardReveal.classList.add("text-darken-4")
							cardDiv.appendChild(cardReveal)

							const iLess = document.createElement("i")
							iLess.classList.add("material-icons")
							iLess.classList.add("right")
							iLess.innerText = "close"
							cardReveal.appendChild(iLess)

							const p = document.createElement("p")
							p.innerText = result.note
							cardReveal.appendChild(p)
						}
					})
			}).catch(function (error) {
				const errorDiv = document.querySelector('#error-div')
				errorDiv.innerHTML = ""
				const p = document.createElement("p")
				p.innerText = error
				errorDiv.appendChild(p)
			})
	}
}