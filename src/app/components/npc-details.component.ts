import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Npc } from "../models/npc-model";
import { BackendService, NpcService } from "../services";

@Component({
  selector: 'npc-details',
  templateUrl: 'npc-details.component.html',
})
export class NpcDetailsComponent implements OnInit, OnDestroy {
  npcSubscription!: Subscription;
  routeSubscription!: Subscription;
  chronicleSubscription!: Subscription;
  selectedTabSubscr!: Subscription;
  dataSource: any[] = [];
  selectedTab = 0;
  selectedChronicle = "";
  npc!: Npc;
  activeId = -1;

  constructor(private backendService: BackendService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private npcService: NpcService) { }

  ngOnDestroy(): void {
    if (this.npcSubscription) {
      this.npcSubscription.unsubscribe();
    }
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.chronicleSubscription) {
      this.chronicleSubscription.unsubscribe();
    }
    if (this.selectedTabSubscr) {
      this.selectedTabSubscr.unsubscribe();
    }
  }

  ngOnInit(): void {

    this.routeSubscription = this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (!id) {
        return;
      }
      this.activeId = id;    
    });
    this.selectedTabSubscr = this.activatedRoute.queryParams.subscribe(params => this.selectedTab = params.tab);

    this.chronicleSubscription = this.backendService.chronChoice.subscribe(res => {    
        this.init(this.activeId);
        this.selectedChronicle = res;      
    });
  }

  init(id: number) {
    console.log("npc details init: " + id);
    this.npcSubscription = this.backendService.getNpcDetail(id)
      .subscribe(res => { this.npc = res; this.npcService.setNpc(res) });

  }

  doSearch(id: number) {
    this.npcSubscription = this.backendService.getNpcDetail(id).subscribe(res => { this.npc = res; this.npcService.setNpc(res) });
    this.navigateById(id);
  }

  navigateById(id: number) {
    this.router.navigate(
      ['../' + id],
      {
        relativeTo: this.activatedRoute,
        queryParams: {
          tab: this.selectedTab
        },
        queryParamsHandling: 'merge'
      });
  }

  navigateByTab(tabIndex: number) {
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: {
          tab: tabIndex
        },
        queryParamsHandling: 'merge'
      });
  }

  setSelected(tab: any) {
    this.navigateByTab(tab.index);
  }

}