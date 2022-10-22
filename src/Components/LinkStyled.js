import styled from 'styled-components/macro';
import { Link } from "react-router-dom";
import globalColors from "../globalVars";
import { useContext } from "react";
import { ThemeProvider } from "../Pages/MainPage/MainPage";

const LinkSC = styled(Link)`
    text-decoration: none;
    cursor: pointer;
    height: auto;
`;

const LinkContactListItemSC = styled(LinkSC)`
    display: block;
    
    width: 90%;
    padding: 10px 0 10px;
    border-radius: 10px;
    word-wrap: wrap;
    color: ${props=> props.theme.color === globalColors.darkGrey ? globalColors.darkGrey : globalColors.lightGrey};

    transition: all ease-in-out 0.2s;
    overflow-x: none;

    :last-child{
        padding-bottom: 65px;
    }
    :first-child{
        padding-top: 0;
    }
    :hover{
        color: ${props =>props.theme.color === globalColors.darkGrey ? "black" : "white"};
    }
`;

export function LinkContactListItem(props){
    const {theme}=useContext(ThemeProvider);
    return <LinkContactListItemSC  theme={theme} to={props.to}>{props.text}</LinkContactListItemSC >;
}

export default function LinkStyled(props){
    return <LinkSC to={props.to}>{props.children}</LinkSC>;
}