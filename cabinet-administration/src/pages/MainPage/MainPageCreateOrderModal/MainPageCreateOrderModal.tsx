import React, { SetStateAction, useState } from 'react';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';
import { IconClose } from '@consta/uikit/IconClose';
import { TextField } from '@consta/uikit/TextField';
import PhoneInput from 'react-phone-input-2';
import { IconAdd } from '@consta/uikit/IconAdd';

interface IComponentProps {
  modal: boolean;
  setModal: React.Dispatch<SetStateAction<boolean>>;
}

interface CreateOrderAdminState {
  date_completed: Date | null;
  name: string;
  customer: {
    fullName: string;
    email?: string;
    phone: string;
  };
  items: {
    basketId: null;
    count: number;
    countWeightType: number;
    deviceId?: number;
    localId: string;
    name: string;
    price: number;
    weightType: string;
    decors: {
      id: null;
      name: string;
      localId: string;
      items: {
        id: number;
        name: string;
        count: string;
        countType: string;
        pricePerUnit: string;
        isChecked: boolean;
        localId: string;
      }[];
    }[];
  }[];
}

const MainPageCreateOrderModal: React.FC<IComponentProps> = ({
  modal,
  setModal,
}) => {
  const [state, setState] = useState<CreateOrderAdminState>({
    date_completed: null,
    name: '',
    customer: {
      fullName: '',
      email: '',
      phone: '',
    },
    items: [],
  });
  const [init, setInit] = useState();

  return (
    <div>
      <div>
        <Text size={'l'}>Регистрация нового заказа</Text>
        <Button view={'clear'} iconLeft={IconClose} />
      </div>
      <section>
        <TextField
          required
          label={'Наименование'}
          placeholder={'Введите наименование заказа'}
          value={state.name}
          onChange={({ value }) =>
            setState((prev) => {
              return { ...prev, name: value || '' };
            })
          }
        />
        <div>
          <Text>Пользователь</Text>
          <TextField
            required
            label={'Имя'}
            placeholder={'Введите имя заказчика'}
            value={state.customer.fullName}
            onChange={({ value }) =>
              setState((prevState) => {
                return {
                  ...prevState,
                  customer: { ...prevState.customer, fullName: value || '' },
                };
              })
            }
          />
          <TextField
            label={'Почта (необязательно)'}
            placeholder={'Введите почтовый адрес'}
            value={state.customer.email}
            onChange={({ value }) =>
              setState((prevState) => {
                return {
                  ...prevState,
                  customer: { ...prevState.customer, email: value || '' },
                };
              })
            }
          />
          <PhoneInput
            value={state.customer.phone}
            onChange={(value) =>
              setState((prevState) => {
                return {
                  ...prevState,
                  customer: { ...prevState.customer, phone: value },
                };
              })
            }
          />
        </div>
        <div>
          <div>
            <Text>Десерты</Text>
            <Button label={'Добавить'} iconLeft={IconAdd} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainPageCreateOrderModal;
