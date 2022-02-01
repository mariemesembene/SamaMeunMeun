import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUsersLikeComponent } from './list-users-like.component';

describe('ListUsersLikeComponent', () => {
  let component: ListUsersLikeComponent;
  let fixture: ComponentFixture<ListUsersLikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUsersLikeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUsersLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
