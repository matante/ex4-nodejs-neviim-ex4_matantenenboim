let Validator = (() => {
    let PublicData = {};

    /**
     * checks if the regular expression is right
     * @param kind is the type of the name, first or last
     * @returns {boolean} true if valid, false otherwise
     */
    const isAllowedCharacters = function (kind) {
        const name = document.getElementById(`${kind}`).value.trim();
        const element = document.getElementById(`${kind}Invalid`).classList


        if (/^[a-zA-Z]+$/.test(name) && name !== "") { // good name
            element.add("d-none"); // remove the error
            return true;
        }
        // else, invalid
        element.remove("d-none");// display error
        return false;
    };

    PublicData.validateRegistrationForm = function (form) {
        const v1 = form.checkValidity();
        const v2 = isAllowedCharacters("firstName");
        const v3 = isAllowedCharacters("lastName");

        return v1 && v2 && v3;
    }

    const isMatching = function (pw1, pw2) {
        const element = document.getElementById("notMatchingPassword").classList;
        if (pw1 === pw2) {
            element.add("d-none"); // remove the error
            return true;
        }// else, invalid
        element.remove("d-none");
        return false; // display error
    }

    const isLongEnough = function (pw1, pw2) {
        const LENGTH = 8;
        const element = document.getElementById("shortPassword").classList;

        if (pw1.length >= LENGTH && pw2.length >= LENGTH) {
            element.add("d-none"); // remove the error
            return true;
        }// else, invalid
        element.remove("d-none");
        return false; // display error

    }

    PublicData.validatePasswords = function (form) {
        // NO TRIM HERE as " " is a legit character for password!
        const pw1 = document.getElementById("password").value;
        const pw2 = document.getElementById("passwordConfirmation").value;

        const v1 = form.checkValidity();
        const v2 = isMatching(pw1, pw2);
        const v3 = isLongEnough(pw1, pw2);

        return v1 && v2 && v3;
    }


    return PublicData;
})()


document.addEventListener('DOMContentLoaded', function () {

    let registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function (event) {

            event.preventDefault(); // no annoying refresh

            const isValid = Validator.validateRegistrationForm(registrationForm);

            if (!isValid) {// validation failed
                event.stopPropagation();

            } else { // succeed
                registrationForm.submit()
            }

            registrationForm.classList.add('was-validated');
        }, false);
    }

    let passwordsForm = document.getElementById('choosePassword');
    if (passwordsForm) {
        passwordsForm.addEventListener('submit', function (event) {

            event.preventDefault(); // no annoying refresh

            const isValid = Validator.validatePasswords(passwordsForm);

            if (!isValid) {// validation failed
                event.stopPropagation();

            } else { // succeed
                passwordsForm.submit()
            }

            passwordsForm.classList.add('was-validated');
        }, false);
    }
})