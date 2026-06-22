interface BiomeOutput {
    diagnostics: Diagnostic[];
}
interface ModernPosition {
    line: number;
    column: number;
}
interface ModernLocation {
    path: string;
    start: ModernPosition;
    end: ModernPosition;
}
interface ModernAdvice {
    start: ModernPosition;
    end: ModernPosition;
    text: string;
}
interface ModernDiagnostic {
    severity: 'hint' | 'info' | 'warning' | 'error' | 'fatal';
    message: string;
    category?: string;
    location?: ModernLocation;
    advices: ModernAdvice[];
}
type LegacyTextRange = [number, number];
interface LegacyLocation {
    path?: {
        file: string;
    };
    sourceCode?: string;
    span?: LegacyTextRange;
}
interface LegacyDiagnostic {
    severity: 'hint' | 'information' | 'warning' | 'error' | 'fatal';
    description: string;
    category?: string;
    location: LegacyLocation;
    message?: unknown;
    advices?: unknown;
    tags?: unknown;
    source?: unknown;
    verboseAdvices?: unknown;
}
type Diagnostic = ModernDiagnostic | LegacyDiagnostic;

export type { BiomeOutput, Diagnostic, LegacyDiagnostic, ModernDiagnostic };
