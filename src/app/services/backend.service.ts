import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { Npc, NpcName } from "../models/npc-model";

@Injectable({ providedIn: 'root' })
export class BackendService {
    private envUrl = `${environment.apiUrl}/database`;
    private baseUrl = this.envUrl;    
  
    constructor(
        private http: HttpClient,
    ) {}

    getNpc(minLevel: number, maxLevel: number, type: string): Observable<Npc[]> {
        return this.http.get<any[]>(`${this.baseUrl}/getNpc?minlevel=` + minLevel + `&maxLevel=` + maxLevel + `&type=` + type)
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

    getNpcbyId(npcId: number): Observable<Npc[]> {
        return this.http.get<any[]>(`${this.baseUrl}/getNpcById?npcId=` + npcId)
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
        return this.http.get<any>(`${this.baseUrl}/getNpcDetail?npcId=` + npcId)
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
        return this.http.get<any[]>(`${this.baseUrl}/getNpcNames`)
        .pipe(
            map(o => o.map((npc): NpcName => ({
                id: npc.id,
                name: npc.name,
                nick: npc.nick,
                npcType: npc.type
            }))))            
    }

    getMap(npcId: number) {
        return this.http.get<any>(`${this.baseUrl}/getMap?npcId=` + npcId)
    }
}
