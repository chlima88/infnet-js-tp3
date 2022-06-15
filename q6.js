function algorithm6() {

    function authenticateUser({login, password}) {

        const userRepository = UsersRepository.getInstance()

        const userFound = userRepository.findByLogin(login)    
    
        if (userFound.password != password) {
            throw new Error ("Invalid Credentials")
        }

        
        const session = createSession(login)
        return session

    }

    function createSession(login) {
        const sessionsRepository = SessionsRepository.getInstance()
        const session = sessionsRepository.create(login)
        
        localStorage.setItem("q6Session", JSON.stringify(session))
        
        return session
    }

    function isActiveSession({login, token}) {
        const sessionsRepository = SessionsRepository.getInstance()
        const activeSession = sessionsRepository.get(login)
        
        return activeSession.token === token
            ? true 
            : false
    }

    function destroySession() {
        const session = JSON.parse(localStorage.getItem("q6Session"))
        const sessionsRepository = SessionsRepository.getInstance()
        sessionsRepository.delete(session.login)
        
        localStorage.removeItem("q6Session")

        return
    }

    /* Action Handlers */

    function handleSubmit(event) {
        event.preventDefault();

        console.log(event)

        const handlersList = {
            "login": handleLogin,
            "create": handleCreateUser,
            "logout": handleLogout
        }

        let operation = event.submitter.name

        let credentials = {
            login: event.target.userLogin.value,
            password: event.target.userPassword.value
        }

        if ( handlersList.hasOwnProperty(operation) ) {
            handlersList[operation](credentials)
        } else { 
            throw Error("Invalid Operation")
        }

        event.target.reset()

    }

    function handleLogin({login, password}) {

        const statusMessage = document.getElementById("q6-status-message")
        const loginComponent = document.getElementById("q6-active-component")
        
        // const loginComponentDOM = loginComponent.shadowRoot
        // loginComponentDOM.appendChild(statusMessage)

        try {
            authenticateUser({login, password})    
            
            // const homeComponent = document.createElement("home-component")
            const homeComponent = HomeComponent()
            homeComponent.id = "q6-active-component"

            loginComponent.parentNode.replaceChild(homeComponent, loginComponent)

        } catch (error) {
            statusMessage.innerText = error
            statusMessage.scrollIntoView({ behavior: "smooth" })
        }

    }

    function handleCreateUser({login, password}) {

        const userRepository = UsersRepository.getInstance()
        const statusMessageText = document.getElementById("q6-status-message")

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
        destroySession()

        const homeComponent = document.getElementById("q6-active-component")
        const loginComponent = LoginComponent()
        loginComponent.id = "q6-active-component"
        homeComponent.parentNode.replaceChild(loginComponent, homeComponent)
    }



    /* Utility Functions */

    class Utility {

        static createInput({ name, type, labelText }) {
            let input = document.createElement("input")
            input.type = type || "text"
            input.name = name
            input.id = name
            input.required = true
            // input.style.width = "14rem"
        
            let label = document.createElement("label")
            label.innerText = labelText
            label.htmlFor = input.name
        
            let divInput = document.createElement("div")
            divInput.append(label, input)
            divInput.style.display = "flex"
            divInput.style.justifyContent = "space-between"
            divInput.style.alignItems = "center"
            divInput.style.marginBottom = "19px"
            divInput.style.width = "100%"
        
            return divInput
        }
        
        static createButton({name, text}) {
            let button = document.createElement("button")
                button.style.width = "100%"
                button.style.marginBottom = "10px"
                button.type = "submit"
                button.name = name
                button.innerText = text
        
            return button
        }
        
        static createForm({id, inputsList, buttonsList, eventHandler}) {
            const status = document.createElement("p")
            status.id = `${id}-status-message`
            status.style.wordBreak = "break-all";
                    
            let form = document.createElement("form")
            form.append(...inputsList ?? [], ...buttonsList ?? [], status)
            form.addEventListener("submit", eventHandler)
            form.id = id
            
            return form
        
        }
        

    }

    // Repositories

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

        findAll() {
            return this.#users
        }
    }

    class SessionsRepository {
        #sessions
        
        constructor() {
            
            const sessionsDB = JSON.parse(localStorage.getItem("q6sessionsDB"))

            if (sessionsDB) {
                this.#sessions = sessionsDB
            } else {
                this.#sessions = []
            }
        }
        
        static #INSTANCE

        static getInstance() {
            if (!SessionsRepository.#INSTANCE) SessionsRepository.#INSTANCE = new SessionsRepository();
            return SessionsRepository.#INSTANCE
        }

        create(login) {
            const sessionExists = this.#sessions.find(
                (session) => session.login === login
            )

            if (sessionExists) {
                return sessionExists
            } 

            // Inseguro
            const token = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);

            this.#sessions.push({login, token})
            localStorage.setItem("q6sessionsDB", JSON.stringify(this.#sessions))

            return {login, token}
        }

        get(login) {
            const sessionFound = this.#sessions.find(
                (session) => session.login === login
            ) ?? {}

            return sessionFound
        }

        delete(login) {
            console.log(this.#sessions)
            this.#sessions = this.#sessions.filter( session => session.login != login)

            localStorage.setItem("q6sessionsDB", JSON.stringify(this.#sessions))
        }
    }

    /* Components */

    function LoginComponent() {
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
        const createUserButton = Utility.createButton({name: "create", text: "Sign Up"})
        
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

    function HomeComponent() {

        let user = JSON.parse(localStorage.getItem("q6Session"))

        let logoutButton = Utility.createButton({name: "logout", text: "Logout"})

        let loginMessage = document.createElement("p")
        loginMessage.id = "q6-home-message"
        loginMessage.innerText = `Welcome ${user.login}! 😀`

        let homeComponent = Utility.createForm({
            id: "q6-home-form",
            inputsList: [],
            buttonsList: [logoutButton],
            eventHandler: handleLogout
        })

        logoutButton.before(loginMessage)
        
        return homeComponent
    }

    function renderComponent({question, titleText, descriptionText}) {
        let html = document.querySelector("html")
        html.style.fontSize = "62.5%"

        let body = document.querySelector("body")
        body.style.fontSize = "1.6rem"
        body.style.fontFamily = "sans-serif"

        let title = document.createElement("h1")
        title.innerText = titleText
        title.style.fontSize = "2rem"

        let description = document.createElement("p")
        description.innerText = descriptionText || titleText

        let answer = document.createElement("div")
        answer.setAttribute("id", `${question}-answer`)
        answer.style.width = "340px"
        answer.style.display = "flex"
        answer.style.flexDirection = "column"
        answer.style.wordBreak = "break-all"

        let divq = document.getElementById(question)
        divq.append(title, description, answer)

        divq.style.marginTop = "2rem"
        divq.style.display = "flex"
        divq.style.flexDirection = "column"
        divq.style.marginLeft = "1.6rem"

        return answer
    }

    const answerDiv = renderComponent({
        question: "q6",
        titleText: "Algorithm 6",
        descriptionText: "Criar um componente para criação de usuário e login em aplicação(sign up/ sign in)."
    })

    // Main code

    const session = JSON.parse(localStorage.getItem("q6Session"))
    if (session) var activeSession = isActiveSession(session)

    let activeComponent
    if (activeSession){
        activeComponent = HomeComponent()
    } else {
        activeComponent = LoginComponent()
        localStorage.removeItem("q6Session")
    }

    activeComponent.id = "q6-active-component"
    answerDiv.appendChild(activeComponent)

}

algorithm6();
