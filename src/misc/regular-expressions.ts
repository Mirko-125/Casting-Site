interface RegExCollection {
    fullname: RegExp;
    username: RegExp;
    email: RegExp;
    phone: RegExp;
    password: RegExp;
    sqlinjection: RegExp;
}

export const regex: RegExCollection ={
    fullname: /^[\p{Lu}][\p{Ll}']+(?: (?:[\p{Lu}][\p{Ll}']+(?:-[\p{Lu}][\p{Ll}']+)*)+)+$/u,
    username: /^[A-Za-z][A-Za-z_]{2,22}$/,
    email: /^[A-Za-z0-9._-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/,
    phone: /^\+[1-9][0-9]{7,14}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).{12,}$/,
    sqlinjection: /\b(SELECT|INSERT|UPDATE|DELETE|WHERE|DROP|CREATE|ALTER|JOIN|UNION|EXEC|;|--|#|\|\*|\')/i,
}
