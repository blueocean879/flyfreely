import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSidebarComponent } from './sidebar.component';

describe('MapSidebarComponent', () => {
  let component: MapSidebarComponent;
  let fixture: ComponentFixture<MapSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
