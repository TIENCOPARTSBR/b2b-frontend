import React, { useState, useEffect } from "react";
import {
  HeaderCustom,
  Nav,
  List,
  Item,
  Link,
  Image,
  Logo,
  ButtonNotification,
  CountNotification,
  ButtonProfile,
  CardProfile,
  ButtonLogout,
  ListTwo,
  Hamburguer,
  ItemTwo
} from "./style";
import { useAuth } from "@/hooks/auth";

type HeaderListItem = {
  name: string;
  url: string;
  icon: string;
};

type HeaderProps = {
  list: HeaderListItem[]
}

const HeaderMobile = ({list}: HeaderProps) => {
  const { logout } = useAuth();
  const [cardProfile, setCardProfile] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleLogout = async (ctx: any) => {
    logout();
  }

  const Menu = async () => {
    setOpenMenu(!openMenu);
  }

  return (
    <HeaderCustom>
      <Hamburguer onClick={(e) => {Menu()}} className={openMenu ? "active" : ""}></Hamburguer>

      <Nav className={openMenu ? "active" : ""}>
        {/* Encoparts Logo */}
        <Logo href="/admin">
          <Image
            src="/images/enco.svg"
            alt="Encoparts Logo"
            width="114"
            height="28"
          />
        </Logo>

        <List>
          {list.map((item) => (
            <Item key={item.url}> {/* Use uma propriedade única, como 'item.url', como chave */}
              <Link href={item.url}>
                <Image
                  src={item.icon}
                  width="20"
                  height="20"
                  alt="User icon"
                />
                {item.name}
              </Link>
            </Item>
          ))}
        </List>
      </Nav>

      <ListTwo>
        <ItemTwo>
          <ButtonNotification href="/notification">
            <Image
              src="/icons/bell.svg"
              width="20"
              height="21"
              alt="Notification icon"
            />
            <CountNotification>1</CountNotification>
          </ButtonNotification>
        </ItemTwo>

        <ItemTwo>
          <ButtonProfile onClick={() => {setCardProfile(true)}}>
            <Image
              src="/icons/avatar.svg"
              width="25"
              height="25"
              alt="User icon"
            />
          </ButtonProfile>
          {cardProfile && (
            <CardProfile>
              <ButtonLogout onClick={handleLogout}>
                <Image
                  src="/icons/logout.svg"
                  width="22"
                  height="22"
                  alt="Logout icon"
                />
                Logout
              </ButtonLogout>
            </CardProfile>
          )}
        </ItemTwo>
      </ListTwo>
    </HeaderCustom>
  );
};

export default HeaderMobile;