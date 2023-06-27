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
import { useResize } from "../../hooks/useResize";
import { DeviceListModel } from "../../api/models/DeviceListModel";
import CatalogItem from "../Catalog/CatalogItem/CatalogItem";
import { TypeModel } from "../../api/models/TypeModel";
import { useNavigate } from "react-router-dom";
import { PublicRoutesEnum } from "../../utils/enum";

interface IComponentProps {}

const StartPage: React.FC<IComponentProps> = () => {
  const navigate = useNavigate();
  const { width } = useResize();
  const [items, setItems] = useState<{
    items: { [key: string]: Array<DeviceListModel> };
    types: TypeModel[];
  } | null>(null);
  const { load: fetchStart } = useRequest(cakesApi.getStart, (data) => {
    setItems(data?.data || []);
  });

  useEffect(() => {
    fetchStart();
  }, []);
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
                label={"Заказать десерт по индивидуальному заказу"}
                size={"s"}
                onClick={() => navigate(`${PublicRoutesEnum.INDIVIDUAL}`)}
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
                    <CatalogItem item={item} key={`${item.id}`} />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default React.memo(StartPage);
