function algorithm6() {


    function getStatusMessageNode(nodeName) {
        
        const activeComponentDOM = document.getElementById("q6-active-component").shadowRoot

        if (!activeComponentDOM.getElementById(nodeName)) {
            var statusMessageNode = activeComponentDOM.createElement("p")
            statusMessageNode.id = nodeName
        } else {
            var statusMessageNode = activeComponentDOM.getElementById(nodeName)
        }
        
        return statusMessageNode

    }

    function authenticateUser({login, password}) {

        const usersRepository = UsersRepository.getInstance()

        const userFound = usersRepository.findByLogin(login)
        
        if (userFound.password != password) {
            throw new Error ("Invalid Credentials")
        }
        
        // Inseguro
        const token = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
        const session = {
            login,
            token
        }

        activeSessions.push(session)
        return session
    }

    function getActiveSession({login, token}) {

        const session = activeSessions.find( session => (
            session.login == login && session.token == token
        ))

        return session
    }

    /* Action Handlers */

    function handleSubmit(event) {
        event.preventDefault();

        const handlersList = {
            "login": handleLogin,
            "create": handleCreateUser,
            "logout": handleLogout
        }

        const operation = event.submitter.name

        let credentials = {
            login: event.target.userLogin.value,
            password: event.target.userPassword.value
        }

        if ( handlersList.hasOwnProperty(operation) ) {
            handlersList[operation](credentials)
        } else { 
            throw Error("Invalid Operation")
        }
        
    }

    function handleLogin({login, password}) {

        const statusMessage = getStatusMessageNode("q6-status-message")
        const loginComponent = document.getElementById("q6-active-component")

        try {
            const sessionToken = authenticateUser({login, password})
            localStorage.setItem("q6Session", JSON.stringify(sessionToken))    
            
            const homeComponent = document.createElement("home-component")
            homeComponent.id = "q6-active-component"
            
            loginComponent.parentNode.replaceChild(homeComponent, loginComponent)
            
        } catch (error) {
            statusMessage.innerText = error
            statusMessage.scrollIntoView({ behavior: "smooth" })
        }

    }

    function handleCreateUser({login, password}) {

        const userRepository = UsersRepository.getInstance()
        const statusMessageText = getStatusMessageNode("q6-status-message")

        try {
            userRepository.create({login, password})
            statusMessageText.innerText = "User successfuly created!"
        } catch(error) {
            console.log(error)
            statusMessageText.innerText = error
        }
        
        statusMessageText.scrollIntoView({ behavior: "smooth" })
    }

    function handleLogout(event) {
        event.preventDefault()

        localStorage.removeItem("q6Session")

        const homeComponent = document.getElementById("q6-active-component")

        const loginComponent = document.createElement("login-component")
        // const loginComponent = LoginComponentF()
        loginComponent.id = "q6-active-component"
        
        homeComponent.parentNode.replaceChild(loginComponent, homeComponent)
        
    }

    function buildDivQ({question, titleText, descriptionText}) {
        const html = document.querySelector("html")
        html.style.fontSize = "62.5%"

        const body = document.querySelector("body")
        body.style.fontSize = "1.6rem"
        body.style.fontFamily = "sans-serif"

        const title = document.createElement("h1")
        title.innerText = titleText
        title.style.fontSize = "2rem"

        const description = document.createElement("p")
        description.innerText = descriptionText || titleText

        const answer = document.createElement("div")
        answer.setAttribute("id", `${question}-answer`)
        answer.style.width = "340px"
        answer.style.display = "flex"
        answer.style.flexDirection = "column"
        answer.style.wordBreak = "break-all"

        const divq = document.getElementById(question)
        divq.append(title, description, answer)

        divq.style.marginTop = "2rem"
        divq.style.display = "flex"
        divq.style.flexDirection = "column"
        divq.style.marginLeft = "1.6rem"

        return answer
    }

    /* Utility Functions */

    class Utility {

        static createInput({ name, type, labelText }) {
            const input = document.createElement("input")
            input.type = type || "text"
            input.name = name
            input.id = name
            input.required = true
            // input.style.width = "14rem"
        
            const label = document.createElement("label")
            label.innerText = labelText
            label.htmlFor = input.name
        
            const divInput = document.createElement("div")
            divInput.append(label, input)
            divInput.style.display = "flex"
            divInput.style.justifyContent = "space-between"
            divInput.style.alignItems = "center"
            divInput.style.marginBottom = "19px"
            divInput.style.width = "100%"
        
            return divInput
        }
        
        static createButton({name, text}) {
            const button = document.createElement("button")
                button.style.width = "100%"
                button.style.marginBottom = "10px"
                button.type = "submit"
                button.name = name
                button.innerText = text
        
            return button
        }
        
        static createForm({id, inputsList, buttonsList, eventHandler}) {
                
            const form = document.createElement("form")
            form.append(...inputsList, ...buttonsList)
            form.addEventListener("submit", eventHandler)
            form.id = id
            
            return form
        
        }
        

    }

    class UsersRepository {
        #users
        
        constructor() {
            const usersDB = JSON.parse(localStorage.getItem("q6usersDB"))

            if (usersDB) {
                this.#users = usersDB
            } else {
                this.#users = [
                    { login: "admin", password: "123"}
                ]
            }
        }
        
        static #INSTANCE

        static getInstance() {
            if (!UsersRepository.#INSTANCE) UsersRepository.#INSTANCE = new UsersRepository();
            return UsersRepository.#INSTANCE
        }

        create({login, password}) {
            const loginExists = this.#users.find(
                (user) => user.login === login
            )

            if (loginExists) {
                throw new Error("User already exists")
            } else {
                this.#users.push({login, password})
                localStorage.setItem("q6usersDB", JSON.stringify(this.#users))
            }

        }

        findByLogin(login) {
            const loginFound = this.#users.find(
                (user) => user.login === login
            ) ?? {}
            
            return loginFound
        }

    }

    /* Components */

    class LoginComponent extends HTMLElement {
        constructor() {
            super()
            this.render()
        }

        render() {
            const shadow = this.attachShadow({ mode: "open"})
            const loginComponent = this.buildLoginComponent()
            shadow.appendChild(loginComponent)
        }

        buildLoginComponent() {
            const  userLoginInput = Utility.createInput({
                name: "userLogin", 
                type: "text",
                labelText: "Username"
            })
        
            const userPasswordInput = Utility.createInput({ 
                name: "userPassword", 
                type: "password",
                labelText: "Password"
            })
        
            const loginButton = Utility.createButton({name: "login", text: "Login"})
            const createUserButton = Utility.createButton({name: "create", text: "Create"})
            
            const inputsList = [userLoginInput, userPasswordInput]
            const buttonsList = [loginButton, createUserButton]
            
            const loginComponent = Utility.createForm({
                id: "q6-login-form",
                inputsList,
                buttonsList,
                eventHandler: handleSubmit
            })

            const status = document.createElement("p")
            status.id = "q6-status-message"

            loginComponent.appendChild(status)
        
            return loginComponent
        }
        
    }
    customElements.define("login-component", LoginComponent)

    class HomeComponent extends HTMLElement {
        constructor() {
            super()
            this.render()
        }

        render() {
            const shadow = this.attachShadow({ mode: "open"})
            const homeComponent = this.buildHomeComponent()
            shadow.appendChild(homeComponent)
        }

        buildHomeComponent() {

            const user = JSON.parse(localStorage.getItem("q6Session"))

            const logoutButton = Utility.createButton({name: "logout", text: "Logout"})
        
            const loginMessage = document.createElement("p")
            loginMessage.id = "q6-home-message"
            loginMessage.innerText = `Welcome ${user.login}!! 😀`
        
            const homeComponent = Utility.createForm({
                id: "q6-home-form",
                inputsList: [],
                buttonsList: [logoutButton],
                eventHandler: handleLogout
            })
        
            logoutButton.before(loginMessage)
            
            return homeComponent
        }
    }
    customElements.define("home-component", HomeComponent)




    const answerDiv = buildDivQ({
        question: "q6",
        titleText: "Algorithm 6",
        descriptionText: "Question 6 - "
    })
    
    const session = JSON.parse(localStorage.getItem("q6Session"))
    if (session) var activeSession = getActiveSession(session)
    
    let activeComponent
    if (activeSession){
        activeComponent = document.createElement("home-component")
    } else {
        activeComponent = document.createElement("login-component")
        localStorage.removeItem("q6Session")
    }

    activeComponent.id = "q6-active-component"
    answerDiv.appendChild(activeComponent)
}


algorithm6();