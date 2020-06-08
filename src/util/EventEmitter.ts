/**
 * Simple event pub/sub mechanism
 */
export default class EventEmitter<T extends Function> {
    private readonly handlers: Array<T> = [];

    public dispatch = ((() => {
        const handlers = this.handlers;
        return function () {
            for (const handler of handlers) {
                handler.apply(undefined, arguments);
            }
        };
    })() as any) as T;

    public subscribe(handler: T) {
        this.handlers.push(handler);
        return () => {
            const index = this.handlers.indexOf(handler);
            if (index > -1) {
                this.handlers.splice(index, 1);
            }
        };
    }
}
