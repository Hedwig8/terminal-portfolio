export interface CommandConstructor {
    new (): CommandInterface;
}

export interface CommandInterface {
    help: () => string;
    run: (args: string[]) => string;
}