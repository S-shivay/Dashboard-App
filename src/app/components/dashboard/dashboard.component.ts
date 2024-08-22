import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  categories: any[] = [];
  showSliderMenu: boolean = false;
  selectedCategory: any = null;
  newWidgetName: string = '';
  newWidgetContent: string = '';

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.categories = this.dashboardService.getStoredDashboardData().categories;
  }

  
  toggleSliderMenu() {
    this.showSliderMenu = !this.showSliderMenu;
    this.selectedCategory = null; // Reset selected category when reopening the slider
  }

  selectDashboard(category: any) {
    this.selectedCategory = category;
  }

  addWidget() {
    if (this.selectedCategory) {
      const widget = {
        id: Date.now(),
        name: this.newWidgetName,
        content: this.newWidgetContent
      };
      this.dashboardService.addWidget(this.selectedCategory.name, widget);
      this.categories = this.dashboardService.getStoredDashboardData().categories;
      this.toggleSliderMenu(); // Close the slider menu after adding the widget
      this.newWidgetName = '';
      this.newWidgetContent = '';
    }
  }

  removeWidget(category: any, widget: any) {
    this.dashboardService.removeWidget(category.name, widget.id);
    this.categories = this.dashboardService.getStoredDashboardData().categories;
  }
  
}
