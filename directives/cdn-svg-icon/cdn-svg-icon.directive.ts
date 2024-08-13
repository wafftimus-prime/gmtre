import { Directive, Input, OnInit, ElementRef, Renderer2, ChangeDetectorRef, inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Directive({
  standalone: true,
  selector: 'mat-icon[cdnSvgIcon]'
})
export class CdnSvgIconDirective implements OnInit {
  @Input('cdnSvgIcon') iconConfig: string[];

  private readonly baseUrl = 'https://cdn.cardlink.ai/production/assets/icons';
  domSanitizer = inject(DomSanitizer);
  matIconRegistry = inject(MatIconRegistry);

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.addSvgIconIfNeeded();
  }

  // private async addSvgIconIfNeeded(): Promise<void> {
  //   if (!this.iconConfig || this.iconConfig.length !== 2) {
  //     console.warn('Icon configuration must consist of exactly two strings: namespace and icon name.');
  //     return;
  //   }

  //   const [namespace, iconName] = this.iconConfig;
  //   const iconUrl = `${this.baseUrl}/${namespace}/${iconName}.svg`;

  //   try {
  //     const svg1 = await firstValueFrom(this.matIconRegistry.getNamedSvgIcon(iconName, namespace));
  //     const svg2 = await lastValueFrom(this.matIconRegistry.getNamedSvgIcon(iconName, namespace));
  //     console.log(`Icon '${iconName}' in namespace '${namespace}' is already registered.`);
  //   } catch {
  //     const safeUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(iconUrl);
  //     this.matIconRegistry.addSvgIconInNamespace(namespace, iconName, safeUrl).subscribe(
  //       () => {
  //         this.renderer.setAttribute(this.el.nativeElement, 'svgIcon', `${namespace}:${iconName}`);
  //       },
  //       (error) => {
  //         console.error('Error adding SVG icon:', error);
  //       }
  //     );
  //   }
  //   this.renderer.setAttribute(this.el.nativeElement, 'svgIcon', `${namespace}:${iconName}`);
  // }

  private async addSvgIconIfNeeded(): Promise<void> {
    if (!this.iconConfig || this.iconConfig.length !== 2) {
      console.warn('Icon configuration must consist of exactly two strings.');
      return;
    }
    const [namespace, iconName] = this.iconConfig;
    const iconUrl = `${this.baseUrl}/${namespace}/${iconName}.svg`;


    try {
      await firstValueFrom(this.matIconRegistry.getNamedSvgIcon(iconName, namespace)); 
      // await firstValueFrom(this.matIconRegistry.getNamedSvgIcon(iconName));

      // const svg1 = await firstValueFrom(this.matIconRegistry.getNamedSvgIcon(iconName, namespace));
      // const svg2 = await lastValueFrom(this.matIconRegistry.getNamedSvgIcon(iconName, namespace));
      

      console.log(`Icon '${iconName}' is already registered.`);
    } catch {
      const safeUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(iconUrl);
      console.log(safeUrl)
      await this.matIconRegistry.addSvgIconInNamespace(namespace, iconName, safeUrl)
      this.renderer.setAttribute(this.el.nativeElement, 'svgIcon', `${namespace}:${iconName}`);
      
      // const matIcon = this.el.nativeElement as HTMLElement;
      // matIcon.setAttribute('svgIcon', `${namespace}:${iconName}`);
      // console.log(`Icon '${namespace}:${iconName}' has been registered.`);

      this.cdr.markForCheck()
      // console.log(matIcon)


    }
  }
}