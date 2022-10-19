import { Outlet } from 'react-router-dom';
import { useState } from 'react';

import ThemeButton from '../../Components/ThemeButton';
import ContactsPane from './ContactsPane/ContactsPane';
import ContactsHeader from './ContactsPane/ContactsPaneHeader';
import ContactsList from './ContactsPane/ContactsPaneList';
import LinkStyled from '../../Components/LinkStyled';
import DetailsPane from './DetailsPane/DetailsPane';

import Contacts from '../../data';
import glCl from '../../globalVars';

export default function MainPage(props) {

    //state managing InputText
    const [textInput, setTextInput] = useState("");
    const textInputHandler = (x) => {
        setTextInput(x)
    }

    //state managing theme
    const [theme, setTheme] = useState({
        background: "white",
        color: glCl.darkGrey,
    });
    //function to alter theme
    const themeHandler = () => {
        setTheme({
            background: theme.background == "white" ? glCl.dark : "white",
            color: theme.color == glCl.darkGrey ? glCl.lightGrey : glCl.darkGrey
        });
    }

    //regex 
    const regex= new RegExp(".*"+textInput.toLowerCase()+".*");

    //construct the Contact List
    const ContactListContent = [];
    Object.keys(Contacts).forEach(contactID => {
        
        if(regex.test(Contacts[contactID][0].toLowerCase())){
            ContactListContent.push(
                <LinkStyled theme={theme} to={'contacts/' + contactID} text={Contacts[contactID][0]} />
            )
        }
    });


    return (<div className='MainPage'>

        <ThemeButton click={themeHandler} theme={theme}></ThemeButton>

        <ContactsPane theme={theme}>
            <ContactsHeader textInput={textInput} textInputHandler={textInputHandler} theme={theme}></ContactsHeader>
            <ContactsList theme={theme}>{ContactListContent}</ContactsList>
        </ContactsPane>

        <DetailsPane style={theme}> <Outlet theme={theme}/> </DetailsPane>

    </div>);
}