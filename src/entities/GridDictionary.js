export class GridDictionary {
    constructor() {
        this.map = new Map();
    }
    key(coords) {
        return `${coords.x}-${coords.y}`;
    }
    set(coords, value) {
        const key = this.key(coords);
        this.map.set(key, value);
    }
    get(coords) {
        const key = this.key(coords);
        return this.map.get(key);
    }
}

export default GridDictionary;
