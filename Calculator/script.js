document.addEventListener("DOMContentLoaded", function () {
    // Tab toggle functionality
    var openTab = document.getElementById("Opentab");
    var closeTab = document.getElementById("Closetab");
    var iconOpen = openTab.querySelector("i");
    var iconClose = closeTab.querySelector("i");

    iconOpen.addEventListener("click", toggleTab);
    iconClose.addEventListener("click", toggleTab);

    function toggleTab() {
        if (openTab.style.display === "block") {
            openTab.style.display = "none";
            closeTab.style.display = "block";
        } else {
            openTab.style.display = "block";
            closeTab.style.display = "none";
        }
    }

    // Dynamically create buttons
    let x = document.getElementById("type");
    let A = [
        { label: "C", id: "clearAll" },
        { label: '<i class="ri-close-circle-fill"></i>', id: "delete", class: "operator" },
        { label: "=", class: "operator", id: "equals" },
        { label: "/", class: "operator", id: "division" },
        { label: "*", class: "operator", id: "multiply" },
        { label: ".", class: "operator", id: "decimal" },
        { label: "+", class: "operator", id: "add" },
        { label: "-", class: "operator", id: "sub" },
        { label: "1" },
        { label: "2" },
        { label: "3" },
        { label: "4" },
        { label: "5" },
        { label: "6" },
        { label: "7" },
        { label: "8" },
        { label: "9" },
        { label: "0" }
    ];

    let buttonHTML = "";

    for (let i = 0; i < 6; i++) {  // 6 rows
        for (let j = 0; j < 3; j++) {  // 3 columns
            let index = i * 3 + j;
            if (index < A.length) {
                let buttonData = A[index];
                buttonHTML += `<div class="button ${buttonData.class || ''}" id="${buttonData.id || ''}">${buttonData.label}</div>`;
            }
        }
    }

    x.innerHTML = buttonHTML;

    // Button click functionality
    let buttons = document.querySelectorAll("#type .button");
    let screen = document.getElementById("screen");
    let currentInput = "";  // Keeps track of what the user enters
    let operatorUsed = false;  // Prevents consecutive operators
    let lastInputWasOperator = false;  // Track the last input type to avoid multiple operators

    buttons.forEach(button => {
        button.addEventListener("click", function() {
            let value = this.innerText.trim(); // Text of the button clicked

            if (this.id === "clearAll") {
                currentInput = "";
                screen.innerHTML = "";
                operatorUsed = false;
            } else if (this.id === "delete") {
                currentInput = currentInput.slice(0, -1);
                screen.innerHTML = currentInput;
                operatorUsed = false;
            } else if (this.id === "equals") {
                try {
                    currentInput = eval(currentInput); // Calculate the result
                    screen.innerHTML = currentInput;
                    operatorUsed = false;
                    lastInputWasOperator = false;
                } catch (e) {
                    screen.innerHTML = "Error";
                    currentInput = "";
                }
            } else if (this.id === "decimal") {
                let parts = currentInput.split(/[+\-*/]/); // Split by operators
                let lastPart = parts[parts.length - 1];
                if (!lastPart.includes(".")) {
                    currentInput += value;
                    screen.innerHTML = currentInput;
                }
            } else if (["/", "*", "+", "-"].includes(value)) {
                if (!lastInputWasOperator && currentInput !== "") {
                    currentInput += value;
                    screen.innerHTML = currentInput;
                    lastInputWasOperator = true; // Set flag to avoid consecutive operators
                }
            } else {
                currentInput += value;
                screen.innerHTML = currentInput;
                lastInputWasOperator = false; // Reset flag when a number is clicked
            }
        });
    });
});
