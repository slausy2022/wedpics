import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthentPage } from './authent.page';

describe('AuthentPage', () => {
  let component: AuthentPage;
  let fixture: ComponentFixture<AuthentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
