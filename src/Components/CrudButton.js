import { useContext } from "react";
import styled from 'styled-components/macro';
import { ThemeProvider } from "../Pages/MainPage/MainPage";
import ContactsHeader from "../Pages/MainPage/ContactsPane/ContactsPaneHeader";

const CrudButtonSC = styled.div`
    cursor: pointer;
    height: 40px;
    width: fit-content;
    padding: 0 25px;
    background-color: ${props=> props.theme.background ==="white" ? "black" : "white"};
    border-radius: 5px 0 15px 5px;
    color: ${props=> props.theme.background ==="white" ? "white" : "black"};
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    word-wrap: nowrap;

    ${ContactsHeader} &{
        background-color: red;
    }
`;

export default function CrudButton(props){
    const {theme}=useContext(ThemeProvider);
    return <CrudButtonSC onClick={props.click} theme={theme}>{props.children}</CrudButtonSC>
}