import styled, { keyframes } from "styled-components";
import glCl from '../globalVars';

import {ReactComponent as DayModeIcon} from './../icons/dayMode.svg';
import {ReactComponent as NightModeIcon} from './../icons/nightMode.svg';

const themeButtonAnimation=keyframes`
    0% {transform:rotate(0deg)};
    40% {transform:rotate(30deg)};
    60% {transform:rotate(-30deg)};
    100% {transform:rotate(0deg)}
`

const ThemeButtonSC = styled.div`
    cursor: pointer;
    padding: 15px;
    position: fixed;
    height: 20px;
    width: 20px;
    background-color: ${props => props.theme.background == "white" ? glCl.dark : "white"};
    box-shadow: 0 0 4px 0 black;
    bottom: 40px;
    right: 40px;
    border-radius: 50%;
    transition: all ease 0.5s;
    animation: ${themeButtonAnimation} 8s infinite ease-in-out;
`;

const DayIconSC=styled(DayModeIcon)`
    fill: black;
`
const NightIconSC=styled(NightModeIcon)`
    fill: wheat;
`

export default function ThemeButton(props) {

    const iconContent = props.theme.background == "white" ? <NightIconSC/> :  <DayIconSC/> ;

    return <ThemeButtonSC onClick={props.click} theme={props.theme}>
        {iconContent}
    </ThemeButtonSC>
};