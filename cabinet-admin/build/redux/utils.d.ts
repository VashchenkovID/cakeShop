export declare const isLoaded: (statusSelector: any) => (RootStateType: any, props: any) => boolean;
export declare const isRejected: (statusSelector: any) => (RootStateType: any) => boolean;
export declare const isPending: (statusSelector: any) => (RootStateType: any) => boolean;
export declare const shouldLoad: (statusSelector: any) => ((state: unknown) => boolean) & import("reselect").OutputSelectorFields<(args_0: any) => boolean, {
    clearCache: () => void;
}> & {
    clearCache: () => void;
};
