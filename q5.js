function algorithm5(){

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
        form.append(...inputsList || [], ...buttonsList ?? [] , status)
        form.addEventListener("submit", eventHandler)
        form.id = id
        
        return form

    }

    function checkTriangle(a, b, c) {
        let name 

        if (a === b && a === c) name = "Equilátero"
        else if (a === b || a === c || b == c) name = "Isósceles"
        else name = "Escaleno"

        return `O triangulo (${a} ${b} ${c}) é ${name}`
    }

    function handleSubmit(event) {
        event.preventDefault()

        let ladoA = event.target.q5LadoAInput.valueAsNumber
        let ladoB = event.target.q5LadoBInput.valueAsNumber
        let ladoC = event.target.q5LadoCInput.valueAsNumber

        let result = checkTriangle(ladoA, ladoB, ladoC)

        let statusMessage = document.getElementById("q5-form-status-message")
        statusMessage.innerText = `Answer: ${result}`

    }



    const answerDiv = renderComponent({
        question: "q5",
        titleText: "Algorithm 5",
        descriptionText: "Crie um componente que receba 3 números inteiros e informe que tipo de triângulo eles formam (equilátero, isósceles ou escaleno)."
    })
    
    const inputDiv1 = createInput({
        name: "q5LadoAInput",
        type: "number",
        labelText: "Lado A"})

    const inputDiv2 = createInput({
        name: "q5LadoBInput",
        type: "number",
        labelText: "Lado B"})

    const inputDiv3 = createInput({
        name: "q5LadoCInput",
        type: "number",
        labelText: "Lado C"})

    const button = createButton({
        name: "q5Button",
        text: "Enviar"
    })

    const form = createForm({
        id: "q5-form",
        inputsList:[inputDiv1, inputDiv2, inputDiv3],
        buttonsList: [button],
        eventHandler: handleSubmit
    })

    answerDiv.appendChild(form)
   
}

algorithm5()