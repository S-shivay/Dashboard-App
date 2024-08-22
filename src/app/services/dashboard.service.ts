import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  getDashboardData() {
    return {
      categories: [
        {
          name: 'CSPM Dashboard',
          widgets: [] // Start with an empty array, or dynamically load data here
        },
        {
          name: 'CWPP Dashboard',
          widgets: [] // Start with an empty array, or dynamically load data here
        }
      ]
    };
  }

  addWidget(categoryName: string, widget: any) {
    let dashboardData = this.getStoredDashboardData();
    let category = dashboardData.categories.find((cat: any) => cat.name === categoryName);
    if (category) {
      category.widgets.push(widget);
      this.setStoredDashboardData(dashboardData);
    }
  }

  removeWidget(categoryName: string, widgetId: number) {
    let dashboardData = this.getStoredDashboardData();
    let category = dashboardData.categories.find((cat: any) => cat.name === categoryName);
    if (category) {
      category.widgets = category.widgets.filter((widget: any) => widget.id !== widgetId);
      this.setStoredDashboardData(dashboardData);
    }
  }

  getStoredDashboardData() {
    return JSON.parse(localStorage.getItem('dashboardData') || JSON.stringify(this.getDashboardData()));
  }

  setStoredDashboardData(data: any) {
    localStorage.setItem('dashboardData', JSON.stringify(data));
  }
}
