import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapLeftComponent } from './left.component';

describe('MapLeftComponent', () => {
  let component: MapLeftComponent;
  let fixture: ComponentFixture<MapLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
