function fibonacci_chart() {
    // Funktion, um Daten vom Server zu holen
    fetch("/fib")
    .then(response => response.json())
    .then(response => console.log(response))
    .then(data => {
    // D3-Datenvisualisierung
    const svg = d3.select("#chart");

    // X- und Y-Achse
    const x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d[Object.keys(d)[0]].number)])
        .range([0, 800]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d[Object.keys(d)[0]].quotient)])
        .range([400, 0]);

    // Erstelle Kreise für jedes Fibonacci-Datenpaar
    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => x(d[Object.keys(d)[0]].number))
        .attr("cy", d => y(d[Object.keys(d)[0]].quotient))
        .attr("r", 5)
        .attr("fill", "steelblue");

    // Optional: Hinzufügen von Achsen
    svg.append("g")
        .attr("transform", "translate(0,400)")
        .call(d3.axisBottom(x));

    svg.append("g")
        .call(d3.axisLeft(y));
    })
    .catch(error => console.error('Error fetching data:', error));
}

fibonacci_chart();