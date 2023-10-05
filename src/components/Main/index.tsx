import { ReactNode } from 'react';
import { styled } from 'styled-components';

const MAIN = styled.div`
    padding: 25px;

    @media (min-width: 768px) {
        padding: 40px;
    }
`;

type MainProps = {
    children: ReactNode;
}

const Main: React.FC<MainProps> = ({children}) => {
    return (
        <MAIN>{children}</MAIN>
    )
}

export default Main;