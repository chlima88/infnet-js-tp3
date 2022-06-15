function algorithm3() {

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
        answer.style.width = "450px"
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

    function createClassroomTable({id, headerFields, tableData}) {

        const thead = document.createElement("thead")
        headerFields.map(value => {
            const th = document.createElement("th")
            th.innerText = value
            th.style.borderBottom = "1px solid #ddd"
            thead.appendChild(th)
        })

        const tbody = document.createElement("tbody")
        tableData.map(student => { 
            const tr = document.createElement("tr")

            const td1 = document.createElement("td")
            td1.innerText = `Nº ${student.nr}`
            tr.appendChild(td1)

            const td2 = document.createElement("td")
            td2.innerText = `${student.nota}`
            tr.appendChild(td2)
            
            const td3 = document.createElement("td")
            td3.innerText = student.nota >= 50 ? "aprovado" : "reprovado"
            tr.appendChild(td3)
            tr.style.borderBottom = "1px solid #ddd"
            
            tbody.appendChild(tr)
        })

        const table = document.createElement("table")
        table.id = id
        table.append(thead, tbody)
        table.style.marginTop = "8px"
        table.style.textAlign = "center"
        table.style.borderCollapse = "collapse"

        return table

    }

    function createReport(){

        const {studentList, numPassed, numFailed} = generateData()

        const headerFields = ["Aluno", "Nota", "Resultado"]

        const reportTable = createClassroomTable({
            id: "q3-table",
            headerFields,
            tableData: studentList
        })

        const report = document.createElement("div")
        report.setAttribute("id", "q3-report")
        report.style.display = "flex"
        report.style.flexDirection = "column"

        const reportHeader = document.createElement("h2")
        reportHeader.innerText = "RELATÓRIO DE CONCEITO DE TURMA"

        const reportSummary = document.createElement("p")

        reportSummary.innerText = `APROVADOS: ${numPassed} (${Math.round(numPassed/20 * 100)}%) | REPROVADOS: ${numFailed} (${Math.round(numFailed/20 * 100)}%)`

        report.appendChild(reportHeader)
        report.appendChild(reportTable)
        report.appendChild(reportSummary)

        return report

    }


    const answerDiv = renderComponent({
        question: "q3",
        titleText: "Algorithm 3",
        descriptionText: "Exibir um botão criar relatório que quando acionado deve imprimir um relatório de resultados da disciplina javascript para 20 alunos, no formato de tabela."
    })

    const calculateButton = createButton({
        name: "q3_reportButton",
        text: "Criar relatório"
    })

    const form = createForm({
        id: "q3-form",
        inputsList: [],
        buttonsList: [calculateButton],
        eventHandler: handleClick
    })


    answerDiv.appendChild(form)  


    function handleClick(event) {
        event.preventDefault()

        const report = createReport()

        const oldReport = document.getElementById("q3-report")

        if (oldReport) {
            oldReport.parentNode.replaceChild(report, oldReport)
        } else {
            document.getElementById("q3-answer").appendChild(report)
        }

    }

    function generateData() {
        let studentList = [];
        let numPassed = 0;
        let numFailed = 0;

        for (i = 1; i <=20; i++) {

            let nota = Math.floor(Math.random() * 100)

            if (nota >= 50 ) {
                numPassed++
            } else {
                numFailed++
            }

            studentList.push(new Student(i, nota))
        }

        return new Classroom(studentList, numPassed, numFailed);

    }

    class Student {
        constructor(nr, nota) {
            this.nr = nr;
            this.nota = nota;
        }
    }

    class Classroom {
        constructor(studentList, numPassed, numFailed) {
            this.studentList = studentList;
            this.numPassed = numPassed;
            this.numFailed = numFailed;
        }
    }
}

algorithm3()