type NumberOrString = number | string;
interface HEXObject {
    R: string;
    G: string;
    B: string;
    A?: string;
}
interface RGBObject {
    R: number;
    G: number;
    B: number;
    A?: number;
}
interface RGBObjectGeneric {
    R: NumberOrString;
    G: NumberOrString;
    B: NumberOrString;
    A?: NumberOrString;
}
interface HSLObject {
    H: number;
    S: number;
    L: number;
    A?: number;
}
interface HSLObjectGeneric {
    H: number;
    S: NumberOrString;
    L: NumberOrString;
    A?: NumberOrString;
}
interface HWBObject {
    H: number;
    W: number;
    B: number;
    A?: number;
}
interface HWBObjectGeneric {
    H: number;
    W: NumberOrString;
    B: NumberOrString;
    A?: NumberOrString;
}
interface CIELabObject {
    L: number;
    a: number;
    b: number;
    A?: number;
}
interface CIELabObjectGeneric {
    L: NumberOrString;
    a: NumberOrString;
    b: NumberOrString;
    A?: NumberOrString;
}
interface LCHObject {
    L: number;
    C: number;
    H: number;
    A?: number;
}
interface LCHObjectGeneric {
    L: NumberOrString;
    C: NumberOrString;
    H: NumberOrString;
    A?: NumberOrString;
}
interface CMYKObject {
    C: number;
    M: number;
    Y: number;
    K: number;
    A?: number;
}
interface CMYKObjectGeneric {
    C: NumberOrString;
    M: NumberOrString;
    Y: NumberOrString;
    K: NumberOrString;
    A?: NumberOrString;
}
type Color = RGBObjectGeneric | HSLObjectGeneric | HWBObjectGeneric | CMYKObjectGeneric | CIELabObjectGeneric | LCHObjectGeneric;
type ColorInput = string | Color;
declare enum AnglesUnitEnum {
    NONE = "none",
    DEGREES = "deg",
    GRADIANS = "grad",
    RADIANS = "rad",
    TURNS = "turn"
}
declare enum ColorUnitEnum {
    NONE = "none",
    PERCENT = "percent"
}
declare enum CMYKFunctionEnum {
    DEVICE_CMYK = "device-cmyk",
    CMYK = "cmyk"
}
interface Options {
    decimals: number;
    legacyCSS: boolean;
    spacesAfterCommas: boolean;
    anglesUnit: `${AnglesUnitEnum}`;
    rgbUnit: `${ColorUnitEnum}`;
    labUnit: `${ColorUnitEnum}`;
    lchUnit: `${ColorUnitEnum}`;
    cmykUnit: `${ColorUnitEnum}`;
    alphaUnit: `${ColorUnitEnum}`;
    cmykFunction: `${CMYKFunctionEnum}`;
}
type InputOptions = Partial<Options>;
declare enum Harmony {
    ANALOGOUS = "ANALOGOUS",
    COMPLEMENTARY = "COMPLEMENTARY",
    SPLIT_COMPLEMENTARY = "SPLIT_COMPLEMENTARY",
    TRIADIC = "TRIADIC",
    TETRADIC = "TETRADIC",
    SQUARE = "SQUARE"
}
declare enum Mix {
    ADDITIVE = "ADDITIVE",
    SUBTRACTIVE = "SUBTRACTIVE"
}
type MixString = `${Mix}`;
declare class ColorTranslator {
    constructor(color: ColorInput, options?: InputOptions);
    private _options;
    private rgb;
    private hsl;
    private hwb;
    private lab;
    private lch;
    private cmyk;
    private update;
    private updateRGB;
    private updateHSL;
    private updateHWB;
    private updateLAB;
    private updateLCH;
    private updateCMYK;
    private updateRGBFromHWB;
    private updateRGBFromLCH;
    private updateRGBFromCMYK;
    private updateRGBFromLAB;
    private updateLCHFromLAB;
    private updateLABromLCH;
    setOptions(options?: InputOptions): ColorTranslator;
    setR(R: number): ColorTranslator;
    setG(G: number): ColorTranslator;
    setB(B: number): ColorTranslator;
    setH(H: number): ColorTranslator;
    setS(S: number): ColorTranslator;
    setL(L: number): ColorTranslator;
    setWhiteness(W: number): ColorTranslator;
    setBlackness(B: number): ColorTranslator;
    setCIEL(L: number): ColorTranslator;
    setCIEa(a: number): ColorTranslator;
    setCIEb(b: number): ColorTranslator;
    setLCHL(l: number): ColorTranslator;
    setLCHC(c: number): ColorTranslator;
    setLCHH(h: number): ColorTranslator;
    setA(A: number): ColorTranslator;
    setC(C: number): ColorTranslator;
    setM(M: number): ColorTranslator;
    setY(Y: number): ColorTranslator;
    setK(K: number): ColorTranslator;
    get options(): Options;
    get R(): number;
    get G(): number;
    get B(): number;
    get H(): number;
    get S(): number;
    get L(): number;
    get Whiteness(): number;
    get Blackness(): number;
    get CIEL(): number;
    get CIEa(): number;
    get CIEb(): number;
    get LCHL(): number;
    get LCHC(): number;
    get LCHH(): number;
    get A(): number;
    get C(): number;
    get M(): number;
    get Y(): number;
    get K(): number;
    get HEXObject(): HEXObject;
    get HEXAObject(): HEXObject;
    get RGBObject(): RGBObject;
    get RGBAObject(): RGBObject;
    get HSLObject(): HSLObject;
    get HSLAObject(): HSLObject;
    get HWBObject(): HWBObject;
    get HWBAObject(): HWBObject;
    get CIELabObject(): CIELabObject;
    get CIELabAObject(): CIELabObject;
    get LCHObject(): LCHObject;
    get LCHAObject(): LCHObject;
    get CMYKObject(): CMYKObject;
    get CMYKAObject(): CMYKObject;
    get HEX(): string;
    get HEXA(): string;
    get RGB(): string;
    get RGBA(): string;
    get HSL(): string;
    get HSLA(): string;
    get HWB(): string;
    get HWBA(): string;
    get CIELab(): string;
    get CIELabA(): string;
    get LCH(): string;
    get LCHA(): string;
    get CMYK(): string;
    get CMYKA(): string;
    static toHEXObject(color: ColorInput): HEXObject;
    static toHEX(color: ColorInput): string;
    static toHEXAObject(color: ColorInput): HEXObject;
    static toHEXA(color: ColorInput): string;
    static toRGBObject(color: ColorInput, options?: InputOptions): RGBObject;
    static toRGB(color: ColorInput, options?: InputOptions): string;
    static toRGBAObject(color: ColorInput, options?: InputOptions): RGBObject;
    static toRGBA(color: ColorInput, options?: InputOptions): string;
    static toHSLObject(color: ColorInput, options?: InputOptions): HSLObject;
    static toHSL(color: ColorInput, options?: InputOptions): string;
    static toHSLAObject(color: ColorInput, options?: InputOptions): HSLObject;
    static toHSLA(color: ColorInput, options?: InputOptions): string;
    static toHWBObject(color: ColorInput, options?: InputOptions): HWBObject;
    static toHWB(color: ColorInput, options?: InputOptions): string;
    static toHWBAObject(color: ColorInput, options?: InputOptions): HWBObject;
    static toHWBA(color: ColorInput, options?: InputOptions): string;
    static toCIELabObject(color: ColorInput, options?: InputOptions): CIELabObject;
    static toCIELab(color: ColorInput, options?: InputOptions): string;
    static toCIELabAObject(color: ColorInput, options?: InputOptions): CIELabObject;
    static toCIELabA(color: ColorInput, options?: InputOptions): string;
    static toLCHObject(color: ColorInput, options?: InputOptions): LCHObject;
    static toLCH(color: ColorInput, options?: InputOptions): string;
    static toLCHAObject(color: ColorInput, options?: InputOptions): LCHObject;
    static toLCHA(color: ColorInput, options?: InputOptions): string;
    static toCMYKObject(color: ColorInput, options?: InputOptions): CMYKObject;
    static toCMYK(color: ColorInput, options?: InputOptions): string;
    static toCMYKAObject(color: ColorInput, options?: InputOptions): CMYKObject;
    static toCMYKA(color: ColorInput, options?: InputOptions): string;
    static getBlendHEXObject(from: ColorInput, to: ColorInput, steps?: number): HEXObject[];
    static getBlendHEX(from: ColorInput, to: ColorInput, steps?: number): string[];
    static getBlendHEXAObject(from: ColorInput, to: ColorInput, steps?: number): HEXObject[];
    static getBlendHEXA(from: ColorInput, to: ColorInput, steps?: number): string[];
    static getBlendRGBObject(from: ColorInput, to: ColorInput, options?: InputOptions): RGBObject[];
    static getBlendRGBObject(from: ColorInput, to: ColorInput, steps?: number, options?: InputOptions): RGBObject[];
    static getBlendRGB(from: ColorInput, to: ColorInput, options?: InputOptions): string[];
    static getBlendRGB(from: ColorInput, to: ColorInput, steps?: number, options?: InputOptions): string[];
    static getBlendRGBAObject(from: ColorInput, to: ColorInput, options?: InputOptions): RGBObject[];
    static getBlendRGBAObject(from: ColorInput, to: ColorInput, steps?: number, options?: InputOptions): RGBObject[];
    static getBlendRGBA(from: ColorInput, to: ColorInput, options?: InputOptions): string[];
    static getBlendRGBA(from: ColorInput, to: ColorInput, steps?: number, options?: InputOptions): string[];
    static getBlendHSLObject(from: ColorInput, to: ColorInput, options?: InputOptions): HSLObject[];
    static getBlendHSLObject(from: ColorInput, to: ColorInput, steps?: number, options?: InputOptions): HSLObject[];
    static getBlendHSL(from: ColorInput, to: ColorInput, options?: InputOptions): string[];
    static getBlendHSL(from: ColorInput, to: ColorInput, steps?: number, options?: InputOptions): string[];
    static getBlendHSLAObject(from: ColorInput, to: ColorInput, options?: InputOptions): HSLObject[];
    static getBlendHSLAObject(from: ColorInput, to: ColorInput, steps?: number, options?: InputOptions): HSLObject[];
    static getBlendHSLA(from: ColorInput, to: ColorInput, options?: InputOptions): string[];
    static getBlendHSLA(from: ColorInput, to: ColorInput, steps?: number, options?: InputOptions): string[];
    static getBlendHWBObject(from: ColorInput, to: ColorInput, options?: InputOptions): HWBObject[];
    static getBlendHWBObject(from: ColorInput, to: ColorInput, steps?: number, options?: InputOptions): HWBObject[];
    static getBlendHWB(from: ColorInput, to: ColorInput, options?: InputOptions): string[];
    static getBlendHWB(from: ColorInput, to: ColorInput, steps?: number, options?: InputOptions): string[];
    static getBlendHWBAObject(from: ColorInput, to: ColorInput, options?: InputOptions): HWBObject[];
    static getBlendHWBAObject(from: ColorInput, to: ColorInput, steps?: number, options?: InputOptions): HWBObject[];
    static getBlendHWBA(from: ColorInput, to: ColorInput, options?: InputOptions): string[];
    static getBlendHWBA(from: ColorInput, to: ColorInput, steps?: number, options?: InputOptions): string[];
    static getBlendCIELabObject(from: ColorInput, to: ColorInput, options?: InputOptions): CIELabObject[];
    static getBlendCIELabObject(from: ColorInput, to: ColorInput, steps?: number, options?: InputOptions): CIELabObject[];
    static getBlendCIELab(from: ColorInput, to: ColorInput, options?: InputOptions): string[];
    static getBlendCIELab(from: ColorInput, to: ColorInput, steps?: number, options?: InputOptions): string[];
    static getBlendCIELabAObject(from: ColorInput, to: ColorInput, options?: InputOptions): CIELabObject[];
    static getBlendCIELabAObject(from: ColorInput, to: ColorInput, steps?: number, options?: InputOptions): CIELabObject[];
    static getBlendCIELabA(from: ColorInput, to: ColorInput, options?: InputOptions): string[];
    static getBlendCIELabA(from: ColorInput, to: ColorInput, steps?: number, options?: InputOptions): string[];
    static getBlendLCHObject(from: ColorInput, to: ColorInput, options?: InputOptions): LCHObject[];
    static getBlendLCHObject(from: ColorInput, to: ColorInput, steps?: number, options?: InputOptions): LCHObject[];
    static getBlendLCH(from: ColorInput, to: ColorInput, options?: InputOptions): string[];
    static getBlendLCH(from: ColorInput, to: ColorInput, steps?: number, options?: InputOptions): string[];
    static getBlendLCHAObject(from: ColorInput, to: ColorInput, options?: InputOptions): LCHObject[];
    static getBlendLCHAObject(from: ColorInput, to: ColorInput, steps?: number, options?: InputOptions): LCHObject[];
    static getBlendLCHA(from: ColorInput, to: ColorInput, options?: InputOptions): string[];
    static getBlendLCHA(from: ColorInput, to: ColorInput, steps?: number, options?: InputOptions): string[];
    static getMixHEXObject(colors: ColorInput[], mode?: MixString): HEXObject;
    static getMixHEX(colors: ColorInput[], mode?: MixString): string;
    static getMixHEXAObject(colors: ColorInput[], mode?: MixString): HEXObject;
    static getMixHEXA(colors: ColorInput[], mode?: MixString): string;
    static getMixRGBObject(colors: ColorInput[], options?: InputOptions): RGBObject;
    static getMixRGBObject(colors: ColorInput[], mode?: MixString, options?: InputOptions): RGBObject;
    static getMixRGB(colors: ColorInput[], options?: InputOptions): string;
    static getMixRGB(colors: ColorInput[], mode?: MixString, options?: InputOptions): string;
    static getMixRGBAObject(colors: ColorInput[], options?: InputOptions): RGBObject;
    static getMixRGBAObject(colors: ColorInput[], mode?: MixString, options?: InputOptions): RGBObject;
    static getMixRGBA(colors: ColorInput[], options?: InputOptions): string;
    static getMixRGBA(colors: ColorInput[], mode?: MixString, options?: InputOptions): string;
    static getMixHSLObject(colors: ColorInput[], options?: InputOptions): HSLObject;
    static getMixHSLObject(colors: ColorInput[], mode?: MixString, options?: InputOptions): HSLObject;
    static getMixHSL(colors: ColorInput[], options?: InputOptions): string;
    static getMixHSL(colors: ColorInput[], mode?: MixString, options?: InputOptions): string;
    static getMixHSLAObject(colors: ColorInput[], options?: InputOptions): HSLObject;
    static getMixHSLAObject(colors: ColorInput[], mode?: MixString, options?: InputOptions): HSLObject;
    static getMixHSLA(colors: ColorInput[], options?: InputOptions): string;
    static getMixHSLA(colors: ColorInput[], mode?: MixString, options?: InputOptions): string;
    static getMixHWBObject(colors: ColorInput[], options?: InputOptions): HWBObject;
    static getMixHWBObject(colors: ColorInput[], mode?: MixString, options?: InputOptions): HWBObject;
    static getMixHWB(colors: ColorInput[], options?: InputOptions): string;
    static getMixHWB(colors: ColorInput[], mode?: MixString, options?: InputOptions): string;
    static getMixHWBAObject(colors: ColorInput[], options?: InputOptions): HWBObject;
    static getMixHWBAObject(colors: ColorInput[], mode?: MixString, options?: InputOptions): HWBObject;
    static getMixHWBA(colors: ColorInput[], options?: InputOptions): string;
    static getMixHWBA(colors: ColorInput[], mode?: MixString, options?: InputOptions): string;
    static getMixCIELabObject(colors: ColorInput[], options?: InputOptions): CIELabObject;
    static getMixCIELabObject(colors: ColorInput[], mode?: MixString, options?: InputOptions): CIELabObject;
    static getMixCIELab(colors: ColorInput[], options?: InputOptions): string;
    static getMixCIELab(colors: ColorInput[], mode?: MixString, options?: InputOptions): string;
    static getMixCIELabAObject(colors: ColorInput[], options?: InputOptions): CIELabObject;
    static getMixCIELabAObject(colors: ColorInput[], mode?: MixString, options?: InputOptions): CIELabObject;
    static getMixCIELabA(colors: ColorInput[], options?: InputOptions): string;
    static getMixCIELabA(colors: ColorInput[], mode?: MixString, options?: InputOptions): string;
    static getMixLCHObject(colors: ColorInput[], options?: InputOptions): LCHObject;
    static getMixLCHObject(colors: ColorInput[], mode?: MixString, options?: InputOptions): LCHObject;
    static getMixLCH(colors: ColorInput[], options?: InputOptions): string;
    static getMixLCH(colors: ColorInput[], mode?: MixString, options?: InputOptions): string;
    static getMixLCHAObject(colors: ColorInput[], options?: InputOptions): LCHObject;
    static getMixLCHAObject(colors: ColorInput[], mode?: MixString, options?: InputOptions): LCHObject;
    static getMixLCHA(colors: ColorInput[], options?: InputOptions): string;
    static getMixLCHA(colors: ColorInput[], mode?: MixString, options?: InputOptions): string;
    static getShades(color: string, options?: InputOptions): string[];
    static getShades(color: HEXObject, options?: InputOptions): HEXObject[];
    static getShades(color: RGBObject, options?: InputOptions): RGBObject[];
    static getShades(color: HSLObjectGeneric, options?: InputOptions): HSLObject[];
    static getShades(color: HWBObjectGeneric, options?: InputOptions): HWBObject[];
    static getShades(color: CIELabObjectGeneric, options?: InputOptions): CIELabObject[];
    static getShades(color: LCHObjectGeneric, options?: InputOptions): LCHObject[];
    static getShades(color: string, shades?: number, options?: InputOptions): string[];
    static getShades(color: HEXObject, shades?: number, options?: InputOptions): HEXObject[];
    static getShades(color: RGBObject, shades?: number, options?: InputOptions): RGBObject[];
    static getShades(color: HSLObjectGeneric, shades?: number, options?: InputOptions): HSLObject[];
    static getShades(color: HWBObjectGeneric, shades?: number, options?: InputOptions): HWBObject[];
    static getShades(color: CIELabObjectGeneric, shades?: number, options?: InputOptions): CIELabObject[];
    static getShades(color: LCHObjectGeneric, shades?: number, options?: InputOptions): LCHObject[];
    static getTints(color: string, options?: InputOptions): string[];
    static getTints(color: HEXObject, options?: InputOptions): HEXObject[];
    static getTints(color: RGBObject, options?: InputOptions): RGBObject[];
    static getTints(color: HSLObjectGeneric, options?: InputOptions): HSLObject[];
    static getTints(color: HWBObjectGeneric, options?: InputOptions): HWBObject[];
    static getTints(color: CIELabObjectGeneric, options?: InputOptions): CIELabObject[];
    static getTints(color: LCHObjectGeneric, options?: InputOptions): LCHObject[];
    static getTints(color: string, tints?: number, options?: InputOptions): string[];
    static getTints(color: HEXObject, tints?: number, options?: InputOptions): HEXObject[];
    static getTints(color: RGBObject, tints?: number, options?: InputOptions): RGBObject[];
    static getTints(color: HSLObjectGeneric, tints?: number, options?: InputOptions): HSLObject[];
    static getTints(color: HWBObjectGeneric, tints?: number, options?: InputOptions): HWBObject[];
    static getTints(color: CIELabObjectGeneric, tints?: number, options?: InputOptions): CIELabObject[];
    static getTints(color: LCHObjectGeneric, tints?: number, options?: InputOptions): LCHObject[];
    static getHarmony(color: string, options?: InputOptions): string[];
    static getHarmony(color: HEXObject, options?: InputOptions): HEXObject[];
    static getHarmony(color: RGBObject, options?: InputOptions): RGBObject[];
    static getHarmony(color: HSLObjectGeneric, options?: InputOptions): HSLObject[];
    static getHarmony(color: HWBObjectGeneric, options?: InputOptions): HWBObject[];
    static getHarmony(color: CIELabObjectGeneric, options?: InputOptions): CIELabObject[];
    static getHarmony(color: LCHObjectGeneric, options?: InputOptions): LCHObject[];
    static getHarmony(color: string, mode?: MixString, options?: InputOptions): string[];
    static getHarmony(color: HEXObject, mode?: MixString, options?: InputOptions): HEXObject[];
    static getHarmony(color: RGBObject, mode?: MixString, options?: InputOptions): RGBObject[];
    static getHarmony(color: HSLObjectGeneric, mode?: MixString, options?: InputOptions): HSLObject[];
    static getHarmony(color: HWBObjectGeneric, mode?: MixString, options?: InputOptions): HWBObject[];
    static getHarmony(color: CIELabObjectGeneric, mode?: MixString, options?: InputOptions): CIELabObject[];
    static getHarmony(color: LCHObjectGeneric, mode?: MixString, options?: InputOptions): LCHObject[];
    static getHarmony(color: string, harmony?: Harmony, options?: InputOptions): string[];
    static getHarmony(color: HEXObject, harmony?: Harmony, options?: InputOptions): HEXObject[];
    static getHarmony(color: RGBObject, harmony?: Harmony, options?: InputOptions): RGBObject[];
    static getHarmony(color: HSLObjectGeneric, harmony?: Harmony, options?: InputOptions): HSLObject[];
    static getHarmony(color: HWBObjectGeneric, harmony?: Harmony, options?: InputOptions): HWBObject[];
    static getHarmony(color: CIELabObjectGeneric, harmony?: Harmony, options?: InputOptions): CIELabObject[];
    static getHarmony(color: LCHObjectGeneric, harmony?: Harmony, options?: InputOptions): LCHObject[];
    static getHarmony(color: string, harmony?: Harmony, mode?: MixString, options?: InputOptions): string[];
    static getHarmony(color: HEXObject, harmony?: Harmony, mode?: MixString, options?: InputOptions): HEXObject[];
    static getHarmony(color: RGBObject, harmony?: Harmony, mode?: MixString, options?: InputOptions): RGBObject[];
    static getHarmony(color: HSLObjectGeneric, harmony?: Harmony, mode?: MixString, options?: InputOptions): HSLObject[];
    static getHarmony(color: HWBObjectGeneric, harmony?: Harmony, mode?: MixString, options?: InputOptions): HWBObject[];
    static getHarmony(color: CIELabObjectGeneric, harmony?: Harmony, mode?: MixString, options?: InputOptions): CIELabObject[];
    static getHarmony(color: LCHObjectGeneric, harmony?: Harmony, mode?: MixString, options?: InputOptions): LCHObject[];
}
export { ColorTranslator, InputOptions, Harmony, Mix, HEXObject, RGBObject, HSLObject, HWBObject, CIELabObject, LCHObject, CMYKObject };
