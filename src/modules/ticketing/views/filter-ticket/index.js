import React from 'react';
import 'date-fns';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper, Typography, TextField, Box,
  Avatar, Tooltip
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useState, useEffect } from 'react';
import config from '../../views/config.json';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 150
    }
  },
  paper: {
    padding: theme.spacing(1),
    marginBottom: 15
  },
  alignCenter: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    justifyContent: 'flex-start'
  }
}));

export default function FilterTicket(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [ticketNumber, setTicketNumber] = useState('');
  const [distributorName, setDistributorName] = useState('');
  const [distributorId, setDistributorId] = useState('');
  const [ticketTypes, setTicketTypes] = useState([]);
  const [ticketType, setTicketType] = useState({});
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState({});
  const [teams, setTeams] = useState([]);
  const [team, setTeam] = useState({});
  const [executives, setExecutives] = useState([]);
  const [executive, setExecutive] = useState({});
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({});
  const [subCategories, setSubCategories] = useState([]);
  const [subCategory, setSubCategory] = useState({});
  const [subCategoryItems, setSubCategoryItems] = useState([]);
  const [subCategoryItem, setSubCategoryItem] = useState({});
  const [priorities, setPriorities] = useState([]);
  const [priority, setPriority] = useState({});
  const [medium, setMedium] = useState([]);
  const [media, setMedia] = useState({});
  const [statuses, setStatuses] = useState([]);
  const [status, setStatus] = useState({});
  const [createdAfter, setCreatedAfter] = useState({});
  const [createdBefore, setCreatedBefore] = useState({});

  const [open, setOpen] = React.useState(false);
  const [opendate, setOpendate] = React.useState(true);
  const [createAccess, setCreateAccess] = useState(-1);
  const [viewAccess, setViewAccess] = useState(-1);
  const [assignAccess, setAssignAccess] = useState(-1);
  const [editAccess, setEditAccess] = useState(-1);
  const [roleAccess, setRoleAccess] = useState();
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const toggle = () => setOpendate(!open);
  const userData = useSelector(state => state.userData);

  useEffect(() => {
    const apiUrl = config.APIS_URL + '/access/email/' + userData.email;
    fetch(apiUrl)
      .then(res => res.json())
      .then(repos => {
        /* alert(JSON.stringify(repos.data));
        alert(
          JSON.stringify(
            repos.data.filter(access => access.functionalityId === '1')
          )
        ); */
        setCreateAccess(
          parseInt(
            repos.data.filter(access => access.functionalityId === '1')[0]
              .accessLevelId
          )
        );
        setViewAccess(
          repos.data.filter(access => access.functionalityId === '2')[0]
            .accessLevelId
        );
        setEditAccess(
          repos.data.filter(access => access.functionalityId === '3')[0]
            .accessLevelId
        );
        setAssignAccess(
          repos.data.filter(access => access.functionalityId === '4')[0]
            .accessLevelId
        );
        setRoleAccess(repos.role);

        setDepartment({
          label: repos.role.department,
          value: repos.role.departmentId
        });
        props.setDepartment({
          label: repos.role.department,
          value: repos.role.departmentId
        });
        setTeam({
          label: repos.role.team,
          value: repos.role.teamId
        });
        props.setTeam({
          label: repos.role.team,
          value: repos.role.teamId
        });
        setExecutive({
          label: repos.role.executive,
          value: repos.role.executiveId
        });
        props.setExecutive({
          label: repos.role.executive,
          value: repos.role.executiveId
        });

        getDepartments();
        /*  if (parseInt(viewAccess) < 0) {
          alert('You do not have view access to this Page!');
        }
        if (parseInt(editAccess) < 0) {
          alert('You do not have edit access to this Page!');
        }
        if (parseInt(assignAccess) < 0) {
          alert('You do not have assign access to this Page!');
        } */
      });
  }, []);
  useEffect(() => {
    let unmounted = false;
    async function getItems() {
      const response = await fetch(config.APIS_URL + '/tickettypes');
      const body = await response.json();
      if (!unmounted) {
        setTicketTypes(
          body.data.map(({ _id, ticketType }) => ({
            label: ticketType,
            value: _id
          }))
        );
        setLoading(false);
        setTicketType({
          label: 'All',
          value: 'All'
        });
        /* setTicketTypes(
          body.data.map(({ _id, ticketType }) => ({
            label: ticketType,
            value: _id
          }))
        );
        setLoading(false);
        body.data[0]
          ? setTicketType({
              label: body.data[0].tickettype,
              value: body.data[0]._id
            })
          : setTicketType({}); */
      }
    }
    getItems();
    return () => {
      unmounted = true;
    };
  }, []);

  useEffect(() => {
    let unmounted = false;
    async function getItems() {
      const response = await fetch(config.APIS_URL + '/medium');
      const body = await response.json();
      if (!unmounted) {
        setMedium(
          body.data.map(({ _id, media }) => ({
            label: media,
            value: _id
          }))
        );
        setLoading(false);
        setMedia({
          label: 'All',
          value: 'All'
        });
        // body.data[0]
        //   ? setMedia({
        //       label: body.data[0].media,
        //       value: body.data[0]._id
        //     })
        //   : setMedia({});
      }
    }
    getItems();
    return () => {
      unmounted = true;
    };
  }, []);
  const getDepartments = () => {
    let unmounted = false;
    async function getItems() {
      const response = await fetch(config.APIS_URL + '/departments');
      const body = await response.json();
      if (!unmounted) {
        /*  if (!props.ticket_id) {
          body.data[0]
            ? setDepartment({
                label: body.data[0].department,
                value: body.data[0]._id
              })
            : setDepartment({});
        } */

        setDepartments(
          body.data.map(({ _id, department }) => ({
            label: department,
            value: _id
          }))
        );
        setLoading(false);
      }
    }
    getItems();
    return () => {
      unmounted = true;
    };
  };

  useEffect(() => {
    let unmounted = false;
    async function getItems() {
      const response = await fetch(
        config.APIS_URL + '/teams/' + department.value
      );
      const body = await response.json();
      if (!unmounted) {
        setTeams(
          body.data.map(({ _id, team }) => ({
            label: team,
            value: _id
          }))
        );
        setLoading(false);
        /*  setTeam({
          label: 'All',
          value: 'All'
        });
        props.setTeam({
          label: 'All',
          value: 'All'
        }); */
        /* body.data[0]
          ? setTeam({
              label: body.data[0].team,
              value: body.data[0]._id
            })
          : setTeam({});
        body.data[0]
          ? props.setTeam({
              label: body.data[0].team,
              value: body.data[0]._id
            })
          : props.setTeam({}); */
      }
    }
    getItems();
    return () => {
      unmounted = true;
    };
  }, [department.value]);

  useEffect(() => {
    let unmounted = false;
    async function getItems() {
      const response = await fetch(
        config.APIS_URL + '/executives/' + department.value + '/' + team.value
      );
      const body = await response.json();
      if (!unmounted) {
        setExecutives(
          body.data.map(({ _id, executiveName }) => ({
            label: executiveName,
            value: _id
          }))
        );
        setLoading(false);
        /*  setExecutive({
          label: 'All',
          value: 'All'
        });
        props.setExecutive({
          label: 'All',
          value: 'All'
        }); */
        /* body.data[0]
          ? setExecutive({
              label: body.data[0].executiveName,
              value: body.data[0]._id
            })
          : setExecutive({});
        body.data[0]
          ? props.setExecutive({
              label: body.data[0].executiveName,
              value: body.data[0]._id
            })
          : props.setExecutive({}); */
      }
    }
    getItems();
    return () => {
      unmounted = true;
    };
  }, [team.value, department.value]);

  useEffect(() => {
    let unmounted = false;
    async function getItems() {
      const response = await fetch(config.APIS_URL + '/categories');
      const body = await response.json();
      if (!unmounted) {
        setCategories(
          body.data.map(({ _id, category }) => ({
            label: category,
            value: _id
          }))
        );
        setLoading(false);

        setCategory({
          label: 'All',
          value: 'All'
        });
        props.setCategory({
          label: 'All',
          value: 'All'
        });
        // body.data[0]
        //   ? setCategory({
        //       label: body.data[0].category,
        //       value: body.data[0]._id
        //     })
        //   : setCategory({});
      }
    }
    getItems();
    return () => {
      unmounted = true;
    };
  }, []);

  useEffect(() => {
    let unmounted = false;
    async function getItems() {
      const response = await fetch(
        config.APIS_URL + '/subcategories/' + category.value
      );
      const body = await response.json();
      if (!unmounted) {
        setSubCategories(
          body.data.map(({ _id, subCategory }) => ({
            label: subCategory,
            value: _id
          }))
        );
        setLoading(false);

        setSubCategory({
          label: 'All',
          value: 'All'
        });
        props.setSubCategory({
          label: 'All',
          value: 'All'
        });
        /*  body.data[0]
          ? setSubCategory({
              label: body.data[0].subCategory,
              value: body.data[0]._id
            })
          : setSubCategory({}); */
      }
    }
    getItems();
    return () => {
      unmounted = true;
    };
  }, [category.value]);

  useEffect(() => {
    let unmounted = false;
    async function getItems() {
      const response = await fetch(
        config.APIS_URL +
        '/subcategoryitems/' +
        category.value +
        '/' +
        subCategory.value
      );
      const body = await response.json();
      if (!unmounted) {
        setSubCategoryItems(
          body.data.map(({ _id, subCategoryItem }) => ({
            label: subCategoryItem,
            value: _id
          }))
        );
        setLoading(false);
        setSubCategoryItem({
          label: 'All',
          value: 'All'
        });
        props.setSubCategoryItem({
          label: 'All',
          value: 'All'
        });
        /* body.data[0]
          ? setSubCategoryItem({
              label: body.data[0].subCategoryItem,
              value: body.data[0]._id
            })
          : setSubCategoryItem({}); */
      }
    }
    getItems();
    return () => {
      unmounted = true;
    };
  }, [subCategory.value]);

  useEffect(() => {
    let unmounted = false;
    async function getItems() {
      const response = await fetch(
        config.APIS_URL +
        '/priorities/' +
        (subCategory.value
          ? subCategory.value.toString().length > 0
            ? subCategory.value
            : 'abcdefghijklmnop'
          : 'abcdefghijklmnop')
      );
      const body = await response.json();
      if (!unmounted) {
        setPriorities(
          body.data.map(({ _id, priority }) => ({
            label: priority,
            value: _id
          }))
        );
        setLoading(false);
        setPriority({
          label: 'All',
          value: 'All'
        });
        // body.data[0]
        //   ? setPriority({
        //       label: body.data[0].priority,
        //       value: body.data[0]._id
        //     })
        //   : setPriority({});
      }
    }
    getItems();
    return () => {
      unmounted = true;
    };
  }, [subCategory, category]);

  useEffect(() => {
    let unmounted = false;
    async function getItems() {
      const response = await fetch(config.APIS_URL + '/statuses');
      const body = await response.json();
      if (!unmounted) {
        setStatuses(
          body.data.map(({ _id, status }) => ({
            label: status,
            value: _id
          }))
        );
        setLoading(false);
        setStatus({
          label: 'All',
          value: 'All'
        });
        // body.data[0]
        //   ? setStatus({
        //       label: body.data[0].status,
        //       value: body.data[0]._id
        //     })
        //   : setStatus({});
      }
    }
    getItems();
    return () => {
      unmounted = true;
    };
  }, []);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const Search = () => {

    var values = {};
    if (ticketNumber.length > 0)
      values = { ...values, ticketNumber }
    if (distributorName.length > 0)
      values = { ...values, distributorName }
    if (distributorId.length > 0)
      values = { ...values, distributorId }
    if (ticketType.label !== "All")
      values = { ...values, ticketType: ticketType.value }
    if (department.label !== "All")
      values = { ...values, department: department.value }
    if (team.label !== "All")
      values = { ...values, team: team.value }
    if (executive.label !== "All")
      values = { ...values, executive: executive.value }
    if (category.label !== "All")
      values = { ...values, category: category.value }
    if (subCategory.label !== "All")
      values = { ...values, subCategory: subCategory.value }
    if (subCategoryItem.label !== "All")
      values = { ...values, subCategoryItem: subCategoryItem.value }
    if (priority.label !== "All")
      values = { ...values, priority: priority.value }
    if (status.label !== "All")
      values = { ...values, status: status.value }
    if (media.label !== "All")
      values = { ...values, media: media.value }
    if (Date.parse(createdAfter))
      values = { ...values, createdAfter }
    if (Date.parse(createdBefore))
      values = { ...values, createdBefore }
    props.Search(values)

  }
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Box component="div" className={classes.alignCenter}>
          <TextField
            id="standard-select-currency-native"
            label="Ticket No."
            size="small"
            value={ticketNumber}
            onChange={e => {
              setTicketNumber(e.target.value);
              props.setTicketNumber(e.target.value);
            }}
            InputLabelProps={{
              shrink: true
            }}
            SelectProps={{
              native: true
            }}
            InputProps={{
              style: { fontSize: 13 },
            }}
          ></TextField>
          <TextField
            id="standard-select-currency-native"
            select
            label="Ticket Type"
            size="small"
            InputLabelProps={{
              shrink: true
            }}
            SelectProps={{
              native: true
            }}
            inputProps={{ style: { fontSize: 13 } }}
            value={ticketType.value}
            onChange={e => {
              setTicketType({
                value: e.target.value,
                label: ticketTypes.filter(
                  ticketType => ticketType.value === e.target.value
                )[0]
                  ? ticketTypes.filter(
                    ticketType => ticketType.value === e.target.value
                  )[0].label
                  : 'All'
              });
              props.setTicketType({
                value: e.target.value,
                label: ticketTypes.filter(
                  ticketType => ticketType.value === e.target.value
                )[0]
                  ? ticketTypes.filter(
                    ticketType => ticketType.value === e.target.value
                  )[0].label
                  : 'All'
              });
            }}
          >
            {[...[{ label: 'All', value: 'All' }], ...ticketTypes].map(
              option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              )
            )}
          </TextField>
          <TextField
            id="standard-select-currency-native"
            select
            label="Department"
            size="small"
            SelectProps={{
              native: true
            }}
            InputLabelProps={{
              shrink: true
            }}
            inputProps={{ style: { fontSize: 13 } }}
            value={department.value}
            disabled={
              viewAccess < 3 &&
              !(
                viewAccess === 2 && roleAccess.departmentId === department.value
              )
            }
            onChange={e => {
              setDepartment({
                value: e.target.value,
                label: departments.filter(
                  department => department.value === e.target.value
                )[0]
                  ? departments.filter(
                    department => department.value === e.target.value
                  )[0].label
                  : 'All'
              });
              props.setDepartment({
                value: e.target.value,
                label: departments.filter(
                  department => department.value === e.target.value
                )[0]
                  ? departments.filter(
                    department => department.value === e.target.value
                  )[0].label
                  : 'All'
              });
              setTeam({ label: 'All', value: 'All' });
              setExecutive({ label: 'All', value: 'All' });
            }}
          >
            {[...[{ label: 'All', value: 'All' }], ...departments].map(
              option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              )
            )}
          </TextField>
          <TextField
            id="standard-select-currency-native"
            select
            label="Team"
            size="small"
            SelectProps={{
              native: true
            }}
            InputLabelProps={{
              shrink: true
            }}
            inputProps={{ style: { fontSize: 13 } }}
            value={team.value}
            disabled={
              viewAccess < 2 &&
              !(viewAccess === 1 && roleAccess.teamId === team.value)
            }
            onChange={e => {
              setTeam({
                value: e.target.value,
                label: teams.filter(team => team.value === e.target.value)[0]
                  ? teams.filter(team => team.value === e.target.value)[0].label
                  : 'All'
              });
              props.setTeam({
                value: e.target.value,
                label: teams.filter(team => team.value === e.target.value)[0]
                  ? teams.filter(team => team.value === e.target.value)[0].label
                  : 'All'
              });
              setExecutive({ label: 'All', value: 'All' });
            }}
          >
            {[...[{ label: 'All', value: '' }], ...teams].map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
          <TextField
            id="standard-select-currency-native"
            select
            label="Executive"
            size="small"
            SelectProps={{
              native: true
            }}
            InputLabelProps={{
              shrink: true
            }}
            inputProps={{ style: { fontSize: 13 } }}
            value={executive.value}
            disabled={
              viewAccess < 1 &&
              !(viewAccess === 0 && roleAccess.executiveId === executive.value)
            }
            onChange={e => {
              setExecutive({
                value: e.target.value,
                label: executives.filter(
                  executive => executive.value === e.target.value
                )[0]
                  ? executives.filter(
                    executive => executive.value === e.target.value
                  )[0].label
                  : 'All'
              });
              props.setExecutive({
                value: e.target.value,
                label: executives.filter(
                  executive => executive.value === e.target.value
                )[0]
                  ? executives.filter(
                    executive => executive.value === e.target.value
                  )[0].label
                  : 'All'
              });
            }}
          >
            {[...[{ label: 'All', value: '' }], ...executives].map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
          <TextField
            id="standard-select-currency-native"
            select
            label="Category"
            size="small"
            SelectProps={{
              native: true
            }}
            InputLabelProps={{
              shrink: true
            }}
            inputProps={{ style: { fontSize: 13 } }}
            value={category.value}
            onChange={e => {
              setCategory({
                value: e.target.value,
                label: categories.filter(
                  category => category.value === e.target.value
                )[0]
                  ? categories.filter(
                    category => category.value === e.target.value
                  )[0].label
                  : 'All'
              });
              props.setCategory({
                value: e.target.value,
                label: categories.filter(
                  category => category.value === e.target.value
                )[0]
                  ? categories.filter(
                    category => category.value === e.target.value
                  )[0].label
                  : 'All'
              });
            }}
          >
            {[...[{ label: 'All', value: 'All' }], ...categories].map(
              option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              )
            )}
          </TextField>
          <TextField
            id="standard-select-currency-native"
            select
            label="Sub-Category"
            size="small"
            SelectProps={{
              native: true
            }}
            InputLabelProps={{
              shrink: true
            }}
            inputProps={{ style: { fontSize: 13 } }}
            value={subCategory.value}
            onChange={e => {
              setSubCategory({
                value: e.target.value,
                label: subCategories.filter(
                  subCategory => subCategory.value === e.target.value
                )[0]
                  ? subCategories.filter(
                    subCategory => subCategory.value === e.target.value
                  )[0].label
                  : 'All'
              });
              props.setSubCategory({
                value: e.target.value,
                label: subCategories.filter(
                  subCategory => subCategory.value === e.target.value
                )[0]
                  ? subCategories.filter(
                    subCategory => subCategory.value === e.target.value
                  )[0].label
                  : 'All'
              });
            }}
          >
            {[...[{ label: 'All', value: '' }], ...subCategories].map(
              option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              )
            )}
          </TextField>
          <TextField
            id="standard-select-currency-native"
            select
            label="Sub-Category Item"
            size="small"
            SelectProps={{
              native: true
            }}
            InputLabelProps={{
              shrink: true
            }}
            inputProps={{ style: { fontSize: 13 } }}
            value={subCategoryItem.value}
            onChange={e => {
              setSubCategoryItem({
                value: e.target.value,
                label: subCategoryItems.filter(
                  subCategoryItem => subCategoryItem.value === e.target.value
                )[0]
                  ? subCategoryItems.filter(
                    subCategoryItem =>
                      subCategoryItem.value === e.target.value
                  )[0].label
                  : 'All'
              });
              props.setSubCategoryItem({
                value: e.target.value,
                label: subCategoryItems.filter(
                  subCategoryItem => subCategoryItem.value === e.target.value
                )[0]
                  ? subCategoryItems.filter(
                    subCategoryItem =>
                      subCategoryItem.value === e.target.value
                  )[0].label
                  : 'All'
              });
            }}
          >
            {[...[{ label: 'All', value: '' }], ...subCategoryItems].map(
              option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              )
            )}
          </TextField>
          <TextField
            id="standard-select-currency-native"
            select
            label="Priority"
            size="small"
            SelectProps={{
              native: true
            }}
            InputLabelProps={{
              shrink: true
            }}
            inputProps={{ style: { fontSize: 13 } }}
            value={priority.value}
            onChange={e => {
              setPriority({
                value: e.target.value,
                label: priorities.filter(
                  priority => priority.value === e.target.value
                )[0]
                  ? priorities.filter(
                    priority => priority.value === e.target.value
                  )[0].label
                  : 'All'
              });
              props.setPriority({
                value: e.target.value,
                label: priorities.filter(
                  priority => priority.value === e.target.value
                )[0]
                  ? priorities.filter(
                    priority => priority.value === e.target.value
                  )[0].label
                  : 'All'
              });
            }}
          >
            {[...[{ label: 'All', value: 'All' }], ...priorities].map(
              option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              )
            )}
          </TextField>
          <TextField
            id="standard-select-currency-native"
            select
            label="Status"
            size="small"
            SelectProps={{
              native: true
            }}
            InputLabelProps={{
              shrink: true
            }}
            inputProps={{ style: { fontSize: 13 } }}
            value={status.value}
            onChange={e => {
              setStatus({
                value: e.target.value,
                label: statuses.filter(
                  status => status.value === e.target.value
                )[0]
                  ? statuses.filter(
                    status => status.value === e.target.value
                  )[0].label
                  : 'All'
              });
              props.setStatus({
                value: e.target.value,
                label: statuses.filter(
                  status => status.value === e.target.value
                )[0]
                  ? statuses.filter(
                    status => status.value === e.target.value
                  )[0].label
                  : 'All'
              });
            }}
          >
            {[...[{ label: 'All', value: 'All' }], ...statuses].map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
          <TextField
            id="standard-select-currency-native"
            select
            label="Media"
            size="small"
            SelectProps={{
              native: true
            }}
            InputLabelProps={{
              shrink: true
            }}
            inputProps={{ style: { fontSize: 13 } }}
            defaultValue={media.value}
            onChange={e => {
              setMedia({
                value: e.target.value,
                label: medium.filter(media => media.value === e.target.value)[0]
                  ? medium.filter(media => media.value === e.target.value)[0]
                    .label
                  : 'All'
              });
              props.setMedia({
                value: e.target.value,
                label: medium.filter(media => media.value === e.target.value)[0]
                  ? medium.filter(media => media.value === e.target.value)[0]
                    .label
                  : 'All'
              });
            }}
          >
            {[...[{ label: 'All', value: 'All' }], ...medium].map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
          <TextField
            id="standard-select-currency-native"
            label="Dist Name"
            size="small"
            SelectProps={{
              native: true
            }}
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              style: { fontSize: 13 },
            }}
            value={distributorName}
            onChange={e => {
              setDistributorName(e.target.value);
              props.setDistributorName(e.target.value);
            }}
          ></TextField>{' '}
          <TextField
            id="standard-select-currency-native"
            label="Dist Id"
            size="small"
            SelectProps={{
              native: true
            }}
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              style: { fontSize: 13 },
            }}
            value={distributorId}
            onChange={e => {
              setDistributorId(e.target.value);
              props.setDistributorId(e.target.value);
            }}
          ></TextField>
          <TextField
            id="date"
            label="Created After"
            size="small"
            type="date"
            onChange={(e) => setCreatedAfter(e.target.value)}
            InputLabelProps={{
              shrink: true,
              style: { width: "120px" }
            }}
            InputProps={{
              style: { fontSize: 13, width: "125px" }
            }}
          />&nbsp;&nbsp;&nbsp;
          <TextField
            id="date"
            label="Created Before"
            size="small"
            type="date"
            onChange={(e) => setCreatedBefore(e.target.value)}
            InputLabelProps={{
              shrink: true,
              style: { width: "120px" }
            }}
            InputProps={{
              style: { fontSize: 13, width: "125px" }

            }}
          />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Tooltip title="Search">
            <Avatar variant="rounded" className={classes.rounded}>
              <SearchIcon onClick={Search} />
            </Avatar>
          </Tooltip>
          <div></div>
        </Box>
      </Paper>
    </div>
  );
}
