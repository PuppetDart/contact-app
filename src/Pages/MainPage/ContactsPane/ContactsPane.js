import { useContext, useState } from 'react';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion';

import { ThemeProvider } from './../MainPage'
import globalColors from '../../../globalVars';

const ContactsPaneSC = styled(motion.div)`
    position: ${props => props.collapse? "absolute" : "relative" };
    flex: 1.8;
    display: flex;
    flex-flow: column;
    gap: 20px;
    z-index: 2;
    
    height: 100%;
    min-width: 280px;
    max-width: 450px;
    border-right: 2px rgb(160,160,160) solid;
    box-sizing: border-box;
    
    box-shadow: 0 0 ${props => props.theme === "white" ? "100px" : "200px"} -40px;
    background: ${props => props.theme === "white" ? "white" : globalColors.dark};
    transition: left 0.2s ease-in-out;
`;

const CollapseButton =styled.div`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    right: -20px;
    height: 40px;
    width: 40px;
    background-color: ${globalColors.darkGrey};
    border-radius: 50%;
    z-index: 40;
    box-shadow: 0 0 0px 5px ${props => props.theme === "white" ? globalColors.dark: "white"};
`;

export default function ContactsPane(props) {

    const { theme, collapse, setCollapse } = useContext(ThemeProvider);

    return <ContactsPaneSC
        theme={theme}
        collapse={collapse}
        initial={{x: -280}}
        transition={{duration: 0.8, type: "spring"}}
        animate={{x: collapse ? -280 :0}}
        >
        <CollapseButton
            theme={theme}
            onClick={()=>{
            setCollapse(collapse?0:1)
            }}/>
        {props.children}
    </ContactsPaneSC>;
};