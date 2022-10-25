import styled from "styled-components";
import { motion } from "framer-motion";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const LoadScrSC = styled(motion.div)`
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default function LoadScr(){
    return(
        <LoadScrSC>
            <ClimbingBoxLoader color='white'/>
        </LoadScrSC>
    )
}