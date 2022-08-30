import { TFuncOnDoneCallback, TFuncOnErrorCallback } from "../Command";

type TRawFunc = (...args: never[]) => unknown;

interface ICommandParams<Func extends TRawFunc, Err extends Error = Error> {
    func: Func;
    onDone?: TFuncOnDoneCallback<ReturnType<Func>>;
    onError?: TFuncOnErrorCallback<Err>;
}

export type { TRawFunc, ICommandParams };
