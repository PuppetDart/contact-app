import styled from "styled-components";
import {ReactComponent as HomepageIcon} from './../icons/homepageIcon.svg';

const HomePageIconContainer=styled.div`
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
  return <HomePageIconContainer><HomepageIconSC /></HomePageIconContainer>;
}