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
  dataSource: any[] = [];
  npc!: Npc;  

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
  }

  ngOnInit(): void {
    this.routeSubscription = this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (!id) {
        return;
      }
      this.npcSubscription = this.backendService.getNpcDetail(id)
        .subscribe(res => {this.npc = res; this.npcService.setNpc(res)});
    });
  }

  doSearch(id: number) {    
    this.npcSubscription = this.backendService.getNpcDetail(id).subscribe(res => {this.npc = res; this.npcService.setNpc(res)});
    this.navigateById(id);
  }
  
  navigateById(id: number) {
    this.router.navigate(
      [],
      {
          relativeTo: this.activatedRoute,
          queryParams: {
              npcId: id,            
          },
      });     
  }

}