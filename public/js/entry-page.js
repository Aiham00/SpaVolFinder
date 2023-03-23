function loadEntry() {
    const bodyDiv = document.querySelector('.container#entry-page')
    bodyDiv.innerHTML = ""
    const loginCardDiv = document.createElement("div")

    const divHeader = document.createElement("h3")
    divHeader.innerText = "VolFinder"
    loginCardDiv.appendChild(divHeader)

    const leadDiv = document.createElement("div")
    leadDiv.innerText = "A way for obtaining a good connection between organisations and volunteers"
    loginCardDiv.appendChild(leadDiv)

    const anchorLogin = document.createElement("a")
    anchorLogin.innerText = "Login"
    handleAnchorOnClick(anchorLogin, "/entry/login")
    loginCardDiv.appendChild(anchorLogin)

    const p = document.createElement("p")
    p.innerText = "Or"
    loginCardDiv.appendChild(p)

    const signUpanchor = document.createElement("a")
    signUpanchor.innerText = "Sign Up!"
    signUpanchor.classList.add("dropdown-trigger")
    signUpanchor.setAttribute("data-target", 'dropdown1')
    loginCardDiv.appendChild(signUpanchor)

    const dropdownList = document.createElement("ul")
    dropdownList.classList.add("dropdown-content")
    dropdownList.setAttribute("id", "dropdown1")

    const volunteerSignupLi = document.createElement("li")
    const volunteerSignupAnchor = document.createElement("a")
    volunteerSignupAnchor.innerText = "Volunteer"
    handleAnchorOnClick(volunteerSignupAnchor, "/entry/volunteer-sign-up")
    volunteerSignupLi.appendChild(volunteerSignupAnchor)

    const organizationSignupLi = document.createElement("li")
    const organizationSignupAnchor = document.createElement("a")
    organizationSignupAnchor.innerText = "Organization"
    handleAnchorOnClick(organizationSignupAnchor, "/entry/organizer-sign-up")
    organizationSignupLi.appendChild(organizationSignupAnchor)

    dropdownList.appendChild(volunteerSignupLi)
    dropdownList.appendChild(organizationSignupLi)
    loginCardDiv.appendChild(dropdownList)
    bodyDiv.appendChild(loginCardDiv)

    M.Dropdown.init(signUpanchor);
}


function creatInlineInputDiv(id, name, type, labelText) {
    const div = document.createElement("div")
    div.classList.add("input-field")
    div.classList.add("inline")

    const input = document.createElement("input")
    input.id = id
    input.type = type
    input.classList.add("validate")
    input.name = name
    div.appendChild(input)

    const label = document.createElement("label")
    label.setAttribute("for", id)
    label.innerText = labelText
    div.appendChild(label)

    const span = document.createElement("span")
    span.classList.add("helper-text-" + id)
    span.setAttribute("data-error", "wrong")
    span.setAttribute("data-success", "right")
    span.id = "helper-text"
    div.appendChild(span)

    return div
}


function loadSignupVolunteerPage() {
    const bodyDiv = document.querySelector('.container#entry-page')
    bodyDiv.innerHTML = ""
    const errorDiv = document.createElement("div")
    errorDiv.id = "error-div"
    bodyDiv.appendChild(errorDiv)

    const pageTitle = document.createElement("h3")
    pageTitle.innerText = "Join Us"
    bodyDiv.appendChild(pageTitle)

    const div = document.createElement("div")
    bodyDiv.appendChild(div)

    const inlineDivFirstName = creatInlineInputDiv("first-name", "firstName", "text", "First Name")
    div.appendChild(inlineDivFirstName)

    const inlineDivLastName = creatInlineInputDiv("last-name", "lastName", "text", "Last Name")
    div.appendChild(inlineDivLastName)

    const inlineDivMobile = creatInlineInputDiv("mobile_number", "mobileNumber", "text", "Mobile")
    div.appendChild(inlineDivMobile)

    const inlineDivEmail = creatInlineInputDiv("email", "email", "email", "Email")
    div.appendChild(inlineDivEmail)

    const inlineDivPassword = creatInlineInputDiv("password", "password", "password", "Password")
    div.appendChild(inlineDivPassword)

    const inlineDivPasswordRepeat = creatInlineInputDiv("password-repeat", "password-repea", "password", "Password(repeat)")
    div.appendChild(inlineDivPasswordRepeat)

    const button = document.createElement("button")
    button.innerText = "Submit"
    div.appendChild(button)
    button.addEventListener('click', function (e) {
        e.preventDefault()

        const volunteer = {
            firstName: inlineDivFirstName.firstChild.value,
            lastName: inlineDivLastName.firstChild.value,
            mobileNumber: inlineDivMobile.firstChild.value,
            email: inlineDivEmail.firstChild.value,
            password: inlineDivPassword.firstChild.value,
            passwordRepeat: inlineDivPasswordRepeat.firstChild.value
        }

        const firstNameError = document.querySelector('.helper-text-first-name')
        const lastNameError = document.querySelector('.helper-text-last-name')
        const emailError = document.querySelector('.helper-text-email')
        const mobileError = document.querySelector('.helper-text-mobile_number')
        const passwordError = document.querySelector('.helper-text-password')
        const repeatPasswordError = document.querySelector('.helper-text-password-repeat')

        firstNameError.innerHTML = " "
        lastNameError.innerHTML = " "
        emailError.innerHTML = " "
        mobileError.innerHTML = " "
        passwordError.innerHTML = " "
        repeatPasswordError.innerHTML = " "

        const isValidForm = function () {
            let isvalid = true

            if (volunteer.firstName.length == 0) {
                firstNameError.innerHTML = "required"
                isvalid = false
            }

            if (volunteer.lastName.length == 0) {
                lastNameError.innerHTML = "required"
                isvalid = false
            }

            if (!volunteer.email.includes('@')) {
                emailError.innerHTML = "Enter a valid email"
                isvalid = false
            }

            if (volunteer.mobileNumber.length < 10) {
                mobileError.innerHTML = "Not a valid moblie number"
                isvalid = false
            }

            if (volunteer.password.length < 8) {
                passwordError.innerHTML = "Too short password, try again"
                isvalid = false
            }

            if (volunteer.password != volunteer.passwordRepeat) {
                repeatPasswordError.innerHTML = "Does not match"
                isvalid = false
            }

            return isvalid
        }

        if (isValidForm())
            signupVolunteer(volunteer)
    })
}


function loadSignupOrganizationPage() {
    const bodyDiv = document.querySelector('.container#entry-page')
    bodyDiv.innerHTML = ""
    const errorDiv = document.createElement("div")
    errorDiv.id = "error-div"
    bodyDiv.appendChild(errorDiv)

    const pageTitle = document.createElement("h3")
    pageTitle.innerText = "Join Us"
    bodyDiv.appendChild(pageTitle)

    const div = document.createElement("div")
    bodyDiv.appendChild(div)

    const inlineDivOrganizationName = creatInlineInputDiv("organisation_name", "orgName", "text", "Org Name")
    div.appendChild(inlineDivOrganizationName)

    const inlineDivMobile = creatInlineInputDiv("mobile_number", "mobile", "text", "Mobile")
    div.appendChild(inlineDivMobile)

    const inlineDivEmail = creatInlineInputDiv("email", "email", "email", "Email")
    div.appendChild(inlineDivEmail)

    const inlineDivPassword = creatInlineInputDiv("password", "password", "password", "Password")
    div.appendChild(inlineDivPassword)

    const inlineDivPasswordRepeat = creatInlineInputDiv("password-repeat", "password-repea", "password", "Password(repeat)")
    div.appendChild(inlineDivPasswordRepeat)

    const inlineDivAbout = document.createElement("div")
    inlineDivAbout.classList.add("input-field")
    inlineDivAbout.classList.add("col")

    const textareaAbout = document.createElement("textarea")
    textareaAbout.id = "aboutOrganisation"
    textareaAbout.classList.add("materialize-textarea")
    textareaAbout.name = "aboutOrganisation"
    inlineDivAbout.appendChild(textareaAbout)

    const label = document.createElement("label")
    label.setAttribute("for", "aboutOrganisation")
    label.innerText = "Write something about the organisation... (Optional)"
    textareaAbout.appendChild(label)
    div.appendChild(inlineDivAbout)

    const button = document.createElement("button")
    button.innerText = "Submit"
    div.appendChild(button)
    button.addEventListener('click', function (e) {
        e.preventDefault()

        const org = {
            organisationName: inlineDivOrganizationName.firstChild.value,
            mobileNumber: inlineDivMobile.firstChild.value,
            email: inlineDivEmail.firstChild.value,
            password: inlineDivPassword.firstChild.value,
            passwordRepeat: inlineDivPasswordRepeat.firstChild.value,
            aboutOrganisation: textareaAbout.value

        }
        const organisationNameError = document.querySelector('.helper-text-organisation_name')
        const emailError = document.querySelector('.helper-text-email')
        const mobileError = document.querySelector('.helper-text-mobile_number')
        const passwordError = document.querySelector('.helper-text-password')
        const repeatPasswordError = document.querySelector('.helper-text-password-repeat')

        organisationNameError.innerHTML = ""
        emailError.innerHTML = ""
        mobileError.innerHTML = ""
        passwordError.innerHTML = ""
        repeatPasswordError.innerHTML = ""

        const isValidOrgForm = function () {
            let isvalid = true

            if (org.organisationName.length == 0) {
                organisationNameError.innerHTML = "required"
                isvalid = false
            }

            if (!org.email.includes('@')) {
                emailError.innerHTML = "Enter a valid email"
                isvalid = false
            }

            if (org.mobileNumber.length < 10) {
                mobileError.innerHTML = "Not a valid moblie number"
                isvalid = false
            }

            if (org.password.length < 8) {
                passwordError.innerHTML = "Too short password, try again"
                isvalid = false
            }

            if (org.password != org.passwordRepeat) {
                repeatPasswordError.innerHTML = "Does not match"
                isvalid = false
            }

            return isvalid
        }
        if (isValidOrgForm())
            signupOrganization(org)
    })
}

async function loadAccountInfoPage(id) {
    const bodyDiv = document.querySelector('.container#entry-page')
    bodyDiv.innerHTML = ""
    const errorDiv = document.createElement("div")
    errorDiv.id = "error-div"
    bodyDiv.appendChild(errorDiv)

    const response = await fetch('http://localhost:3000/api/entry/' + id)
        .then(async function (response) {
            return response.json()
                .then(function (result) {
                    if (response.status != 200) {
                        throw result

                    } else {
                        const div = document.createElement("div")
                        bodyDiv.appendChild(div)

                        const h3 = document.createElement("h3")
                        h3.innerText = "Account Information"
                        div.appendChild(h3)

                        const table = document.createElement("table")
                        div.appendChild(table)

                        const tbody = document.createElement("tbody")
                        table.appendChild(tbody)

                        const tr1 = document.createElement("tr")
                        tbody.appendChild(tr1)

                        if (result.name) {
                            const td11 = document.createElement("td")
                            td11.innerText = "Name"
                            tr1.appendChild(td11)

                            const td12 = document.createElement("td")
                            td12.innerText = result.name
                            tr1.appendChild(td12)

                        } else {
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
                        }
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

                        if (result.about) {
                            const tr5 = document.createElement("tr")
                            tbody.appendChild(tr5)

                            const td51 = document.createElement("td")
                            td51.innerText = "About"
                            tr5.appendChild(td51)

                            const td52 = document.createElement("td")
                            td52.innerText = result.about
                            tr5.appendChild(td52)
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


async function signupVolunteer(volunteer) {
    const response = await fetch("http://localhost:3000/api/entry/volunteers-accounts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            {
                firstName: volunteer.firstName,
                lastName: volunteer.lastName,
                mobileNumber: volunteer.mobileNumber,
                email: volunteer.email,
                password: volunteer.password,
                passwordRepeat: volunteer.passwordRepeat
            })
    }).then(async function (response) {
        return response.json()
            .then(function (result) {
                if (response.status != 201) {
                    throw result

                } else {
                showPage("/entry/login")
                }
            }).catch(function (error) {
                const errorDiv = document.querySelector('#error-div')
                errorDiv.innerHTML = ""
                const p = document.createElement("p")
                p.innerText = error
                errorDiv.appendChild(p)
            })
    })
}


async function signupOrganization(org) {
    const response = await fetch("http://localhost:3000/api/entry/organizers-accounts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            {
                organisationName: org.organisationName,
                mobileNumber: org.mobileNumber,
                email: org.email,
                password: org.password,
                repeatPassword: org.passwordRepeat,
                aboutOrganisation: org.aboutOrganisation
            })
    }).then(async function (response) {
        return response.json()
            .then(function (result) {

                if (response.status != 201) {
                    throw result

                } else {
                showPage("/entry/login")
                }
            }).catch(function (error) {
                const errorDiv = document.querySelector('#error-div')
                errorDiv.innerHTML = ""
                const p = document.createElement("p")
                p.innerText = error
                errorDiv.appendChild(p)
            })
    })
}


async function loadLogoutPage() {
    const bodyDiv = document.querySelector('.container#entry-page')
    bodyDiv.innerHTML = ""
    const errorDiv = document.createElement("div")
    errorDiv.id = "error-div"
    bodyDiv.appendChild(errorDiv)

    const title = document.createElement("h3")
    title.innerText = "Logout"
    bodyDiv.appendChild(title)
    const p = document.createElement("p")
    p.innerText = "Are you sure you want to logout"
    bodyDiv.appendChild(p)

    const noAnchor = document.createElement("a")
    noAnchor.innerText = "No, go to home page!"
    noAnchor.setAttribute("href", "/")
    bodyDiv.appendChild(noAnchor)
    handleAnchorOnClick(noAnchor, "/")

    const yesAnchor = document.createElement("a")
    yesAnchor.innerText = "Yes,Logout"
    yesAnchor.setAttribute("href", "/")
    bodyDiv.appendChild(yesAnchor)

    yesAnchor.addEventListener('click', function (e) {
        e.preventDefault()
        window.localStorage.removeItem("token")
        hideCurrentPage()
        showPage("/")
    })
}


async function loadLoginPage() {
    const bodyDiv = document.querySelector('.container#entry-page')
    bodyDiv.innerHTML = ""
    const errorDiv = document.createElement("div")
    errorDiv.id = "error-div"
    bodyDiv.appendChild(errorDiv)

    const title = document.createElement("h3")
    title.innerText = "Login"
    bodyDiv.appendChild(title)

    const emailInputDiv = creatInlineInputDiv("email", "email", "email", "Email")
    bodyDiv.appendChild(emailInputDiv)
    const passwordInputDiv = creatInlineInputDiv("password", "password", "password", "Password")
    bodyDiv.appendChild(passwordInputDiv)

    const button = document.createElement("button")
    button.innerText = "Submit"
    bodyDiv.appendChild(button)
    button.addEventListener('click', function (e) {
        e.preventDefault()
        const email = emailInputDiv.firstChild.value
        const password = passwordInputDiv.firstChild.value

        const emailError = document.querySelector('.helper-text-email')
        const passwordError = document.querySelector('.helper-text-password')

        emailError.innerHTML = ""
        passwordError.innerHTML = ""

        if (!email.includes('@')) {
            emailError.innerHTML = "Not Valid Email"
        }

        if (password.length < 6) {
            passwordError.innerHTML = "Not Valid Password"

        } else {
            login(email, password)
        }
    })
}

async function login(email, password) {

    const response = await fetch("http://localhost:3000/api/entry", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            {
                grant_type: "password",
                username: email,
                password
            })
    }).then(async function (response) {
        return response.json()
            .then(function (result) {

                if (response.status != 200) {
                    throw result

                } else {
                window.localStorage.setItem("token", JSON.stringify(result.access_token))
                showPage("/")
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

