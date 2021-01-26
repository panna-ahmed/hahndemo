import { DialogController } from "aurelia-dialog";
import { inject } from "aurelia-framework";

@inject(DialogController)
export class Confirm {
    constructor(private controller: DialogController) {

    }

    message = "";
    activate(data) {
        this.message = data;
    }
}