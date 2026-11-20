
// ========================================
// 1. Contact Form Elements
// ========================================

const contactForm = document.getElementById("contactForm");

const fields = {
    name: document.getElementById("name"),
    email: document.getElementById("email"),
    phone: document.getElementById("phone"),
    message: document.getElementById("message")
};

const errors = {
    name: document.getElementById("nameError"),
    email: document.getElementById("emailError"),
    phone: document.getElementById("phoneError"),
    message: document.getElementById("messageError")
};

const successMessage = document.getElementById("successMessage");

const touched = {
    name: false,
    email: false,
    phone: false,
    message: false
};


// ========================================
// 2. Validation Function
// ========================================

function validateField(fieldName) {

    const field = fields[fieldName];

    if (!field) return false;

    const value = field.value.trim();
    let error = "";

    // Name Validation
    if (fieldName === "name") {

        if (value === "") {
            error = "Name is required.";
        }
        else if (value.length < 3) {
            error = "Name must be at least 3 characters.";
        }
    }

    // Email Validation
    if (fieldName === "email") {

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (value === "") {
            error = "Email is required.";
        }
        else if (!emailPattern.test(value)) {
            error = "Please enter a valid email address.";
        }
    }

    // Phone Validation
    if (fieldName === "phone") {

        const phonePattern = /^\+?[0-9\s()-]+$/;
        const phoneDigits = value.replace(/\D/g, "");

        if (value === "") {
            error = "Phone number is required.";
        }
        else if (
            !phonePattern.test(value) ||
            phoneDigits.length < 10 ||
            phoneDigits.length > 15
        ) {
            error = "Please enter a valid phone number.";
        }
    }

    // Message Validation
    if (fieldName === "message") {

        if (value === "") {
            error = "Message is required.";
        }
        else if (value.length < 10) {
            error = "Message must be at least 10 characters.";
        }
    }

    // Display Error Message
    errors[fieldName].textContent = error;

    // Update Field Classes
    field.classList.toggle("invalid", error !== "");

    field.classList.toggle(
        "valid",
        error === "" && value !== ""
    );

    field.setAttribute(
        "aria-invalid",
        error !== "" ? "true" : "false"
    );

    return error === "";
}


// ========================================
// 3. Focus, Blur & Input Events
// ========================================

Object.keys(fields).forEach((fieldName) => {

    const field = fields[fieldName];

    if (!field) return;

    field.addEventListener("focus", () => {

        field.classList.add("focused");

    });

    field.addEventListener("blur", () => {

        field.classList.remove("focused");

        touched[fieldName] = true;

        validateField(fieldName);

    });


    field.addEventListener("input", () => {

        if (touched[fieldName]) {

            validateField(fieldName);

        }

        if (successMessage) {
            successMessage.style.display = "none";
        }

    });

});


// ========================================
// 4. Form Submit Event
// ========================================

if (contactForm) {

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();

        let isFormValid = true;

        Object.keys(fields).forEach((fieldName) => {

            touched[fieldName] = true;

            const isValid = validateField(fieldName);

            if (!isValid) {
                isFormValid = false;
            }

        });

        if (!isFormValid) {

            if (successMessage) {
                successMessage.style.display = "none";
            }

            const firstInvalidField =
                contactForm.querySelector(".invalid");

            if (firstInvalidField) {
                firstInvalidField.focus();
            }

            return;
        }

        if (successMessage) {

            successMessage.textContent =
                "Thank you! Your message has been sent successfully.";

            successMessage.style.display = "block";

        }

        contactForm.reset();



        Object.keys(fields).forEach((fieldName) => {

            touched[fieldName] = false;

            fields[fieldName].classList.remove(
                "valid",
                "invalid",
                "focused"
            );

            fields[fieldName].removeAttribute("aria-invalid");

            errors[fieldName].textContent = "";

        });

    });

}


// ========================================
// 5. Mobile Navigation
// ========================================

const menuToggle = document.getElementById("menu-toggle");

const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        if (menuToggle) {
            menuToggle.checked = false;
        }

    });

});


// ========================================
// 6. Dynamic Footer Year
// ========================================

const currentYear = document.getElementById("currentYear");

if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

}
