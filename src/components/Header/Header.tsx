import React from "react";

import Link from "next/link";

import styles from "./styles.module.scss";
import { headerSections } from "@/config/headerSeactions";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header_sections}>
        {headerSections.map((section) => {
          return (
            <Link key={section.id} href={section.href}>
              {section.name}
            </Link>
          );
        })}
      </div>
    </header>
  );
};

export default Header;
