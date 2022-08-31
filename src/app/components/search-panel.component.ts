import { Component, EventEmitter, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { Subscription } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { NpcName } from "../models/npc-model";
import { BackendService } from "../services";

@Component({
    selector: 'search-panel',
    templateUrl: 'search-panel.component.html',
  })
  export class SearchPanelComponent  {
  namesSubscription!: Subscription;
  chronSubscr!: Subscription;
  valuesChangeSubscr!: Subscription;

  names: NpcName[] = [];
  filteredOptions!: NpcName[];
  searchControl = new FormControl();
  chronicleChoice = "";
  public height: string = '100';

  @Output()
  searchItemId = new EventEmitter();

  constructor(private backendService: BackendService) { }

  ngOnDestroy(): void {
    this.namesSubscription.unsubscribe();
    this.chronSubscr.unsubscribe();
    this.valuesChangeSubscr.unsubscribe();
  }

  ngOnInit(): void {  
    this.chronSubscr = this.backendService.chronChoice.subscribe(res => {this.chronicleChoice = res; this.init()}); 
  }

  init() {
    this.namesSubscription = this.backendService.getNpcNames().subscribe(res => this.names = res);
    this.valuesChangeSubscr = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        if (!value) {
          return;
        }
        this.filteredOptions = this.names.filter(option => option.name.toLowerCase().includes(value.toString().toLowerCase()));

        // Recompute how big the viewport should be.
        if (this.filteredOptions.length < 4) {
          this.height = (this.filteredOptions.length * 50) + 'px';
        } else {
          this.height = '200px'
        }
      })
     ).subscribe();
  }

  reset() {
    this.searchControl.reset();
  }

  doSearch(event: MatAutocompleteSelectedEvent) {
    var selectedId = event.option.value.id;
    this.searchItemId.emit(selectedId);
  }

  displayFn(npcName: NpcName): string {   
    if(!npcName) {
      return '';
    }
    var result = '#' + npcName.id + ' ';
    if(npcName.nick) {
        result += '[' + npcName.nick + '] ';
    }
    result += npcName.name;
    return  result;
  }
  
}