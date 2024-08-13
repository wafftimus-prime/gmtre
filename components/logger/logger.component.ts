import { Component, OnInit } from '@angular/core';
import { DarkModeService } from '@gmtre-services';
import { ModalController } from '@ionic/angular';
// import { AppStateService } from 'src/app/data';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { BehaviorSubject } from 'rxjs';
// import { LoggerState } from 'src/app/data';

export interface LoggerState {
  logs?: Array<LogEntry>;
  user?: any;
}

export interface LogEntry {
  level?: LogEntryLevel;
  title?: string;
  message?: string | object;
  code?: number; // Optional error code
  stack?: string; // Optional stack trace
  location?: string; // Optional stack trace
  timestamp?: string;
}

export type LogEntryLevel = 'log' | 'debug' | 'info' | 'warn' | 'error';


@Component({
  selector: 'app-logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.scss'],
})
export class LoggerComponent  implements OnInit {
  loaded = false
  LogoUrl: string = './assets/logo/noble_icon.png';
  logger: BehaviorSubject<LoggerState> = new BehaviorSubject({})

  constructor(
    private dms: DarkModeService,
    private mc: ModalController
  ) { }

  async ngOnInit() {
    this.darkModeHandler()
    // this.logger = this.state.getState().logger
    // await this.state.updateStateByKey('logger', {user:  await fetchUserAttributes()})
    // setTimeout(() => {
    //   this.loaded = true
    // }, 2000);
  }


  darkModeHandler(){
    this.dms.darkMode$.subscribe((isDark: boolean | undefined) => {
      const lightLogoUrl = './assets/logo/noble_inline.png';
      const darkLogoUrl = './assets/logo/noble_inline_white.png';
      if (isDark) {
        this.LogoUrl = darkLogoUrl;
      } else {
        this.LogoUrl = lightLogoUrl;
      }
    });
  }

  async closeModal(){
    const modal:any = await this.mc.getTop()
    modal.dismiss()
  }

}
