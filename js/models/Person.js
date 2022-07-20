export class Person{
    #_username;
    #_email;
    #_password;
    #_acceptTerms;

    set username(value){
        this.#_username = value
    }

    get username(){
        return this.#_username
    }

    set email(value){
        this.#_email= value
    }

    get email(){
        return this.#_email
    }
    set password(value){
        this.#_password = value
    }

    get password(){
        return this.#_password
    }
    set acceptTerms(value){
        this.#_acceptTerms = value
    }

    get acceptTerms(){
        return this.#_acceptTerms
    }
}