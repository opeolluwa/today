import { Feature } from '../feature';
export declare class ProjectionFeature extends Feature {
    static key: "projection";
    private projection;
    constructor(state: any);
    initProjection(): void;
    setOptions(): void;
    update(): void;
    mount(): void;
}
