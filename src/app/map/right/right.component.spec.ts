import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapRightComponent } from './right.component';

describe('MapRightComponent', () => {
  let component: MapRightComponent;
  let fixture: ComponentFixture<MapRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
