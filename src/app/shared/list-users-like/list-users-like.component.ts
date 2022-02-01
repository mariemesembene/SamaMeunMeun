import { Component, Input, OnInit } from '@angular/core';
import { Like } from 'src/app/core/models/Like';
import { User } from 'src/app/core/models/User';

@Component({
  selector: 'app-list-users-like',
  templateUrl: './list-users-like.component.html',
  styleUrls: ['./list-users-like.component.css']
})
export class ListUsersLikeComponent implements OnInit {

  constructor() { }

  data: Like[];
  ngOnInit(): void {
    console.log(history.state.data.users);
    this.data = history.state.data.users;
  }

}
