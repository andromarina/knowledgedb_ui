import { Item } from "./item";

export interface Npc {
    npcName: NpcName
    level: number;
    sp: number;
    hp: number;
    mp: number;
    p_atk: number;
    m_atk: number;
    m_def?: number;
    atk_speed: number;
    crit: number;
    def: number;
    acquireExpRate?:number;
    physicalHitModify?: number;
    physicalAvoidModify?: number;
    social?: boolean;
    isLocationExist?: boolean;
    corpseMakeList?: Item[];
    additionalMakeMultiList?: Item[];
    skillList?: NpcSkill[];
    drop: Item[];
    spoil: Item[];
}

export interface NpcName {
    id: number;
    nick: string;
    name: string;
    npcType: string;
    nickColor?: string;
}

export interface NpcSkill {
    skillId: number;
    skillLevel: number;
}