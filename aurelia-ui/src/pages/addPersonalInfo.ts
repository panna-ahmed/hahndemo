import { PersonalDetails } from '../view-models/PersonalDetails';
import { inject } from 'aurelia-dependency-injection';
import { ValidationRules, ValidationController, Validator, ValidationControllerFactory } from 'aurelia-validation';
import { PersonalService } from '../services/personal.service'
import { I18N } from 'aurelia-i18n';
import { DialogService } from 'aurelia-dialog';
import { Confirm } from '../dialog/confirm';
import { bindable, observable } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject(ValidationController, PersonalService, I18N, DialogService, Router, Validator)
export class PersonalInfo {
    static inject = [I18N];

    @bindable
    public personalDetails: PersonalDetails[] = [];

    @observable({ changeHandler: 'nameChangeHandler' })
    name: string = '';
    @observable({ changeHandler: 'familyNameChangeHandler' })
    familyName: string;
    @observable({ changeHandler: 'addressChangeHandler' })
    address: string;
    @observable({ changeHandler: 'countryChangeHandler' })
    country: string;
    @observable({ changeHandler: 'emailAddressChangeHandler' })
    emailAddress: string;
    @observable({ changeHandler: 'ageChangeHandler' })
    age: number;
    @observable({ changeHandler: 'isHiredhangeHandler' })
    isHired: boolean = false;

    message = '';
    isSaveEnabled = false;
    isResetEnabled = true;
    SubmitText = "Submit";
    ResetText = "Reset";

    constructor(private controller, private personalService: PersonalService, private i18n,
        private dialogService, private router, private validator) {

        this.i18n.setLocale('en')
            .then(() => { console.log('Locale is loaded !') });

        ValidationRules
            .ensure((p: PersonalInfo) => p.name)
            .required()
            .minLength(5)
            .withMessage("Name is required minimum 5 characters")
            .ensure((p: PersonalInfo) => p.emailAddress)
            .required()
            .email()
            .withMessage("Provide a valid email address")
            .ensure((p: PersonalInfo) => p.familyName)
            .displayName("Family name")
            .required()
            .minLength(5)
            .withMessage("Family name is required minimum 5 characters")
            .ensure((p: PersonalInfo) => p.address)
            .required()
            .minLength(10)
            .withMessage("Address is required minimum 10 characters")
            .ensure((p:PersonalInfo)=>p.country)
            .displayName("Country")
            .required()
            .ensure((p: PersonalInfo) => p.age)
            .required()
            .between(20, 60)
            .withMessage("Age must be between 20 and 60")
            .on(this);
    }

    nameChangeHandler(newVal) {
        this.isResetEnabled = newVal.length === 0;
    }

    familyNameChangeHandler(newVal) {
        this.isResetEnabled = newVal.length === 0;
    }

    addressChangeHandler(newVal) {
        this.isResetEnabled = newVal.length === 0;
    }

    countryChangeHandler(newVal) {
        this.isResetEnabled = newVal.length === 0;
    }

    emailAddressChangeHandler(newVal) {
        this.isResetEnabled = newVal.length === 0;
    }

    ageChangeHandler(newVal) {
        this.isResetEnabled = newVal.length === 0;
    }

    isHiredhangeHandler(newVal) {
        this.isResetEnabled = newVal.length === 0;
    }

    validateAll() {
        this.validator.validateObject(this.name)
            .then(results => {
                this.isSaveEnabled = results.every(
                    r => {
                        r.valid;
                        console.log('vv', r.valid);
                    });
            })
    }

    addPersonalDetails(): void {
        this.controller.validate()
            .then(errors => {
                if (errors.valid) {
                    this.dialogService.open({ viewModel: Confirm, model: 'Do you want to save the data?', lock: false })
                        .whenClosed(response => {
                            if (!response.wasCancelled) {
                                this.personalDetails.push({
                                    name: this.name,
                                    FamilyName: this.familyName,
                                    Address: this.address,
                                    CountryOfOrigin: this.country,
                                    Age: this.age,
                                    EmailAddress: this.emailAddress,
                                    IsHired: this.isHired
                                });
                                this.personalService.savePersonalDetails(this.personalDetails[0]).then(
                                    result => {
                                        console.log("Response is ", result);
                                        this.router.navigate('success');
                                    },
                                    error => {
                                        console.log(error);
                                    });
                            }
                            else {
                                console.log('cancelled');
                            }
                        })
                }
                else {
                    console.log("correct errors ");
                }
            });
    }

    onLanguageClick(param): boolean {
        if (param === 'English') {
            this.i18n.setLocale('en')
        }
        else if (param === 'German') {
            this.i18n.setLocale('de')
        }
        else if (param === 'French') {
            this.i18n.setLocale('fr')
        }

        this.SubmitText = document.getElementById('lblSubmit').innerText;
        this.ResetText = document.getElementById('lblReset').innerText;

        console.log("Reset text",document.getElementById('lblReset').innerText);
        return true;
    }

    onResetClick(): void {
        this.dialogService.open({ viewModel: Confirm, model: 'Are you sure you want to reset data ?', lock: false })
            .whenClosed(response => {
                if (!response.wasCancelled) {
                    this.resetForm();
                }
            })
    }
    private resetForm(): void {
        this.name = "";
        this.familyName = "";
        this.country = "";
        this.address = "";
        this.emailAddress = "";
        this.age = null;
        this.isHired = false;
        this.controller.reset();
    }

    checkChange(value) {
        this.isHired = value;
    }
}
