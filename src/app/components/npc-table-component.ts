import { LiveAnnouncer } from "@angular/cdk/a11y";
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Npc, NpcName } from "../models/npc-model";
import { BackendService } from "../services";
import { SearchPanelComponent } from "./search-panel.component";

interface Level {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'npc-table',
  templateUrl: 'npc-table.html',
})

export class NpcTableComponent implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<Npc> = new MatTableDataSource();
  displayedColumns: string[] = ['name', 'level', 'type', 'sp', 'hp', 'mp', 'p_atk', 'm_atk', 'atk_speed', 'crit', 'def'];
  levels: Level[] = [
    { value: '1-10', viewValue: '1-10' },
    { value: '21-30', viewValue: '21-30' },
    { value: '31-40', viewValue: '31-40' },
    { value: '41-50', viewValue: '41-50' },
    { value: '51-60', viewValue: '51-60' },
    { value: '61-70', viewValue: '61-70' },
    { value: '71-80', viewValue: '71-80' },
    { value: '80-100', viewValue: '80-100' }
  ];
  lvlMin = 1;
  lvlMax = 10;
  npcType = 'Monster';
  npcSubscription!: Subscription;
  chronSubscr!: Subscription;
  selectedChronicle!: string;

  @ViewChild(SearchPanelComponent) search:SearchPanelComponent | undefined;

  constructor(
    private backendService: BackendService, 
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer) { }

  ngOnDestroy(): void {
    this.npcSubscription.unsubscribe();
    this.chronSubscr.unsubscribe();
  }

  @ViewChild(MatSort) sort!: MatSort;

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit(): void {
    this.chronSubscr = this.backendService.chronChoice.subscribe(choice => {
      this.selectedChronicle = choice; 
      this.init()
    });    
  }

  private init() {
    this.npcSubscription = this.backendService.getNpc(this.lvlMin, this.lvlMax, this.npcType)
    .subscribe(res => {
      this.dataSource = new MatTableDataSource(res); 
      this.dataSource.sort = this.sort;});
  }

  levelChange(event: string) {
    var bounds = event.split('-');
    this.lvlMin = Number(bounds[0]);
    this.lvlMax = Number(bounds[1]);
    this.search?.reset();
    this.npcSubscription = this.backendService.getNpc(this.lvlMin, this.lvlMax, this.npcType)
    .subscribe(res => {this.dataSource = new MatTableDataSource(res);this.dataSource.sort = this.sort;});
    this.navigate();
  }

  doSearch(id: number) {    
    this.npcSubscription = this.backendService.getNpcbyId(id).subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
    });
    this.navigateById(id);
  }

  npcTypeChange(event: string) {
    this.npcType = event;
    this.search?.reset();
    this.npcSubscription = this.backendService.getNpc(this.lvlMin, this.lvlMax, this.npcType)
    .subscribe(res => {this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;});
    this.navigate();
  }

  navigate() {
    this.router.navigate(
      [],
      {
          relativeTo: this.activatedRoute,
          queryParams: {
              npcType: this.npcType,
              minLevel: this.lvlMin,
              maxLevel: this.lvlMax,
              chronicle: this.selectedChronicle
          },
      });     
  }
  
  navigateById(id: number) {    
    this.router.navigate(
      [],
      {
          relativeTo: this.activatedRoute,
          queryParams: {
              npcId: id,
              chronicle: this.selectedChronicle            
          },
      });     
  }
}

