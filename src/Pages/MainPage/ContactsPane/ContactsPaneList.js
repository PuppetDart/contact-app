import { useContext } from 'react';
import styled from 'styled-components/macro';
import globalColors from "../../../globalVars"
import { ThemeProvider } from '../MainPage';

const ContactsListSC = styled.div`
    padding: 65px 0 0 0;
    margin: 25px 25px 25px 27px;

    overflow: hidden;

    ::-webkit-scrollbar{
        width: 5px;
    }
    ::-webkit-scrollbar-thumb{
        background-color: ${props => props.theme.color === globalColors.darkGrey ? globalColors.darkGrey : globalColors.lightGrey};
    }
    :hover{
        overflow-y: scroll;
    }
    transition: all ease-in-out 1s;
`;

export default function ContactsList(props) {
    const {theme} =useContext(ThemeProvider);
    return <ContactsListSC theme={theme}>{props.children}</ContactsListSC>
};