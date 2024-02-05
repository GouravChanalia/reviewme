import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function validUserName(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/g;
        let isValid = regex.test(control.value);
        return isValid? null: { username: { value: control.value } };
    };
}

export function validPasswordMatch(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const password = control.get('password');
        const confirmPassword = control.get('confirmPassword');
        return password?.value === confirmPassword?.value? null: { password: { value: "Password mismatch" } };
    }
}