import styled from 'styled-components/macro';
import { motion } from 'framer-motion';
import { ReactComponent as HomepageIcon } from './../icons/homepageIcon.svg';

const HomePageSC = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const HomepageIconSC = styled(HomepageIcon)`
  display: flex;
  height: 40%;
  width: 40%;
`;

export default function Homepage() {
  return <HomePageSC
    initial={{ opacity:0 }}
    transition={{ duration: 0.6, type: "just", delay: 0.2 }}
    animate={{ opacity:1 }}
  >
    <HomepageIconSC />
  </HomePageSC>;
}