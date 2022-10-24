// ------ library tools
import { Outlet } from 'react-router-dom';
import styled from 'styled-components/macro';
import { useState, useEffect } from 'react';
import { createContext } from 'react';

// ------ components
import ThemeButton from '../../Components/ThemeButton';
import ContactsPane from './ContactsPane/ContactsPane';
import ContactsHeader from './ContactsPane/ContactsPaneHeader';
import ContactsFooter from './ContactsPane/ContactsPaneFooter';
import ContactsList from './ContactsPane/ContactsPaneList';
import { LinkContactListItem } from '../../Components/LinkStyled';
import DetailsPane from './DetailsPane/DetailsPane';

// ------ local elements
import { getRecords } from '../../HelperFunctions/getRecords';

//S ------ styled-components
const MainPageSC = styled.div`
    display: flex;
    overflow-x: hidden;
    `;
//E ------ styled-components

export const ThemeProvider = createContext(null);

export default function MainPage() {

    // ------------------------------
    //S --------------- STATES

    //state managing FIREBASE-CONTACT-LIST
    const [list, setList] = useState(null);

    //state managing SearchBox-Input
    const [textInput, setTextInput] = useState("");

    const [theme, setTheme] = useState("white");

    // --------------- STATE HANDLER FUNCTIONS
    const themeHandler = () => {
        setTheme(theme === "white" ? "black" : "white");
    }
    // --------------- STATE HANDLER FUNCTIONS
    
    //E --------------- STATES
    // ------------------------------

    useEffect(() => {
        try {
            getRecords(setList);
        }
        catch (exception) {
            console.log(exception);
        }
    }, []);


    //S --------------- CONTENT LOADER

    // this code block implements the SEARCH-FUNCTIONALITY
    // + generates the clickable Contact-Links
    const regex = new RegExp(".*" + textInput.toLowerCase() + ".*");

    const ContactListContent = [];
    list?.forEach(listItem => {

        if (regex.test(listItem.name.toLowerCase())) {
            ContactListContent.push(
                <LinkContactListItem key={listItem.id} theme={theme} to={'contacts/' + listItem.id} text={listItem.name} />
            );
        }
    });
    //E --------------- CONTENT LOADER

    return (
        <MainPageSC>

            <ThemeProvider.Provider value={{ list, setList, theme, themeHandler, textInput, setTextInput }}>

                <ContactsPane>
                    <ContactsHeader />
                    <ContactsList>{ContactListContent}</ContactsList>
                    <ContactsFooter />
                </ContactsPane>

                <DetailsPane>
                    <ThemeButton />
                    {/* CONTEXT USED BY:  ContactCard, AddContactPage, UpdateContactPage*/}
                    <Outlet context={[theme, list, setList]} />
                </DetailsPane>

            </ThemeProvider.Provider>

        </MainPageSC>
    );
}