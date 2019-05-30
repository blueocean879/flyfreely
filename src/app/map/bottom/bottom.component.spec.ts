import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapBottomComponent } from './bottom.component';

describe('MapBottomComponent', () => {
  let component: MapBottomComponent;
  let fixture: ComponentFixture<MapBottomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapBottomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
