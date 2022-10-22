import { useContext } from "react";
import styled, { keyframes } from "styled-components";
import globalColors from '../globalVars';
import { ThemeProvider } from "../Pages/MainPage/MainPage";

import {ReactComponent as DayModeIcon} from './../icons/dayMode.svg';
import {ReactComponent as NightModeIcon} from './../icons/nightMode.svg';

const themeButtonAnimation=keyframes`
    0% {transform:rotate(0deg)}
    40% {transform:rotate(30deg)}
    60% {transform:rotate(-90deg)}
    100% {transform:rotate(0deg)}
`

const ThemeButtonSC = styled.div`
    position: fixed;
    bottom: 40px;
    right: 40px;
    
    height: 20px;
    width: 20px;
    padding: 15px;
    border-radius: 50%;
    
    background-color: ${props => props.theme.background === "white" ? globalColors.dark : "white"};
    box-shadow: 0 0 4px 0 black;
    z-index: 2;

    cursor: pointer;
    transition: all ease 0.5s;
    animation: ${themeButtonAnimation} 8s infinite ease;
`;

const DayIconSC=styled(DayModeIcon)`
    fill: black;
`
const NightIconSC=styled(NightModeIcon)`
    fill: wheat;
`

export default function ThemeButton(props) {

    const {theme, themeHandler}=useContext(ThemeProvider);
    const iconContent = theme.background === "white" ? <NightIconSC/> :  <DayIconSC/> ;
    return <ThemeButtonSC onClick={themeHandler} theme={theme}>
        {iconContent}
    </ThemeButtonSC>
};