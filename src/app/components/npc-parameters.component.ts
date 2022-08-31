import { Component, Input, OnInit} from "@angular/core";
import { Npc } from "../models/npc-model";


@Component({
    selector: 'npc-parameters',
    templateUrl: 'npc-parameters.html',
  })
  
  export class NpcParametersComponent implements OnInit {
    dataSource! : any[];

    ngOnInit(): void {
      this.dataSource = [ 
        {paramName: 'Acquire Exp Rate', value: this.npc?.acquireExpRate },
        {paramName: 'Acquire Sp', value: this.npc?.sp },
        {paramName: 'Org Hp', value: this.npc?.hp },
        {paramName: 'Org Mp', value: this.npc?.mp },
        {paramName: 'Base Defend', value: this.npc?.def },
        {paramName: 'Base Magic Attack', value: this.npc?.m_atk },
        {paramName: 'Base Magic Defend', value: this.npc?.m_def },
        {paramName: 'Base Physical Attack', value: this.npc?.p_atk },
        {paramName: 'Base Hit Modify', value: this.npc?.physicalHitModify },
        {paramName: 'Base Avoid Modify', value: this.npc?.physicalAvoidModify },
        {paramName: 'Base Attack Speed', value: this.npc?.atk_speed },
        {paramName: 'Base Critical', value: this.npc?.crit },
        {paramName: 'Social', value: this.npc?.social },
      ];      
    }    
   
    displayedColumns: string[] = ['paramName', 'value'];

    @Input()
    npc : Npc | undefined
   
}
