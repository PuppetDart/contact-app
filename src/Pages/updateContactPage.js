import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import styled, { ThemeProvider } from 'styled-components/macro';
import globalColors from "../globalVars";
import CrudButton from "../Components/CrudButton";
import { ReactComponent as AddImageIcon } from "./../icons/addImageIcon.svg";
import { useEffect, useState } from "react";
import { db, storage } from "../firebase-config";
import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

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
    background-color: ${props => props.theme=== "white" ? "white" : globalColors.dark};
    border: 2px solid  ${props => props.theme=== "white" ? "white" : globalColors.dark};
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

    color:  ${props => props.theme=== "white" ? "white" : globalColors.dark};
    font-size: 15px;
    text-decoration: none;
    :focus{
        background-color: ${props => props.theme === "white" ? "black" : "white"};
    }
`;

const InputBoxLabel = styled.label`
    color: ${props => props.theme=== "white" ? globalColors.darkGrey : globalColors.lightGrey};
    font-size: 12px;
    letter-spacing: 15px;
`;

const FormButtonContainer = styled.div`
    display: flex;
    gap: 15px
`;

export default function UpdateContactPage(props) {

    const navigate = useNavigate();

    const [theme, list, setList] = useOutletContext();
    const { cId } = useParams();

    const [nameInput, setNameInput] = useState(list[cId - 1].name);
    const [numInput, setNumInput] = useState(list[cId - 1].number);
    const [occuInput, setOccuInput] = useState(list[cId - 1].occupation);
    
    const [imgIconStyle, setImgIconStyle] = useState({});
    const [imgSelected, setImageSelected] = useState(false);
    
    //for storing file-URL (obtained from firebase/storage)
    //or file-Object-URL (obtained by converting file-object from Input-File)
    const [fileObjURL, setFileObjURL] = useState("");
    
    //for storing raw file-Object (obtained from Input-File (e.target.files[0]))
    const [file, setFile] = useState("");
    
    const imageRef = ref(storage, 'contacts1/' + list[cId - 1].timestamp + '.jpg') ;
    
    //for setting the current image as state in fileObjURL
    useEffect(() => {
        getDownloadURL(imageRef).then((url) => {
            setFileObjURL(url);
        });
        //change style of the addIcon in center of the Avatar
        //when it contains image
        setImgIconStyle({ position: "absolute", bottom: "-10px" });
    }, []);
    
    const updateContactHandler = async () => {
        try {
            
            //handling Collection
            if (nameInput != list[cId - 1].name || occuInput != list[cId - 1].occupation || numInput != list[cId - 1].number) {
                const documentRef = doc(db, 'contacts1', list[cId - 1].code);
                await deleteDoc(documentRef);

                const collectionRef = collection(db, 'contacts1');
                addDoc(collectionRef, {
                    name: nameInput,
                    number: numInput,
                    occupation: occuInput,
                    timestamp: list[cId - 1].timestamp,
                })
            }
            
            //handling Images
            //only if image has been changed
            if (imgSelected) {
                await deleteObject(imageRef).then(()=>{          
                    uploadBytes(imageRef, file);
                })
            }

        }
        catch (exception) {
            console.log(exception);
        }
        finally{
            getRecords(setList);
        }
    }

    //for handling the image change 
    async function inputChangeHandler(e) {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
            setFileObjURL(URL.createObjectURL(e.target.files[0]));
            setImageSelected(true);
        }
        setImgIconStyle({ position: "absolute", bottom: "-10px" });
    }

    const clearForm = () => {
        setNameInput("");
        setNumInput("");
        setOccuInput("");
        setFileObjURL("");
        setImgIconStyle({});
    }

    return (
        <AddContactSC>

            <ThemeProvider theme={{theme:theme}}>
                <Avatar file={fileObjURL}>
                    <AddImageIconSC style={imgIconStyle} />
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
                <CrudButton onClick={updateContactHandler}>Update</CrudButton>
                <CrudButton onClick={clearForm}>Clear</CrudButton>
            </FormButtonContainer>
        </AddContactSC>
    );
}