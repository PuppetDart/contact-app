import styled from "styled-components";
import { Link } from "react-router-dom";
import glCl from "../globalVars";

const LinkSC = styled(Link)`
    display: block;

    width: 90%;
    height: auto;
    padding: 10px 0 10px;
    border-radius: 10px;

    text-decoration: none;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    color: ${props=> props.theme.color == glCl.darkGrey ? glCl.darkGrey : glCl.lightGrey};
    word-wrap: wrap;

    transition: all ease-in-out 0.2s;
    cursor: pointer;
    overflow-x: none;

    :last-child{
        padding-bottom: 0;
    }
    :first-child{
        padding-top: 0;
    }
    :hover{
        color: ${props =>props.theme.color == glCl.darkGrey ? "black" : "white"};
    }
`;

export default function LinkStyled(props){
    return <LinkSC theme={props.theme} to={props.to}>{props.text}</LinkSC>;
}