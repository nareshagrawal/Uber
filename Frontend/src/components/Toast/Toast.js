import React from "react";
import { Alert } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/fontawesome-free-solid'
const Toast = (props) => {
    return (
        props.message && (
            <div className="">
                <Alert variant={props.mode} className="text-center">
                        <div className="mr-auto">
                            {props.message}
                        </div>
                        <div className="pointer" onClick={() => { props.updateShow(false) }}>
                            <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                        </div>
                </Alert>
            </div>
        )
    )
}

export default Toast;