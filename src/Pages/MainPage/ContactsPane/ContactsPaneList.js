import { useContext } from 'react';
import styled from 'styled-components/macro';
import globalColors from "../../../globalVars"
import { ThemeProvider } from '../MainPage';

function ContactsList_hoverHandler(){

}

const ContactsListSC = styled.div`
    padding: 65px 0 0 0;
    margin: 25px 25px 25px 27px;

    overflow-x: hidden;
    overflow-y: auto;

    ::-webkit-scrollbar{
        width: 5px;
    }
    ::-webkit-scrollbar-thumb{
        background-color: ${props => props.theme.background === "white" ? globalColors.darkGrey : globalColors.lightGrey};
        /* background-color: ${props => props.theme.background}; */
    }
    transition: all .3s ease;
`;

export default function ContactsList(props) {
    const {theme} =useContext(ThemeProvider);
    return <ContactsListSC onmousehover={ContactsList_hoverHandler} theme={theme}>{props.children}</ContactsListSC>
};