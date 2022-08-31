import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Item, ItemNameInfo, ItemOwners } from "../models/item";
import { BackendService } from "../services";
import { ItemsSearchPanel } from "./items-search-panel.component";
import { calculateChance, numberWithCommas } from "./utils";

@Component({
    selector: 'items-component',
    templateUrl: 'items-component.html',
})
export class ItemsComponent implements OnInit, OnDestroy {
    private subscription!: Subscription;
    itemOwners: ItemOwners | null | undefined;
    dropDataSource : any[] = [];
    spoilDataSource : any[] = [];
    displayedColumns: string[] = ['npcName', 'type', 'quantity', 'chance'];
    selectedChronicle!: string;
    routeSubscription!: Subscription;
    chronSubscr!: Subscription;
    activeId: number = -1;

    @ViewChild(ItemsSearchPanel) search:ItemsSearchPanel | undefined;

    constructor(private backendService: BackendService,
        private router: Router,
        private activatedRoute: ActivatedRoute) { }

    ngOnDestroy(): void {
        if(this.subscription) {
            this.subscription.unsubscribe();
        }
        if(this.routeSubscription) {
            this.routeSubscription.unsubscribe();
        }
        this.chronSubscr.unsubscribe();
    }

    ngOnInit(): void {
        this.routeSubscription = this.activatedRoute.queryParams.subscribe(params => {
            const id = params['itemId'];
            if (!id) {
              this.itemOwners = null;
              this.search?.reset();
              return;
            }
            this.activeId = id;
        });
        this.chronSubscr = this.backendService.chronChoice.subscribe(res => {this.selectedChronicle = res; this.init(this.activeId);})
    }

    init(id: number) {   
        if(this.activeId === -1) {
            return;
        }    
            this.subscription = this.backendService.getItemOwners(id)
              .subscribe(res => {
                this.itemOwners = res; 
                this.dropDataSource = this.itemOwners.drop;
                this.spoilDataSource = this.itemOwners.spoil;
            });        
    }

    displayQuantity(item: any): string {       
        if(item.max === 1) {
            return numberWithCommas(item.min);
        }
        return numberWithCommas(item.min) + ' - ' + numberWithCommas( item.max);
    }

    calculateChance(chance: number): string {
        return calculateChance(chance);
    }

    doSearch(item: ItemNameInfo) {
        if(!item) {
            return;
        }
        this.subscription = this.backendService.getItemOwners(item.itemClassId).subscribe(res => {
            this.itemOwners = res; 
            this.dropDataSource = this.itemOwners.drop;
            this.spoilDataSource = this.itemOwners.spoil;
        });
        this.navigateById(item.itemClassId);
    }

    navigateById(id: number) {
        this.router.navigate(
            [],
            {
                relativeTo: this.activatedRoute,
                queryParams: {
                    itemId: id,
                    chronicle: this.selectedChronicle
                },
            });
    }
    
}