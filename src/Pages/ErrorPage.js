import styled from "styled-components";

const ErrorPageSC = styled.div`
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
flex-flow: column;
`

export default function ErrorPage() {
    return (
        <ErrorPageSC>
            <h2>Oops!</h2>
            <p>Sorry, an unexpected error has occurred.</p>
            <em>Not Found</em>
        </ErrorPageSC>
    );
};