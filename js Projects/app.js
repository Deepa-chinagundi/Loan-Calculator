document.getElementById("loan-form").addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent default form submission

    // Hide the result and show loading
    document.getElementById("result").style.display = "none";
    document.getElementById("loading").style.display = "block";

    // Set a timeout to call the calculate function after 2 seconds
    setTimeout(calculate, 2000);
});

function calculate() {
    // Your calculation logic here
    const amount = document.getElementById("loan-amount");
    const interest = document.getElementById("interest");
    const year = document.getElementById("years");
    const monthly_payment = document.getElementById("monthly_payment");
    const total_amount = document.getElementById("total_amount");
    const total_interest = document.getElementById("total_interest");

    const principal = parseFloat(amount.value);
    const CalcInterest = parseFloat(interest.value) / 100 / 12;
    const CalcPayment = parseFloat(year.value) * 12;
    const x = Math.pow(1 + CalcInterest, CalcPayment);
    const monthly = (principal * x * CalcInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthly_payment.value = monthly.toFixed(2);
        total_amount.value = (monthly * CalcPayment).toFixed(2);
        total_interest.value = (monthly * CalcPayment - principal).toFixed(2);

        document.getElementById("result").style.display = "block";
        document.getElementById("loading").style.display = "none"; // Hide loading after calculation
    } else {
        showAlert("Please enter valid amounts");
        document.getElementById("loading").style.display = "none"; // Hide loading on error
    }
}

function showAlert(error) {
    // Clear previous alerts
    const existingAlert = document.querySelector(".alert");
    if (existingAlert) {
        existingAlert.remove();
    }

    const errorDiv = document.createElement("div");
    errorDiv.className = "alert alert-danger";
    errorDiv.appendChild(document.createTextNode(error)); // Set the error message

    const card = document.querySelector(".card");
    const heading = document.querySelector(".heading"); // Corrected selector

    card.insertBefore(errorDiv, heading);

   // Set a timeout to remove the alert after 3 seconds
    setTimeout(function () {
        const alert = document.querySelector(".alert");
        if (alert) {
            alert.remove();
            console.log("Alert removed"); // Debug log
        } else {
            console.log("No alert found to remove"); // Debug log
        }
    }, 3000);

    // setTimeout(function(){
    //  document.querySelector(".alert").remove();
    // }, 3000);
}
