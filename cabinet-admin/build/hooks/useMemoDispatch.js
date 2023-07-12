import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
/**
 * Мемоизированный хук-dispatch
 *
 * @function
 * @name Hooks.useMemoDispatch
 * @returns {(function(object, object?): void)}
 */
export function useMemoDispatch() {
    const dispatch = useDispatch();
    return useCallback((action, payload = null) => {
        dispatch(action(payload));
    }, [dispatch]);
}
//# sourceMappingURL=useMemoDispatch.js.map