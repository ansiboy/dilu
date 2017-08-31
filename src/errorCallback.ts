namespace dilu {

    // export interface ValidatorError {
    //     id: string,
    //     display: string,
    //     element: HTMLInputElement,
    //     name: string,
    //     message: string,
    //     rule: (...params) => boolean,
    // }

    export interface ValidateField {
        rule: Rule,
        display?: string,
        message?: string,
        depends?: (HTMLInputElement | (() => boolean))[]
    }

    // export interface Rule {
    //     name: string,
    //     params: string[]
    // }



    // export type ErrorCallback = (errors: ValidatorError[], fields: ValidateField[], evt: Environment) => void

    // export type Environment = { validator: any };
}