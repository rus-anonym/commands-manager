type TFuncOnDoneCallback<Res> = (
    response: Res,
    meta: IExecutionInfo
) => unknown;

type TFuncOnErrorCallback<Err extends Error> = (
    error: Err,
    meta: IExecutionInfo
) => unknown;

interface IExecutionInfo {
    readonly executionTime: number;
}

export type { TFuncOnDoneCallback, TFuncOnErrorCallback, IExecutionInfo };
