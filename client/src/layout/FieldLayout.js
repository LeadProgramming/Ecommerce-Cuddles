import React from "react";
import { useField } from "formik";
import { TextField, FormControl, InputLabel, Select } from '@material-ui/core';


const errorStyle = {
  color: 'red',
}
export const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      {meta.touched && meta.error ? (
        <div className="error" style={errorStyle}>{meta.error}</div>
      ) : null}
      {/* <label htmlFor={props.id || props.name}>{label}</label> */}
      <TextField label={props.lab} {...field} {...props} variant="outlined" margin="normal" fullWidth />
    </>
  );
};
export const UpdateInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      {meta.touched && meta.error ? (
        <div className="error" style={errorStyle}>{meta.error}</div>
      ) : null}
      <TextField label={props.lab} {...field} {...props} fullWidth />
    </>
  )
}
export const TextAreaInput = ({ children, label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      {meta.touched && meta.error ? (
        <div className="error" >{meta.error}</div>
      ) : null}
      <label htmlFor={props.id || props.name}>{label}</label>
      <TextField className="text-input" {...field} {...props} multiline variant="outlined" margin="normal">
        {children}
      </TextField>
    </>
  );
}
export const Checkbox = ({ label, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <>
      <label className="checkbox">
        <input type="checkbox" {...field} {...props}></input>
      </label>
      {meta.touched && meta.error ? (
        <div className="error" style={errorStyle}>{meta.error}</div>
      ) : null}
    </>
  );
};

export const Selection = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <FormControl>
      <InputLabel htmlFor={props.id || props.name}>{label}</InputLabel>
      <Select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error" style={errorStyle}>{meta.error}</div>
      ) : null}
    </FormControl>
  );
};
