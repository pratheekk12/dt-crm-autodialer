import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import config from '../../views/config.json';
import {
  Paper,
  Grid,
  List,
  ListItem,
  Divider,
  ListItemText,
  Typography,
  ListItemIcon,
  Box,
  Button,
  Avatar,
  TextField,
  Link,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip
} from '@material-ui/core';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import WorkIcon from '@material-ui/icons/Work';
import { purple, orange, green, grey } from '@material-ui/core/colors';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import LinkIcon from '@material-ui/icons/Link';
import AddIcon from '@material-ui/icons/Add';
import CreateTicket from '../create-ticket';
import { useSelector } from 'react-redux';
import FilterTicket from '../filter-ticket';
import EditIcon from '@material-ui/icons/Edit';
import FilterListIcon from '@material-ui/icons/FilterList';
import RefreshIcon from '@material-ui/icons/Loop';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import Timeline from './timeline';
import HistoryIcon from '@material-ui/icons/History';
import { blue, teal, lime } from '@material-ui/core/colors';
import ReactExport from 'react-export-excel';
import GetAppIcon from '@material-ui/icons/GetApp';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
const drawerWidth = 350;
const useStyles = makeStyles(theme => ({
  root: {
    // width: '100%',
    flexGrow: 1,
    margin: 15
    // '& .MuiTextField-root': {
    //   margin: theme.spacing(1),
    //   width: 200,
    //   shrink: false
    // }
  },
  textBold: {
    fontWeight: '600'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220
  },
  paper: {
    padding: theme.spacing(1)
  },
  listRow: {
    flexGrow: 1,
    fontSize: 10,
    padding: 0
  },
  ticketMargin: {
    marginLeft: 5,
    width: '90%'
  },
  listItemClass: {
    paddingLeft: 10,
    paddingRight: 10,
    width: '100%'
  },
  listSelectedItemClass: {
    paddingLeft: 10,
    paddingRight: 10,
    width: '100%',
    backgroundColor: green[100]
  },
  metadataClass: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 16,
    paddingBottom: 16
  },
  labelClass: {
    fontWeight: '500',
    float: 'left',
    width: '50%'
  },
  valueClass: {
    width: '30%'
  },
  belowMargin: {
    marginBottom: 20
  },
  dateMargin: {
    marginBottom: 5
  },
  green: {
    color: theme.palette.getContrastText(green[900]),
    backgroundColor: green[900],
    width: theme.spacing(4),
    height: theme.spacing(4)
  },
  avatarValue: {
    marginLeft: 5,
    marginTop: 5
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    color: '#fff',
    backgroundColor: green[500],
    marginTop: 10
  },
  button: {
    margin: 5,
    marginTop: 20,
    marginBottom: 20
  },
  boxDiv: {
    paddingBottom: 10,
    paddingTop: 10
  },
  detailTitle: {
    marginLeft: 5,
    marginTop: 5,
    fontWeight: 600
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: theme.spacing(1, 1)
  },
  rounded: {
    color: '#fff',
    backgroundColor: '#303030',
    float: 'right',
    marginBottom: 15,
    marginRight: 10,
    height: 30,
    width: 30
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    backgroundColor: purple[700]
  }
}));

export default function TicketDashboard(props) {
  const userData = useSelector(state => state.userData);
  const classes = useStyles();
  const [ticket, setTicket] = useState({});
  const [clickChild, setClickChild] = useState();
  const [apiTickets, setApiTickets] = useState([]);
  const [activeTicket, setActiveTicket] = useState({});
  const [opentimeline, setOpentimeline] = React.useState(false);
  const [ticketNumber, setTicketNumber] = useState('');
  const [distributorName, setDistributorName] = useState('');
  const [filterDistributorName, setFilterDistributorName] = useState('');
  const [distributorId, setDistributorId] = useState('');
  const [distributorEmail, setDistributorEmail] = useState('');
  const [distributorMobile, setDistributorMobile] = useState('');
  const [createdByName, setCreatedByName] = useState('');
  const [createdById, setCreatedById] = useState('');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [remarks, setRemarks] = useState('');
  const [ticketTypes, setTicketTypes] = useState({ value: '', label: '' });
  const [createdTime, setCreatedTime] = useState();
  const [ticketType, setTicketType] = useState({ value: '', label: '' });
  const [Createon, setCreateon] = useState('');
  const [file, setFile] = useState('');
  const [files, setFiles] = useState([]);
  const [showMyTickets, setShowMyTickets] = useState(false);

  const [ticketHistory, setTicketHistory] = useState([]);
  const [medium, setMedium] = useState([]);
  const [media, setMedia] = useState({
    value: '',
    label: ''
  });
  const [subCategory, setSubCategory] = useState({
    value: 'All',
    label: 'All'
  });
  const [subCategoryItems, setSubCategoryItems] = useState([]);
  const [subCategoryItem, setSubCategoryItem] = useState({
    value: 'All',
    label: 'All'
  });
  const [categories, setCategories] = useState([]);

  const [subCategories, setSubCategories] = useState([]);

  const [departments, setDepartments] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [priority, setPriority] = useState({
    value: '',
    label: '',
    sla: 0
  });
  const [teams, setTeams] = useState([]);
  const [executives, setExecutives] = useState([]);

  const [department, setDepartment] = useState({
    value: 'All',
    label: 'All'
  });
  const [team, setTeam] = useState({
    value: 'All',
    label: 'All'
  });
  const [executive, setExecutive] = useState({
    value: 'All',
    label: 'All',
    executiveEmail: '',
    executiveMobile: ''
  });
  const [myDepartment, setMyDepartment] = useState();
  const [myTeam, setMyTeam] = useState();
  const [me, setMe] = useState();

  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleTimelineOpen = () => {
    setOpentimeline(true);
  };
  const handleTimelineClose = () => {
    setOpentimeline(false);
  };

  const [type, setTickettype] = React.useState({});

  const handleTicketTypeChange = event => {
    setTicketTypes(ticketTypes);
  };

  const handlePriorityChange = event => {
    setPriority(event.target.value);
  };

  const [category, setCategory] = React.useState({
    value: 'All',
    label: 'All'
  });
  const [assignedExecutive, setAssignedExecutive] = React.useState({});
  const handleCategoryChange = event => {
    setCategory(category);
  };

  const handleSubCategoryChange = event => {
    setSubCategory(subCategory);
  };

  const handleSubCategoryItemChange = event => {
    setSubCategoryItem(subCategoryItem);
  };

  const [status, setStatus] = React.useState({});
  const handleStatusChange = event => {
    setStatus(status);
  };

  const [open, setOpen] = React.useState(false);
  const [isEditable, makeEditable] = React.useState(false);
  const [filter, openFilter] = React.useState(false);
  const [tickets, setTickets] = useState([]);
  const [openEdit, setOpenEdit] = React.useState();
  const [createAccess, setCreateAccess] = useState(-1);
  const [viewAccess, setViewAccess] = useState(-1);
  const [assignAccess, setAssignAccess] = useState(-1);
  const [editAccess, setEditAccess] = useState(-1);
  const [roleAccess, setRoleAccess] = useState();

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
          parseInt(
            repos.data.filter(access => access.functionalityId === '2')[0]
              .accessLevelId
          )
        );
        setEditAccess(
          parseInt(
            repos.data.filter(access => access.functionalityId === '3')[0]
              .accessLevelId
          )
        );
        setAssignAccess(
          parseInt(
            repos.data.filter(access => access.functionalityId === '4')[0]
              .accessLevelId
          )
        );
        setRoleAccess(repos.role);
        var vwAcc = parseInt(
          repos.data.filter(access => access.functionalityId === '2')[0]
            .accessLevelId
        );
        setMyDepartment({
          label: repos.role.department,
          value: repos.role.departmentId
        });
        setMyTeam({
          label: repos.role.team,
          value: repos.role.teamId
        });
        setMe({
          label: repos.role.executive,
          value: repos.role.executiveId
        });
        if (vwAcc < 3) {
          setDepartment({
            label: repos.role.department,
            value: repos.role.departmentId
          });
          if (vwAcc < 2) {
            setTeam({
              label: repos.role.team,
              value: repos.role.teamId
            });
            if (vwAcc === 0) {
              setExecutive({
                label: repos.role.executive,
                value: repos.role.executiveId
              });
            }
          }
        }
        /*  if (parseInt(viewAccess) < 0) {
          alert('You do not have view access to this Page!');
        }
        if (parseInt(editAccess) < 0) {
          alert('You do not have edit access to this Page!');
        }
        if (parseInt(assignAccess) < 0) {
          alert('You do not have assign access to this Page!');
        } */
        SearchTickets({ department: repos.role.departmentId, team: repos.role.teamId, executive: repos.role.executiveId, closed: false })
      });
  }, []);
  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  // useEffect(() => {
  //   if (open === true || openEdit === true) { }
  //   else if (!activeTicket.ticketNumber) {
  //     let unmounted = false;
  //     async function getItems() {
  //       const response = await fetch(config.APIS_URL + '/tickets');
  //       const body = await response.json();
  //       if (!unmounted) {
  //         // setApiTickets(body.data);

  //         setTickets(body.data);

  //         if (body.data[0]) {
  //           async function getHistoryItems() {
  //             const response = await fetch(
  //               config.APIS_URL + '/ticketHistory/' + body.data[0].ticketNumber
  //             );
  //             const tktHistory = (await response.json()).data;

  //             if (!unmounted) {
  //               setTicketHistory(tktHistory);
  //             }
  //           }
  //           getHistoryItems();
  //           //setActiveTicket(body.data[0]);
  //           viewTicket(body.data.filter(tkt => tkt.ticketNumber.includes(ticketNumber))
  //             .filter(tkt => tkt.distributorId.includes(distributorId))
  //             .filter(tkt =>
  //               tkt.distributorName
  //                 .toLowerCase()
  //                 .includes(distributorName.toLowerCase())
  //             )

  //             .filter(tkt =>
  //               department.label === 'All'
  //                 ? '#' === '#'
  //                 : tkt.assignedDepartmentId === department.value
  //             )
  //             .filter(tkt =>
  //               team.label === 'All'
  //                 ? '#' === '#'
  //                 : tkt.assignedTeamId === team.value
  //             )
  //             .filter(tkt =>
  //               executive.label === 'All'
  //                 ? '#' === '#'
  //                 : tkt.assignedExecutiveId === executive.value
  //             )
  //             .filter(tkt =>
  //               status.label === 'All'
  //                 ? tkt.status === tkt.status
  //                 : tkt.status === status.label
  //             )
  //             .filter(tkt =>
  //               category.label === 'All'
  //                 ? tkt.category === tkt.category
  //                 : tkt.category === category.label
  //             )
  //             .filter(tkt =>
  //               subCategory.label === 'All'
  //                 ? tkt.subCategory === tkt.subCategory
  //                 : tkt.subCategory === subCategory.label
  //             )
  //             .filter(tkt =>
  //               subCategoryItem.label === 'All'
  //                 ? tkt.subCategoryItem === tkt.subCategoryItem
  //                 : tkt.subCategoryItem === subCategoryItem.label
  //             )
  //             /* .filter(tkt =>
  //               subCategoryItem.label === 'All'
  //                 ? tkt.subCategoryItem ||
  //                   '' === tkt.subCategoryItem ||
  //                   ''
  //                 : tkt.subCategoryItem ||
  //                   '' === subCategoryItem.label ||
  //                   ''
  //             ) */
  //             .filter(tkt =>
  //               media.label === 'All'
  //                 ? tkt.media === tkt.media
  //                 : tkt.media === media.label
  //             )
  //             .filter(tkt =>
  //               ticketType.label === 'All'
  //                 ? tkt.ticketType === tkt.ticketType
  //                 : tkt.ticketType === ticketType.label
  //             )
  //             .filter(tkt =>
  //               priority.label === 'All'
  //                 ? tkt.priority === tkt.priority
  //                 : tkt.priority === priority.label
  //             )[0])
  //         } else {
  //           //setActiveTicket({});
  //           viewTicket({})
  //         }
  //         //  setLoading(false);
  //       }
  //     }
  //     getItems();
  //     return () => {
  //       unmounted = true;
  //     };
  //   }
  // }, [open, openEdit, activeTicket, filter, ticketNumber, ticketType, department, team, executive, media, category, subCategory, subCategoryItem, priority, status, distributorName, distributorId]);

  const SearchTickets = async (query) => {

    if (query.createdBefore || query.createdAfter)
      if (!(query.createdBefore && query.createdAfter)) {
        alert("Select both dates of Created Date Range!"); return;
      }
    /*  if (query.createdBefore && query.createdAfter && ((new Date(query.createdBefore)) < (new Date(query.createdAfter)))) {
       alert("Selected dates of Created Date Range are invalid!"); return;
     } */
    const apiUrl = config.APIS_URL + '/tickets/search';

    var apiParam = {
      method: 'POST',
      headers: query
    };

    await fetch(apiUrl, apiParam)
      .then(res => res.json())
      .then(repos => {
        if (JSON.stringify(repos.status) === '200') {
          setTickets(repos.data);
          if (repos.data.length > 0) {
            setActiveTicket(repos.data[0]);
          } else {
            setActiveTicket({});
          }
          return true;
        } else {
          alert(JSON.stringify(repos.message));
          return false;
        }
      });
  };
  /*   useEffect(() => {
      // viewTicket(ticket);
      if (!openEdit && activeTicket.ticketNumber) {
        let unmounted = false;
        async function getItems() {
          const response = await fetch(config.APIS_URL + '/tickets');
          const body = await response.json();
          if (!unmounted) {
            // setApiTickets(body.data);
            // setTickets(body.data);
            // if (body.data[0]) {
            //   setActiveTicket(body.data[0]);
            // } else {
            //   setActiveTicket();
            // }
            //  setLoading(false);
          }
        }
        getItems();
        return () => {
          unmounted = true;
        };
      }
    }, [openEdit]); */
  useEffect(() => { }, [activeTicket, activeTicket, showMyTickets]);
  const UploadFile = e => {
    var myHeaders = new Headers();
    myHeaders.append('ticketnumber', ticketNumber);

    var formdata = new FormData();
    formdata.append('SoftCopyFile', file);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    const apiUrl = config.APIS_URL + '/tickets/uploadfiles';
    fetch(apiUrl, requestOptions)
      .then(response => response.text())
      .then(result => {
        alert('Uploaded Sucessfully');
        console.log(result);
      })
      .catch(error => console.log('error', error));
  };
  const viewTicket = item => {
    setActiveTicket(item);
    let unmounted = false;
    async function getHistoryItems() {
      const response = await fetch(
        config.APIS_URL + '/ticketHistory/' + item.ticketNumber
      );
      const tktHistory = (await response.json()).data;

      if (!unmounted) {
        setTicketHistory(tktHistory);
      }
    }
    getHistoryItems();
  };

  useEffect(() => {
    let unmounted = false;
    async function getItems() {
      const response = await fetch(config.APIS_URL + '/categories');
      const body = await response.json();
      if (!unmounted) {
        setCategories(
          ...[{ label: 'All', value: 'All' }],
          ...body.data.map(({ _id, category }) => ({
            label: category,
            value: _id
          }))
        );
        setLoading(false);

        setCategory({
          label: 'All',
          value: 'All'
        });
      }
    }
    getItems();
    return () => {
      unmounted = true;
    };
  }, []);

  const getSubCategories = cat => {
    let unmounted = false;
    async function getItems() {
      const response = await fetch(config.APIS_URL + '/subcategories/' + cat);
      const body = await response.json();
      if (!unmounted) {
        setSubCategories(
          body.data.map(({ _id, subCategory }) => ({
            label: subCategory,
            value: _id
          }))
        );
        if (!props.ticket_id) {
          body.data[0]
            ? setSubCategory({
              label: body.data[0].subCategory,
              value: body.data[0]._id
            })
            : setSubCategory({});
        }
        setLoading(false);
      }
    }
    getItems();
    return () => {
      unmounted = true;
    };
  };
  const getSubCategoryItems = (cat, sct) => {
    let unmounted = false;
    async function getItems() {
      const response = await fetch(
        config.APIS_URL + '/subcategoryitems/' + cat + '/' + sct
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
        if (!props.ticket_id) {
          body.data[0]
            ? setSubCategoryItem({
              label: body.data[0].subCategoryItem,
              value: body.data[0]._id
            })
            : setSubCategoryItem({});
        }
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
      const response = await fetch(config.APIS_URL + '/priorities');
      const body = await response.json();
      if (!unmounted) {
        setPriorities(
          ...[{ label: 'All', value: 'All' }],
          ...body.data.map(({ _id, priority }) => ({
            label: priority,
            value: _id
          }))
        );
        setLoading(false);
        setPriority({
          label: 'All',
          value: 'All'
        });
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
      const response = await fetch(config.APIS_URL + '/tickettypes');
      const body = await response.json();
      if (!unmounted) {
        setTicketTypes(
          ...[{ label: 'All', value: 'All' }],
          ...body.data.map(({ _id, ticketType }) => ({
            label: ticketType,
            value: _id
          }))
        );
        setLoading(false);
        setTicketType({
          label: 'All',
          value: 'All'
        });
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
        setMedium([
          ...[{ label: 'All', value: 'All', idLabel: "", nameLabel: "" }],
          ...body.data.map(({ _id, media, idLabel, nameLabel }) => ({
            label: media,
            value: _id, idLabel: idLabel, nameLabel: nameLabel
          }))]
        );
        setLoading(false);
        setMedia({
          label: 'All',
          value: 'All'
        });
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
      const response = await fetch(config.APIS_URL + '/statuses');
      const body = await response.json();
      if (!unmounted) {
        setStatuses([
          ...[{ label: 'All', value: 'All' }],
          ...body.data.map(({ _id, status }) => ({
            label: status,
            value: _id
          }))
        ]);
        setLoading(false);
        setStatus({
          label: 'All',
          value: 'All'
        });
      }
    }
    getItems();
    return () => {
      unmounted = true;
    };
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const configureEditable = () => {
    if (isEditable) {
      makeEditable(false);
    } else {
      makeEditable(true);
    }
  };
  const makeEditableFalse = () => {
    makeEditable(false);
  };

  const configureFilter = () => {
    if (filter) {
      openFilter(false);
      if (showMyTickets) {
        SearchTickets({ createdby: userData.email })
      } else { SearchTickets({ executive: me.value, closed: false }) }
    } else {
      openFilter(true);
    }
  };
  var createTicket = () => { };
  useEffect(() => {
    let unmounted = false;
    async function getFiles() {
      console.log('tktnumber', activeTicket.ticketNumber);

      const apiUrl = config.APIS_URL + '/tickets/fetchfiles';
      var apiParam = {
        method: 'POST',
        headers: { ticketnumber: activeTicket.ticketNumber }
      };

      const response = await fetch(apiUrl, apiParam);

      const fils = await response.json();

      setFiles(fils);
    }

    getFiles();

    return () => {
      unmounted = true;
    };
  }, [file, activeTicket]);

  return (
    <div className={classes.root}>
      <Box component="span">
        <Button
          variant="outlined"
          color="primary"
          size="small"
          style={{ marginBottom: 15 }}
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Create Ticket
        </Button>
        <ExcelFile
          filename="tickets"
          element={
            <Button
              variant="outlined"
              color="primary"
              size="small"
              style={{ marginBottom: 15, marginLeft: 10 }}
              startIcon={<GetAppIcon />}
            >
              Download
            </Button>
          }
        >
          <ExcelSheet data={tickets} name="Tickets">
            <ExcelColumn label="ticketNumber" value="ticketNumber" />
            <ExcelColumn label="ticketType" value="ticketType" />
            <ExcelColumn label="priority" value="priority" />
            <ExcelColumn label="category" value="category" />
            <ExcelColumn label="subCategory" value="subCategory" />
            <ExcelColumn label="subCategoryItem" value="subCategoryItem" />
            <ExcelColumn label="status" value="status" />
            <ExcelColumn label="distributorId" value="distributorId" />
            <ExcelColumn label="distributorEmail" value="distributorEmail" />
            <ExcelColumn label="distributorMobile" value="distributorMobile" />
            <ExcelColumn label="distributorName" value="distributorName" />
            <ExcelColumn label="media" value="media" />
            <ExcelColumn label="ticketSubject" value="ticketSubject" />
            <ExcelColumn label="ticketDescription" value="ticketDescription" />
            <ExcelColumn label="ticketRemarks" value="ticketRemarks" />
            <ExcelColumn
              label="assignedDepartment"
              value="assignedDepartment"
            />
            <ExcelColumn label="assignedExecutive" value="assignedExecutive" />
            <ExcelColumn
              label="assignedExecutiveEmail"
              value="assignedExecutiveEmail"
            />
            <ExcelColumn
              label="assignedExecutiveMobile"
              value="assignedExecutiveMobile"
            />
            <ExcelColumn label="assignedTeam" value="assignedTeam" />

            <ExcelColumn label="assignedExecutive" value="assignedExecutive" />
            <ExcelColumn label="createdById" value="createdById" />
            <ExcelColumn label="createdByName" value="createdByName" />
            <ExcelColumn label="createdTime" value="createdTime" />
            <ExcelColumn label="updatedTime" value="updatedTime" />
          </ExcelSheet>
        </ExcelFile>

        <Tooltip title="Filter">
          <Avatar variant="rounded" className={classes.rounded}>
            <FilterListIcon onClick={configureFilter} />
          </Avatar>
        </Tooltip>
        <Tooltip title="Refresh">
          <Avatar variant="rounded" className={classes.rounded}>
            <RefreshIcon onClick={() => window.location.reload()} />
          </Avatar>
        </Tooltip>
        {showMyTickets ?
          <Tooltip title="Tickets assigned to me!">
            <Avatar variant="rounded" className={classes.rounded}>
              <WorkIcon onClick={() => { setShowMyTickets(false); openFilter(false); SearchTickets({ executive: me.value, closed: false }) }} />
            </Avatar>
          </Tooltip> :
          <Tooltip title="Ticket raised by me!">
            <Avatar variant="rounded" className={classes.rounded}>
              <EmojiPeopleIcon onClick={() => { setShowMyTickets(true); openFilter(false); SearchTickets({ createdby: userData.email, closed: false }) }} />
            </Avatar>
          </Tooltip>}
      </Box>
      {(() => {
        if (filter) {
          return (
            <FilterTicket
              ticketNumber={ticketNumber}
              setTicketNumber={tks => {
                setTicketNumber(tks);
              }}
              ticketTypes={ticketTypes}
              setTicketTypes={tkstyps => {
                setTicketTypes(tkstyps);
              }}
              ticketType={ticketType}
              setTicketType={tkstyp => {
                setTicketType(tkstyp);
              }}
              departments={departments}
              setDepartments={dpts => {
                setDepartments(dpts);
              }}
              department={department}
              setDepartment={dpt => {
                setDepartment(dpt);
              }}
              teams={teams}
              setTeams={tems => {
                setTeams(tems);
              }}
              team={team}
              setTeam={tem => {
                setTeam(tem);
              }}
              executives={executives}
              setExecutives={exes => {
                setExecutives(exes);
              }}
              executive={executive}
              setExecutive={exe => {
                setExecutive(exe);
              }}
              medium={medium}
              setMedium={mdm => {
                setMedium(mdm);
              }}
              media={media}
              setMedia={media => {
                setMedia(media);
              }}
              categories={categories}
              setCategories={catgs => {
                setCategories(catgs);
              }}
              category={category}
              setCategory={cat => {
                setCategory(cat);
              }}
              subCategories={subCategories}
              setSubCategories={subcats => {
                setSubCategories(subcats);
              }}
              subCategory={subCategory}
              setSubCategory={subcat => {
                setSubCategory(subcat);
              }}
              subCategoryItems={subCategoryItems}
              setSubCategoryItems={subcatitems => {
                setSubCategoryItems(subcatitems);
              }}
              subCategoryItem={subCategoryItem}
              setSubCategoryItem={subcatitem => {
                setSubCategoryItem(subcatitem);
              }}
              priorities={priorities}
              setPriorities={prts => {
                setPriorities(prts);
              }}
              priority={priority}
              setPriority={prt => {
                setPriority(prt);
              }}
              statuses={statuses}
              setStatuses={stses => {
                setStatuses(stses);
              }}
              status={status}
              setStatus={sts => {
                setStatus(sts);
              }}
              distributorName={distributorName}
              setDistributorName={disname => {
                setDistributorName(disname);
              }}
              distributorId={distributorId}
              setDistributorId={disid => {
                setDistributorId(disid);
              }}
              Search={values =>
                SearchTickets(values)
              } />
          );
        }
      })()}

      <Dialog
        open={open}
        fullWidth
        maxWidth="md"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Box component="span" className={classes.drawerHeader}>
            <EditIcon />
            <Typography
              variant="h4"
              color="textPrimary"
              style={{ marginLeft: 10 }}
            >
              Create Ticket
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <CreateTicket
            setClick={click => (createTicket = click)}
            setOpen={open => open ? setOpen(open) : window.location.reload()}
            ticket={ticket}
            setTicket={ticket => setTicket(ticket)}
            formtype="ticketing"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              createTicket();
              //setOpen(false);
            }}
            color="primary"
            variant="contained"
            size="small"
          >
            Create
          </Button>
          <Button
            onClick={handleClose}
            color="primary"
            size="small"
            variant="outlined"
            autoFocus
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Grid container spacing={1}>
        {/**
         * This is the ticket List block
         */}
        <Grid item sm={12} md={3}>
          <Paper
            className={classes.paper}
            style={{ maxHeight: 720, overflow: 'auto' }}
          >
            {tickets.length > 0 ? (
              <Box component="div" overflow="auto">
                <h3>
                  {filter === true ? "Filtered" : showMyTickets ? "Tickets raised by me" : "Tickets assigned to me"} (
                  {
                    (filter === true ? (tickets || []) :
                      tickets
                      // .filter(tkt => tkt.ticketNumber.includes(ticketNumber))
                      // .filter(tkt => tkt.distributorId.includes(distributorId))
                      // .filter(tkt =>
                      //   tkt.distributorName
                      //     .toLowerCase()
                      //     .includes(distributorName.toLowerCase())
                      // )

                      // .filter(tkt =>
                      //   department.label === 'All'
                      //     ? '#' === '#'
                      //     : tkt.assignedDepartmentId === department.value
                      // )
                      // .filter(tkt =>
                      //   team.label === 'All'
                      //     ? '#' === '#'
                      //     : tkt.assignedTeamId === team.value
                      // )
                      // .filter(tkt =>
                      //   executive.label === 'All'
                      //     ? '#' === '#'
                      //     : tkt.assignedExecutiveId === executive.value
                      // )
                      // .filter(tkt =>
                      //   status.label === 'All'
                      //     ? tkt.status === tkt.status
                      //     : tkt.status === status.label
                      // )
                      // .filter(tkt =>
                      //   category.label === 'All'
                      //     ? tkt.category === tkt.category
                      //     : tkt.category === category.label
                      // )
                      // .filter(tkt =>
                      //   subCategory.label === 'All'
                      //     ? tkt.subCategory === tkt.subCategory
                      //     : tkt.subCategory === subCategory.label
                      // )
                      // .filter(tkt =>
                      //   subCategoryItem.label === 'All'
                      //     ? tkt.subCategoryItem === tkt.subCategoryItem
                      //     : tkt.subCategoryItem === subCategoryItem.label
                      // )
                      // /* .filter(tkt =>
                      //   subCategoryItem.label === 'All'
                      //     ? tkt.subCategoryItem ||
                      //       '' === tkt.subCategoryItem ||
                      //       ''
                      //     : tkt.subCategoryItem ||
                      //       '' === subCategoryItem.label ||
                      //       ''
                      // ) */
                      // .filter(tkt =>
                      //   media.label === 'All'
                      //     ? tkt.media === tkt.media
                      //     : tkt.media === media.label
                      // )
                      // .filter(tkt =>
                      //   ticketType.label === 'All'
                      //     ? tkt.ticketType === tkt.ticketType
                      //     : tkt.ticketType === ticketType.label
                      // )
                      // .filter(tkt =>
                      //   priority.label === 'All'
                      //     ? tkt.priority === tkt.priority
                      //     : tkt.priority === priority.label
                      // )
                    ).length

                  }
                  )
                </h3>
                <List className={classes.listRow}>
                  {tickets
                    // .filter(tkt => (tkt.ticketNumber || '').includes(ticketNumber))
                    // .filter(tkt => (tkt.distributorId || '').includes(distributorId))
                    // .filter(tkt =>
                    //   (tkt.distributorName || '')
                    //     .toLowerCase()
                    //     .includes(distributorName.toLowerCase())
                    // )
                    // .filter(tkt =>
                    //   department.label === 'All'
                    //     ? '#' === '#'
                    //     : tkt.assignedDepartmentId === department.value
                    // )
                    // .filter(tkt =>
                    //   team.label === 'All'
                    //     ? '#' === '#'
                    //     : tkt.assignedTeamId === team.value
                    // )
                    // .filter(tkt =>
                    //   executive.label === 'All'
                    //     ? '#' === '#'
                    //     : tkt.assignedExecutiveId === executive.value
                    // )

                    // .filter(tkt =>
                    //   status.label === 'All'
                    //     ? '#' === '#'
                    //     : tkt.status === status.label
                    // )
                    // .filter(tkt =>
                    //   category.label === 'All'
                    //     ? '#' === '#'
                    //     : tkt.category === category.label
                    // )
                    // .filter(tkt =>
                    //   subCategory.label === 'All'
                    //     ? '#' === '#'
                    //     : tkt.subCategory === subCategory.label
                    // )
                    // .filter(tkt =>
                    //   subCategoryItem.label === 'All'
                    //     ? '#' === '#'
                    //     : tkt.subCategoryItem === subCategoryItem.label
                    // )
                    // /*  .filter(tkt =>
                    //   subCategoryItem.label === 'All'
                    //     ? tkt.subCategoryItem || '' === tkt.subCategoryItem || ''
                    //     : tkt.subCategoryItem || '' === subCategoryItem.label || ''
                    // ) */
                    // .filter(tkt =>
                    //   media.label === 'All'
                    //     ? '#' === '#'
                    //     : tkt.media === media.label
                    // )
                    // .filter(tkt =>
                    //   ticketType.label === 'All'
                    //     ? '#' === '#'
                    //     : tkt.ticketType === ticketType.label
                    // )
                    // .filter(tkt =>
                    //   priority.label === 'All'
                    //     ? '#' === '#'
                    //     : tkt.priority === priority.label
                    // )
                    .map(ticket => (
                      <>
                        <ListItem
                          key={ticket.ticketNumber}
                          alignItems="flex-start"
                          className={
                            ticket.ticketNumber === activeTicket.ticketNumber
                              ? classes.listSelectedItemClass
                              : classes.listItemClass
                          }
                          onClick={() => viewTicket(ticket)}
                        >
                          <ListItemText>
                            <div className={classes.textBold}>
                              <ListItemIcon>
                                <Avatar
                                  className={classes.small}
                                  style={{ backgroundColor: ticket.color || purple[700] }}
                                >
                                  {ticket.status.substring(0, 1)}
                                </Avatar>

                                <span className={classes.ticketMargin}>
                                  {ticket.ticketNumber}
                                </span>
                              </ListItemIcon>
                            </div>
                            <Typography
                              variant="body2"
                              color="textPrimary"
                              style={{ textOverflow: 'ellipsis' }}
                            >
                              {ticket.ticketSubject}
                            </Typography>
                          </ListItemText>
                        </ListItem>
                        <Divider light />
                      </>
                    ))}
                </List>

              </Box>
            ) : (
                <Box component="div" overflow="auto"><h3>
                  {filter === true ? "Filtered" : "My Bucket"} (0)</h3></Box>
              )}
          </Paper>
        </Grid>

        {/**
         * This is the ticket Detail block
         */}
        <Grid item sm={12} md={6}>
          <Paper
            className={classes.paper}
            style={{ maxHeight: 720, overflow: 'auto' }}
          >
            <div className={classes.listItemClass}>
              <Box display="flex" flexDirection="row">
                <Avatar
                  alt="IV"
                  src="/static/images/products/product_1.png"
                  className={classes.large}
                />
                <Box
                  display="flex"
                  flexDirection="column"
                  className={classes.ticketMargin}
                >
                  <Typography variant="body1" className={classes.textBold}>
                    {activeTicket.ticketNumber}
                  </Typography>
                  <Typography variant="h3" color="textPrimary">
                    {activeTicket.ticketSubject}
                  </Typography>
                </Box>
                {/* <Tooltip title="Edit"> */}
                <Button onClick={handleClickOpenEdit}>
                  <EditIcon
                    style={{
                      marginTop: 25,
                      cursor: 'pointer',
                      float: 'right'
                    }}
                  />
                </Button>
                {/* dialog */}
                <Dialog
                  open={openEdit}
                  fullWidth
                  maxWidth="md"
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    <Box component="span" className={classes.drawerHeader}>
                      <EditIcon />
                      <Typography
                        variant="h4"
                        color="textPrimary"
                        style={{ marginLeft: 10 }}
                      >
                        {activeTicket.ticketNumber}
                      </Typography>
                    </Box>
                  </DialogTitle>
                  <DialogContent dividers>
                    <CreateTicket
                      setClick={click => (createTicket = click)}
                      setOpen={open => open ? setOpenEdit(open) : window.location.reload()}
                      ticket_id={activeTicket._id}
                      updateTicket={tkt => {
                        setActiveTicket(tkt);
                        viewTicket(tkt);
                      }}
                      formtype="editTicket"
                    />
                  </DialogContent>
                  <DialogActions>
                    {editAccess === -1 ||
                      (editAccess === 0 &&
                        activeTicket.assignedExecutiveId !==
                        (roleAccess || { executiveId: '#' }).executiveId) ||
                      (editAccess === 1 &&
                        activeTicket.assignedTeamId !==
                        (roleAccess || { teamId: '#' }).teamId) ||
                      (editAccess === 2 &&
                        activeTicket.assignedDepartmentId !==
                        (roleAccess || { departmentId: '#' }).departmentId) ? (
                        ''
                      ) : (
                        <Button
                          onClick={() => {
                            createTicket();
                            //setOpenEdit(false);
                          }}
                          color="primary"
                          variant="contained"
                          size="small"
                        >
                          Update
                      </Button>
                      )}
                    <Button
                      onClick={handleCloseEdit}
                      color="primary"
                      size="small"
                      variant="outlined"
                      autoFocus
                    >
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
                {/* </Tooltip> */}
              </Box>
              <Box component="div" display="flex" flexDirection="row">
                {/* <input
                  // id="SoftCopyFile"

                  onChange={e => setFile(e.target.files[0])}
                  accept="image/*"
                  className={classes.input}
                  style={{ display: 'none' }}
                  id="raised-button-file"
                  multiple
                  type="file"
                />
                <label htmlFor="raised-button-file">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    component="span"
                    className={classes.button}
                    startIcon={<AttachFileIcon />}
                    onClick={UploadFile}
                  >
                    Attach
                  </Button>
                </label> */}

                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className={classes.button}
                  startIcon={<HistoryIcon />}
                  onClick={handleTimelineOpen}
                >
                  History
                </Button>
                <Dialog
                  open={opentimeline}
                  fullWidth
                  maxWidth="md"
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {'Timeline'}
                  </DialogTitle>
                  <DialogContent dividers>
                    <Timeline align="right" setTicketHistory={ticketHistory} />
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={handleTimelineClose}
                      color="primary"
                      size="small"
                      variant="outlined"
                      autoFocus
                    >
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
              </Box>
              <div className={classes.boxDiv}>
                <Typography
                  variant="body1"
                  color="textPrimary"
                  fontWeight="fontWeightMedium"
                  className={classes.detailTitle}
                >
                  Details
                </Typography>
                <div style={{ paddingRight: 15, paddingLeft: 15 }}>
                  <Grid container spacing={0}>
                    <Grid container item xs={12} spacing={1}>
                      <Grid item xs={6}>
                        <Box
                          display="flex"
                          flexDirection="row"
                          alignItems="center"
                        >
                          <Typography
                            variant="body1"
                            style={{
                              fontWeight: '500',
                              float: 'left',
                              width: '35%'
                            }}
                          >
                            Type :
                          </Typography>
                          {isEditable ? (
                            <TextField
                              id="type"
                              select
                              value={type}
                              onChange={handleTicketTypeChange}
                              SelectProps={{
                                native: true
                              }}
                            >
                              {ticketTypes.map(option => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </TextField>
                          ) : (
                              <Box
                                display="flex"
                                flexDirection="row"
                                className={classes.valueClass}
                              >
                                {/* <OfflineBoltIcon style={{ color: purple[500] }} /> */}
                                <Typography
                                  variant="body1"
                                  className={classes.ticketMargin}
                                  component="span"
                                >
                                  {activeTicket.ticketType}
                                </Typography>
                              </Box>
                            )}
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box
                          display="flex"
                          flexDirection="row"
                          alignItems="center"
                        >
                          <Typography
                            style={{
                              fontWeight: '500',
                              float: 'left',
                              width: '35%'
                            }}
                          >
                            Priority :
                          </Typography>
                          {isEditable ? (
                            <TextField
                              id="priority"
                              select
                              value={priority}
                              onChange={handlePriorityChange}
                              SelectProps={{
                                native: true
                              }}
                            >
                              {priorities.map(option => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </TextField>
                          ) : (
                              <Box
                                display="flex"
                                flexDirection="row"
                                className={classes.valueClass}
                              >
                                <ArrowUpwardIcon style={{ color: orange[500] }} />
                                <Typography
                                  variant="body1"
                                  className={classes.ticketMargin}
                                  component="span"
                                >
                                  {activeTicket.priority}
                                </Typography>
                              </Box>
                            )}
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid container item xs={12} spacing={1}>
                      <Grid item xs={6}>
                        <Box
                          display="flex"
                          flexDirection="row"
                          alignItems="center"
                        >
                          <Typography
                            variant="body1"
                            style={{
                              fontWeight: '500',
                              float: 'left',
                              width: '35%'
                            }}
                          >
                            Category :
                          </Typography>
                          {isEditable ? (
                            <TextField
                              id="category"
                              select
                              value={category}
                              onChange={handleCategoryChange}
                              label="Label"
                              InputLabelProps={{ shrink: true }}
                              SelectProps={{
                                native: true
                              }}
                            >
                              {categories.map(option => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </TextField>
                          ) : (
                              <Box
                                display="flex"
                                flexDirection="row"
                                className={classes.valueClass}
                              >
                                <Typography
                                  variant="body1"
                                  className={classes.ticketMargin}
                                  component="span"
                                >
                                  {activeTicket.category}
                                </Typography>
                              </Box>
                            )}
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box
                          display="flex"
                          flexDirection="row"
                          alignItems="center"
                        >
                          <Typography
                            variant="body1"
                            style={{
                              fontWeight: '500',
                              float: 'left',
                              width: '35%'
                            }}
                          >
                            Status :
                          </Typography>
                          {isEditable ? (
                            <TextField
                              id="status"
                              select
                              value={status}
                              onChange={handleStatusChange}
                              SelectProps={{
                                native: true
                              }}
                            >
                              {statuses.map(option => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </TextField>
                          ) : (
                              <Box
                                display="flex"
                                flexDirection="row"
                                className={classes.valueClass}
                              >
                                <Typography
                                  component="span"
                                  variant="body1"
                                  className={classes.ticketMargin}
                                >
                                  {activeTicket.status}
                                </Typography>
                              </Box>
                            )}
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              </div>
              <div className={classes.boxDiv}>
                <Typography
                  variant="body1"
                  color="textPrimary"
                  fontWeight="fontWeightMedium"
                  className={classes.detailTitle}
                >
                  Attachments
                </Typography>
                <ul style={{ listStyle: "none" }}>
                  {files.sort((a, b) => b.createdTime - a.createdTime).map(fil => (
                    <li>
                      <a
                        href={config.APIS_URL + fil.filePath}
                        target="_blank"
                      >
                        {JSON.stringify(fil.fileName)}
                      </a>
                    </li>
                  ))}
                </ul></div>
              <div className={classes.boxDiv}>
                <Typography
                  variant="body1"
                  color="textPrimary"
                  fontWeight="fontWeightMedium"
                  className={classes.detailTitle}
                >
                  Description
                </Typography>
                {isEditable ? (
                  <TextField
                    id="outlined-textarea"
                    placeholder="Add a description..."
                    value={activeTicket.ticketDescription}
                    rows={5}
                    fullWidth
                    multiline
                    variant="outlined"
                  />
                ) : (
                    <TextField
                      id="outlined-textarea"
                      placeholder="Add a description..."
                      value={activeTicket.ticketDescription}
                      rows={5}
                      fullWidth
                      multiline
                      variant="outlined"
                      InputProps={{
                        readOnly: true
                      }}
                    />
                  )}
              </div>
              <div className={classes.boxDiv}>
                <Typography
                  variant="body1"
                  color="textPrimary"
                  fontWeight="fontWeightMedium"
                  className={classes.detailTitle}
                >
                  Comments
                </Typography>
                {isEditable ? (
                  <TextField
                    id="outlined-textarea"
                    placeholder="Add a comment..."
                    value={activeTicket.remarks}
                    rows={5}
                    fullWidth
                    multiline
                    variant="outlined"
                  />
                ) : (
                    <TextField
                      id="outlined-textarea"
                      placeholder="Add a comment..."
                      value={activeTicket.remarks || activeTicket.ticketRemarks}
                      rows={5}
                      fullWidth
                      multiline
                      variant="outlined"
                      InputProps={{
                        readOnly: true
                      }}
                    />
                  )}
              </div>
              {(() => {
                if (isEditable) {
                  return (
                    <div className={classes.boxDiv}>
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        style={{
                          float: 'right'
                        }}
                        onClick={makeEditableFalse}
                      >
                        Save
                      </Button>
                    </div>
                  );
                }
              })()}
            </div>
          </Paper>
        </Grid>

        {/**
         * This is the ticket Metadata block
         */}
        <Grid item sm={12} md={3}>
          <Paper className={classes.paper}>
            <div className={classes.metadataClass}>
              <Box
                display="flex"
                flexDirection="row"
                className={classes.belowMargin}
              >
                <Typography variant="h5" className={classes.labelClass}>
                  Distributor
                </Typography>
                <Box
                  display="flex"
                  flexDirection="row"
                  className={classes.valueClass}
                >
                  <Typography
                    variant="body1"
                    className={classes.avatarValue}
                    component="span"
                  >
                    {activeTicket.distributorName}
                  </Typography>
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                className={classes.belowMargin}
              >
                <Typography variant="h5" className={classes.labelClass}>
                  Distributor Id
                </Typography>
                <Box
                  display="flex"
                  flexDirection="row"
                  className={classes.valueClass}
                >
                  <Typography
                    variant="body1"
                    className={classes.avatarValue}
                    component="span"
                  >
                    {activeTicket.distributorId}
                  </Typography>
                </Box>
              </Box>

              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                className={classes.belowMargin}
              >
                <Typography variant="h5" className={classes.labelClass}>
                  {(medium.filter(media => media.value === activeTicket.mediaId)[0] || { value: "" }).idLabel}
                </Typography>
                <Box
                  display="flex"
                  flexDirection="row"
                  className={classes.valueClass}
                >
                  <Typography
                    variant="body1"
                    className={classes.avatarValue}
                    component="span"
                    style={{ fontSize: '12px' }}
                  >
                    {activeTicket.createdById}
                  </Typography>
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                className={classes.belowMargin}
              >
                <Typography variant="h5" className={classes.labelClass}>
                  {(medium.filter(media => media.value === activeTicket.mediaId)[0] || { value: "" }).nameLabel}
                </Typography>
                <Box
                  display="flex"
                  flexDirection="row"
                  className={classes.valueClass}
                >
                  <Typography
                    variant="body1"
                    className={classes.avatarValue}
                    component="span"
                  >
                    {activeTicket.createdByName}
                  </Typography>
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                className={classes.belowMargin}
              >
                <Typography variant="h5" className={classes.labelClass}>
                  Source Media
                </Typography>
                <Box
                  display="flex"
                  flexDirection="row"
                  className={classes.valueClass}
                >
                  <Typography
                    variant="body1"
                    className={classes.avatarValue}
                    component="span"
                  >
                    {activeTicket.media}
                  </Typography>
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                className={classes.belowMargin}
              >
                <Typography variant="h5" className={classes.labelClass}>
                  Assigned To
                </Typography>
                <Box
                  display="flex"
                  flexDirection="row"
                  className={classes.valueClass}
                >
                  <Typography
                    variant="body1"
                    className={classes.avatarValue}
                    component="span"
                  >
                    {activeTicket.executive || activeTicket.assignedExecutive}
                  </Typography>
                </Box>
              </Box>
            </div>
            <Divider light />
            <div className={classes.metadataClass}>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                className={classes.dateMargin}
              >
                <Typography variant="body1" className={classes.valueClass}>
                  Due:
                </Typography>
                <Typography
                  variant="body1"
                  className={classes.ticketMargin}
                  component="span"
                ></Typography>
              </Box>

              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                className={classes.dateMargin}
              >
                <Typography variant="body1" className={classes.valueClass}>
                  Created:
                </Typography>
                <Typography
                  variant="body1"
                  className={classes.ticketMargin}
                  component="span"
                >
                  {new Date(
                    activeTicket.createdTime || activeTicket.createdAt
                  ).toLocaleString(undefined, {
                    timeZone: 'Asia/Kolkata'
                  })}
                </Typography>
              </Box>

              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                className={classes.dateMargin}
              >
                <Typography variant="body1" className={classes.valueClass}>
                  Updated:
                </Typography>
                <Typography
                  variant="body1"
                  className={classes.ticketMargin}
                  component="span"
                >
                  {new Date(
                    activeTicket.updatedTime || activeTicket.updatedAt
                  ).toLocaleString(undefined, {
                    timeZone: 'Asia/Kolkata'
                  })}
                </Typography>
              </Box>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
