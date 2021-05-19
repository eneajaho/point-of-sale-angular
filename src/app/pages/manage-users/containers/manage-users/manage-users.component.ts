import {Component, OnInit} from '@angular/core';
import {UsersService} from '@core/services/users.service';
import {map} from 'rxjs/operators';
import { fadeIn } from '@app/animations/fadeIn.animation';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
  animations: [ fadeIn ]
})
export class ManageUsersComponent implements OnInit {

  users$ = this.usersService.users$;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.loadUsers();
  }

  filterUsers(name: string): void {
    this.users$ = this.usersService.users$.pipe(
      map(users => users.filter(u => u.name.toLowerCase().includes(name.toLowerCase())))
    );
  }

  delete(id: number): void {
    this.usersService.delete(id);
  }


}
