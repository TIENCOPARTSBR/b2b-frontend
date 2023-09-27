import React, { useState } from "react";
import { HeaderCustom, 
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
    ButtonLogout
} from "./style";
import { useAuth } from "@/hooks/auth";

const Header = () => {
    const { logout } = useAuth();
    const [cardProfile, setCardProfile] = useState(false);

    const handleLogout = async (ctx: any) => {
        logout();
    }

    return (
        <HeaderCustom>
            <Nav>
                {/* Logo enco */}
                <Logo>
                    <Image 
                        src="/images/enco.svg" 
                        alt="Logo da encoparts" 
                        width="114"
                        height="28"
                    />
                </Logo>

                <List>
                    <Item>
                        <Link href="/admin/users">
                            <Image 
                                src="/icons/user.svg" 
                                width="20"
                                height="20"
                                alt="icone usuário"
                            />
                            Usuários
                        </Link>
                    </Item>

                    <Item>
                        <Link href="/admin/distributor">
                            <Image 
                                src="/icons/distributor.svg" 
                                width="20"
                                height="20"
                                alt="icone distributor"
                            />
                            Distribuidores
                        </Link>
                    </Item>

                    <Item>
                        <Link href="/admin/config">
                            <Image 
                                src="/icons/config.svg" 
                                width="20"
                                height="20"
                                alt="icone config"
                            />
                            Configurações
                        </Link>
                    </Item>
                </List>
            </Nav>

            <List>
                <Item>
                    <ButtonNotification href="/notification">
                        <Image
                            src="/icons/bell.svg" 
                            width="20"
                            height="21"
                            alt="icone usuário"
                        />
                        <CountNotification>1</CountNotification>
                    </ButtonNotification>
                </Item>

                <Item>
                    <ButtonProfile onClick={() => {setCardProfile(true)}}>
                        <Image
                            src="/icons/avatar.svg" 
                            width="45"
                            height="46"
                            alt="icone usuário"
                        />
                    </ButtonProfile>
                    {cardProfile && (
                        <CardProfile>
                            <ButtonLogout onClick={handleLogout}>
                                <Image
                                    src="/icons/logout.svg" 
                                    width="22"
                                    height="22"
                                    alt="icone logout"
                                />
                                Sair  
                            </ButtonLogout>
                        </CardProfile>
                    )}
                </Item>
            </List>
        </HeaderCustom>
    )
}

export default Header;