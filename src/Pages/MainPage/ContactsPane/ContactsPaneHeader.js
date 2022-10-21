import styled, { keyframes } from "styled-components";
import globalColors from "../../../globalVars";
import { ReactComponent as ClearIcon } from './../../../icons/clearIcon.svg'

const SearchButtonAnimation = keyframes`
    0% {transform: rotate(0deg)}
    20% {transform: rotate(360deg)}
    100% {transform: rotate(360deg)}
`;

const ContactsHeaderSC = styled.div`
    display: flex;

    position: absolute;
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
    padding: 6px 10px 6px 13px;
    border: none;
    outline: none;
    
    background: none;

    font-size: 17px;
    text-decoration: none;
`;

const SearchButton = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 20%;
    height: 40px;
    
    background-color: red;
    cursor: pointer;
`;

const ClearIconSC = styled(ClearIcon)`
    fill: ${props => props.theme.background === "white" ? "white" : "black"};
    height: 30%;
    animation: ${SearchButtonAnimation} 5s ease-in-out 1;
`;

export default function ContactsHeader(props) {
    return (
        <ContactsHeaderSC>
            <SearchBox
                spellCheck="false"
                style={{ backgroundColor: props.theme.background == "white" ? globalColors.dark : "white", color: props.theme.background }}
                value={props.textInput}
                onChange={(e) => props.setTextInput(e.target.value)}>
            </SearchBox>
            <SearchButton theme={props.theme} onClick={() => props.setTextInput("")}><ClearIconSC /></SearchButton>
        </ContactsHeaderSC>
    );
}