import { IResult, Ok, Err } from './Result';

interface IAction<T, P> { type: T; payload: P; }
interface IActionNoPayload<T> { type: T; }
interface IActionFailable<T, P> { type: T; payload: IResult<P>; }

type ActionType<A extends IActionNoPayload<{}>> =
    A extends IActionNoPayload<infer T> ? T : never;
type ActionPayload<A extends IAction<{}, {}>> =
    A extends IActionFailable<{}, infer P> ? P :
    A extends IAction<{}, infer P2> ? P2 : never;

const actionCreator = <A extends IAction<{}, {}>>(type: ActionType<A>) =>
    (payload: ActionPayload<A>): IAction<ActionType<A>, ActionPayload<A>> =>
        ({ type, payload });

const noPayloadActionCreator =
    <A extends IActionNoPayload<{}>>(type: ActionType<A>) =>
        (): IActionNoPayload<ActionType<A>> =>
            ({ type });

const failableActionCreator =
    <A extends IActionFailable<{}, {}>>(type: ActionType<A>): [
        (_: ActionPayload<A>) =>
            IActionFailable<ActionType<A>, ActionPayload<A>>,
        (_: Error) => IActionFailable<ActionType<A>, ActionPayload<A>>
    ] =>
        [
            (p: ActionPayload<A>) => ({ type, payload: Ok(p) }),
            (e: Error) => ({ type, payload: Err(e) }),
        ];

type ActionCaseOf<A extends IActionNoPayload<string>, S> = {
    [key in ActionType<A>]: (a: A extends IActionFailable<key, infer P>
        ? IActionFailable<key, P>
        : A extends IAction<key, infer P2>
        ? IAction<key, P2>
        : A extends IActionNoPayload<key>
        ? IActionNoPayload<key> : never,
                             s: S) => S
};
export const nextState = <A extends IActionNoPayload<string>, S>(
    init: S, cases: ActionCaseOf<A, S>,
) => (a: A, s: S | undefined) => !s
    ? init
    : !!cases[a.type]
        ? cases[a.type](s)
        : s;
export {
    IAction,
    IActionFailable,
    IActionNoPayload,
    ActionType,
    ActionPayload,
    actionCreator,
    noPayloadActionCreator,
    failableActionCreator,
};