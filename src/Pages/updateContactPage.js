import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { ThemeProvider } from 'styled-components/macro';
import CrudButton from "../Components/CrudButton";
import { useEffect, useState } from "react";
import { db, storage } from "../firebase-config";
import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { getRecords } from "../HelperFunctions/getRecords";
import {ContainerSC, FormButtonContainer, Avatar, AddImageIconSC, ImageInputLayer, FormContainer, FormElement, InputBox, InputBoxLabel} from './../Components/AddUpdateForm';

export default function UpdateContactPage(props) {

    const navigate = useNavigate();
    const [theme, list, setList] = useOutletContext();
    const { cId } = useParams();

    const [nameInput, setNameInput] = useState(list[cId - 1].name);
    const [numInput, setNumInput] = useState(list[cId - 1].number);
    const [occuInput, setOccuInput] = useState(list[cId - 1].occupation);

    //to keep a track of whether new file selected
    const [imgSelected, setImageSelected] = useState(false);

    //to handle style of AddImageIconSC when file selected
    const [imgIconStyle, setImgIconStyle] = useState({});
    
    //for file-URL (obtained from firebase/storage) or
    //file-Object-URL (obtained by converting file-object from Input-File)
    const [fileObjURL, setFileObjURL] = useState("");
    
    //for raw file-Object (obtained from Input-File (e.target.files[0]))
    const [file, setFile] = useState("");
    
    //reference to the current image in firebase/storage
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
    
    // ----------------------------------------------------------
    //S ------------------------------------- EVENT HANDLERS
    const updateContactHandler = async () => {
        try {
            
            //handling Collection
            //only if any field changed
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
            //only if new-image selected
            if (imgSelected) {
                await deleteObject(imageRef).then(()=>{          
                    uploadBytes(imageRef, file);
                    navigate("/");
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
    //E ------------------------------------- EVENT HANDLERS
    // ----------------------------------------------------------

    return (
        <ContainerSC>

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
        </ContainerSC>
    );
}