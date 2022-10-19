import styled from 'styled-components';
import globalColors from "../../../globalVars"

const ContactsList = styled.div`
    padding: 65px 0 0 0;
    margin: 25px 24px 28px 28px; 
    overflow-x: hidden;
    overflow-y: scroll;
    ::-webkit-scrollbar{
        width: 8px;
    }
    ::-webkit-scrollbar-thumb{
        background-color: ${props=> props.theme.color == globalColors.darkGrey ? globalColors.darkGrey : globalColors.lightGrey};
    }
`;

export default ContactsList;
