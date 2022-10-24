import styled from 'styled-components/macro';
import { motion } from 'framer-motion';

import globalColors from "../globalVars";
import { ReactComponent as AddImageIcon } from "./../icons/addImageIcon.svg";

//S ------ styled-components
const ContainerSC = styled(motion.div)`
    display: flex;
    flex-flow: column;
    gap: 40px;

    margin: 20px 40px;

    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    z-index: 1;
`;

const Avatar = styled.div`
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    height: 350px;
    width: 300px;
    border-radius: 10px;
    border: 2px ${globalColors.darkGrey} solid;
    background: url(${props => props.file});
    background-size: cover;
    background-position-x: center;
    box-shadow: 0 0 40px -10px black;

    cursor: pointer;
`;

const AddImageIconSC = styled(AddImageIcon)`
    fill: ${props => props.theme.theme === "white" ? globalColors.dark : globalColors.lightGrey};
    height: 40px;
    width: auto;
    border-radius: 50%;
    border: 2px solid ${props => props.theme.theme === "white" ? "white" : globalColors.dark };
    background-color: ${props => props.theme.theme === "white" ? "white" : globalColors.dark };
`;

const ImageInputLayer = styled.input`
    position: absolute;

    height: 100%;
    width: 100%;
    border-radius: 10px;

    cursor: pointer;
    opacity: 0%;
`;

const FormContainer = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: center;
    gap: 25px;
`;

const FormElement = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: center;
    gap: 4px;
`;

const InputBox = styled.input`
    padding: 10px;
    outline: none;
    border: none;
    border-radius: 5px 5px 15px;
    box-shadow: 0 0 10px -5px black;
    
    background-color: ${props => props.theme.theme === "white" ? globalColors.dark : globalColors.lightGrey};

    color: ${props => props.theme.theme};
    font-size: 15px;
    text-decoration: none;
    :focus{
        background-color: ${props => props.theme.theme === "white" ? "black" : "white"};
    }
`;

const InputBoxLabel = styled.label`
    color: ${props => props.theme.theme === "white" ? globalColors.darkGrey : globalColors.lightGrey};
    font-size: 12px;
    letter-spacing: 15px;
`;

const FormButtonContainer = styled.div`
    display: flex;
    gap: 15px
`;
//E ------ styled-components

export {ContainerSC, FormButtonContainer, Avatar, AddImageIconSC, ImageInputLayer, FormContainer, FormElement, InputBox, InputBoxLabel};