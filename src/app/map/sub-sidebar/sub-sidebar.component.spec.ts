import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSubSidebarComponent } from './sub-sidebar.component';

describe('MapSubSidebarComponent', () => {
  let component: MapSubSidebarComponent;
  let fixture: ComponentFixture<MapSubSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapSubSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapSubSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
