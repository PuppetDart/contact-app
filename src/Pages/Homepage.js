import styled from 'styled-components/macro';
import {ReactComponent as HomepageIcon} from './../icons/homepageIcon.svg';

const HomePageSC=styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
  width: 100%;
`;

const HomepageIconSC=styled(HomepageIcon)`
  display: flex;
  height: 40%;
  width: 40%;
`;

export default function Homepage(){
  return <HomePageSC><HomepageIconSC /></HomePageSC>;
}