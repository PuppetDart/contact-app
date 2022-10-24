import { useContext } from "react";
import styled from 'styled-components/macro';
import { ThemeProvider } from "../Pages/MainPage/MainPage";

const CrudButtonSC = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    
    height: 40px;
    width: fit-content;
    padding: 0 25px;
    border-radius: 5px 0 15px 5px;
    
    color: ${props=> props.theme};
    word-wrap: nowrap;
    user-select: none;
    
    background-color: ${props=> props.theme ==="white" ? "black" : "white"};
    transition: all ease-in-out 0.3s;
    cursor: pointer;
    opacity: 75%;

    :hover{
        opacity: 100%;
        z-index: 2;
    }
`;

export default function CrudButton(props){
    const {theme}=useContext(ThemeProvider);
    return <CrudButtonSC onClick={props.onClick} theme={theme}>{props.children}</CrudButtonSC>
}