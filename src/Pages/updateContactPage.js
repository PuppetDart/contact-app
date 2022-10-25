import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { ThemeProvider } from 'styled-components/macro';
import CrudButton from "../Components/CrudButton";
import { useEffect, useState } from "react";
import { db, storage } from "../firebase-config";
import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { getRecords } from "../HelperFunctions/getRecords";
import Form, { ContainerSC, FormButtonContainer, Avatar, AddImageIconSC, ImageInputLayer } from './../Components/AddUpdateForm';
export default function UpdateContactPage() {

    const navigate = useNavigate();
    const [theme, list, setList, loading, setLoading] = useOutletContext();
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
    const imageRef = ref(storage, 'contacts1/' + list[cId - 1].timestamp + '.jpg');

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
            if (nameInput !== list[cId - 1].name || occuInput !== list[cId - 1].occupation || numInput !== list[cId - 1].number) {
                setLoading(true);
                const documentRef = doc(db, 'contacts1', list[cId - 1].code);
                await deleteDoc(documentRef);

                const collectionRef = collection(db, 'contacts1');
                addDoc(collectionRef, {
                    name: nameInput,
                    number: numInput,
                    occupation: occuInput,
                    timestamp: list[cId - 1].timestamp,
                }).then(() => {
                    getRecords(setList).then(()=>{
                        setLoading(false);
                    })
                })
            }
            
            //handling Images
            //only if new-image selected
            if (imgSelected) {
                setLoading(true);
                await deleteObject(imageRef).then(() => {
                    uploadBytes(imageRef, file).then(()=>{
                        setLoading(false);
                    })
                })
            }
            
        }
        catch (exception) {
            console.log(exception);
        }
        finally{
            navigate("/");
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
            setImageSelected(true);
        }
        setImgIconStyle({ position: "absolute", bottom: "-10px" });
    }
    //E ------------------------------------- EVENT HANDLERS
    // ----------------------------------------------------------

    return (
        <ContainerSC
            initial={{ opacity: 0 }}
            transition={{ duration: 0.2, type: "just" }}
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
                <CrudButton initial={{ y: 100 }} onClick={updateContactHandler}>Update</CrudButton>
                <CrudButton initial={{ y: 100 }} delay={0.05} onClick={clearForm}>Clear</CrudButton>
            </FormButtonContainer>
        </ContainerSC>
    );
}