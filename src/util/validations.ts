const isUserNameValid = (string: string) => {
    var regex = /^[\w.@+-]+$/;
    return regex.test(string);
};

const isEmpty = (value: string) => {
    return value === null || value.match(/^ *$/) !== null;
}

export {
    isUserNameValid,
    isEmpty
};