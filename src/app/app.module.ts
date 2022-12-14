import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NpcTableComponent } from './components/npc-table-component';
import { HttpClientModule } from '@angular/common/http';
import { SearchPanelComponent } from './components/search-panel.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NpcDetailsComponent } from './components/npc-details.component';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { NpcParametersComponent } from './components/npc-parameters.component';
import { NpcDropSpoilComponent } from './components/npc-drop-spoil.component';
import { NpcLocationComponent } from './components/location.component';
import { ItemBoxComponent } from './components/item-box-component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar'
import { ItemsComponent } from './components/items-component';
import { ItemsSearchPanel } from './components/items-search-panel.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatSortModule} from '@angular/material/sort';
 

@NgModule({
  declarations: [
    AppComponent,
    NpcTableComponent,
    SearchPanelComponent,
    NpcDetailsComponent,
    NpcParametersComponent,
    NpcDropSpoilComponent,
    NpcLocationComponent,
    ItemBoxComponent,
    ItemsComponent,
    ItemsSearchPanel
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    HttpClientModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatCardModule,
    MatTabsModule,
    LazyLoadImageModule,
    MatTooltipModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    ScrollingModule,
    MatSortModule
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
