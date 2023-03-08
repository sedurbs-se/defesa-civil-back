/*
    Partial<T> makes all properties optional
    Pick<T, K> takes a subset of the properties of T
    Required<Pick<T, K>> makes the properties of the Pick type mandatory
    At the end, we have a type that has all properties of T as optional, except for the ones in K
*/

type OptionalExceptFor<T, K extends keyof T> = Partial<T> & Required<Pick<T, K>>;




export { OptionalExceptFor };