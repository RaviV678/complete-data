import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button} from '@mui/material';
import SignUp from './SignUp';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function NavBar() {

   

    const [opens, setOpens] = React.useState(false);
    const handleOpens = () => setOpens(true);
    const HandleClose = () => setOpens(false);

  return (
    <>
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static" >
        <Toolbar>
       
          <Typography variant="h6" color="inherit" component="div" flexGrow={1} >SPRAXA</Typography>

         
        <Button variant="contained" color="success" onClick={handleOpens}>
         SignUp
        </Button>
        <Modal  
        open={opens}
        onClose={HandleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
       >
       <Box sx={style}>
       <Typography id="modal-modal-title" variant="h6" component="h2">
       <SignUp onClose={HandleClose}/>
       </Typography>
       </Box>
       </Modal>
        </Toolbar>
      </AppBar>
    </Box>
    </>
  );
}