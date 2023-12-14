import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownNavComponent } from './dropdown-nav.component';

describe('DropdownNavComponent', () => {
  let component: DropdownNavComponent;
  let fixture: ComponentFixture<DropdownNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropdownNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
