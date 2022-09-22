import * as React from 'react';
import { Button, Toolbar } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SignUp from './SignUp';
import LogoutIcon from '@mui/icons-material/Logout';
import Studentadd from './Studentadd';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import useState from 'react';
import { NavLink } from "react-router-dom";
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import ModeEditIcon from '@mui/icons-material/ModeEdit';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'White',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const btn = {
  m: '30%'
}



//Fun.
function Grids() {

  const rows = [ ];

const columns = [
  
  {
    field: "firstName",
    headerName: "First Name",
    width: 200
  },
  {
    field: "lastName",
    headerName: "Last Name",
    width: 200
  },
  {
    field: "email",
    headerName: "Email Address",
    width: 200
  },

  {
    field: "score",
    headerName: "Score",
    width: 200
  },
  {
    field: "Edit",
    renderCell: (params) => {
      return (
        <div> 
        <ModeEditIcon onClick={()=>editdata(params)}/>
        </div>
      )
    }
  },
  {
    field: "delete",
    renderCell: (params) => {
       return(
        <div onClick={()=>{dataDelete(params)}}> 
        <RestoreFromTrashIcon/>
        </div>
      )
    }
  }
];


  const [opened, setOpened] = React.useState(false);
  const [studentData, setStudentData] = React.useState([]);
  const [dataedit , setDataedit] = React.useState(false);
  const handleOpened = () => {setOpened(true)
                               setDataedit({})}
  const HandleCloseed = () => setOpened(false);

  const dataDelete = async(params)=>{
  const id=params.row._id;
  await axios.delete('http://localhost:8000/datastudent/'+id)
}


const editdata = (params)=>{
  const data=params.row
  setDataedit(data);
  setOpened(!opened)
}

  const fetchGridData = () => {
    axios.get("http://localhost:8000/datastudent")
      .then((params) => {
        setStudentData(params.data);
      })
  }

  React.useEffect(() => {
    fetchGridData();
  },[])

  console.log("student data => ", studentData);
  return (
    <>
      <Box sx={{ minWidth: 100 }}>
        <Toolbar>
          <Typography variant="h6" color="inherit" component="div" flexGrow={1} ><Button variant="contained" color="success" onClick={handleOpened}>
            Add
          </Button></Typography>

          <Button variant="contained" color="success" component={NavLink} to="/">
            Logout<LogoutIcon />
          </Button>

        </Toolbar>
        <Modal
          open={opened}
          onClose={HandleCloseed}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
        >
          <Box sx={style}>

            <div sx={btn} onClick={HandleCloseed}><CancelIcon /></div>
            <Studentadd onClose={HandleCloseed} currentdata={dataedit} studata={setStudentData}/>

          </Box>
        </Modal>
      </Box>
      <div style={{ height: '100%', width: '100%' }}>
        <div style={{ height: 500, width: '100%' }}>
          <DataGrid DataGrid rows={studentData} columns={columns} getRowId = {(row) => row._id}/>
        </div>
      </div>
    </>
  );
}
export default Grids;
