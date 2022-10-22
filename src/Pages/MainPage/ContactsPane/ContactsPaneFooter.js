import { useContext } from "react";
import styled from "styled-components";
import { ThemeProvider } from "../MainPage";
import LinkStyled from "../../../Components/LinkStyled";
import CrudButton from "../../../Components/CrudButton";
import { ReactComponent as HomeIcon } from "./../../../icons/homeIcon.svg";

const ContactsFooterSC = styled.div`
    position: absolute;
    bottom: 0px;

    display: flex;
    gap: 10px;

    width: 100%;
    padding: 25px;
    box-sizing: border-box;

    background: linear-gradient(transparent, ${props => props.theme.background} 50%);
`;

const HomeIconSC = styled(HomeIcon)`
    fill: ${props => props.theme.background === "white" ? "white" : "black"};
    height: 50%;
    width: 100%;
`;

export default function ContactsFooter(props) {

    const { theme } = useContext(ThemeProvider);

    return (

            <ContactsFooterSC theme={theme}>

                <LinkStyled to={'/'}>
                    <CrudButton theme={theme}><HomeIconSC theme={theme} /></CrudButton>
                </LinkStyled>
                <LinkStyled to={'addContact'}>
                    <CrudButton theme={theme}>New</CrudButton>
                </LinkStyled>
            </ContactsFooterSC>


    );
}