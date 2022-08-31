import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "../environments/environment";
import { Npc, NpcName } from "../models/npc-model";
import { ItemNameInfo, ItemOwners } from "../models/item";

@Injectable({ providedIn: 'root' })

export class BackendService {
    private envUrl = `${environment.apiUrl}/database`;
    private alias = "";
    private chronChoiceSubject: BehaviorSubject<string>;
    public chronChoice: Observable<string>;    
  
    constructor(
        private http: HttpClient,
    ) {
        this.chronChoiceSubject = new BehaviorSubject<string>( "c4");
        this.chronChoice = this.chronChoiceSubject.asObservable(); 
        this.chronChoiceSubject.subscribe( chronChoice =>  {
            this.alias = chronChoice;
        });   
    }

    public get chronicleChoiceValue(): string {
        return this.chronChoiceSubject.value;
    }

    public setChronChoice(choice: string) { 
        
        if(this.chronicleChoiceValue != choice) {  
            console.log("set: " +choice ); 
            this.chronChoiceSubject.next(choice);
        }   
    }

    getNpc(minLevel: number, maxLevel: number, type: string): Observable<Npc[]> {
        return this.http.get<any[]>(`${this.envUrl}/getNpc?alias=` + this.alias + `&minlevel=` + minLevel + `&maxLevel=` + maxLevel + `&type=` + type)
        .pipe(
            map(o => o.map((npc): Npc => ({
                npcName: npc.name,
                level: npc.value.level,
                sp: npc.value.acquireSp, 
                hp: npc.value.orgHp,
                mp: npc.value.orgMp,
                p_atk: npc.value.basePhysicalAttack,
                m_atk: npc.value.baseMagicAttack,
                atk_speed: npc.value.baseAttackSpeed,
                crit: npc.value.baseCritical,
                def: npc.value.baseDefend,
                isLocationExist: npc.isLocationExist,
                drop: [],
                spoil: []
            }))))       
    }

    getNpcbyId(npcId: number): Observable<Npc[]> {
        return this.http.get<any[]>(`${this.envUrl}/getNpcById?alias=` + this.alias + `&npcId=` + npcId)
        .pipe(
            map(o => o.map((npc): Npc => ({
                npcName: npc.name,
                level: npc.value.level,
                sp: npc.value.acquireSp, 
                hp: npc.value.orgHp,
                mp: npc.value.orgMp,
                p_atk: npc.value.basePhysicalAttack,
                m_atk: npc.value.baseMagicAttack,
                atk_speed: npc.value.baseAttackSpeed,
                crit: npc.value.baseCritical,
                def: npc.value.baseDefend,
                drop: [],
                spoil: []
            }))))       
    }

    getNpcDetail(npcId: number): Observable<Npc> {
        return this.http.get<any>(`${this.envUrl}/getNpcDetail?alias=` + this.alias + `&npcId=` + npcId)
        .pipe(map (npc => ({
            npcName: npc.npcName,
            level: npc.npcData.level,                                
            acquireExpRate: npc.npcData.acquireExpRate,
            sp: npc.npcData.acquireSp,

            hp: npc.npcData.orgHp,
            mp: npc.npcData.orgMp,
            p_atk: npc.npcData.basePhysicalAttack,
            m_atk: npc.npcData.baseMagicAttack,                
            def: npc.npcData.baseDefend,
            atk_speed: npc.npcData.baseAttackSpeed,
            crit: npc.npcData.baseCritical,
            m_def: npc.npcData.baseMagicDefend,
            physicalHitModify: npc.npcData.physicalHitModify,
            physicalAvoidModify: npc.npcData.physicalAvoidModify,
            social: npc.npcData.social,
            isLocationExist: npc.isLocationExist,
            additionalMakeMultiList: npc.npcData.additionalMakeMultiList,
            corpseMakeList: npc.npcData.corpseMakeList,
            skillList: npc.npcData.skillList,
            drop: npc.drop,
            spoil: npc.spoil
        })));     
    }


    getNpcNames(): Observable<NpcName[]> {
        return this.http.get<any[]>(`${this.envUrl}/getNpcNames?alias=` + this.alias)
        .pipe(
            map(o => o.map((npc): NpcName => ({
                id: npc.id,
                name: npc.name,
                nick: npc.nick,
                npcType: npc.type
            }))))            
    }

    getMap(npcId: number) {
        return this.http.get<any>(`${this.envUrl}/getMap?alias=` + this.alias + `&npcId=` + npcId)
    }

    getItemOwners(itemId: number): Observable<ItemOwners> {
        return this.http.get<any>(`${this.envUrl}/getItemOwners?alias=` + this.alias + `&itemId=` + itemId)
    }

    getItemNames(): Observable<ItemNameInfo[]> {        
        return this.http.get<any>(`${this.envUrl}/getItemNames?alias=` + this.alias)
    }
}
