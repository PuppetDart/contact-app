// ------ library tools
import { useEffect, useState } from "react";
import styled from 'styled-components/macro';
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { deleteObject, getDownloadURL, ref } from "firebase/storage";
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../firebase-config";

import { ReactComponent as CallIcon } from "./../icons/callIcon.svg"

// ------ components
import CrudButton from "./CrudButton";
import LinkStyled from "./LinkStyled";

// ------ local elements [function/data/Icon]
import globalColors from "../globalVars";
import { getRecords } from "../HelperFunctions/getRecords";
import LoadScr from "./LoadScr";

//S ------ styled-components

const IconContainer = styled(motion.div)`
    display: flex;
    text-align: end;
`;
const CallIconMini = styled(CallIcon)`
    height: 14px;
    width: 14px;
    fill: ${props => props.theme === "white" ? globalColors.dark : globalColors.lightGrey};
`;

const Divider = styled(motion.div)`
    height: 1px;
    width: 500px;
    margin: 7px 7px 7px 0;
    background: linear-gradient(to left, transparent 10%, ${globalColors.lightGrey} 75%);
    display: flex;
    align-items: center;
    gap: 20px;

    @media (max-width: 768px) {
        width: 100%;
        background: ${globalColors.lightGrey};
    }
    transition: width 1s ease-in-out;
`;

const ContactContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`;

const ContactsCardSC = styled(motion.div)`
    display: flex;
    flex-flow: column;
    gap: 40px;

    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    transition: all 0.1s ease-in-out;
    
    margin: 40px 40px 40px 60px;
    @media (max-width: 768px) {
        margin: 40px 40px 40px 45px;
    }
`;

const Avatar = styled.div`
    height: 350px;
    max-width: 300px;
    width: 100%;
    
    border-radius: 10px;
    box-shadow: 0 0 40px -10px black;
    
    /* in case direct url passing is needed */
    /* background: url(${require("./../avatars/WadeWilson.jpg")}); */
    
    background: url(${props => props.bg});
    background-size: cover;
    background-position-x: center;
`;

const Detail = styled.div`
    h4,h1{
        margin: 0;
        width: fit-content;
        color: ${props => props.theme === "white" ? "black" : "white"};
        backdrop-filter: blur(2px);
    }
    h4{
        font-weight: 300;
        letter-spacing: 15px;
        @media (max-width: 600px) {
            letter-spacing: 10px;
        }
    }
    h3{
        margin: 0 0 15px;
        color: ${props => props.theme === "white" ? "black" : "white"};
        letter-spacing: 15px;
    }
    p{
        margin-right: 10px;
        backdrop-filter: blur(2px);
        color: ${props => props.theme === "white" ? globalColors.darkGrey : globalColors.lightGrey};
    }
`;

const ButtonsContainer = styled.div`
    display: flex;
    gap: 15px;
`;
//E ------ styled-components

export default function ContactsCard() {

    const navigate = useNavigate();
    // cId : the 'Id' in '/contact:Id' 
    const { cId } = useParams();
    const [avatarBg, setAvatarBg] = useState("");
    const [currentAvatar, setCurrentAvatar] = useState("");

    // context for : <DetailsPane> <Outlet   |||x|||   /> </DetailsPane>
    // must be parsed as array - [theme], & not object - {theme}
    const [theme, list, setList, loading, setLoading] = useOutletContext();

    var imageRef = "";

    useEffect(() => {
        try {
            if (list) {
                imageRef = ref(storage, 'contacts1/' + list[cId - 1].timestamp + '.jpg');
                getDownloadURL(imageRef).then((url) => {
                    setAvatarBg(url);
                    setCurrentAvatar(cId - 1);
                });
            }
            else {
                getRecords(setList);
            }
        }
        catch (exception) {
            console.log(exception);
        }
    }, [cId, list]);

    //function to delete contact
    async function onRemoveHandler() {
        try {
            setLoading(true);
            const documentRef = doc(db, 'contacts1', list[cId - 1].code);
            await deleteDoc(documentRef).then(() => {
                getRecords(setList).then(() => {
                    navigate("/");
                    setLoading(false);
                }
                );
            });
            await deleteObject(imageRef);
        }
        catch (exception) {
            console.log(exception);
        }
    }

    return (
        <>
            {list && currentAvatar === (cId - 1) ? <ContactsCardSC
                key={list[cId - 1].id}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.6, type: "just", delay: 0.2 }}
                animate={{ opacity: 1 }}
            >

                {/* require is essential for utilizing any image object */}
                {/* cId - 1 : because the cId seems to start at 2 */}
                <Avatar bg={avatarBg} />
                <Detail theme={theme}>
                    <h3>{list[cId - 1].occupation.toUpperCase()}</h3>
                    <h1>{list[cId - 1].name}</h1>
                    <Divider />
                    <ContactContainer>
                        <IconContainer
                            animate={{ rotate: [0, -10, 10, -20, 20, -30, 30, -20, 20, 0] }}
                            transition={{rotate: {duration:1.5, delay: 0.6}}}
                        >
                            <CallIconMini theme={theme}/>
                        </IconContainer>
                        <h4> +91 {list[cId - 1].number}</h4>
                    </ContactContainer>
                    <Divider />
                    <p> Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Debitis tenetur, bn voluptas voluptates quas consequuntur iusto
                        aut? Praesentium ab itaque, excepturi ullam cupiditate dolor in
                        iste suscipit laboriosam vitae, consequatur eum perferendis sequi
                        blanditiis deleniti saepe quas! Eos, aut optio! Rerum odit
                        dignissimos culpa. Deserunt explicabo laudantium expedita
                        optio saepe!
                        <br /><br />
                        Lorem ipsum dolor sit amet consectetur aelit. Est, quia.
                    </p>
                </Detail>
                <ButtonsContainer>
                    <CrudButton initial={{ y: 100 }} onClick={onRemoveHandler}>Remove</CrudButton>
                    <LinkStyled to={"/updateContact/" + (cId)}>
                        <CrudButton initial={{ y: 100 }} delay={0.05} >Update</CrudButton>
                    </LinkStyled>
                </ButtonsContainer>
            </ContactsCardSC> : <LoadScr />}
        </>
    );
};