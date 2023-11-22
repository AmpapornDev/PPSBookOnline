import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoryCartPage } from './history-cart.page';

describe('HistoryCartPage', () => {
  let component: HistoryCartPage;
  let fixture: ComponentFixture<HistoryCartPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HistoryCartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
