import { useSelector, shallowEqual, TypedUseSelectorHook } from 'react-redux';
import { RootStateType } from 'src/redux/store';

/**
 * Хук-селектор с проверкой необходимости поверхостного сравнения
 *
 * @function
 * @name Hooks.useShallowEqualSelector
 * @param {Function} selector - Селектор для состояния
 * @returns {any}
 */
export function useShallowEqualSelector<T>(
  selector: (s: RootStateType) => T,
): TypedUseSelectorHook<RootStateType> {
  return useSelector(selector, shallowEqual);
}
