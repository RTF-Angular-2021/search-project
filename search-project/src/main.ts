import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

window.addEventListener('mouseup',function(event){
  const history = document.querySelector('.history-list');
  const settings = document.querySelector('.settings-panel');
  const historyButton = document.querySelector('.history');
  const settingsButton = document.querySelector('.settings');
  const input = document.querySelector('.search-input');
  const searchButton = document.querySelector('.search-btn');

  
  
  if (event.target != history 
    && (<HTMLElement>event.target ).parentNode != history
    && event.target != settingsButton
    && event.target != settings
    && event.target != input
    && event.target != searchButton) {
    if (history?.classList.contains('show-history-list')) {history.classList.remove('show-history-list');}
  }
  if (event.target != settings 
    && (<HTMLElement>event.target ).parentNode != settings
    && event.target != historyButton
    && event.target != history
    && event.target != input
    && event.target != searchButton) {
    if (settings?.classList.contains('show-settings')) {settings.classList.remove('show-settings');}
  }
});  

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
