import {
  Button, Card, Grid,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import React  from 'react';
import DispositionQuestions from './DispositionQuestions';

function CreateDispositionForm() {

  const initialValues =
    {
      dispositionQuestions: [{
        "question": "",
        option: [
          {
            label: '',
          },
        ],
      }]
    }

  return (<Grid container direction="row" justify="center" spacing={3} style={{ backgroundColor: 'white', margin: '1rem', padding: '2rem', display: 'contents'  }}>
        <Grid item lg={7} xs={12}>
          <Card style={{ display: 'flex', justifyContent: 'center', padding: 10 }}>
            <Formik
              initialValues={initialValues}
              onSubmit={async (values) => {
                console.log(`values------->`,values)
              }}
            >
              {({ values }) => (
                <Form>
                  <DispositionQuestions questions={values.dispositionQuestions}/>
                  <Button variant="contained" color="primary" type="submit">
                    {'Save'}
                  </Button>
                </Form>
              )}
            </Formik>
          </Card>
        </Grid>
      </Grid>
  );
}

export default CreateDispositionForm;
