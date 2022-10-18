import styled from 'styled-components';

const ContactsPane = styled.div`
    height: 100vh;
    min-width: 320px;
    flex: 2;
    border-right: 2px rgb(160,160,160) solid;
    padding: 20px 25px;
    box-sizing: border-box;
    display: flex;
    flex-flow: column;
    gap: 20px
`;

const ContactsHeader = styled.div`
    height: 180px;
    background-color: white;
    border: 1px grey solid;
    width: 100%;
`;

const ContactsList = styled.div`
    width: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    ::-webkit-scrollbar{
        width: 1.8px;
    }
    ::-webkit-scrollbar-thumb{
        background-color: rgb(160,160,160);
    }
`;

export default ContactsPane;
export { ContactsList, ContactsHeader };