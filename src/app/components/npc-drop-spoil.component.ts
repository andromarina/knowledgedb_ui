import { Component, Input} from "@angular/core";
import { Npc } from "../models/npc-model";
import { NpcService } from "../services";

@Component({
    selector: 'npc-drop-spoil',
    templateUrl: 'npc-drop-spoil.html',
  })
  
  export class NpcDropSpoilComponent {
    npc!: Npc | null; 
    
    constructor(private npcService: NpcService) {}

    ngOnInit(): void {
        this.npcService.npc.subscribe(res => this.npc = res)
    }  
}