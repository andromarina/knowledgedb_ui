import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Item } from "../models/item";
import { Npc } from "../models/npc-model";
import { BackendService } from "../services";
import { calculateChance, numberWithCommas } from "./utils";

@Component({
    selector: 'npc-drop-spoil',
    templateUrl: 'npc-drop-spoil.html',
})

export class NpcDropSpoilComponent implements OnInit, OnDestroy{
    private chronSubscr!: Subscription;
    constructor(private backendService: BackendService) {}

    ngOnDestroy(): void {
        this.chronSubscr.unsubscribe();
    }

    ngOnInit(): void {
        this.chronSubscr = this.backendService.chronChoice.subscribe(res => this.chronicle = res);       

        // if(this.dataSource) {
        //     let sortedItems = this.dataSource.sort((first, second) => 0 - (first.chance > second.chance ? -1 : 1));
        //     this.dataSource = sortedItems;
        // }        
    }

    npc!: Npc | null;
    displayedColumns: string[] = ['itemName', 'crystal', 'chance'];
    chronicle = "";

    @Input()
    dataSource: Item[] | undefined;

    calculateChance(chance: number): string {
       return calculateChance(chance);
    }

    displayQuantityFn(item: Item) {
        if(item.max === 1) {
            return '';
        }
        return ' (' + numberWithCommas(item.min) + ' - ' + numberWithCommas( item.max) + ')';
    }

    displayCrystalsFn(item: Item): string {
        if(item.crystal.count === 0) {
            return '-';
        }
        var result =  item.crystal.count.toString();
        if(item.crystal.crystalType != 'NoGrade') {
            result += ' (' + item.crystal.crystalType + ')';
        }
       return result;
    }

    
}