import React, { useEffect, useState } from "react";
import styles from "./StartPage.module.styl";
import useRequest from "../../hooks/useRequest";
import cakesApi from "../../api/requests/cakesApi";
import Carousel, { arrowsPlugin } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import { Button } from "@consta/uikit/Button";
import { IconArrowLeft } from "@consta/uikit/IconArrowLeft";
import { IconArrowRight } from "@consta/uikit/IconArrowRight";
import { Text } from "@consta/uikit/Text";
import ComponentStyleWrapper from "../../components/ComponentStyleWrapper/ComponentStyleWrapper";
import { useResize } from "src/hooks/useResize";
import { DeviceListModel } from "src/api/models/DeviceListModel";
import CatalogItem from "../Catalog/CatalogItem/CatalogItem";
import { TypeModel } from "src/api/models/TypeModel";
import { useNavigate } from "react-router-dom";
import { PublicRoutesEnum } from "src/utils/enum";
import { Modal } from "@consta/uikit/Modal";
import CatalogBuyOneClickModal from "../Catalog/CatalogBuyOneClickModal/CatalogBuyOneClickModal";
import { IconPhone } from "@consta/uikit/IconPhone";
import IconVK from "../../components/Icons/IconVK";
import IconTelegram from "../../components/Icons/IconTelegram";
import IconWhatsApp from "../../components/Icons/IconWhatsApp";
import IconInstagram from "../../components/Icons/IconInstagram";
import { IconClose } from "@consta/uikit/IconClose";

const communicationItems = [
  {
    href: undefined,
    label: "+7(919)-040-95-95",
    icon: <IconPhone className={styles.Communication__iconColor} />,
  },
  {
    href: "https://vk.com/alexa_cake_smol",
    label: "https://vk.com/alexa_cake_smol",
    icon: <IconVK className={styles.Communication__iconSize} />,
  },
  {
    href: "https://t.me/",
    label: "https://t.me/",
    icon: <IconTelegram className={styles.Communication__iconSize} />,
  },
  {
    href: "https://wa.me/79190409595",
    label: "+7(919)-040-95-95",
    icon: <IconWhatsApp className={styles.Communication__iconSize} />,
  },
  {
    label: "insta",
    icon: <IconInstagram className={styles.Communication__iconSize} />,
  },
];

const StartPage: React.FC = () => {
  const navigate = useNavigate();
  const { width } = useResize();
  const [items, setItems] = useState<{
    items: { [key: string]: Array<DeviceListModel> };
    types: TypeModel[];
  } | null>(null);
  const { load: fetchStart } = useRequest(cakesApi.getStart, (data) => {
    setItems(data?.data || []);
  });
  const [modal, setModal] = useState(false);
  useEffect(() => {
    fetchStart();
  }, []);
  const [individualModal, setIndividualModal] = useState(false);
  return (
    <section className={styles.container}>
      <ComponentStyleWrapper>
        <Carousel
          plugins={[
            {
              resolve: arrowsPlugin,
              options: {
                arrowLeft: <Button iconLeft={IconArrowLeft} view={"clear"} />,
                arrowLeftDisabled: (
                  <Button iconLeft={IconArrowLeft} view={"clear"} />
                ),
                arrowRight: <Button iconLeft={IconArrowRight} view={"clear"} />,
                arrowRightDisabled: (
                  <Button iconLeft={IconArrowRight} view={"clear"} />
                ),
                addArrowClickHandler: true,
              },
            },
          ]}
        >
          <div className={styles.container__slide}>
            <Text align={"center"} size={width >= 800 ? "5xl" : "3xl"}>
              Kassandra's Cake
            </Text>
            <Text size={width >= 800 ? "m" : "s"} align={"center"}>
              Магазин кондитерских изделий
            </Text>
            <div className={styles.container__slide__actions}>
              <Button
                label={"Выбрать десерт"}
                size={"s"}
                onClick={() => navigate(`${PublicRoutesEnum.SHOP}`)}
              />
              <Button
                label={"Сделать индивидуальный заказ"}
                size={"s"}
                onClick={() => setIndividualModal(true)}
              />
            </div>
          </div>
          <div className={styles.container__slide}>
            <Text>
              <Text>Привет!</Text>
              <Text>
                Меня зовут Александра и я домашний кондитер с образованием
                «Инженер-технолог пищевой промышленности»👩🏼‍🍳🧑🏼‍🔧
              </Text>
              <Text>
                Живу и работаю в Смоленске 🏙 Готовлю торты, капкейки и другие
                десерты на заказ 🍰🧁 Создаю невероятный шоколад и конфеты 🍫🍭
              </Text>
            </Text>
          </div>
        </Carousel>
      </ComponentStyleWrapper>
      <div className={styles.container__deviceSection}>
        <Text className={styles.container__deviceSection__line} size={"3xl"}>
          Популярные категории
        </Text>
        <div className={styles.container__deviceSection__types}>
          {items &&
            items.types.length > 0 &&
            items.types.map((type) => (
              <ComponentStyleWrapper key={type.id}>
                <Text cursor={"pointer"} align={"center"}>
                  {type.name}
                </Text>
              </ComponentStyleWrapper>
            ))}
        </div>
      </div>
      <div className={styles.container__deviceSection}>
        <Text className={styles.container__deviceSection__line} size={"3xl"}>
          Популярные десерты
        </Text>
        {items &&
          Object.keys(items.items).map((key) => (
            <div className={styles.container__deviceSection__underSection}>
              <Text size={"2xl"}>{key}</Text>
              <div className={styles.container__deviceSection__items}>
                {items.items[key] &&
                  items.items[key].map((item) => (
                    <CatalogItem
                      setModal={setModal}
                      width={width}
                      item={item}
                      key={`${item.id}`}
                    />
                  ))}
              </div>
            </div>
          ))}
      </div>
      <Modal isOpen={modal}>
        <CatalogBuyOneClickModal
          modal={modal}
          setModal={setModal}
          width={width}
        />
      </Modal>
      <Modal isOpen={individualModal}>
        <div className={styles.Communication}>
          <div className={styles.Communication__header}>
            <Text size={"2xl"}>Выберите предпочитаемый способ связи</Text>
            <Button
              view={"clear"}
              iconLeft={IconClose}
              onClick={() => setIndividualModal(false)}
            />
          </div>

          <div className={styles.Communication__rows}>
            {communicationItems.map((item) => (
              <a
                className={styles.Communication__row}
                href={item.href}
                target="_blank"
              >
                {item.icon}
                <Text size={"s"}>{item.label}</Text>
              </a>
            ))}
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default React.memo(StartPage);
