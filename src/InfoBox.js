import React from 'react';
import "./InfoBox.css";
import {
    Card,
    CardContent,
    Typography,} 
  from "@material-ui/core";

function InfoBox({ title, cases, isRed,total, active,...props}) {
    return (
        <Card 
        onClick={props.onClick}
        className={`InfoBox ${active && "InfoBox--selected"} ${ isRed && "InfoBox--red"
        }`}
        >
            <CardContent>
                <Typography className="InfoBox__title" color="textSecondary">{title}</Typography>

            <h2 className={`InfoBox__cases ${!isRed && "InfoBox__cases--green"}`}>
                {cases}</h2>

                <Typography className="InfoBox__total" color="textSecondary">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
