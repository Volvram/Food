import React from "react";

import Head from "next/head";

type MetaProps = {
  title?: string;
  description?: string;
  keywords?: string;
  viewport?: string;
  charset?: string;
};

const Meta: React.FC<MetaProps> = ({
  title = "Еда",
  description = "Следуйте здоровому питанию",
  keywords = "еда, диета, питание, планирование, похудение",
  viewport = "width=device-width, initial-scale=1.0",
  charset = "UTF-8",
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="robots" content="index, follow" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta name="viewport" content={viewport} />
      <meta charSet={charset} />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
        rel="stylesheet"
      />
    </Head>
  );
};

export default Meta;
