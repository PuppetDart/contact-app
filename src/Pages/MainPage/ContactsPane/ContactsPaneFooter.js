import { useContext } from "react";
import styled from 'styled-components/macro';
import { ThemeProvider } from "../MainPage";
import LinkStyled from "../../../Components/LinkStyled";
import CrudButton from "../../../Components/CrudButton";
import { ReactComponent as HomeIcon } from "./../../../icons/homeIcon.svg";
import { ReactComponent as RefreshIcon } from "./../../../icons/refreshIcon.svg"
import { getRecords } from "../../../HelperFunctions/getRecords";

const ContactsFooterSC = styled.div`
    position: absolute;
    bottom: 0px;

    display: flex;
    gap: 10px;

    width: 90%;
    padding: 25px;
    box-sizing: border-box;

    background: linear-gradient(transparent, ${props => props.theme.background} 50%);
`;

const HomeIconSC = styled(HomeIcon)`
    fill: ${props => props.theme.background === "white" ? "white" : "black"};
    height: 20px;
`;
const RefreshIconSC = styled(RefreshIcon)`
    fill: ${props => props.theme.background === "white" ? "white" : "black"};
    height: 17px;
`;

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