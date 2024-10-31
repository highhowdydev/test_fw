import {BlipType} from '@/utils/types/blip';

export class Blip {
    #blip: number;

    constructor(x: number, y: number, z: number, blip?: BlipType) {
        this.#blip = AddBlipForCoord(x, y, z);

        if (blip) {
            // Idk set up shit
        }
    }

    public setSprite(sprite: number) {}
    public setAsShortRange(value: boolean) {}
    public setColor(color: number) {}
    public setLabel(label: string) {}
    public setDisplay(display: number) {}
    public setFlashes(flashes: boolean) {}
    public setScale(scale: number) {}
    public setAlpha(alpha: number) {}
    public setRoute(route: boolean) {}
    public setRouteColor(color: number) {}
    public setCoords(x: number, y: number, z: number) {}
    public setHighDetail(value: boolean) {}
    public delete() {}
}
