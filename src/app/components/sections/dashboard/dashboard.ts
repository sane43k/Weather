import { Component, inject } from '@angular/core';
import { CityPreviewCardList } from '../../ui-kit/city/city-preview-card-list/city-preview-card-list';
import { DashboardStore } from '../../../stores/dashboard-store';

@Component({
  selector: 'app-dashboard',
  imports: [CityPreviewCardList],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private dashboardStore = inject(DashboardStore);
  cities = this.dashboardStore.cities;
}
