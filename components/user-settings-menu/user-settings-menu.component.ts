import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  IonApp,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonPopover,
  IonRouterLink,
  IonRouterOutlet,
  IonSplitPane,
  PopoverController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  bug,
  chatbubble,
  help,
  logOut,
  logoUsd,
  notifications,
  personCircle,
} from 'ionicons/icons';
import {
  IonicVerticalMenuComponent,
  NavigationMenuItem,
} from '../ionic-vertical-menu';

@Component({
  selector: 'gmtre-user-settings-menu',
  standalone: true,
  imports: [
    IonPopover,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonListHeader,
    IonNote,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    IonRouterLink,
    IonRouterOutlet,
    IonicVerticalMenuComponent,
  ],
  templateUrl: './user-settings-menu.component.html',
  styleUrl: './user-settings-menu.component.scss',
})
export class UserSettingMenuComponent {
  @Input() userMenu: NavigationMenuItem[] = [];

  constructor(public pc: PopoverController) {
    addIcons({
      logoUsd,
      logOut,
      chatbubble,
      notifications,
      personCircle,
      bug,
      help,
    });
  }
}
