import { useContext, useState } from 'react';
import styled from 'styled-components/macro';
import globalColors from "../../../globalVars"
import { ThemeProvider } from '../MainPage';

const ContactsListSC = styled.div`
    padding: 65px 0 0 0;
    margin: 25px 25px 25px 27px;
    
    overflow-x: hidden;
    overflow-y: auto;
    
    ::-webkit-scrollbar{
        width: 5px;
    }
    ::-webkit-scrollbar-thumb{
        background-color: ${props => props.scrollVisibility ?(props.theme.background === "white" ? globalColors.darkGrey : globalColors.lightGrey) : props.theme.background};
        /* background-color: ${props => props.scrollVisibility ? "black" : props.theme.background}; */
    }

    transition: all 1s ease-in-out;
`;

export default function ContactsList(props) {
    
    const [scrollVisibility, setScrollVisibility] = useState(false);
    const {theme} =useContext(ThemeProvider);
    function ContactsListEnter(e){
        setScrollVisibility(true);
        console.log("true");
    }
    function ContactsListExit(e){
        setScrollVisibility(false);
        console.log("false");
    }

    return <ContactsListSC onMouseEnter={ContactsListEnter} onMouseLeave={ContactsListExit} scrollVisibility={scrollVisibility} theme={theme}>{props.children}</ContactsListSC>
};