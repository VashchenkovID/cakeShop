import React, { ChangeEvent, useEffect, useState } from 'react';
import { DeviceModel } from 'src/api/models/DeviceModel';
import cakesApi from 'src/api/requests/cakesApi';
import styles from './AdministrationRecipes.styl';
import cn from 'classnames/bind';
import { Form } from 'react-bootstrap';

const cx = cn.bind(styles);

const AdministrationRecipes = () => {
  const [device, setDevice] = useState<DeviceModel | null>(null);
  const [type, setType] = useState(null);
  const [file, setFile] = useState(null);
  const addDevice = async () => {
    const formData = new FormData();
    formData.append('name', device.name);
    formData.append('price', `${device.price}`);
    formData.append('price', `${device.description}`);
    formData.append('img', file);
    formData.append('typeId', type.id);
    formData.append('info', JSON.stringify(device.info));
    await cakesApi.createCake(formData);
  };
  const selectFile = (e: any) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {}, []);

  return (
    <div>
      <Form>
        <Form.Control className="mt-3" type="file" onChange={selectFile} />
      </Form>
    </div>
  );
};

export default AdministrationRecipes;
