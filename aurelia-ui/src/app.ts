import { PLATFORM } from 'aurelia-pal';
import { RouterConfiguration, Router } from 'aurelia-router';

export class App {

  configureRouter(config: RouterConfiguration, router: Router) {
    config.options.pushState = true;

    config.map([
      {
        route: ['', 'personalinfo'], name: 'personalinfo', title: 'Add Personal Details', 
        moduleId: PLATFORM.moduleName('pages/addPersonalInfo'), nav: true,
      }
      ,
      {
        route: ['success', 'successMessage'], name: 'successMessage', title: 'Confirmation', 
        moduleId: PLATFORM.moduleName('pages/successMessage'), nav: true
      }
    ]);
  }

}