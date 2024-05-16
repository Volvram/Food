"use client";
import React from "react";

import MenuIcon from "@mui/icons-material/Menu";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import styles from "./styles.module.scss";
import noImage from "@/assets/img/noImage.jpg";
import { Button } from "@/components/Button";
import { headerSections } from "@/components/Header/headerSections";
import rootStore from "@/store/RootStore/instance";
import useWindowDimensions from "@/utils/useWindowDimensions";

const Header: React.FC = () => {
  const router = useRouter();

  const { width } = useWindowDimensions();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutUser = () => {
    const answer = confirm("Подтвердить выход из аккаунта?");
    if (answer) {
      router.push("/");
      rootStore.user.logOut();
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.header_logo}>
        <div className={styles.logo}>
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M29.9256 17.2108C28.7973 18.346 28.2334 19.925 28.3874 21.5181L28.3609 21.4917C28.5192 23.3665 27.8429 25.2157 26.5125 26.5462C25.1821 27.8766 23.3328 28.5529 21.458 28.3946L21.4845 28.4211C19.2145 28.2098 17.0557 29.4445 16.087 31.5083C15.1182 33.572 15.5475 36.0216 17.1603 37.633C18.7731 39.2443 21.2231 39.6714 23.286 38.7008C25.3488 37.7302 26.5816 35.5703 26.3683 33.3005L26.3962 33.327C26.238 31.4521 26.9142 29.6029 28.2447 28.2724C29.5751 26.942 31.4243 26.2658 33.2992 26.424L33.2712 26.3975C35.766 26.6219 38.0874 25.1007 38.8776 22.7238C39.6678 20.3468 38.7192 17.7385 36.5867 16.4246C34.4541 15.1106 31.6978 15.4361 29.9301 17.2108H29.9256Z"
              fill="#6B7CFF"
            />
            <path
              d="M19.0766 24.9529L19.0486 24.9264C20.6428 25.0871 22.2249 24.5233 23.3583 23.3908C24.4916 22.2582 25.0566 20.6766 24.8971 19.0823L24.9251 19.1088C24.7668 17.2339 25.4431 15.3847 26.7735 14.0543C28.1039 12.7238 29.9532 12.0476 31.828 12.2058L31.8001 12.1794C34.0703 12.3926 36.2303 11.1592 37.2006 9.0957C38.1708 7.03224 37.7427 4.58194 36.1304 2.96962C34.5181 1.35729 32.0678 0.929258 30.0043 1.89948C27.9409 2.8697 26.7075 5.02976 26.9207 7.29995L26.8942 7.27201C27.053 9.14697 26.3769 10.9965 25.0463 12.3271C23.7158 13.6576 21.8662 14.3337 19.9913 14.1749L20.0177 14.2029C18.4235 14.0423 16.8415 14.606 15.7081 15.7385C14.5747 16.8711 14.0098 18.4527 14.1692 20.047L14.1427 20.0205C14.3005 21.8952 13.624 23.7442 12.2937 25.0745C10.9634 26.4048 9.11449 27.0812 7.23979 26.9235L7.26626 26.9499C4.99607 26.7368 2.836 27.9702 1.86579 30.0336C0.895566 32.0971 1.3236 34.5474 2.93592 36.1597C4.54825 37.772 6.99855 38.2001 9.06201 37.2298C11.1255 36.2596 12.3589 34.0995 12.1457 31.8294L12.1736 31.8558C12.0153 29.981 12.6916 28.1317 14.022 26.8013C15.3525 25.4709 17.2017 24.7946 19.0766 24.9529Z"
              fill="#B4EBE6"
            />
            <path
              d="M9.22099 22.0016C10.3495 20.8665 10.9129 19.2873 10.7578 17.6942L10.7857 17.7207C10.6273 15.8453 11.304 13.9955 12.6351 12.665C13.9662 11.3344 15.8163 10.6586 17.6916 10.8178L17.6636 10.7913C19.933 11.0039 22.0921 9.7706 23.0617 7.7078C24.0313 5.64499 23.6033 3.19566 21.9916 1.58393C20.3798 -0.0277992 17.9305 -0.455804 15.8677 0.513824C13.8049 1.48345 12.5716 3.64248 12.7842 5.91187L12.7578 5.8854C12.916 7.76024 12.2397 9.60949 10.9093 10.9399C9.5789 12.2703 7.72964 12.9466 5.85481 12.7883L5.88128 12.8148C3.38658 12.5911 1.06564 14.1127 0.275915 16.4896C-0.513813 18.8666 0.435108 21.4746 2.56768 22.7882C4.70026 24.1019 7.45632 23.7762 9.22393 22.0016H9.22099Z"
              fill="#6B7CFF"
            />
          </svg>
        </div>
        Foodify
      </div>
      <div className={styles.header_sections}>
        {width <= 768 ? (
          <>
            <IconButton
              id="fade-button"
              aria-controls={open ? "fade-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              color="inherit"
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              disableScrollLock
              id="fade-menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              {headerSections.map((section) => {
                return (
                  <MenuItem key={section.id} onClick={handleClose}>
                    <Link
                      className={styles.header_sections_section}
                      href={section.href}
                    >
                      {section.name}
                    </Link>
                  </MenuItem>
                );
              })}
            </Menu>
          </>
        ) : (
          headerSections.map((section) => {
            return (
              <Link
                key={section.id}
                className={styles.header_sections_section}
                href={section.href}
              >
                {section.name}
              </Link>
            );
          })
        )}
        <div className={styles.header_login}>
          {
            // TODO Заменить временную заглушку
            rootStore.user.authorized ? (
              <div className={styles.header_login_panel}>
                <Link
                  href={"/profile"}
                  className={styles.header_login_panel_link}
                >
                  {rootStore.user.image ? (
                    <img
                      src={rootStore.user.image}
                      className={styles.header_login_panel_avatar}
                    />
                  ) : (
                    <Image
                      src={noImage}
                      alt={rootStore.user.name ?? "аватар"}
                      className={styles.header_login_panel_avatar}
                    />
                  )}
                </Link>
                <div
                  className={styles.header_login_panel_logout}
                  onClick={() => {
                    logoutUser();
                  }}
                >
                  Выйти
                </div>
              </div>
            ) : (
              // TODO ----------------------
              <Link href="/login">
                <Button>Войти</Button>
              </Link>
            )
          }
        </div>
      </div>
    </header>
  );
};

export default observer(Header);
