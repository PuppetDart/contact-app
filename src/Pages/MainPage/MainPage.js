import { Outlet } from 'react-router-dom';
import styled from 'styled-components/macro';
import { useState, useEffect } from 'react';
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
import { getRecords } from '../../HelperFunctions/getRecords';

export const ThemeProvider = createContext(null);

const MainPageSC = styled.div`
    display: flex;
    overflow-x: hidden;
`;

export default function MainPage() {

    // ------------------------------
    // --------------- STATE 1 START
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
    // ---------------STATE 1 END
    // ------------------------------


    // ------------------------------
    // --------------- STATE 2 START
    //state managing FIREBASE-LIST
    const [list, setList] = useState(null);

    useEffect(() => {
        try {
            getRecords(setList);
        }
        catch (e) {
            console.log(e);
            setList(contacts);
        }
    }, []);
    // --------------- STATE 2 END
    // ------------------------------


    // ------------------------------
    const regex = new RegExp(".*" + textInput.toLowerCase() + ".*");

    const ContactListContent = [];
    list?.forEach(listItem => {

        if (regex.test(listItem.name.toLowerCase())) {
            ContactListContent.push(
                <LinkContactListItem key={listItem.id} theme={theme} to={'contacts/' + listItem.id} text={listItem.name} />
            );
        }
    });
    // ------------------------------

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
                    <Outlet context={[theme, list, setList]} />
                </DetailsPane>

            </ThemeProvider.Provider>

        </MainPageSC>
    );
}