import { useParams } from "react-router-dom";
import styled from "styled-components";

import Contacts from '../data';
import globalColors from "../globalVars";

const ContactsCardSC = styled.div`
    z-index: 1;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    display: flex;
    flex-flow: column;
    gap: 40px;
`;

export default function ContactsCard(propsParent) {

    const Avatar = styled.div`
        box-shadow: 0 0 40px -10px black;
        border-radius: 10px;
        height: 350px;
        width: 300px;
        background: ${props => `url(${props.bg}) no-repeat`};
        background-size: cover;
        background-position-x: center;
    `

    const Detail =styled.div`
        > h4,h1{
            margin: 0;
            color: ${globalColors.darkGrey};
        }
        > h4{
            font-weight: 300;
            letter-spacing: 15px;
            margin-left: 2px;
        }
        > p{
            color: ${globalColors.darkGrey};
        }
        color: rgb(110,110,110)
    `

    const { cId } = useParams();

    return (
            <ContactsCardSC>
                <Avatar bg={require( './../avatars/' + ((Contacts[cId][0]).split(' ')).join('') + '.jpg' )}/>
                <Detail>
                    <h1>{Contacts[cId][0]}</h1>
                    <h4>+91 {Contacts[cId][1]}</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis tenetur, a voluptas voluptates quas consequuntur iusto aut? Praesentium ab itaque, excepturi ullam cupiditate dolor in iste suscipit laboriosam vitae, consequatur eum perferendis sequi blanditiis deleniti saepe quas! Eos, aut optio! Rerum odit dignissimos culpa. Deserunt explicabo laudantium expedita optio saepe!</p>
                </Detail>
            </ContactsCardSC>
    );
};