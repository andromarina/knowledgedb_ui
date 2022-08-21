export interface Item {   
    nameInfo: ItemNameInfo,
    itemInfo: ItemInfo,
    itemClassId: number,
    min: number,
    max: number,
    chance: number,
    crystal: Crystal
}

export interface Crystal {
    itemClassId: number,
    crystalType: string,
    count: number
}

export interface ItemInfo {
    itemClassId: number,
    value: string,
    kind: number
}

export interface ItemNameInfo {
    itemClassId: number,
    name: string,
    description: string
}