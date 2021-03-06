import { WINDOW } from '@ng-toolkit/universal';
import { Injector, ChangeDetectorRef, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Meta } from '@angular/platform-browser';

import { Subscription } from 'rxjs';
import { D3Service } from 'd3-ng2-service';
import { TranslateService } from '@ngx-translate/core';
import { Angulartics2GoogleGlobalSiteTag } from 'angulartics2/gst';
import { ScrollToService } from 'ng2-scroll-to-el';

import { BackgroundService } from './services/background.service';
import { LoaderService } from './loader/loader.service';

export class BaseComponent {

  bkgImage: string;
  bkgColor: string;

  protected subscription: Subscription;
  protected interval: any;

  protected colors = ['green', 'yellow', 'red'];

  // Injector classes
  protected router: Router;
  protected translate: TranslateService;
  protected bkgSrv: BackgroundService;
  protected http: HttpClient;
  protected scrollSrv: ScrollToService;
  protected loaderSrv: LoaderService;
  protected cdRef: ChangeDetectorRef;
  protected angulartics: Angulartics2GoogleGlobalSiteTag;
  protected d3Srv: D3Service;
  protected window: any;
  protected platformId: Object;
  protected meta: Meta;

  constructor(injector: Injector) {
    this.router = injector.get(Router);
    this.translate = injector.get(TranslateService);
    this.bkgSrv = injector.get(BackgroundService);
    this.http = injector.get(HttpClient);
    this.scrollSrv = injector.get(ScrollToService);
    this.loaderSrv = injector.get(LoaderService);
    this.cdRef = injector.get(ChangeDetectorRef);
    this.angulartics = injector.get(Angulartics2GoogleGlobalSiteTag);
    this.d3Srv = injector.get(D3Service);
    this.window = injector.get(WINDOW);
    this.platformId = injector.get(PLATFORM_ID);
    this.meta = injector.get(Meta);
  }

  clearTimeout(timeout: any) {
    clearTimeout(timeout);
  }

  clearInterval() {
    clearInterval(this.interval);
  }

  unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  go2Top() {
    if (isPlatformBrowser(this.platformId)) {
      this.scrollSrv.scrollTo('#top');
    }
  }

  getHeightPrevElement(elements: Element[], stopIndex: number) {
    if (isPlatformBrowser(this.platformId)) {
      const widthScreen = window.innerWidth;
      return stopIndex > 0 ?
        (elements.reduce((pe, ce, i) => ((i > 0 && i < stopIndex ? pe += ce.clientHeight : pe += 0), pe), 0)
          + elements[stopIndex].clientHeight * (widthScreen < 768 ? .4 : .6)) :
        elements[stopIndex].clientHeight * (widthScreen < 768 ? .4 : .6);
    }
    return null;
  }

  setCookie(cname: string, cvalue: string, exdays: number) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
  }

  getCookie(cname: string) {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

}
