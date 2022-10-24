import { useContext } from 'react';
import styled from 'styled-components/macro';

import { ThemeProvider } from './../MainPage'
import globalColors from '../../../globalVars';

const ContactsPaneSC = styled.div`
    position: relative;
    flex: 2;
    display: flex;
    flex-flow: column;
    gap: 20px;

    height: 100vh;
    min-width: 320px;
    border-right: 2px rgb(160,160,160) solid;
    box-sizing: border-box;
    
    box-shadow: 0 0 ${props=> props.theme === "white" ? "100px" : "200px"} -40px;
    background: ${props => props.theme=== "white" ? "white" : globalColors.dark};
`;

export default function ContactsPane(props){
    const {theme}=useContext(ThemeProvider);
    return <ContactsPaneSC theme={theme}>
        {props.children}
    </ContactsPaneSC>;
};