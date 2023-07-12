import { RootStateType } from 'src/redux/store';
import { RequestStatusEnum } from 'src/utils/enum';
import { useAppSelector } from './useAppSelector';

export const useRequestStatus = (
  selector: (state: RootStateType) => RequestStatusEnum,
) => {
  const status = useAppSelector(selector);

  return {
    loaded: status === RequestStatusEnum.FULFILLED,
    pending: status === RequestStatusEnum.PENDING,
    idle: status === RequestStatusEnum.IDLE,
    rejected: status === RequestStatusEnum.REJECTED,
  };
};
