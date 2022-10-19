import styled from 'styled-components';

const ContactsPane = styled.div`
    position: relative;
    height: 100vh;
    min-width: 320px;
    flex: 2;
    border-right: 2px rgb(160,160,160) solid;
    box-sizing: border-box;
    box-shadow: 0 0 ${props=> props.theme.background == "white" ? "100px" : "200px"} -40px;
    background: ${props=> props.theme.background};
    display: flex;
    flex-flow: column;
    gap: 20px
`;

export default ContactsPane;