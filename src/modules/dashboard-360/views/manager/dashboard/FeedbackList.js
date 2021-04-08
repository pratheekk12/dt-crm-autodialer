import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';
import React from 'react';
import { FixedSizeList } from 'react-window';

const FeedbackList = () => {
  return (
    <>
      <div>
        <Card style={{ textAlign: 'center' }}>
          <CardHeader title={'Customer Feedback'} />
          <Divider />
          <CardContent>
            <List
              style={{ maxHeight: 350, overflowY: 'auto' }}
              component="nav"
              aria-label="feedback list"
            >
              <ListItem button divider>
                <ListItemText primary="Feedback 1" />
              </ListItem>
              <ListItem button divider>
                <ListItemText primary="Feedback 2" />
              </ListItem>
              <ListItem button divider>
                <ListItemText primary="Feedback 3" />
              </ListItem>
              <ListItem button divider>
                <ListItemText primary="Feedback 4" />
              </ListItem>
              <ListItem button divider>
                <ListItemText primary="Feedback 5" />
              </ListItem>
              <ListItem button divider>
                <ListItemText primary="Feedback 6" />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default FeedbackList;
