import React from "react";

import Image from "next/image";

import style from "./styles.module.scss";
import noImage from "@/assets/img/noImage.jpg";

type CardProps = React.PropsWithChildren<{
  image?: string | null;
  title: string;
  description?: string | null;
}>;

export const Card: React.FC<CardProps> = ({
  image,
  title,
  description,
  children,
}) => {
  return (
    <div className={style.card}>
      <div className={style.card_img}>
        {image ? <img src={image} /> : <Image src={noImage} alt={title} />}
      </div>
      <div className={style.card_info}>
        <div className={style.card_info_title}>
          {title.length > 20 ? `${title.slice(0, 20)}...` : title}
        </div>
        <div className={style.card_info_about}>
          {description
            ? description.length > 55
              ? `${description.slice(0, 55)}...`
              : description
            : "-"}
        </div>
      </div>
      {children}
    </div>
  );
};
