
import React from "react";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    Divider,
    Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
const useStyles = makeStyles(() => ({
    accordSum: {

    }
}));
export function AccountOption(props) {
    const styled = useStyles();
    return (
        <Accordion TransitionProps={{ unmountOnExit: true }}>
            <AccordionSummary className={styled.accordSum} expandIcon={<ExpandMoreIcon />}>
                <Box flexBasis={"47.5%"}>
                    <Typography>{props.label}:</Typography>
                </Box>
                <Box flexBasis={"47.5%"}>
                    <Typography>{props.info}</Typography>
                </Box>
            </AccordionSummary>
            <Divider></Divider>
            <AccordionDetails>
                {props.children}
            </AccordionDetails>
            <Divider />
        </Accordion>
    );
}