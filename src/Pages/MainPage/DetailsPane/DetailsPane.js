import { useContext } from 'react';
import styled from 'styled-components/macro';

import { ThemeProvider } from '../MainPage';
import globalColors from '../../../globalVars';
import bgImg from './../../../images/bg1.jpg'

const DetailsPaneSC = styled.div`
    flex: 5;

    height: 100vh;
    min-width: 380px;
    
    overflow-x: hidden;
    overflow-y: scroll;

    ::-webkit-scrollbar{
        width: 8px;
    }
    ::-webkit-scrollbar-thumb{
        background-color: ${props => props.theme=== "white" ? globalColors.darkGrey : globalColors.lightGrey};
    }
`;

export default function DetailsPane(props) {

    const { theme } = useContext(ThemeProvider);

    return (
        <DetailsPaneSC theme={theme}>
            {props.children}
        </DetailsPaneSC>
    );

};