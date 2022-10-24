// ------ library tools
import { useContext } from "react";
import styled, { keyframes } from 'styled-components/macro';

// ------ components
import CrudButton from "../../../Components/CrudButton";

// ------ local elements
import { ThemeProvider } from "../MainPage";
import globalColors from "../../../globalVars";
import { ReactComponent as ClearIcon } from './../../../icons/clearIcon.svg'

const SearchButtonAnimation = keyframes`
    0% {transform: rotate(0deg)}
    20% {transform: rotate(360deg)}
    100% {transform: rotate(360deg)}
`;

//S ------ styled-components
const ContactsHeaderSC = styled.div`
    display: flex;
    box-sizing: border-box;
    position: absolute;
    top: 25px;
    gap: 10px;
    
    padding: 0 25px;
    height: 40px;
    width: 95%;
    > *{
        border-radius: 5px 0 15px 5px;
    }
`;

const SearchBox = styled.input`
    width: 80%;
    padding: 6px 10px 6px 13px;
    border: none;
    outline: none;
    
    font-size: 17px;
    text-decoration: none;
    background: none;
`;

const ClearIconSC = styled(ClearIcon)`
    fill: ${props => props.theme};
    height: 30%;
    animation: ${SearchButtonAnimation} 5s ease-in-out 1;
`;
//E ------ styled-components

export default function ContactsHeader(props) {

    const { theme, textInput, setTextInput } = useContext(ThemeProvider);

    return (
        <ContactsHeaderSC theme={theme}>

            <SearchBox
                spellCheck="false"
                style={{
                    backgroundColor: theme === "white" ? globalColors.dark : "white",
                    color: theme=== "white" ? "white" : globalColors.dark
                }}
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}>
            </SearchBox>

            <CrudButton onClick={() => setTextInput("")}>
                <ClearIconSC theme={theme} />
            </CrudButton>

        </ContactsHeaderSC>
    );
}