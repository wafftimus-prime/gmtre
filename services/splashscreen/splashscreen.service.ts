import { Injectable } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';


@Injectable({
  providedIn: 'root'
})
export class SplashScreenService {

  constructor() { }

  public async hideSplashScreen() {
    // Check if the SplashScreen API is available in your Capacitor project
    if (SplashScreen) {
      await SplashScreen.hide();
    }
  }

  public async showSplashScreen() {
    // Check if the SplashScreen API is available in your Capacitor project
    if (SplashScreen) {
      await SplashScreen.show({
        autoHide: false // Prevents the splash screen from auto-hiding
      });
    }
  }
}
