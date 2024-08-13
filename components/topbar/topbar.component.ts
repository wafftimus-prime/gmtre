import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { IonBackButton, IonButton, IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar, ModalController } from "@ionic/angular/standalone";
// import { SettingsComponent } from '../settings/settings.component';
// import { DarkModeService } from '../services';
// import { LoggerComponent } from '../logger/logger.component';
// import { AppStateService } from 'src/app/data';
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "gmtre-topbar",
  standalone: true,
  imports: [IonHeader,
    IonToolbar,IonTitle,
    IonButtons,
    IonBackButton,
    IonButton,
    IonIcon,
    CommonModule,

  ],
  templateUrl: "./topbar.component.html",
  styleUrls: ["./topbar.component.scss"],
})
export class TopbarComponent implements OnInit {
  @Input() AppName: string = "";
  @Input() BaseLogoUrl: string = "";
  @Input() WhiteLogoUrl: string = "";
  @Input() HeaderPosition: "start" | "end" | "primary" | "secondary" = "start";
  @Input() HeaderTitle: string = "";
  @Input() HeaderMode: "ios" | "md" = "ios";
  @Input() HeaderColor: string = "clear";
  @Input() HeaderCss: string = "";
  @Input() HeaderStyles: any = {};
  @Input() ShowBackButton: boolean = false;
  @Input() ShowMenuButton: boolean = false;
  @Input() ShowDebuggerButton: boolean = false;
  @Input() IsTranslucent: boolean = false;
  @Input() ShowLogo: boolean = true;

  LogoUrl: string = "";
  HasLogRecords: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isDarkMode: boolean = false;
  constructor(
    private mc: ModalController,
    // private darkModeService: DarkModeService // public state: AppStateService,
  ) {}

  async ngOnInit() {
    this.darkModeHandler();

    // this.state.getState().logger.subscribe((data:any) => {
    //   this.HasLogRecords.next(data.logs.length > 0)
    // });
  }

  darkModeHandler() {
    console.log("Requires implementation")
    // this.darkModeService.darkMode$.subscribe((isDark: boolean | undefined) => {
    //   if (isDark) {
    //     this.LogoUrl = this.WhiteLogoUrl;
    //   } else {
    //     this.LogoUrl = this.BaseLogoUrl;
    //   }
    // });
  }

  async showSystemLog() {
    // const menu = await this.mc.create({
    //   component: LoggerComponent,
    //   // initialBreakpoint: 0.99,
    //   // breakpoints: [0, 0.99],
    //   // presentingElement: await this.mc.getTop(),
    //   showBackdrop: true,
    // });
    // menu.present();
  }

  async openMenu() {
    // const menu = await this.mc.create({
    //   component: SettingsComponent,
    //   // initialBreakpoint: 0.99,
    //   // breakpoints: [0, 0.99],
    //   // presentingElement: await this.mc.getTop(),
    //   showBackdrop: true,
    // });
    // menu.present();
  }
}
