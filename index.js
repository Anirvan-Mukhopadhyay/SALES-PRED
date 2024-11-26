let chart; // Declare the chart globally

// Sample data for the stock prediction graph
const labels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
const initialData = [150, 160, 158, 170, 180, 190, 200];

// Function to generate random up-and-down variation
function generateDynamicData(baseData) {
    return baseData.map(value => value + (Math.random() * 10 - 5)); // Add random variation (-5 to +5)
}

// Initialize the chart
function initializeChart() {
    const ctx = document.getElementById('stockPredictionGraph').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Dynamic Stock Prediction',
                data: initialData, // Initial data
                fill: false,
                borderColor: 'yellow',
                tension: 0.4,
                borderWidth: 2,
                pointBackgroundColor: 'red',
                pointRadius: 5,
                pointHoverRadius: 7,
                pointHoverBackgroundColor: 'yellow',
                pointHitRadius: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 2000, // Animation duration for smooth transitions
                easing: 'easeInOutQuad',
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { color: 'white' },
                    grid: { color: '#444' }
                },
                x: {
                    ticks: { color: 'white' },
                    grid: { color: '#444' }
                }
            },
            plugins: {
                legend: {
                    labels: { color: 'white' }
                }
            }
        }
    });

    // Start the dynamic animation
    startDynamicAnimation();
}

// Function to update the chart data at regular intervals
function startDynamicAnimation() {
    setInterval(() => {
        const newData = generateDynamicData(initialData);
        chart.data.datasets[0].data = newData; // Update the data
        chart.update(); // Refresh the chart
    }, 2000); // Update every 2 seconds
}

// Run a forecast for a specific model
// Run forecast using the selected model (e.g., from the dropdown)
function runForecast() {
    const model = document.getElementById('forecastModel') ? document.getElementById('forecastModel').value : 'Simple';

    // Show loading message
    document.getElementById('forecastResults').innerHTML = `<p>Running ${model} forecast... Please wait...</p>`;

    // Simulate delay to update the graph
    setTimeout(function() {
        const modelData = generateRandomForecastData(); // Generate random data for the forecast
        chart.data.datasets[0].data = modelData; // Update the chart with random forecast data
        chart.data.datasets[0].label = `${model} Stock Prediction`; // Update the chart label
        chart.update(); // Refresh the chart with new data

        // Show success message
        document.getElementById('forecastResults').innerHTML = `<p>${model} forecast completed successfully!</p>`;
    }, 3000); // Simulate a 3-second delay
}


// Function to generate ARIMA-like forecast data (simulation)
function generateARIMAForecast(baseData) {
    // ARIMA model: we'll simulate it by creating a forecast with slight incremental changes
    let forecastData = [...baseData];
    for (let i = 0; i < 5; i++) {
        const lastValue = forecastData[forecastData.length - 1];
        forecastData.push(lastValue + Math.random() * 5); // Adding random variation for forecast
    }
    return forecastData;
}

// Scroll to the section
function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    window.scrollTo({
        top: section.offsetTop - 60, // Offset to account for sticky header
        behavior: 'smooth'
    });
}

// Initialize the chart when the page loads
document.addEventListener('DOMContentLoaded', initializeChart);

// Function to update forecast based on the selected model
function updateForecast(model) {
    // Show loading message in the forecastResults div
    document.getElementById('forecastResults').innerHTML = `<p>Running ${model} forecast... Please wait...</p>`;

    // Simulate forecast computation with a delay
    setTimeout(function() {
        // Simulate different model data
        let forecastData;
        if (model === 'SARIMAX') {
            forecastData = generateRandomForecastData(); // Simulate SARIMAX forecast data
        } else if (model === 'ARIMA') {
            forecastData = generateRandomForecastData(); // Simulate ARIMA forecast data
        } else if (model === 'Prophet') {
            forecastData = generateRandomForecastData(); // Simulate Prophet forecast data
        }

        // Display forecast data as a list of predicted values
        let forecastString = `<ul>`;
        forecastData.forEach((value, index) => {
            forecastString += `<li>Day ${index + 1}: ${value.toFixed(2)}</li>`;
        });
        forecastString += `</ul>`;

        // Update forecastResults div with the generated forecast data
        document.getElementById('forecastResults').innerHTML = `
            <p>${model} forecast completed successfully!</p>
            <p>Predicted stock values:</p>
            ${forecastString}
        `;
    }, 3000); // Simulate 3 seconds of processing time
}

// Function to generate random forecast data (for simulation purposes)
function generateRandomForecastData() {
    // Generate 7 random predicted stock values (between 150 and 250)
    let randomData = [];
    for (let i = 0; i < 7; i++) {
        randomData.push(Math.random() * 100 + 150); // Random values between 150 and 250
    }
    return randomData;
}
