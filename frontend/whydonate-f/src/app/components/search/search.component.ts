import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'services/apiservice';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchQuery!: string;
  searchResults: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private apiService: ApiService
  ) {
    this.route.queryParams.subscribe(params => {
      if (params['title']) {
        this.searchQuery = params['title'];
        this.search();
      }
    });
  }

  search() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.snackBar.open('Unauthorized access.', 'Close', {
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }

    this.apiService.searchTVShows(this.searchQuery, token).subscribe(
      (response: any) => {
        this.searchResults = response;
      },
      (error: any) => {
        console.log(error);
        this.snackBar.open('An error occurred.', 'Close', {
          duration: 3000,
          verticalPosition: 'top'
        });
      }
    );
  }
}
