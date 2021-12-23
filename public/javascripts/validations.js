/**
 * This module is used to validate the information given and make sure everything is running smoothly
 */
let ValidationModule = (() => {
    let PublicData = {};


    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    /**
     * This function is used to check if the date or the sol the user inserted is within
     * a valid range of values.
     * returns bool
     */
    const onlyChars = function (kind) {
        const name = document.getElementById(`${kind}`).value.trim();

        const valid = /^[a-zA-Z]+$/.test(name);

        if (valid) { // good name
            document.getElementById(`${kind}Invalid`).classList.add("d-none"); // remove the error
            return true;
        }// else, invalid
        document.getElementById(`${kind}Invalid`).classList.remove("d-none");
        return false; // display error

    };

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


// a function which calls the two other functions above, and returns if the data was valid
    PublicData.validateForm = function () {
        const form = document.getElementById('inputForm');

        const v1 = form.checkValidity();
        const v2 = onlyChars("firstName");
        const v3 = onlyChars("lastName");


        return v1 && v2 && v3;
    };

    return PublicData;
})
();


//********************************************************************

/**
 * A module which is used to fetch data, be it API, images and so on, and grab information
 * from the input area of the html and deliver it to JavaScript
 */
let DataFetcher = (() => {
    let PublicData = {};

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    /**
     * A boolean function which tells if a connection was successful
     * @param response - a promise as returned from a fetch()
     * @returns {boolean} - true if succeed, false otherwise
     */
    const received = function (response) {
        return response.status >= 200 && response.status < 300;
    };

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    /**
     * An async function, which is used to fetch information and return it as json.
     * @param url - the url of the site we want to access
     * @param extraParameters - queries, such as date camera etc
     * @returns {Promise<any>} - a promise in the json format, or error if failed
     */
    const getJSON = async function (url, extraParameters) {

        // attach all the extra parameters into one string with & between queries
        if (extraParameters != null) {
            let esc = encodeURIComponent;
            let query = Object.keys(extraParameters)
                .map(k => esc(k) + '=' + esc(extraParameters[k]))
                .join('&');

            url += `${query}`; // insert in the end of the url
        }

        const response = await fetch(url, {method: "get", extraParameters});

        if (received(response)) {
            return Promise.resolve(response.json());
        }
        return Promise.reject(new Error(response.statusText));

    };

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    PublicData.getUsersList = function () {
        let retVal = {};
        getJSON("http://localhost:3000/api/users")
            .then((data) => {
                retVal = data;
            })
        return retVal
    }

    return PublicData;
})();

//********************************************************************
document.addEventListener('DOMContentLoaded', function () {

    let form = document.getElementById('inputForm');
    form.addEventListener('submit', function (event) {

        event.preventDefault(); // no annoying refresh
        if (!ValidationModule.validateForm()) {// validation failed
            event.stopPropagation();
            console.log("bad")
        } else { // succeed
            const email = document.getElementById("email").value.trim();
            console.log("in else")

            fetch(`/api/users/${email}`)
                .then((res) => {
                    return res.json()
                }).then((data) => {
                console.log("before!", data)
                if (data["found"]) {
                    document.getElementById(`emailInvalid`).classList.remove("d-none");
                } else {
                    document.getElementById(`emailInvalid`).classList.add("d-none");
                    form.submit()
                }
            }).catch((d) => {
                console.log("in catch")
            })
        }

        form.classList.add('was-validated');
    }, false);
});

