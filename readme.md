# @rus-anonym/commands-manager

## Examples

### Commands

#### TextCommand

```typescript
import { TRawFunc, ICommandParams, Command } from "@rus-anonym/commands-manager";

class TextCommand<Func extends TRawFunc> extends Command<Func> {
    private _trigger: string;

    constructor(params: ICommandParams<Func> & { trigger: string }) {
        super(params);
        this._trigger = params.trigger;
    }

    public check(value: string): boolean {
        return this._trigger === value;
    }
}

const cmd = new TextCommand({ func: (log: string) => log, trigger: "hello" });

cmd.check("hello"); // true
cmd.check("hey"); // false
cmd.execute(); // Expected N arguments, but got 0 ts(2554)
cmd.execute("hey"); // Promise<"hey">
```

### Manager

#### Template

```typescript
import { Manager } from "@rus-anonym/commands-manager";

const manager = new Manager([
    new TextCommand({ func: (log: string) => log, trigger: "hello" }),
    new TextCommand({ func: () => 2, trigger: "1+1" }),
    new TextCommand({
        func: (x: number, y: number) => x * y,
        trigger: "multiply",
    }),
]);

manager.find("hello"); // TextCommand<{ func: (log: string) => string; }>
manager.find("1+1"); // TextCommand<{ func: () => number; }>
manager.find("multiply"); // TextCommand<{ func: (x: number, y: number) => number; }>
```
