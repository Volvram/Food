import Head from "next/head";
import React from "react";

type MetaProps = {
  title?: string;
  description?: string;
  keywords?: string;
  viewport?: string;
};

const Meta: React.FC<MetaProps> = ({
  title = "",
  description = "Следуйте здоровому питанию",
  keywords = "еда, диета, питание, планирование, похудение",
  viewport = "width=device-width, initial-scale=1.0",
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="robots" content="index, follow" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta name="viewport" content={viewport} />
    </Head>
  );
};

export default Meta;
