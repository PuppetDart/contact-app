import styled from 'styled-components/macro';

const ErrorPageSC = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    
    height: 100vh;
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