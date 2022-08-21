import { Component, EventEmitter, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { Observable, Subscription } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { NpcName } from "../models/npc-model";
import { BackendService } from "../services";

@Component({
    selector: 'search-panel',
    templateUrl: 'search-panel.component.html',
  })
  export class SearchPanelComponent  {
  namesSubscription!: Subscription;
  names: NpcName[] = [];
  filteredOptions!: Observable<NpcName[]>;
  searchControl = new FormControl();

  @Output()
  searchItemId = new EventEmitter();

  constructor(private backendService: BackendService) { }

  ngOnDestroy(): void {
    this.namesSubscription.unsubscribe();
  }

  ngOnInit(): void {  
    this.namesSubscription = this.backendService.getNpcNames().subscribe(res => this.names = res);
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.names.slice();
      }),
    );
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

  private _filter(name: string): NpcName[] {
    const filterValue = name.toLowerCase();

    return this.names.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  
}