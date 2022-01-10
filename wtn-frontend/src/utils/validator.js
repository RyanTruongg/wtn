const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const phoneRegex = /^(\+?84|0)(1\d{9}|3\d{8}|5\d{8}|7\d{8}|8\d{8}|9\d{8})$/;
const urlRegex = /^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&=]*)/;
const filePathRegex = /^([a-z_\-\s0-9/]+)+\.(jpeg|png|jpg)$/;

function validateValueWithFunc(value, validateRegex) {
    return validateRegex.test(value);
}

const Validator = {
    isValidEmail: (email) => validateValueWithFunc(email, emailRegex),
    isValidPhone: (phone) => validateValueWithFunc(phone, phoneRegex),
    isValidUrl: (url) => validateValueWithFunc(url, urlRegex),
    isValidFilePath: (path) => validateValueWithFunc(path, filePathRegex),
};

export { Validator };
