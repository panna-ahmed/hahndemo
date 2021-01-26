import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
import { PersonalDetails } from 'view-models/PersonalDetails';


@inject(HttpClient)
export class PersonalService {

    private apiUrl: string = 'https://localhost:5001/api/personalinfo';
    httpConfig: any;

    constructor(private http: HttpClient) {
        this.httpConfig = config => {
            config.withBaseUrl(this.apiUrl);
        }
    }

    savePersonalDetails(personalInfo: PersonalDetails) {
        this.http.configure(this.httpConfig);
        return this.http.fetch('/save-personal', {
            method : 'post',
            body : json(personalInfo),
            headers : {
                'Accept' :  'application/json'
            }
        }).then(response => {
           return response.json();
        })
    }
}