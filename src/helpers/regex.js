

export const regexPatterns = {
    email: new RegExp("^[a-zA-Z]+[\\w\\d]*@[a-zA-Z\\d]+\\.[a-zA-Z]+$"),
    password: new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.* ).{4,16}$"),
};