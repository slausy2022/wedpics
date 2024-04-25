import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { GalleriePage } from './gallerie.page';

describe('GalleriePage', () => {
  let component: GalleriePage;
  let fixture: ComponentFixture<GalleriePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GalleriePage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(GalleriePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
