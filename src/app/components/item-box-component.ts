import { Component, Input, ViewEncapsulation } from "@angular/core";
import { environment } from "../environments/environment";
import { Item } from "../models/item";
const resourcesFolder = `${environment.resourcesFolder}`;

@Component({ 
    templateUrl: 'item-box-component.html' ,
    selector: 'item-box',
    styles: ['.tooltip-inner { max-width:max-content !important;}'],
    encapsulation: ViewEncapsulation.None,    
})

export class ItemBoxComponent {            
    @Input()
    item!: Item;
    
    defaultImage = '/assets/item_default.jpg';

    constructor() {
    }  
    
    getImagePath() : string {        
        if(!this.item || !this.item.itemInfo.value) {
            return "";
        }
        var path = resourcesFolder + "/" + this.item.itemInfo.value + ".jpg";
        return path;
    }

    getTooltip() {
        return this.item.nameInfo.description;
    }

}