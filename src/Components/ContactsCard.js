import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import styled from 'styled-components/macro';

import { deleteObject, getDownloadURL, ref } from "firebase/storage";
import { db, storage } from "../firebase-config";
import CrudButton from "./CrudButton";
import globalColors from "../globalVars";
import { getRecords } from "../HelperFunctions/getRecords";
import { useEffect, useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";

import LinkStyled from "./LinkStyled";

const ContactsCardSC = styled.div`
    display: flex;
    flex-flow: column;
    gap: 40px;

    margin: 20px 0px 20px 40px;
    overflow: hidden;

    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    z-index: 1;
`;

const Avatar = styled.div`
    height: 350px;
    width: 300px;

    border-radius: 10px;
    box-shadow: 0 0 40px -10px black;

    /* in case direct url passing is needed */
    /* background: url(${require("./../avatars/WadeWilson.jpg")}); */

    background: url(${props => props.bg});
    background-size: cover;
    background-position-x: center;
`;

const Detail = styled.div`
    > h4,h1{
        margin: 0;
        width: fit-content;
        color: ${props => props.theme === "white" ? "black" : "white"};
        backdrop-filter: blur(2px);
    }
    > h4{
        margin-left: 2px;
        letter-spacing: 15px;
        font-weight: 300;
    }
    > h3{
        color: ${props => props.theme === "white" ? "black" : "white"};
        letter-spacing: 15px;
        margin: 0 0 15px;
    }
    > p{
        color: ${props => props.theme === "white" ? globalColors.darkGrey : globalColors.lightGrey};
        backdrop-filter: blur(2px);
        margin-right: 10px;
    }
`;

const ButtonsContainer = styled.div`
    display: flex;
    gap: 15px;
    width: max-content;
`;

export default function ContactsCard() {

    const navigate = useNavigate();
    // cId : the 'Id' in '/contact:Id' 
    const { cId } = useParams();
    const [avatarBg, setAvatarBg] = useState("");

    // context for : <DetailsPane> <Outlet   |||x|||   /> </DetailsPane>
    // must be parsed as array - [theme], & not object - {theme}
    const [theme, list, setList] = useOutletContext();

    const imageRef = ref(storage, 'contacts1/' + list[cId - 1].timestamp + '.jpg');
    useEffect(() => {
        getDownloadURL(imageRef).then((url) => (setAvatarBg(url)));
    }, [cId]);

    //function to delete contact
    async function onRemoveHandler() {
        const documentRef = doc(db, 'contacts1', list[cId - 1].code);
        await deleteDoc(documentRef).then(() => {
            getRecords(setList);
            navigate("/");
        });
        await deleteObject(imageRef);
    }

    return (
        <ContactsCardSC>

            {/* require is essential for utilizing any image object */}
            {/* cId - 1 : because the cId seems to start at 2 */}
            <Avatar bg={avatarBg} />
            <Detail theme={theme}>
                <h3>{list[cId - 1].occupation.toUpperCase()}</h3>
                <h1>{list[cId - 1].name}</h1>
                <h4> +91 {list[cId - 1].number}</h4>
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
                <CrudButton onClick={onRemoveHandler}>Remove</CrudButton>
                <LinkStyled to={"/updateContact/" + (cId)}>
                    <CrudButton>Update</CrudButton>
                </LinkStyled>
            </ButtonsContainer>
        </ContactsCardSC>
    );
};