import { useOutletContext } from "react-router-dom";
import styled, { ThemeProvider } from 'styled-components/macro';
import globalColors from "../globalVars";
import CrudButton from "./../Components/CrudButton";
import { ReactComponent as AddImageIcon } from "./../icons/addImageIcon.svg";
import { useState } from "react";
import { db, storage } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

import { useNavigate } from "react-router-dom";

import { getRecords } from "../HelperFunctions/getRecords";

const AddContactSC = styled.div`
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
    fill: ${props => props.theme === "white" ? globalColors.dark : globalColors.lightGrey};
    height: 40px;
    width: auto;
    border-radius: 50%;
    background-color: ${props => props.theme === "white" ? "white" : globalColors.dark };
    border: 2px solid ${props => props.theme === "white" ? "white" : globalColors.dark };
`;

const ImageInputLayer = styled.input`
    height: 100%;
    width: 100%;
    border-radius: 10px;
    position: absolute;
    opacity: 0%;
    cursor: pointer;
`;

const FormContainer = styled.div`
    display: flex;
    flex-flow: column;
    gap: 25px;
    justify-content: center;
`;

const FormElement = styled.div`
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
    
    background-color: ${props => props.theme === "white" ? globalColors.dark : globalColors.lightGrey};

    color: ${props => props.theme};
    font-size: 15px;
    text-decoration: none;
    :focus{
        background-color: ${props => props.theme === "white" ? "black" : "white"};
    }
`;

const InputBoxLabel = styled.label`
    color: ${props => props.theme === "white" ? globalColors.darkGrey : globalColors.lightGrey};
    font-size: 12px;
    letter-spacing: 15px;
`;

const FormButtonContainer = styled.div`
    display: flex;
    gap: 15px
`;

export default function AddContactPage(props) {

    const navigate= useNavigate();
    const [theme, list, setList] = useOutletContext();

    const [nameInput, setNameInput] = useState("");
    const [numInput, setNumInput] = useState("");
    const [occuInput, setOccuInput] = useState("");
    const [imageSelected, setImageSelected] = useState({});
    const [fileObjURL, setFileObjURL] = useState("");
    const [file, setFile] = useState("");

    const collectionRef = collection(db, 'contacts1');
    const timestamp =Date.now();
    const imageRef = ref(storage, 'contacts1/' + timestamp + '.jpg');

    const addContactHandler = async () => {
        try {
            //uploading contact details
            addDoc(collectionRef, {
                name: nameInput,
                number: numInput,
                occupation: occuInput,
                timestamp: timestamp,
            }).then((x) => {
                getRecords(setList);
                navigate("/");
            });
            //uploading avatar image
            await uploadBytes(imageRef, file);
        }
        catch (exception) {
            console.log(exception);
        }
    }

    const clearForm = () => {
        setNameInput("");
        setNumInput("");
        setOccuInput("");
        setFileObjURL("");
        setImageSelected({});
    }

    async function inputChangeHandler(e) {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
            setFileObjURL(URL.createObjectURL(e.target.files[0]));
        }
        setImageSelected(
            { position: "absolute", bottom: "-10px" }
        );
    }

    return (
        <AddContactSC>

            <ThemeProvider theme={{theme:theme}}>
                <Avatar file={fileObjURL}>
                    <AddImageIconSC style={imageSelected} />
                    <ImageInputLayer accept="image/jpg" type="file" onChange={inputChangeHandler} />
                </Avatar>
                <FormContainer>
                    <FormElement>
                        <InputBoxLabel htmlFor="name">NAME</InputBoxLabel>
                        <InputBox value={nameInput} onChange={(e) => { setNameInput(e.target.value) }} type="text" id="name" />
                    </FormElement>
                    <FormElement>
                        <InputBoxLabel htmlFor="number">NUMBER</InputBoxLabel>
                        <InputBox value={numInput} onChange={(e) => setNumInput(e.target.value)} type="number" id="number" />
                    </FormElement>
                    <FormElement>
                        <InputBoxLabel htmlFor="occupation">OCCUPATION</InputBoxLabel>
                        <InputBox value={occuInput} onChange={(e) => setOccuInput(e.target.value)} type="text" id="occupation" />
                    </FormElement>
                </FormContainer>

            </ThemeProvider>
            <FormButtonContainer>
                <CrudButton onClick={addContactHandler}>Add Contact</CrudButton>
                <CrudButton onClick={clearForm}>Clear</CrudButton>
            </FormButtonContainer>
        </AddContactSC>
    );
}