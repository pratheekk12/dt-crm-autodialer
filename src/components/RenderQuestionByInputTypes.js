import React from 'react';
import { Field } from 'formik';
import {
  FormControlLabel,
  Radio,
  Typography,
  FormControl,
  MenuItem,
  Grid,
  Checkbox
} from '@material-ui/core';
import { RadioGroup, TextField } from 'formik-material-ui';
import { Rating } from '@material-ui/lab';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { includes } from 'lodash';

const RenderQuestionByInputTypes = ({
  question,
  onInputChange,
  visibility
}) => {
  const [values, setValues] = React.useState({});

  const handleChange = (event, type, questionCode, optionValue) => {
    switch (type) {
      case 'checkbox':
        {
          if (!values[questionCode]) {
            values[questionCode] = [optionValue];
          } else {
            if (includes(values[questionCode], optionValue)) {
              let optionValueIndex = values[questionCode].indexOf(optionValue);
              if (optionValueIndex !== -1) {
                values[questionCode].splice(optionValueIndex, 1);
              }
            } else {
              values[questionCode].push(optionValue);
            }
          }
        }
        break;
      case 'radio':
        {
          values[questionCode] = event.target.value;
        }
        break;
      case 'text':
        {
          values[questionCode] = event.target.value;
        }
        break;
      case 'textarea':
        {
          values[questionCode] = event.target.value;
        }
        break;
      case 'rating':
        {
          values[questionCode] = event.target.value;
        }
        break;
    }
    const newValues = { ...values };
    setValues(newValues);
    onInputChange(newValues);
  };

  const renderQuestion = () => {
    if (question) {
      switch (question.questionType) {
        case 'rating':
          return (
            <span key={'rating' + question.questionName}>
              <Typography component="legend">{question.question}</Typography>
              <Rating
                name={question.questionName}
                disabled={visibility}
                id="rating"
                precision={0.5}
                emptyIcon={<StarBorderIcon fontSize="inherit" />}
                onChange={event =>
                  handleChange(
                    event,
                    question.questionType,
                    question.questionCode
                  )
                }
              />
            </span>
          );
        case 'text':
          return (
            <div key={'text' + question.questionCode}>
              <TextField
                color="primary"
                name={question.questionCode}
                disabled={visibility}
                id={question.questionCode}
                label={question.question}
                variant="outlined"
                onBlur={event =>
                  handleChange(
                    event,
                    question.questionType,
                    question.questionCode
                  )
                }
              />
              <br />
            </div>
          );
        case 'textarea':
          return (
            <div key={'textarea' + question.questionCode}>
              <Field
                component={TextField}
                color="primary"
                disabled={visibility}
                name={question.questionCode}
                id={question.questionCode}
                label={question.question}
                variant="outlined"
                multiline
                rows={
                  (question.additionalConfig &&
                    question.additionalConfig.rows) ||
                  4
                }
                // onBlur={event =>
                //   handleChange(
                //     event,
                //     question.questionType,
                //     question.questionCode
                //   )
                // }
                style={{ width: '100%' }}
              />
              <br />
              <br />
            </div>
          );
        case 'checkbox':
          return (
            <div key={'checkbox' + question.questionCode}>
              <Typography>{question.question}</Typography>
              {
                <Grid
                  container
                  direction="column"
                  justify="flex-start"
                  alignItems="flex-start"
                >
                  {question.option.map((option, index) => {
                    return (
                      <Grid item key={`checkbox-${index}`}>
                        <FormControlLabel
                          disabled={visibility}
                          control={
                            <Checkbox
                              name={option.label}
                              id={question.questionCode}
                              color="primary"
                              checked={includes(
                                values[question.questionCode],
                                option.label
                              )}
                              onChange={event =>
                                handleChange(
                                  event,
                                  question.questionType,
                                  question.questionCode,
                                  option.label
                                )
                              }
                            />
                          }
                          label={option.label}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              }
            </div>
          );
        case 'radio':
          return (
            <div key={'radio' + question.questionCode}>
              <Typography>{question.question}</Typography>
              {/* <RadioGroup
                name={question.questionCode}
                value={values[question.questionCode]}
                onChange={event =>
                  handleChange(
                    event,
                    question.questionType,
                    question.questionCode
                  )
                }
              > */}
              <Field component={RadioGroup} name={question.questionCode}>
                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-start"
                >
                  {question.option.map((option, index) => {
                    return (
                      <Grid
                        item
                        key={`radio-option-${question.questionCode}-${index}`}
                      >
                        <FormControlLabel
                          value={option.label}
                          disabled={visibility}
                          control={<Radio />}
                          label={option.label}
                          // key={`radio-option-${question.questionCode}-${index}`}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </Field>
            </div>
          );
        case 'select':
          return (
            <div key={'select' + question.name}>
              <Typography>{question.question}</Typography>
              <FormControl key={'select' + question.name}>
                <Field
                  component={TextField}
                  type="text"
                  name={question.questionName}
                  id={question.questionName}
                  select={true}
                  disabled={visibility}
                  placeholder="Select"
                  variant="outlined"
                  size="medium"
                >
                  {question.option.map((option, index) => (
                    <MenuItem value={option.value}>{option.label}</MenuItem>
                  ))}
                </Field>
              </FormControl>
              <br />
              <br />
            </div>
          );
        default:
          return null;
      }
    }
  };

  return renderQuestion();
};

export default RenderQuestionByInputTypes;
