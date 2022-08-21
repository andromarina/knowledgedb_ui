import { AfterViewInit, Component, ElementRef, Input, OnInit, SecurityContext, ViewChild } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Npc } from "../models/npc-model";
import { BackendService, NpcService } from "../services";

@Component({
  selector: 'npc-location',
  templateUrl: 'location.component.html',
})
export class NpcLocationComponent  implements OnInit {

    constructor(private backendService: BackendService, private _sanitizer: DomSanitizer, private npcService: NpcService) {}
    
    @Input() public width = 906;
    @Input() public height = 1310;
    npc!: Npc | null; 
 
    ngOnInit(): void {
        const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
        this.cx = canvasEl.getContext('2d')!;
        canvasEl.width = this.width;
        canvasEl.height = this.height;
        this.npcService.npc.subscribe(res => {
            this.npc = res; this.drawMap(); 
            this.drawLocation();})
    }

    @ViewChild("mapCanvas", {static: true})
    public canvas!: ElementRef;    
    private cx!: CanvasRenderingContext2D;  
    
    createImageFromBase64(image: any): string {        
        var url = this._sanitizer.sanitize(SecurityContext.RESOURCE_URL, this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
        + image.map));
        return url? url : "";
    }

    drawMap() {
        let image = new Image(); 
        image.onload = ()=> {
            this.cx.drawImage(image, 0, 0, this.width, this.height);
        }
        image.src = "/assets/map.jpg";
    }

    drawLocation() {
        if(!this.npc) {
            return;
        }
        this.backendService.getMap(this.npc.npcName.id).subscribe(res =>
            {
                var imageUrl = this.createImageFromBase64(res);
                let image = new Image();
                image.onload = ()=> {
                    this.cx.drawImage(image, 0, 0, this.width, this.height);                    
                }
                image.src = imageUrl;
            });
    }

}