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
} from "./style";
import { useAuth } from "@/hooks/auth";

type HeaderListItem = {
  name: string;
  url: string;
  icon: string;
};

type HeaderProps = {
  list: HeaderListItem[];
};

const Header = ({list}: HeaderProps) => {
  const { logout } = useAuth()
  const [toggleCardProfile, setToggleCardProfile] = useState(false)

  const handleLogout = async (ctx: any) => {
    logout()
  };

  const toggleButton = async () => {
    setToggleCardProfile(!toggleCardProfile)
  }

  return (
    <HeaderCustom>
      <Nav>
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

      <List>
        <Item>
          <ButtonNotification href="/notification">
            <Image
              src="/icons/bell.svg"
              width="20"
              height="21"
              alt="Notification icon"
            />
            <CountNotification>1</CountNotification>
          </ButtonNotification>
        </Item>

        <Item>
          <ButtonProfile onClick={toggleButton}>
            <Image
              src="/icons/avatar.svg"
              width="45"
              height="46"
              alt="User icon"
            />
          </ButtonProfile>
          {toggleCardProfile && (
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
        </Item>
      </List>
    </HeaderCustom>
  );
};

export default Header;