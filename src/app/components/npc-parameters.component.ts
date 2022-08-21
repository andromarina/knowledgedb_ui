import { Component, Input, OnInit} from "@angular/core";
import { Npc } from "../models/npc-model";
import { NpcService } from "../services";

@Component({
    selector: 'npc-parameters',
    templateUrl: 'npc-parameters.html',
  })
  
  export class NpcParametersComponent implements OnInit {    
    npc!: Npc | null; 
    
    constructor(private npcService: NpcService) {}

    ngOnInit(): void {
        this.npcService.npc.subscribe(res => this.npc = res)
    }
}