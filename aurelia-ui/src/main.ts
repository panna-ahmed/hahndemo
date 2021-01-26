import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { Aurelia } from 'aurelia-framework';
import * as environment from '../config/environment.json';
import { PLATFORM } from 'aurelia-pal';
import { Backend, I18N, TCustomAttribute } from 'aurelia-i18n';
import { ValidationMessageProvider } from 'aurelia-validation';


export function configure(aurelia: Aurelia): void {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'));

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');
  aurelia.use.plugin(PLATFORM.moduleName('aurelia-validation')).developmentLogging();

  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin(PLATFORM.moduleName('aurelia-dialog'), config => {
      config.useDefaults();
    });

  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin(PLATFORM.moduleName('aurelia-i18n'), (instance) => {
      let aliases = ['t', 'i18n'];
      TCustomAttribute.configureAliases(aliases);
      instance.i18next.use(Backend.with(aurelia.loader));

      ValidationMessageProvider.prototype.getMessage = function (key) {
        const i18n = aurelia.container.get(I18N);
        const translation = i18n.tr(`errorMessages.${key}`);
        return this.parser.parse(translation);
      };

      ValidationMessageProvider.prototype.getDisplayName =((propertyName : string,displayName : string)=>{
        if (displayName !== null && displayName !== undefined) {
          return displayName;
        }
        const i18n = aurelia.container.get(I18N);
        return i18n.tr(propertyName);
      });
    
      return instance.setup({
        backend: {
          loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
        attributes: aliases,
        lng: 'de',
        fallbackLng: 'en',
        debug: false
      });


    });

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
