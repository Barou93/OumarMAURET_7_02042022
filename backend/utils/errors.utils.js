module.exports.signUpErrors = (err) => {

    let errors = { firstname: "", lastname: "", email: "", password: "" };

    if (!email && !password)
        err.message = 'Mauvais email ou mot de passe';


    if (email && password !== null)
        err.message = "Ce compte n'existe pas, réessayer SVP";

    if (!password)
        err.message = "Mot de passe erroné";

    if (err.message.includes("email"))
        errors.email = "Cet email est incorrect, reesayer SVP!";

    if (err.message.includes("password"))
        errors.password = "Le mot de passe doit avoir 8 caractères et inclure 1 lettre majuscule, 1 chiffre et 1 caractère spécial"

    if (err.message.includes("firstname"))
        errors.firstname = "Ce nom est déjà pris ou déjà pris";


    if (err.code === 18456 && Object.keys(err.keyValue)[3].includes("password"))
        errors.password = "Mot de passe erroné";

    if (err.code === 18456 && Object.keys(err.keyValue)[2].includes("email"))
        errors.email = "Cet email est incorrect, reesayer SVP!";

    return errors;
}

module.exports.signInErrors = (err) => {
    let errors = { email: '', password: '' };

    /*if (err.message.includes(null)) {
        errors.email = "Saisissez une adresse e-mail";
        errors.password = "Saisissez votre mot de passe";
    }*/
    /*
        if (err.message.includes("email"))
            errors.email = "Email inconnu";
    
        if (err.message.includes(errors.password))
            errors.password = "Mot de passe incorrect";*/


    return errors;
}