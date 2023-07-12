import React, { useEffect, useState } from 'react';
import useRequest from 'src/hooks/useRequest';
import cakesApi from 'src/api/requests/cakesApi';
import styles from './AdministrationTypes.module.styl';
import AdministrationTypesSection from 'src/pages/AdministrationTypes/AdministrationTypesSection/AdministrationTypesSection';
import AdministrationTypesModalList from 'src/pages/AdministrationTypes/AdministrationTypeModals/AdministrationTypesModalList';
import MainWrapper from 'src/components/MainWrapper/MainWrapper';
import { toast } from 'react-toastify';
export var AdministrationTypesModalEnum;
(function (AdministrationTypesModalEnum) {
    AdministrationTypesModalEnum["IDLE"] = "idle";
    AdministrationTypesModalEnum["FILLING"] = "filling";
    AdministrationTypesModalEnum["TYPE"] = "type";
    AdministrationTypesModalEnum["BISCUIT"] = "biscuit";
    AdministrationTypesModalEnum["DECOR"] = "decor";
    AdministrationTypesModalEnum["TYPE_EDIT"] = "typeEdit";
    AdministrationTypesModalEnum["FILLING_EDIT"] = "fillingEdit";
    AdministrationTypesModalEnum["BISCUIT_EDIT"] = "biscuitEdit";
    AdministrationTypesModalEnum["DECOR_EDIT"] = "decorEdit";
    AdministrationTypesModalEnum["TYPE_REMOVE"] = "typeRemove";
    AdministrationTypesModalEnum["FILLING_REMOVE"] = "fillingRemove";
    AdministrationTypesModalEnum["BISCUIT_REMOVE"] = "biscuitRemove";
    AdministrationTypesModalEnum["DECOR_REMOVE"] = "decorRemove";
})(AdministrationTypesModalEnum || (AdministrationTypesModalEnum = {}));
export var AdministrationTypesItemsEnum;
(function (AdministrationTypesItemsEnum) {
    AdministrationTypesItemsEnum["TYPE"] = "type";
    AdministrationTypesItemsEnum["FILLING"] = "filling";
    AdministrationTypesItemsEnum["BISCUIT"] = "biscuit";
    AdministrationTypesItemsEnum["DECOR"] = "decor";
})(AdministrationTypesItemsEnum || (AdministrationTypesItemsEnum = {}));
const AdministrationTypes = () => {
    const [types, setTypes] = useState([]);
    const [fillings, setFillings] = useState([]);
    const [biscuits, setBiscuits] = useState([]);
    const [decors, setDecors] = useState([]);
    const [modal, setModal] = useState(AdministrationTypesModalEnum.IDLE);
    const [type, setType] = useState({
        id: null,
        name: '',
    });
    const [filling, setFilling] = useState({
        id: null,
        name: '',
        img: null,
    });
    const [biscuit, setBiscuit] = useState({
        id: null,
        name: '',
        img: null,
    });
    const [decor, setDecor] = useState({
        id: null,
        name: '',
        count: 0,
        countType: '',
        pricePerUnit: '',
        constPrice: '',
    });
    const clear = () => {
        setType({ name: '', id: null });
        setFilling({
            id: null,
            name: '',
            img: null,
        });
        setBiscuit({
            id: null,
            name: '',
            img: null,
        });
        setDecor({
            id: null,
            name: '',
            count: 0,
            countType: '',
            pricePerUnit: '',
            constPrice: '',
        });
    };
    const { load: fetchTypes } = useRequest(cakesApi.getCakeTypes, (data) => {
        if (data) {
            setTypes(data.data);
        }
    });
    const { load: fetchFillings } = useRequest(cakesApi.getCakeFillings, (data) => {
        if (data) {
            setFillings(data.data);
        }
    });
    const { load: fetchBiscuits } = useRequest(cakesApi.getBiscuits, (data) => {
        if (data) {
            setBiscuits(data.data);
        }
    });
    const { load: fetchDecors } = useRequest(cakesApi.getDecorAdmin, (data) => {
        if (data) {
            setDecors(data.data);
        }
    });
    const createNewType = async () => {
        if (type.name !== '') {
            const data = new FormData();
            data.append('name', type.name);
            await cakesApi
                .createCakeType(data)
                .then(() => {
                fetchTypes();
            })
                .then(() => clear());
        }
    };
    const updateType = async () => {
        if (type.id && type.name !== '') {
            await cakesApi
                .updateCakeType(type.id, type.name)
                .then(() => {
                fetchTypes();
            })
                .then(() => clear());
        }
    };
    const removeType = async () => {
        if (type.id) {
            await cakesApi.removeCakeType(type.id).then(() => {
                fetchTypes();
                clear();
            });
        }
    };
    const createNewFilling = async () => {
        if (filling.name !== '') {
            const data = new FormData();
            data.append('name', filling.name);
            data.append('img', filling.img);
            await cakesApi.createCakeFilling(data).then(() => {
                fetchFillings();
                clear();
            });
        }
    };
    const updateFilling = async () => {
        if (filling.id && filling.name !== '') {
            const data = new FormData();
            data.append('name', filling.name);
            data.append('img', filling.img);
            await cakesApi.updateCakeFilling(filling.id, data).then(() => {
                fetchFillings();
                clear();
            });
        }
    };
    const removeFilling = async () => {
        if (filling.id) {
            await cakesApi.removeCakeFilling(filling.id).then(() => {
                fetchFillings();
                clear();
            });
        }
    };
    const createNewBiscuit = async () => {
        if (biscuit.name !== '') {
            const data = new FormData();
            data.append('name', biscuit.name);
            data.append('img', biscuit.img);
            await cakesApi.createBiscuit(data).then(() => {
                fetchBiscuits();
                clear();
            });
        }
    };
    const updateBiscuit = async () => {
        if (biscuit.id && biscuit.name !== '') {
            const data = new FormData();
            data.append('name', biscuit.name);
            data.append('img', biscuit.img);
            await cakesApi.updateBiscuit(biscuit.id, data).then(() => {
                fetchBiscuits();
                clear();
            });
        }
    };
    const removeBiscuit = async () => {
        if (biscuit.id) {
            await cakesApi.removeBiscuit(biscuit.id).then(() => {
                fetchBiscuits();
                clear();
            });
        }
    };
    const createNewDecor = async () => {
        if (decor.name !== '' &&
            decor.countType !== '' &&
            decor.count !== 0 &&
            decor.pricePerUnit !== '' &&
            decor.constPrice !== '') {
            const data = new FormData();
            data.append('name', decor.name);
            data.append('countType', decor.countType);
            data.append('count', decor.count.toString());
            data.append('pricePerUnit', decor.pricePerUnit.toString());
            data.append('constPrice', decor.constPrice.toString());
            await cakesApi.createDecor(data).then(() => {
                fetchDecors();
                clear();
            });
        }
        else {
            toast.error('Ошибки в заполнении полей');
        }
    };
    const updateDecor = async () => {
        if (decor.id &&
            decor.name !== '' &&
            decor.countType !== '' &&
            decor.count !== 0 &&
            decor.pricePerUnit !== '' &&
            !isNaN(Number(decor.pricePerUnit)) &&
            decor.constPrice !== '' &&
            !isNaN(Number(decor.constPrice))) {
            const data = new FormData();
            data.append('name', decor.name);
            data.append('countType', decor.countType);
            data.append('count', decor.count.toString());
            data.append('pricePerUnit', decor.pricePerUnit.toString());
            data.append('constPrice', decor.constPrice.toString());
            await cakesApi.updateDecor(decor.id, data).then(() => {
                fetchDecors();
                clear();
            });
        }
        else {
            toast.error('Ошибки в заполнении полей');
        }
    };
    const removeDecor = async () => {
        if (decor.id) {
            await cakesApi.removeDecor(decor.id).then(() => {
                fetchDecors();
                clear();
            });
        }
    };
    const setEdit = (type, item) => {
        switch (type) {
            case AdministrationTypesItemsEnum.TYPE:
                setType({ ...item });
                return;
            case AdministrationTypesItemsEnum.FILLING:
                setFilling({ ...item });
                return;
            case AdministrationTypesItemsEnum.BISCUIT:
                setBiscuit({ ...item });
                return;
            case AdministrationTypesItemsEnum.DECOR:
                setDecor({ ...item });
                return;
            default:
                clear();
                return;
        }
    };
    useEffect(() => {
        fetchTypes();
        fetchFillings();
        fetchBiscuits();
        fetchDecors();
    }, []);
    return (React.createElement(MainWrapper, { title: 'Справочники' },
        React.createElement("div", { className: styles.Types },
            React.createElement("div", { className: styles.Types__column },
                React.createElement(AdministrationTypesSection, { clear: clear, title: 'Типы десертов', items: types, isDecor: false, onCreate: () => setModal(AdministrationTypesModalEnum.TYPE), type: AdministrationTypesItemsEnum.TYPE, setEdit: setEdit, setModal: setModal })),
            React.createElement("div", { className: styles.Types__column },
                React.createElement(AdministrationTypesSection, { clear: clear, title: 'Типы начинки', items: fillings, isDecor: false, onCreate: () => setModal(AdministrationTypesModalEnum.FILLING), type: AdministrationTypesItemsEnum.FILLING, setEdit: setEdit, setModal: setModal })),
            React.createElement("div", { className: styles.Types__column },
                React.createElement(AdministrationTypesSection, { clear: clear, title: 'Типы бисквита', items: biscuits, isDecor: false, onCreate: () => setModal(AdministrationTypesModalEnum.BISCUIT), type: AdministrationTypesItemsEnum.BISCUIT, setEdit: setEdit, setModal: setModal })),
            React.createElement("div", { className: styles.Types__column },
                React.createElement(AdministrationTypesSection, { clear: clear, onCreate: () => setModal(AdministrationTypesModalEnum.DECOR), title: 'Декор', items: decors, isDecor: true, type: AdministrationTypesItemsEnum.DECOR, setEdit: setEdit, setModal: setModal }))),
        React.createElement(AdministrationTypesModalList, { type: type, setType: setType, modal: modal, setModal: setModal, filling: filling, setFilling: setFilling, biscuit: biscuit, setBiscuit: setBiscuit, decor: decor, setDecor: setDecor, types: types, fillings: fillings, biscuits: biscuits, decors: decors, createNewType: createNewType, createNewFilling: createNewFilling, createNewBiscuit: createNewBiscuit, createNewDecor: createNewDecor, removeBiscuit: removeBiscuit, removeDecor: removeDecor, removeFilling: removeFilling, removeType: removeType, updateBiscuit: updateBiscuit, updateDecor: updateDecor, updateFilling: updateFilling, updateType: updateType })));
};
export default AdministrationTypes;
//# sourceMappingURL=AdministrationTypes.js.map