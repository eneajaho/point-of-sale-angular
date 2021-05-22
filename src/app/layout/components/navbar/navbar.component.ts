import {ChangeDetectionStrategy, Component} from '@angular/core';
import {LayoutService} from '../../services/layout.service';
import {Observable} from 'rxjs';
import {AuthService} from '@core/services/auth.service';
import {pluck} from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {

  navItems = this.layoutService.navItems;

  name$ = this.auth.auth$.pipe(pluck('name'));

  constructor(
    private layoutService: LayoutService,
    public auth: AuthService
  ) { }

}
