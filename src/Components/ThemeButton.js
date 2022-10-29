import { useContext } from "react";
import styled, { keyframes } from 'styled-components/macro';
import { motion } from "framer-motion";

import globalColors from '../globalVars';
import { ThemeProvider } from "../Pages/MainPage/MainPage";
import { ReactComponent as DayModeIcon } from './../icons/dayMode.svg';
import { ReactComponent as NightModeIcon } from './../icons/nightMode.svg';

const themeButtonAnimation = keyframes`
    0% {transform:rotate(0deg)}
    40% {transform:rotate(30deg)}
    60% {transform:rotate(-90deg)}
    100% {transform:rotate(0deg)}
`;

//S ------ styled-components
const ThemeButtonSC = styled(motion.div)`
    position: fixed;
    bottom: 40px;
    right: 40px;
    
    height: 20px;
    width: 20px;
    padding: 15px;
    border-radius: 50%;
    
    background-color: ${props => props.theme === "white" ? globalColors.dark : "white"};
    box-shadow: 0 0 18px -10px black;
    z-index: 4;

    cursor: pointer;
    user-select: none;
    transition: background-color ease 0.5s, all ease-in-out 0.1s;
    animation: ${themeButtonAnimation} 8s infinite ease;

    :active{
        scale: 0.9;
    }

    @media (max-width: 600px) {
        bottom: 20px;
        right: 25px;
        height: 18px;
        width: 18px;
    }
`;

const DayIconSC = styled(DayModeIcon)`
    fill: black;
`;
const NightIconSC = styled(NightModeIcon)`
    fill: wheat;
`;
//E ------ styled-components

export default function ThemeButton(props) {

    const { theme, themeHandler } = useContext(ThemeProvider);
    const iconContent = (theme === "white" ? <NightIconSC /> : <DayIconSC />);
    return <ThemeButtonSC
        onClick={themeHandler}
        theme={theme}
        initial={{ opacity: 0 , scale: 0.5}}
        transition={{
            opacity: {duration:1, delay: 0.6},
            scale: { duration: 3, type: "spring" },
        }}
        animate={{ opacity:1, scale:1.5 }}
    >
        {iconContent}
    </ThemeButtonSC>
};