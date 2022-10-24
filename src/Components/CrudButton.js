import { useContext } from "react";
import { motion } from 'framer-motion';
import styled from 'styled-components/macro';

import { ThemeProvider } from "../Pages/MainPage/MainPage";

const CrudButtonSC = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    
    padding: 10px 25px;
    border-radius: 5px 0 15px 5px;
    
    color: ${props => props.theme};
    word-wrap: nowrap;
    user-select: none;
    
    background-color: ${props => props.theme === "white" ? "black" : "white"};
    transition: opacity ease-in-out 0.3s;
    cursor: pointer;
    opacity: 75%;

    :hover{
        opacity: 100%;
        z-index: 2;
    }
`;

export default function CrudButton(props) {
    const { theme } = useContext(ThemeProvider);
    return <CrudButtonSC
        whileTap={{ scale: 0.9 }}
        initial={props.initial}
        animate={{ y: 0, x: 0 }}
        transition={{
            y: { duration: 1, delay: props.delay, type: "spring" },
            x: { duration: 1, delay: props.delay, type: "spring" },
            scale: { duration: 0.1 }
        }}
        onClick={props.onClick}
        theme={theme}
    >{props.children}</CrudButtonSC>
}