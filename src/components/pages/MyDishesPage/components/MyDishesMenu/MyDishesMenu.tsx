import React from "react";

import cn from "classnames";
import Link from "next/link";

import { myDishesSections } from "./myDishesSections";
import styles from "./styles.module.scss";

const MyDishesMenu: React.FC = () => {
  const [pathName, setPathName] = React.useState<string | null>(null);

  React.useEffect(() => {
    setPathName(window.location.pathname);
  }, []);

  return (
    <div className={styles.menu}>
      {myDishesSections.map((section) => {
        return (
          <Link
            key={section.id}
            className={cn(
              styles.menu_section,
              pathName == section.href && styles.menu_section__active,
            )}
            href={section.href}
          >
            {section.name}
          </Link>
        );
      })}
    </div>
  );
};

export default MyDishesMenu;
