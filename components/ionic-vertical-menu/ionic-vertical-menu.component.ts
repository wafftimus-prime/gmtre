import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import {
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenuToggle,
  IonRouterLink,
  IonContent,
  IonMenu,
  ModalController,
} from '@ionic/angular/standalone';
import { NavigationMenuItem } from './models';

@Component({
  selector: 'ionic-vertical-menu',
  standalone: true,
  imports: [
    IonMenu,
    IonContent,
    IonItem,
    IonListHeader,
    IonList,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    IonRouterLink,
    RouterModule,
    IonMenuToggle,
    IonImg,
    IonIcon,
    IonLabel,
  ],
  templateUrl: './ionic-vertical-menu.component.html',
  styleUrl: './ionic-vertical-menu.component.scss',
})
export class IonicVerticalMenuComponent {
  @Input() menuItems: NavigationMenuItem[];
  @Input() contentId: string;
  @Input() menuId: string;

  @Output() closeAction: EventEmitter<any> = new EventEmitter()

  constructor(
    private mc: ModalController
  ) {
  }

  async menuItemClick(){
    const topModal = await this.mc.getTop()
    topModal?.dismiss()
  }

}