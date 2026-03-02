// locations is now loaded from india-data.js

// Populate weather selects (Positive numbers only)
function populateRangeSelect(id, min, max, step = 1) {
    const select = document.getElementById(id);
    if (!select) return;
    for (let i = min; i <= max; i += step) {
        const opt = document.createElement("option");
        opt.value = i;
        opt.innerText = i;
        select.appendChild(opt);
    }
}

function initDropdowns() {
    const stateSel = document.getElementById("state");
    const citySel = document.getElementById("city");
    const pinSel = document.getElementById("pincode");

    if (!stateSel) return;

    // Load States
    Object.keys(locations).forEach(state => {
        const opt = document.createElement("option");
        opt.value = state;
        opt.innerText = state;
        stateSel.appendChild(opt);
    });

    // State Change
    stateSel.onchange = () => {
        citySel.innerHTML = '<option value="">Select City</option>';
        pinSel.innerHTML = '<option value="">Select Pincode</option>';
        const selectedState = stateSel.value;
        if (selectedState) {
            Object.keys(locations[selectedState]).forEach(city => {
                const opt = document.createElement("option");
                opt.value = city;
                opt.innerText = city;
                citySel.appendChild(opt);
            });
        }
    };

    // City Change
    citySel.onchange = () => {
        const selectedState = stateSel.value;
        const selectedCity = citySel.value;
        // Pincode is now a text input, so no dropdown to populate
    };

    // Populate Weather (Professional Ranges)
    populateRangeSelect("temperature", 0, 60);
    populateRangeSelect("rainfall", 0, 500, 10);
    populateRangeSelect("windSpeed", 0, 200, 5);
    populateRangeSelect("humidity", 0, 100, 5);
}

initDropdowns();

// Submit Report
const form = document.getElementById("reportForm");

if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const reportId = document.getElementById("reportId").value;
        const data = {
            state: document.getElementById("state").value,
            city: document.getElementById("city").value,
            pincode: document.getElementById("pincode").value,
            temperature: Number(document.getElementById("temperature").value),
            rainfall: Number(document.getElementById("rainfall").value),
            windSpeed: Number(document.getElementById("windSpeed").value),
            humidity: Number(document.getElementById("humidity").value)
        };

        let method = "POST";
        let url = "/api/reports";

        if (reportId) {
            method = "PUT";
            url = `/api/reports/${reportId}`;
        }

        const res = await fetch(url, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await res.json();
        document.getElementById("responseMsg").innerText =
            `Risk: ${result.risk} | Severity: ${result.severity}`;

        // Reset form
        form.reset();
        document.getElementById("reportId").value = "";
        document.getElementById("submitBtn").innerText = "Submit Report";

        // Reset City dropdown
        document.getElementById("city").innerHTML = '<option value="">Select City</option>';

        loadReports(); // Refresh the list
        loadAlerts(); // Refresh alerts
    });
}

// Load Reports for Management
async function loadReports() {
    const container = document.getElementById("reportsList");
    if (!container) return; // Only process if on the manage page

    const res = await fetch("/api/reports");
    const reports = await res.json();

    container.innerHTML = "";

    reports.forEach(report => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
            <h3>${report.city}, ${report.state} (${report.pincode})</h3>
            <p>Temp: ${report.temperature}°C, Rain: ${report.rainfall}mm</p>
            <p>Wind: ${report.windSpeed}km/h, Humid: ${report.humidity}%</p>
            <button class="edit-btn" style="margin-top: 10px; padding: 5px; background: #f39c12; color: #fff; border: none; border-radius: 3px; cursor: pointer;">Edit</button>
            <button class="delete-btn" style="margin-top: 10px; padding: 5px; background: #e74c3c; color: #fff; border: none; border-radius: 3px; cursor: pointer;">Delete</button>
        `;

        div.querySelector(".edit-btn").onclick = () => editReport(report);
        div.querySelector(".delete-btn").onclick = () => deleteReport(report._id);

        container.appendChild(div);
    });
}

// Edit Report - Populates Form
function editReport(report) {
    document.getElementById("reportId").value = report._id;

    // Set State
    const stateSel = document.getElementById("state");
    stateSel.value = report.state;
    stateSel.onchange(); // Trigger city load

    // Set City
    const citySel = document.getElementById("city");
    citySel.value = report.city;
    citySel.onchange(); // Trigger pin load

    // Set Pincode
    document.getElementById("pincode").value = report.pincode;

    // Set Weather
    document.getElementById("temperature").value = report.temperature;
    document.getElementById("rainfall").value = report.rainfall;
    document.getElementById("windSpeed").value = report.windSpeed;
    document.getElementById("humidity").value = report.humidity;

    document.getElementById("submitBtn").innerText = "Update Report";
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Delete Report
async function deleteReport(id) {
    if (!confirm("Are you sure you want to delete this report?")) return;

    try {
        const res = await fetch(`/api/reports/${id}`, { method: "DELETE" });
        const result = await res.json();
        alert(result.message);
        loadReports();
        loadAlerts(); // Refresh alerts list if applicable
    } catch (err) {
        console.error("Failed to delete report:", err);
    }
}

// Make functions global for debug or other uses if needed
window.editReport = editReport;
window.deleteReport = deleteReport;

if (document.getElementById("reportsList")) {
    loadReports();
}

// Load Alerts
async function loadAlerts() {
    const res = await fetch("/api/alerts");
    const alerts = await res.json();

    const container = document.getElementById("alertsList") || document.getElementById("alertContainer");
    if (!container) return;

    container.innerHTML = "";

    alerts.forEach(alert => {
        const div = document.createElement("div");
        div.className = "card " + alert.severity.toLowerCase();
        div.style.cursor = "pointer";
        div.onclick = () => window.location.href = `map.html?alertId=${alert._id}`;
        div.innerHTML = `
            <h3>${alert.alertType}</h3>
            <p>City: ${alert.reportId?.city} (${alert.reportId?.pincode})</p>
            <p>Risk: ${alert.riskIndex.toFixed(2)}</p>
            <p>Severity: ${alert.severity}</p>
        `;
        container.appendChild(div);
        if (document.getElementById("totalAlerts")) {
            document.getElementById("totalAlerts").innerText =
                "Total Alerts: " + alerts.length;
        }
    });
}

loadAlerts();

// Initial check for visibility on load
function checkCardVisibility() {
    const container = document.querySelector(".card-container");
    if (!container) return;

    // Always make it visible on load for Dashboard since it's at the top
    container.classList.add("visible");
}

window.onload = checkCardVisibility;

window.addEventListener("scroll", () => {
    const container = document.querySelector(".card-container");
    if (!container) return;

    const trigger = window.innerHeight * 0.85;

    if (container.getBoundingClientRect().top < trigger) {
        container.classList.add("visible");
    }
});