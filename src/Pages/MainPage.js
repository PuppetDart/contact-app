import styled from 'styled-components';
import { Outlet, Link } from 'react-router-dom';
import { useState } from 'react';

import ContactsPane from './ContactsPane';
import { ContactsHeader, ContactsList } from './ContactsPane';
import DetailsPane from "./DetailsPane";

import Contacts from './../data';

export default function MainPage(props) {

    const [theme, setTheme] =useState({
        background: "white",
        color: "rgb(110,110,110)"
    });
    const content = [];

    Object.keys(Contacts).forEach(contactID => {
        content.push(
            <Link className='ContactLink' to={'contacts/' + contactID}>
                {Contacts[contactID][0]}
            </Link>
        )
    });

    return <div className='MainPage'>

        <ContactsPane style={theme}>
            <ContactsHeader onClick={()=>{setTheme({
                    background: theme.background=="white"? "black":"white",
                    color: theme.background=="white"? "rgb(160,160,160)": "rgb(110,110,110)"
            })}}></ContactsHeader>
            <ContactsList>{content}</ContactsList>
        </ContactsPane>

        <DetailsPane style={theme}> <Outlet/> </DetailsPane>

    </div>
}