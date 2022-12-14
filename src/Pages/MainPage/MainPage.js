// ------ library tools
import { createContext } from 'react';
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { motion } from 'framer-motion';

// ------ components
import ThemeButton from '../../Components/ThemeButton';
import ContactsPane from './ContactsPane/ContactsPane';
import ContactsHeader from './ContactsPane/ContactsPaneHeader';
import ContactsFooter from './ContactsPane/ContactsPaneFooter';
import ContactsList from './ContactsPane/ContactsPaneList';
import { LinkContactListItem } from '../../Components/LinkStyled';
import DetailsPane from './DetailsPane/DetailsPane';
import LoadScr from '../../Components/LoadScr';

// ------ local elements [function/data/Icon]
import { getRecords } from '../../HelperFunctions/getRecords';
import globalColors from '../../globalVars';
import bgImg from './../../images/bg1.jpg'

const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
}

//S ------ styled-components

const MainPageSC = styled(motion.div)`
    display: flex;

    height: 100vh;
    overflow-x: hidden;

    background-color: ${props => props.theme === "white" ? "white" : globalColors.dark};
    background-image: url(${bgImg});
    background-blend-mode: ${props => props.theme === "white" ? "luminosity" : "color-burn"};
    background-size: cover;

    transition: background-color 0.2s ease-in-out;
`;
//E ------ styled-components

export const ThemeProvider = createContext(null);

export default function MainPage() {

    // ------------------------------
    //S --------------- STATES

    const [loading, setLoading] = useState(false);

    //state managing FIREBASE-CONTACT-LIST
    const [list, setList] = useState(null);

    //state managing SearchBox-Input
    const [textInput, setTextInput] = useState("");

    const [collapse, setCollapse]=useState(0);

    const [theme, setTheme] = useState("white");
    const themeHandler = () => {
        setTheme(theme === "white" ? "black" : "white");
    }

    //E --------------- STATES
    // ------------------------------

    //fetch from firebase contacts-list
    //when MainPage Mounts
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
        <>
            {loading && <LoadScr/>}
            <MainPageSC
                theme={theme}
                variants={{ variants }}
            >

                <ThemeProvider.Provider value={{ list, setList, theme, themeHandler, textInput, setTextInput, collapse, setCollapse }}>

                    <ContactsPane>
                        <ContactsHeader />
                        <ContactsList>{ContactListContent}</ContactsList>
                        <ContactsFooter />
                    </ContactsPane>

                    <DetailsPane>
                        <ThemeButton />
                        {/* CONTEXT USED BY:  ContactCard, AddContactPage, UpdateContactPage*/}
                        <Outlet context={[theme, list, setList, loading, setLoading]} />
                    </DetailsPane>

                </ThemeProvider.Provider>

            </MainPageSC>
        </>

    );
}