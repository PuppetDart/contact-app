import styled from 'styled-components';
import { Outlet, Link } from 'react-router-dom';

import ContactsPane from './ContactsPane';
import { ContactsHeader, ContactsList } from './ContactsPane';
import DetailsPane from "./DetailsPane";

import Contacts from './../data';

export default function MainPage() {

    const content = [];

    Object.keys(Contacts).forEach(contactID => {
        content.push(
            <Link className='ContactLink' to={'contacts/' + contactID}>
                {Contacts[contactID][0]}
            </Link>
        )
    });

    return <div className='MainPage'>

        <ContactsPane>
            <ContactsHeader></ContactsHeader>
            <ContactsList>{content}</ContactsList>
        </ContactsPane>

        <DetailsPane> <Outlet/> </DetailsPane>

    </div>
}