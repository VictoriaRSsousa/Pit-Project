import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FireSystemComponent } from './fire-system.component';

describe('FireSystemComponent', () => {
  let component: FireSystemComponent;
  let fixture: ComponentFixture<FireSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FireSystemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FireSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
