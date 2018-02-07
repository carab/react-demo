import React from "react";

const style = {
  color: "red"
};

function addStyle(color) {
    return function (WrappedComponent) {
        return function(props) {
            style.color = color
            return <WrappedComponent style={style} {...props} />;
        }
    }
}

export default addStyle;
