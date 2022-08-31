import { Component, EventEmitter, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { Subscription } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { ItemNameInfo } from "../models/item";
import { BackendService } from "../services";

@Component({
  selector: 'item-search-panel',
  templateUrl: 'item-search-panel.html',
})
export class ItemsSearchPanel {
  namesSubscription!: Subscription;
  chronChoiceSubscription!: Subscription;
  valueChangeSubscription!: Subscription;
  names: ItemNameInfo[] = [];
  filteredOptions!: ItemNameInfo[];
  searchControl = new FormControl();
  chronicleChoice = "";
  public height: string = '100';

  @Output()
  searchItemId = new EventEmitter();

  constructor(private backendService: BackendService) { }

  ngOnDestroy(): void {
    this.namesSubscription.unsubscribe();
    this.chronChoiceSubscription.unsubscribe();
    this.valueChangeSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.chronChoiceSubscription = this.backendService.chronChoice.subscribe(res => {this.chronicleChoice = res; this.init()});    
  }

  init() {
    this.namesSubscription = this.backendService.getItemNames().subscribe(res => this.names = res);
    this.valueChangeSubscription = this.searchControl.valueChanges
      .pipe(
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
    var selected = event.option.value;
    this.searchItemId.emit(selected);
  }

  displayFn(nameInfo: ItemNameInfo): string {
    if (!nameInfo) {
      return '';
    }
    var result = '#' + nameInfo.itemClassId + ' ';
    result += nameInfo.name;
    return result;
  }

}