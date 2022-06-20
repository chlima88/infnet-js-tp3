function algorithm1() {

    function findMutiples(minValue, maxValue) {
        const multiplesList = [];
        for (let value = minValue + 1; value < maxValue; value++) {
            if (value % 2 === 0 && value % 3 === 0) {
                multiplesList.push(value)
            }
        }
        return multiplesList.length
    }
    
    function handleSubmit(event) {
        event.preventDefault();

        const minValue = event.target.q1_minValue.valueAsNumber
        const maxValue = event.target.q1_maxValue.valueAsNumber

        const statusMessage = document.getElementById("q1-form-status-message")

        if (minValue > maxValue) {
            // statusMessage.innerText = "'Min value' must be smaller than 'Max value'"
            window.alert("'Valor mínimo' eve ser menor que 'Valor máximo'")
        } else {
            const numberList = findMutiples(minValue, maxValue);
            if (numberList === 0) {
                statusMessage.innerText = `Resposta: Nenhum multiplo encontrado.`
            } else {
                statusMessage.innerText = `Resposta: ${numberList} multiplos encontrados`
            }
        }

    }

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
        form.append(...inputsList, ...buttonsList, status)
        form.addEventListener("submit", eventHandler)
        form.id = id
        
        return form
    
    }



    const answerDiv = renderComponent({
        question: "q1",
        titleText: "Algorithm 1",
        descriptionText: "Contar e imprimir quantos números existem entre valor mínimo e valor máximo (exclusives*) que sejam múltiplos de 2 e 3 simultaneamente"
    })

    const minValueInput = createInput({
        name: "q1_minValue",
        type: "number",
        labelText: "Valor mínimo"
    })

    const maxValueInput = createInput({
        name: "q1_maxValue",
        type: "number",
        labelText: "Valor máximo"
    })

    const calculateButton = createButton({
        name: "q1_calculateButton",
        text: "Calculate"
    })

    const form = createForm({
        id: "q1-form",
        inputsList: [minValueInput, maxValueInput],
        buttonsList: [calculateButton],
        eventHandler: handleSubmit
    })

    answerDiv.appendChild(form)    
}


algorithm1()

