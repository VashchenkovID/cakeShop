import { useDispatch } from 'react-redux';
import { AppDispatchType } from 'src/redux/store';

export const useAppDispatch = () => useDispatch<AppDispatchType>();
