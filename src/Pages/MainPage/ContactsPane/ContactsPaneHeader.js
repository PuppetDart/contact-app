import styled, { keyframes } from "styled-components";
import globalColors from "../../../globalVars";

const breatheAnimation = keyframes`
 0% { background: red }
 30% { background: rgb(230, 22, 0) }
 40% { background: rgb(230, 22, 0) }
 100% { background: red }
`

const ContactsHeaderSC = styled.div`
    position: absolute;
    display: flex;
    top: 25px;
    gap: 10px;
    padding: 0 25px;
    height: 40px;
    width: 85%;
    
    > *{
        border-radius: 5px 0 15px 5px;
    }
`;

const SearchBox = styled.input`
    width: 80%;
    outline: none;
    background: none;
    border: none;
    box-shadow: 0 0 15px -3px black;
    padding: 6px 10px 6px 13px;
    font-size: 17px;
    text-decoration: none;
`;

const SearchButton = styled.div`
    width: 20%;
    box-shadow: 0 0 3px 0 red;
    background-color: red;
    position: relative;
    height: 40px;
    animation: ${breatheAnimation} infinite 4s;
`;

export default function ContactsHeader(props) {
    return (
        <ContactsHeaderSC>
            <SearchBox
                style={{ backgroundColor: props.theme.background == "white" ? globalColors.dark : "white", color: props.theme.background }}
                value={props.textInput}
                onChange={(e) => props.textInputHandler(e.target.value)}>
            </SearchBox>
            <SearchButton />
        </ContactsHeaderSC>
    );
}



