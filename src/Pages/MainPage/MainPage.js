import { Outlet } from 'react-router-dom';
import styled from 'styled-components/macro';
import { useState } from 'react';
import { createContext } from 'react';

import ThemeButton from '../../Components/ThemeButton';
import ContactsPane from './ContactsPane/ContactsPane';
import ContactsHeader from './ContactsPane/ContactsPaneHeader';
import ContactsFooter from './ContactsPane/ContactsPaneFooter';
import ContactsList from './ContactsPane/ContactsPaneList';
import { LinkContactListItem } from '../../Components/LinkStyled';
import DetailsPane from './DetailsPane/DetailsPane';

import contacts from '../../data';
import globalColors from '../../globalVars';

export const ThemeProvider = createContext(null);

const MainPageSC = styled.div`
    display: flex;
    
    overflow-x: hidden;
    overflow-x: hidden;
`;

export default function MainPage(props) {

    //state managing InputText
    const [textInput, setTextInput] = useState("");

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
    contacts.forEach(contact => {

        if (regex.test(contact.name.toLowerCase())) {
            ContactListContent.push(
                <LinkContactListItem theme={theme} to={'contacts/' + contact.id} text={contact.name} />
            );
        }
    });

    return (
        <MainPageSC>

            <ThemeProvider.Provider value={{ theme, themeHandler, textInput, setTextInput }}>

                <ContactsPane>
                    <ContactsHeader />
                    <ContactsList>{ContactListContent}</ContactsList>
                    <ContactsFooter />
                </ContactsPane>

                <DetailsPane>
                    <ThemeButton />
                    <Outlet context={[theme]} />
                </DetailsPane>

            </ThemeProvider.Provider>

        </MainPageSC>
    );
}