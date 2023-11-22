import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailhistoryCartPage } from './detailhistory-cart.page';

describe('DetailhistoryCartPage', () => {
  let component: DetailhistoryCartPage;
  let fixture: ComponentFixture<DetailhistoryCartPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetailhistoryCartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
