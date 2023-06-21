import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { AppDispatchType } from 'src/redux/store';

/**
 * Мемоизированный хук-dispatch
 *
 * @function
 * @name Hooks.useMemoDispatch
 * @returns {(function(object, object?): void)}
 */
export function useMemoDispatch() {
  const dispatch = useDispatch<AppDispatchType>();
  return useCallback(
    (action, payload = null) => {
      dispatch(action(payload));
    },
    [dispatch],
  );
}
