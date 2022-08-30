import { TRawFunc, ICommandParams } from "../types";

import {
    IExecutionInfo,
    TFuncOnDoneCallback,
    TFuncOnErrorCallback,
} from "./types";

abstract class Command<
    Func extends TRawFunc,
    Res = ReturnType<Func>,
    Err extends Error = Error
> {
    public abstract check(...args: unknown[]): boolean;

    private readonly _process: Func;
    private _onDoneCallback?: TFuncOnDoneCallback<Res>;
    private _onErrorCallback?: TFuncOnErrorCallback<Err>;

    constructor({ func }: ICommandParams<Func, Err>) {
        this._process = func;
    }

    public onDone(callback: TFuncOnDoneCallback<Res>): this {
        this._onDoneCallback = callback;
        return this;
    }

    public onError(callback: TFuncOnErrorCallback<Err>): this {
        this._onErrorCallback = callback;
        return this;
    }

    public async execute(...args: Parameters<Func>): Promise<Awaited<Res>> {
        const start = performance.now();
        let response: Awaited<Res> | undefined;
        let error: Err | undefined;
        let end: number;

        try {
            response = (await this._process(...args)) as Awaited<Res>;
            end = performance.now();
        } catch (err) {
            end = performance.now();
            error = err as Err;
        }

        const meta: IExecutionInfo = { executionTime: end - start };

        if (error) {
            if (this._onErrorCallback) {
                this._onErrorCallback(error, meta);
            }

            throw error;
        } else {
            if (this._onDoneCallback) {
                this._onDoneCallback(response as Awaited<Res>, meta);
            }

            return response as Awaited<Res>;
        }
    }
}

export { Command };
