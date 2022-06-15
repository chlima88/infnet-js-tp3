
function algorithm4(){


    function renderComponent({question, titleText, descriptionText}) {
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
    
    function createInput({ name, type, labelText }) {
        const input = document.createElement("input")
        input.type = type || "text"
        input.name = name
        input.id = name
        input.required = true
    
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
    
    function createButton({name, text}) {
        const button = document.createElement("button")
            button.style.width = "100%"
            button.style.marginBottom = "10px"
            button.type = "submit"
            button.name = name
            button.innerText = text
    
        return button
    }
    
    function createForm({id, inputsList, buttonsList, eventHandler}) {

        const status = document.createElement("p")
        status.id = `${id}-status-message`
        status.style.wordBreak = "break-all";
                
        const form = document.createElement("form")
        form.append(...inputsList ?? [], ...buttonsList ?? [], status)
        form.addEventListener("submit", eventHandler)
        form.id = id
        
        return form
    
    }

    function handleSubmit(event) {
        event.preventDefault();

        const statusMessage = document.getElementById("q4-form-status-message")

        const size = event.target.q4Size.valueAsNumber
        const min_number = event.target.q4MinValue.valueAsNumber
        const max_number = event.target.q4MaxValue.valueAsNumber

        const numbersList = getNumbers(size, min_number, max_number)

        statusMessage.innerText = `Answer: ${numbersList}`

    }

    function getNumbers(size, min_number, max_number) {
        if (max_number - min_number + 1 < size) {
            statusMessage.innerText = "Dados invalidos: quantidade > max - min"
            return
        }

        const numbersList = new Set();
        while(numbersList.size < size ) {
            numbersList.add(Math.floor(Math.random() * (max_number + 1 - min_number) + min_number))
        }

        return [...numbersList].sort((a, b) => a - b)
    }



    const answerDiv = renderComponent({
        question: "q4",
        titleText: "Algorithm 4",
        descriptionText: "Criar um componente que possua um botão calcular que quando acionado deve criar um array com quantidade de números aleatórios não repetidos e ordená-los."
    })
    
    const sizeInput = createInput({
        name: "q4Size",
        type: "number",
        labelText: "Qtd. de números"
    })

    const minValueInput = createInput({
        name: "q4MinValue",
        type: "number",
        labelText: "Valor mínimo"
    })

    const maxValueInput = createInput({
        name: "q4MaxValue",
        type: "number",
        labelText: "Valor Máximo"
    })

    const button = createButton({
        name: "q4-button",
        text: "Enviar"
    })

    const form = createForm({
        id: "q4-form",
        inputsList: [sizeInput, minValueInput, maxValueInput],
        buttonsList: [button],
        eventHandler: handleSubmit
    })

    answerDiv.appendChild(form) 

}

algorithm4()