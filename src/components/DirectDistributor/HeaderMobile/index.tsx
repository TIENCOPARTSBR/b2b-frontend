import React, { useState } from "react";
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
  ItemTwo,
  TitleProfile,
  InformationsProfile,
  NameProfile,
  EmailProfile,
} from "./style";
import { useAuth } from "@/hooks/direct-distributor/auth";

const ListHeader = [
  {
    name: "Users",
    icon: "/icons/user.svg",
    url: "/users",
  },
  {
    name: "Distributor",
    icon: "/icons/distributor.svg",
    url: "/distributors",
  },
  {
    name: 'Products',
    icon: '/icons/product.svg',
    url: '/products',
  },
  {
    name: 'Quotations',
    icon: '/icons/quotation.svg',
    url: '/quotations',
  }
];

const HeaderMobile = () => {
  const { user, logout } = useAuth();
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
        <Logo href="/">
          <Image
            src="/images/enco.svg"
            alt="Encoparts Logo"
            width="114"
            height="28"
          />
        </Logo>

        <List>
          {ListHeader.map((item) => (
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
              width="45"
              height="46"
              alt="User icon"
            />
          </ButtonProfile>
          {cardProfile && (
            <CardProfile>
              <TitleProfile>Profile</TitleProfile>
              <InformationsProfile>
              <Image
                  src="/icons/avatar.svg"
                  width="25"
                  height="25"
                  alt="User icon"
                />
                <div>
                  <NameProfile>{user?.name}</NameProfile>
                  <EmailProfile>{user?.email}</EmailProfile>
                </div>
              </InformationsProfile>

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