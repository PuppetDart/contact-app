// ------ library tools
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { ThemeProvider } from 'styled-components/macro';
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase-config";

// ------ components
import CrudButton from "./../Components/CrudButton";
import Form, { ContainerSC, FormButtonContainer, Avatar, AddImageIconSC, ImageInputLayer } from './../Components/AddUpdateForm';

import { getRecords } from "../HelperFunctions/getRecords";

export default function AddContactPage() {

    const navigate = useNavigate();

    //list must be available at the same level
    //as the one which is utilizing setList
    //or else setList won't be recognized as a function
    const [theme, list, setList, loading, setLoading] = useOutletContext();

    const [nameInput, setNameInput] = useState("");
    const [numInput, setNumInput] = useState("");
    const [occuInput, setOccuInput] = useState("");

    //to handle style of AddImageIconSC when file-selected
    const [imgIconStyle, setImgIconStyle] = useState({});

    //for file-Object-URL (obtained by converting file-object from Input-File)
    const [fileObjURL, setFileObjURL] = useState("");

    //for raw file-Object (obtained from Input-File (e.target.files[0]))
    const [file, setFile] = useState("");

    // ----------------------------------------------------------
    //S ------------------------------------- EVENT HANDLERS
    const addContactHandler = async () => {
        setLoading(true);
        const timestamp = Date.now();
        const collectionRef = collection(db, 'contacts1');
        const imageRef = ref(storage, 'contacts1/' + timestamp + '.jpg');

        try {
            //uploading contact details
            addDoc(collectionRef, {
                name: nameInput,
                number: numInput,
                occupation: occuInput,
                timestamp: timestamp,
            }).then((x) => {
                getRecords(setList).then(() => {
                    navigate("/");
                    setLoading(false);
                });
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
        setImgIconStyle({});
    }

    async function inputChangeHandler(e) {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
            setFileObjURL(URL.createObjectURL(e.target.files[0]));
        }
        setImgIconStyle(
            { position: "absolute", bottom: "-10px" }
        );
    }
    //E ------------------------------------- EVENT HANDLERS
    // ----------------------------------------------------------

    return (
        <ContainerSC
            initial={{ opacity: 0 }}
            transition={{ duration: 0.2, type: "just"}}
            animate={{ opacity: 1 }}
        >

            <ThemeProvider theme={{ theme: theme }}>
                <Avatar file={fileObjURL}>
                    <AddImageIconSC style={imgIconStyle} />
                    <ImageInputLayer accept="image/jpg" type="file" onChange={inputChangeHandler} />
                </Avatar>
                <Form
                    theme={theme}
                    nameInput={nameInput}
                    setNameInput={setNameInput}
                    numInput={numInput}
                    setNumInput={setNumInput}
                    occuInput={occuInput}
                    setOccuInput={setOccuInput}
                />

            </ThemeProvider>
            <FormButtonContainer>
                <CrudButton initial={{ y: 100 }} onClick={addContactHandler}>Add Contact</CrudButton>
                <CrudButton initial={{ y: 100 }} delay={0.05} onClick={clearForm}>Clear</CrudButton>
            </FormButtonContainer>
        </ContainerSC>
    );
}