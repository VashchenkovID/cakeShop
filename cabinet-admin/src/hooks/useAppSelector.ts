import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootStateType } from 'src/redux/store';

export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;
