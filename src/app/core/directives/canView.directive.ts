import { Directive, Input, NgModule, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[canView]'
})
export class HideForDirective {

  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private auth: AuthService
  ) { }

  @Input() set canView(role: 'manager' | 'admin' | 'user' | 'economist') {
    switch (role) {

      case 'admin':
        if (this.isAdmin()) {
          this.viewContainer.createEmbeddedView(this.templateRef);
          this.hasView = true;
        } else {
          this.hide();
        }


    }
    // // if role is agent, than hide for agent
    // // console.log(role);
    // if (role === 'Agent' && this.isAgent()) {
    //   this.viewContainer.clear();
    //   this.hasView = false;
    //   // console.log('hiding for agent');
    // }
    // // if role is admin, than hide for admin
    // else if (role === 'Admin' && this.isAdmin()) {
    //   this.viewContainer.clear();
    //   this.hasView = false;
    //   // console.log('hiding for admin');
    // } else if (!this.hasView) {
    //   // console.log('show for everyone');
    //   this.viewContainer.createEmbeddedView(this.templateRef);
    //   this.hasView = true;
    // }
  }

  hide(): void {
    this.viewContainer.clear();
    this.hasView = false;
  }

  isAdmin(): boolean {
    return this.auth.state.role === 'admin';
  }

  isUser(): boolean {
    return this.auth.state.role === 'user';
  }

  isManager(): boolean {
    return this.auth.state.role === 'manager';
  }

  isEconomist(): boolean {
    return this.auth.state.role === 'economist';
  }

}


@NgModule({
  declarations: [
    HideForDirective
  ],
  exports: [
    HideForDirective
  ]
})
export class HideForModule {
}
