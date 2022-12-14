import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemsComponent } from './components/items-component';
import { NpcDetailsComponent } from './components/npc-details.component';
import { NpcTableComponent } from './components/npc-table-component';

const routes: Routes = [
  { path: '', redirectTo: '/npc', pathMatch: 'full' },
  { path: 'npc', component: NpcTableComponent },
  { path: 'npcDetail/:id', component: NpcDetailsComponent },
  { path: 'items', component: ItemsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
