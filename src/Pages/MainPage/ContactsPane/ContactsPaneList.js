import { useContext, useState } from 'react';
import styled from 'styled-components/macro';

import globalColors from "../../../globalVars"
import { ThemeProvider } from '../MainPage';

const ContactsListSC = styled.div`
    padding: 65px 0 0 0;
    margin: 25px 25px 25px 27px;
    
    overflow-x: hidden;
    overflow-y: auto;
    transition: all 1s ease-in-out;
    
    ::-webkit-scrollbar{
        width: 5px;
    }
    ::-webkit-scrollbar-thumb{
        background-color: ${props => props.scrollVisibility ? (props.theme === "white" ? globalColors.darkGrey : globalColors.lightGrey) : props.theme === "white" ? "white" : globalColors.dark};
    }
`;

export default function ContactsList(props) {

    const [scrollVisibility, setScrollVisibility] = useState(false);
    const { theme } = useContext(ThemeProvider);

    const ContactsListEnter = () => setScrollVisibility(true);
    const ContactsListExit = () => setScrollVisibility(false);

    return (<ContactsListSC onMouseEnter={ContactsListEnter} onMouseLeave={ContactsListExit} scrollVisibility={scrollVisibility} theme={theme}>
        {props.children}
    </ContactsListSC>);
};