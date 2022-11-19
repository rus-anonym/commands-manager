import { Command } from "../Command";
import { TRawFunc } from "../types";

class Manager<
    Cmd extends Command<TRawFunc>
> {
    public readonly list: Cmd[];

    constructor(list: Cmd[] = []) {
        this.list = list;
    }

    public find(...args: Parameters<Cmd["check"]>): Cmd | undefined {
        let index = 0;
        while (index < this.list.length) {
            const command = this.list[index];
            if (command.check(...args)) {
                return command;
            }
            ++index;
        }
    }

    public add(...commands: Cmd[]): this {
        this.list.push(...commands);
        return this;
    }

    public setList(commands: Cmd[]): this {
        this.list.length = 0;
        this.list.push(...commands);
        return this;
    }
}

export { Manager };
