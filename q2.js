function algorithm2() {
    
    function handleSubmit(event) {

        event.preventDefault();

        const num = event.target.q2_Value.value
        let { result, time } = getPerformance(calculateFactorial, num);

        const statusMessage = document.getElementById("q2-form-status-message")

        statusMessage.innerText = `Answer: ${num}! = ${result} (${time}ms)`
    }
    
    function getPerformance(callback, num) {
        let startTime = performance.now();
        let result = callback(num);

        let endTime = performance.now();
        let time = Math.round(endTime - startTime);
        return { result, time };
    }

    function calculateFactorial(num) {
        let factorial = 1;

        for (let multiplier = num; multiplier >= 1; multiplier--) {
            factorial = multiplier * factorial;
        }
        return factorial;
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
        form.append(...inputsList ?? [], ...buttonsList ?? [], status)
        form.addEventListener("submit", eventHandler)
        form.id = id
        
        return form
    
    }



    const answerDiv = renderComponent({
        question: "q2",
        titleText: "Algorithm 2",
        descriptionText: "Calcular o fatorial do numero informado e o tempo utilizao no calculo"
    })

    const valueInput = createInput({
        name: "q2_Value",
        type: "number",
        labelText: "Calcular o fatorial de:"
    })

    const calculateButton = createButton({
        name: "q2_calculateButton",
        text: "Calculate"
    })

    const form = createForm({
        id: "q2-form",
        inputsList: [valueInput],
        buttonsList: [calculateButton],
        eventHandler: handleSubmit
    })


    answerDiv.appendChild(form)  


}

algorithm2()