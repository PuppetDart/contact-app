import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { useContext, useState } from 'react';
import { createContext } from 'react';

import ThemeButton from '../../Components/ThemeButton';
import ContactsPane from './ContactsPane/ContactsPane';
import ContactsHeader from './ContactsPane/ContactsPaneHeader';
import ContactsList from './ContactsPane/ContactsPaneList';
import LinkStyled from '../../Components/LinkStyled';
import DetailsPane from './DetailsPane/DetailsPane';

import Contacts from '../../data';
import globalColors from '../../globalVars';

const ThemeProvider = createContext(null);

const MainPageSC = styled.div`
    display: flex;
    ::selection {
        color: rgb(200,200,200);
        background: rgb(60,60,60);
    }
    overflow-x: hidden;
    overflow-x: hidden;
`;

export default function MainPage(props) {

    //state managing InputText
    const [textInput, setTextInput] = useState("");
    const textInputHandler = (x) => {
        setTextInput(x)
    }

    //state managing theme
    const [theme, setTheme] = useState({
        background: "white",
        color: globalColors.darkGrey,
    });
    //function to alter theme
    const themeHandler = () => {
        setTheme({
            background: theme.background === "white" ? globalColors.dark : "white",
            color: theme.color === globalColors.darkGrey ? globalColors.lightGrey : globalColors.darkGrey
        });
    }

    //regex 
    const regex = new RegExp(".*" + textInput.toLowerCase() + ".*");
    //construct the Contact List
    const ContactListContent = [];
    Object.keys(Contacts).forEach(contactID => {

        if (regex.test(Contacts[contactID][0].toLowerCase())) {
            ContactListContent.push(
                <LinkStyled theme={theme} to={'contacts/' + contactID} text={Contacts[contactID][0]} />
            );
        }
    });

    return (
        <MainPageSC>

            <ThemeProvider.Provider value={{ theme, setTheme, textInput, textInputHandler }}>
                <ContactsPane theme={theme}>
                    <ThemeButton click={themeHandler} theme={theme}></ThemeButton>
                    <ContactsHeader textInput={textInput} setTextInput={setTextInput} theme={theme}></ContactsHeader>
                    <ContactsList theme={theme}>{ContactListContent}</ContactsList>
                </ContactsPane>

                <DetailsPane theme={theme}> <Outlet /> </DetailsPane>
            </ThemeProvider.Provider>

        </MainPageSC>
    );
}