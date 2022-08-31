import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  
  constructor(private backendService: BackendService, 
    private router: Router,
    private activatedRoute: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.selectedChronicle = params.chronicle; 
      this.backendService.setChronChoice(this.selectedChronicle)})
  }

  @ViewChild('sidenav')
  sidenav!: MatSidenav;

  isExpanded = true;
  isShowing = false;
  title = 'Knowledge Database';
  selectedChronicle = 'c4';

  chronChange(value: string) {
    this.backendService.setChronChoice(value);
    this.navigate(value);
  }

  navigate(chron: string) {
    this.router.navigate(
      [],
      {
          relativeTo: this.activatedRoute,
          queryParams: {
              chronicle: chron
          },
          queryParamsHandling: 'merge'
      });
  
  }
}
