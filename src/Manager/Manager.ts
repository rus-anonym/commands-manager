import { TRawFunc } from "../types";

import { Command } from "../Command";

class Manager<
    Cmd extends Command<Func, Res, Err>,
    Func extends TRawFunc,
    Res = ReturnType<Func>,
    Err extends Error = Error
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
