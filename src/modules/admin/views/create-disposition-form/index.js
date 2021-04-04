import { Button, Card, Grid } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React from 'react';
import DispositionQuestions from './DispositionQuestions';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import { createNodeForSortableTree } from './utils';

const initialValues = {
  dispositionQuestions: [
    {
      question: '',
      option: [
        {
          label: ''
        }
      ]
    }
  ]
};

function CreateDispositionForm() {
  const [sTree, setSTree] = React.useState(
    createNodeForSortableTree(initialValues.dispositionQuestions)
  );

  return (
    <div
      style={{
        margin: '1.5rem'
      }}
    >
      <Grid container direction="row" justify="center" spacing={3}>
        <Grid item lg={7} xs={12}>
          <div style={{ backgroundColor: 'white', padding: '0.5rem' }}>
            <Formik
              initialValues={initialValues}
              onSubmit={async values => {
                createNodeForSortableTree(values.dispositionQuestions);
                setSTree(values.dispositionQuestions);
              }}
              validateOnChange={false}
            >
              {({ values }) => (
                <Form>
                  <DispositionQuestions
                    questions={values.dispositionQuestions}
                    name={'dispositionQuestions'}
                  />
                  <Button variant="contained" color="primary" type="submit">
                    {'Save'}
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </Grid>
        <Grid item lg={5} xs={12}>
          <div
            style={{
              height: 400,
              backgroundColor: 'white',
              marginBottom: '1.5rem'
            }}
          >
            <SortableTree treeData={sTree} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default CreateDispositionForm;
