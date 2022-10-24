// ------ library tools
import { useContext } from "react";
import styled from 'styled-components/macro';

// ------ components
import { ThemeProvider } from "../MainPage";
import LinkStyled from "../../../Components/LinkStyled";
import CrudButton from "../../../Components/CrudButton";

// ------ local elements
import globalColors from "../../../globalVars";
import { getRecords } from "../../../HelperFunctions/getRecords";
import { ReactComponent as HomeIcon } from "./../../../icons/homeIcon.svg";
import { ReactComponent as RefreshIcon } from "./../../../icons/refreshIcon.svg"

//S ------ styled-components
const ContactsFooterSC = styled.div`
    position: absolute;
    bottom: 0px;
    display: flex;
    gap: 10px;

    width: 90%;
    padding: 25px;
    box-sizing: border-box;
    background: linear-gradient(transparent, ${props => props.theme=== "white" ? "white" : globalColors.dark} 50%);
`;

const HomeIconSC = styled(HomeIcon)`
    fill: ${props => props.theme};
    height: 20px;
`;
const RefreshIconSC = styled(RefreshIcon)`
    fill: ${props => props.theme};
    height: 17px;
`;
//E ------ styled-components

export default function ContactsFooter(props) {

    const { theme, setList } = useContext(ThemeProvider);

    return (

            <ContactsFooterSC theme={theme}>

                <CrudButton onClick={()=>{getRecords(setList)}}><RefreshIconSC theme={theme}/> </CrudButton>
                <LinkStyled to={'/'}>
                    <CrudButton><HomeIconSC theme={theme} /></CrudButton>
                </LinkStyled>
                <LinkStyled to={'addContact'}>
                    <CrudButton>New</CrudButton>
                </LinkStyled>

            </ContactsFooterSC>


    );
}