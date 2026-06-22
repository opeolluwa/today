export type EventMapEmpty = Record<string, unknown>;
export type EventListener<D = unknown> = (data: D) => void;
export type Off = () => void;
export default function EventBus<EventMap = EventMapEmpty>(): Readonly<{
    on: <EK extends keyof EventMap>(type: EK, listener: EventListener<EventMap[EK]>) => Off;
    off: <EK extends keyof EventMap>(type: EK, listener: EventListener<EventMap[EK]>) => void;
    dispatch: <EK extends keyof EventMap>(type: EK, data: EventMap[EK]) => void;
}>;
