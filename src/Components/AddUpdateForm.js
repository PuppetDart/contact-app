import styled from 'styled-components/macro';
import { motion } from 'framer-motion';

import globalColors from "../globalVars";
import { ReactComponent as AddImageIcon } from "./../icons/addImageIcon.svg";
import { ReactComponent as CallIcon } from "./../icons/callIcon.svg";
import { ReactComponent as NameIcon } from "./../icons/nameIcon.svg";
import { ReactComponent as WorkIcon } from "./../icons/workIcon.svg";

//S ------ styled-components

const IconStyleObj = `
    height: 14px;
    width: 14px;
    padding: 8px;
    border-radius: 50%;
    transition: all ease-in-out 0.1s;
    cursor: pointer;
    :active{
        scale: 0.9;
    }
`;

const CallIconSC = styled(CallIcon)`
    ${IconStyleObj}
    fill: ${props => props.theme === "white" ? globalColors.dark : "white"};
    border: 4px solid ${props => props.theme === "white" ? globalColors.dark : globalColors.lightGrey};
`;
const NameIconSC = styled(NameIcon)`
    ${IconStyleObj}
    fill: ${props => props.theme === "white" ? globalColors.dark : "white"};
    border: 4px solid ${props => props.theme === "white" ? globalColors.dark : globalColors.lightGrey};
`;
const WorkIconSC = styled(WorkIcon)`
    ${IconStyleObj}
    fill: ${props => props.theme === "white" ? globalColors.dark : "white"};
    border: 4px solid ${props => props.theme === "white" ? globalColors.dark : globalColors.lightGrey};
`;

const ContainerSC = styled(motion.div)`
    display: flex;
    flex-flow: column;
    gap: 40px;

    margin: 40px 40px 40px 60px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    transition: all 0.4s ease-in-out;
    @media (max-width: 768px) {
        margin: 40px 40px 40px 45px;
    }
`;

const Avatar = styled.div`
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    height: 350px;
    max-width: 300px;
    border-radius: 10px;
    border: 2px ${globalColors.darkGrey} solid;
    background: url(${props => props.file});
    background-size: cover;
    background-position-x: center;
    box-shadow: 0 0 40px -10px black;

    cursor: pointer;
    transition: all ease-in-out 0.2s;
    :active{
        scale: 0.9;
    }
`;

const AddImageIconSC = styled(AddImageIcon)`
    fill: ${props => props.theme.theme === "white" ? globalColors.dark : globalColors.lightGrey};
    height: 40px;
    width: auto;
    border-radius: 50%;
    border: 2px solid ${props => props.theme.theme === "white" ? "white" : globalColors.dark};
    background-color: ${props => props.theme.theme === "white" ? "white" : globalColors.dark};
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
    position: relative;
    display: flex;
    flex-flow: column;
    justify-content: center;
    gap: 25px;
`;

const FormElement = styled.div`
    display: flex;    
    align-items: end;
    gap: 25px;

    transition: all 0.2s ease-in-out;
    @media (max-width: 600px) {
        gap: 10px;
        justify-content: space-between;
    }
`;
const MultiInputBoxContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 15px;

    @media (max-width: 600px) {
        gap: 10px;
        justify-content: space-between;
    }

    > input{
        :nth-child(1){
            width: 45px;
            @media (max-width: 600px) {
                width: 35px;
            }
            transition: width ease-in-out 0.1s;
        }
    }
`;

const InputContainerSC = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: center;
    width: 80%;
    max-width: 800px;
    gap: 5px;
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

    transition: background-color ease-in-out 0.2s;
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

export { ContainerSC, FormButtonContainer, Avatar, AddImageIconSC, ImageInputLayer };

export default function Form(props) {

    return (
        <FormContainer>
            <FormElement>
                <InputContainerSC>
                    <InputBoxLabel htmlFor="name">NAME</InputBoxLabel>
                    <InputBox value={props.nameInput} onChange={(e) => { props.setNameInput(e.target.value) }} type="text" id="name" />
                </InputContainerSC>
                <NameIconSC theme={props.theme} onClick={(e) => { props.setNameInput("") }} />
            </FormElement>
            <FormElement>
                <InputContainerSC>
                    <InputBoxLabel htmlFor="number">NUMBER</InputBoxLabel>
                    <MultiInputBoxContainer>
                        <InputBox style={{}} value={"+91"} disabled={true} type="text" id="areaCode" />
                        <InputBox style={{ width: "100%" }} value={props.numInput} onChange={(e) => props.setNumInput(e.target.value)} type="contact" id="number" />
                    </MultiInputBoxContainer>
                </InputContainerSC>
                <CallIconSC theme={props.theme} onClick={(e) => { props.setNumInput("") }} />
            </FormElement>
            <FormElement>
                <InputContainerSC>
                    <InputBoxLabel htmlFor="occupation">OCCUPATION</InputBoxLabel>
                    <InputBox value={props.occuInput} onChange={(e) => props.setOccuInput(e.target.value)} type="text" id="occupation" />
                </InputContainerSC>
                <WorkIconSC theme={props.theme} onClick={(e) => { props.setOccuInput("") }} />
            </FormElement>
        </FormContainer>
    );
}