import './App.css';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

interface UserDetails {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  place: string;
}

function App() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [place, setPlace] = useState<string>("");
  const [userDetails, setUserDetails] = useState<UserDetails[]>([]);
  const [status, setStatus] = useState<string>("add");
  const [id, setId] = useState<string>("");

  const submit = (): void => {
    if (name && email && phoneNumber && place) {
      if (status === "add") {
        let details: UserDetails = {
          id: uuidv4(),
          name,
          email,
          phoneNumber,
          place,
        };
        setUserDetails([...userDetails, details]);
      } else if (status === "edit") {
        let editedDetailsUpdate = userDetails.filter((item) => item.id !== id);
        let editedDetails: UserDetails = {
          id,
          name,
          email,
          phoneNumber,
          place,
        };

        setUserDetails([...editedDetailsUpdate, editedDetails]);
      }
      setName("");
      setEmail("");
      setPhoneNumber("");
      setPlace("");
      setStatus("add");
    } else {
      alert("Please enter all values!");
    }
  };

  const deleteDetails = (id: string): void => {
    let userDetailsUpdate = userDetails.filter((item) => item.id !== id);
    setUserDetails(userDetailsUpdate);
  };

  const editDetails = (id: string): void => {
    let editDetailsUpdate = userDetails.filter((item) => item.id === id);
    setName(editDetailsUpdate[0].name);
    setEmail(editDetailsUpdate[0].email);
    setPhoneNumber(editDetailsUpdate[0].phoneNumber);
    setPlace(editDetailsUpdate[0].place);
    setId(editDetailsUpdate[0].id);
    setStatus("edit");
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              CRUD Operation
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <br></br>
      <Box
        fontStyle={{ display: "flex", justifyContent: "center" }}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: 628,
            height: 250,
          },
        }}
      >
        <Paper elevation={3} style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center" }}>
          <br />
          <div>
            <TextField
              value={name}
              label=" Name"
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              value={email}
              style={{ marginLeft: "50px" }}
              label="Email"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <TextField
              value={phoneNumber}
              label="Phone Number"
              variant="outlined"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <TextField
              value={place}
              style={{ marginLeft: "50px" }}
              label="Place"
              variant="outlined"
              onChange={(e) => setPlace(e.target.value)}
            />
          </div>
          <div>
            <Button
              variant="contained"
              onClick={() => submit()}
            >
              Submit
            </Button>
            <br />
            <br />
          </div>
        </Paper>
        <br />
      </Box>
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <table border={1}>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Place</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          {userDetails.length > 0 ? userDetails.map((eachDetail) => {
            return (
              <tr key={eachDetail.id}>
                <td>{eachDetail.name}</td>
                <td>{eachDetail.email}</td>
                <td>{eachDetail.phoneNumber}</td>
                <td>{eachDetail.place}</td>
                <td><button onClick={() => editDetails(eachDetail.id)}>Edit</button></td>
                <td><button onClick={() => deleteDetails(eachDetail.id)}>Delete</button></td>
              </tr>
            );
          }) : <span>No data are present</span>}
        </table>
      </div>
    </div>
  );
}

export default App;

