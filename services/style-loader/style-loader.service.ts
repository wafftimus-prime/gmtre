import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StyleLoaderService {
  
  loadStyle(href: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.isStyleAlreadyLoaded(href)) {
        resolve();
        return;
      }

      const linkElement = document.createElement('link');
      linkElement.rel = 'stylesheet';
      linkElement.href = href;

      linkElement.onload = () => resolve();
      linkElement.onerror = (error) => reject(error);

      document.head.appendChild(linkElement);
    });
  }

  private isStyleAlreadyLoaded(href: string): boolean {
    return !!document.querySelector(`link[href="${href}"]`);
  }
}