import { RenderInstruction, ValidateResult, ValidationRenderer } from 'aurelia-validation';

export class CustomValidationRenderer {

    render(instruction: RenderInstruction) {
        for (let { result, elements } of instruction.unrender) {
            for (let element of elements) {
                this.remove(element, result);
            }
        }

        for (let { result, elements } of instruction.render) {
            for (let element of elements) {
                this.add(element, result);
            }
        }
    }

    add(element: Element, result: ValidateResult) {
        if (result.valid)
            return;

        const formGroup = element.closest('.form-group');
        if (!formGroup)
            return;

        formGroup.classList.add('has-error');

        const message = document.createElement('span');
        message.className = 'help-block validaition-message';
        message.textContent = result.message;
        message.id = 'validation-message-${result.id}';
        formGroup.appendChild(message);
    }

    remove(element: Element, result: ValidateResult) {
        if (result.valid)
            return;

        const formGroup = element.closest('.form-group');

        if (!formGroup)
            return;

        const message = formGroup.querySelector('#validation-message-${result.id}');
        if (message) {
            formGroup.removeChild(message);
        }

        if(formGroup.querySelectorAll('.help-block.validation-message').length===0)
        {
            formGroup.classList.remove('has-error');
        }
    }
}