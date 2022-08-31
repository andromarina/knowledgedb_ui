import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { Npc } from "../models/npc-model";

@Injectable({ providedIn: 'root' })

export class NpcService {
   
    private npcSubject: BehaviorSubject<Npc|null>;
    public npc: Observable<Npc|null>;

    constructor(
        private router: Router,
    ) {
        this.npcSubject = new BehaviorSubject<Npc|null>(null);
        this.npc = this.npcSubject.asObservable();
    }

    public setNpc(npc: Npc) {                   
        this.npcSubject.next(npc);
    }

    public get npcValue(): Npc|null {
        return this.npcSubject.value;
    }
}