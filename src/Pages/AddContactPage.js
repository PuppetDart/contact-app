import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import globalColors from "../globalVars";
import CrudButton from "./../Components/CrudButton";
import { ReactComponent as AddImageIcon } from "./../icons/addImageIcon.svg";

const AddContactSC = styled.div`
    display: flex;
    flex-flow: column;
    gap: 40px;

    margin: 20px 40px;

    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    z-index: 1;
`;

const Avatar = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    height: 350px;
    width: 300px;
    border-radius: 10px;
    border: 2px ${globalColors.darkGrey} solid;
    box-shadow: 0 0 40px -10px black;
    
    cursor: pointer;
`;

const AddImageIconSC = styled(AddImageIcon)`
    fill: ${props => props.theme.background === "white" ? globalColors.dark : globalColors.lightGrey};
    height: 40px;
`;

const FormContainer =styled.div`
    display: flex;
    flex-flow: column;
    gap: 25px;
    justify-content: center;
`;

const FormElement =styled.div`
    display: flex;
    flex-flow: column;
    gap: 4px;
    justify-content: center;
`;

const InputBox = styled.input`
    border-radius: 5px 5px 15px;
    padding: 10px;
    border: none;
    outline: none;
    box-shadow: 0 0 10px -5px black;
    
    background-color: ${props => props.theme.background === "white" ? globalColors.dark : globalColors.lightGrey};

    color: ${props => props.theme.background};
    font-size: 15px;
    text-decoration: none;
    :focus{
        background-color: ${props => props.theme.background === "white" ? "black" : "white"};
    }
`;

const InputBoxLabel = styled.label`
    color: ${props => props.theme.color};
    font-size: 12px;
    letter-spacing: 15px;
`;


const addContactHandler = () => {

}

export default function AddContactPage(props) {

    const [theme] = useOutletContext();

    return (
        <AddContactSC>
            <Avatar><AddImageIconSC theme={theme} /></Avatar>
            <FormContainer>
            <FormElement>
                <InputBoxLabel theme={theme} htmlFor="number">NAME</InputBoxLabel>
                <InputBox theme={theme} type="text" id="number" />
            </FormElement>
            <FormElement>
                <InputBoxLabel theme={theme} htmlFor="number">NUMBER</InputBoxLabel>
                <InputBox theme={theme} type="contact" id="number" />
            </FormElement>
            <FormElement>
                <InputBoxLabel theme={theme} htmlFor="number">OCCUPATION</InputBoxLabel>
                <InputBox theme={theme} type="text" id="occupation" />
            </FormElement>
            </FormContainer>
            <CrudButton click={addContactHandler}>Add Contact</CrudButton>
        </AddContactSC>
    );
}