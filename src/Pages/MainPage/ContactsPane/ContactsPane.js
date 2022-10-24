import { useContext } from 'react';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion';

import { ThemeProvider } from './../MainPage'
import globalColors from '../../../globalVars';

const ContactsPaneSC = styled(motion.div)`
    position: relative;
    flex: 1.8;
    display: flex;
    flex-flow: column;
    gap: 20px;

    height: 100vh;
    min-width: 320px;
    border-right: 2px rgb(160,160,160) solid;
    box-sizing: border-box;
    
    box-shadow: 0 0 ${props => props.theme === "white" ? "100px" : "200px"} -40px;
    background: ${props => props.theme === "white" ? "white" : globalColors.dark};
`;

export default function ContactsPane(props) {
    const { theme } = useContext(ThemeProvider);
    return <ContactsPaneSC
        theme={theme}
        whileTap={{width:"500px"}}
        initial={{x:-300}}
        transition={{duration: 0.8, type: "spring"}}
        animate={{x: 0}}
        >
        {props.children}
    </ContactsPaneSC>;
};