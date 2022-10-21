import styled from 'styled-components';
import globalColors from '../../../globalVars';
import bgImg from './../../../images/bg1.jpg'

const DetailsPaneSC =styled.div`
    flex: 5;

    height: 100vh;
    min-width: 380px;
    
    background-color: ${props=> props.theme.background == globalColors.dark ? globalColors.dark : "white"};
    background-image: url(${bgImg});
    background-blend-mode: ${props=> props.theme.background == globalColors.dark ? "color-burn" : "luminosity"};
    background-size: cover;
    
    overflow-y: scroll;

    ::-webkit-scrollbar{
        width: 8px;
    }
    ::-webkit-scrollbar-thumb{
        background-color: ${props=> props.theme.color == globalColors.darkGrey ? globalColors.darkGrey : globalColors.lightGrey};
    }
`;

export default DetailsPaneSC;