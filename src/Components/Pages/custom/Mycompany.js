import { useState } from "react";
import Side from "../../Layout/Side";
import { Twitter } from "@mui/icons-material";
import { Instagram } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { IconButton, Grid } from "@mui/material";
const Mycompany = () => {
  const [employee, setEmployee] = useState([
    {
      name: "Jonh Doe",
      role: "Delivery",
      img: "https://i0.wp.com/www.diegocoquillat.com/wp-content/uploads/2019/05/14-cosas-que-nunca-te-han-dicho-sobre-el-delivery.jpg?fit=700%2C336&ssl=1&resize=1280%2C720",
    },
    {
      name: "Julia Doe",
      role: "Vendor",
      img: "https://scontent-mia3-2.xx.fbcdn.net/v/t1.18169-9/1487431_778207162261881_3365932417199548497_n.jpg?stp=cp0_dst-jpg_e15_fr_q65&_nc_cat=109&ccb=1-7&_nc_sid=85a577&efg=eyJpIjoidCJ9&_nc_ohc=4d8yly6FxXEAX--wMin&_nc_ht=scontent-mia3-2.xx&oh=00_AT-ccDSO-54YHt5rAaN0qjXSHRf5VIzXc7V04Jvy97XuvQ&oe=62C25643",
    },
    {
      name: "Pedro Perez",
      role: "CEO",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbpv7KEev0tRwk3RSNXme6C_rbEdk8lwSXSA&usqp=CAU",
    },
    {
      name: "Paula Lee",
      role: "Founder",
      img: "https://www.europeanceo.com/wp-content/uploads/2017/08/CEO-magic-touch.jpg",
    },
  ]);
  // evaluar si un usuario de twitter existe
  const getUserTwitter = async () => {
    const url = "https://api.twitter.com/2/users/by/username/CuentaMister";
    const api = await axios.get(url);
    console.log(api);
  };
  return (
    <>
      <Side>
        <h3>Acerca de la empresa</h3>
        <div>
          <p>mision:</p>
          <p>vision:</p>
          <p>valores:</p>
          <p>Empleados:</p>
          <Grid container direction={"row"} gap={2}>
            {employee.map((employee) => (
              <Card
                key={employee.name}
                raised={true}
                sx={{
                  display: "flex",
                  border: "1px solid #e0e0e0",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography component="div" variant="h5">
                      {employee.name}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      {employee.role}
                    </Typography>
                  </CardContent>
                  <Box
                    sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                  >
                    <IconButton>
                      <Twitter />
                    </IconButton>
                    <IconButton>
                      <Instagram />
                    </IconButton>
                  </Box>
                </Box>
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={employee.img}
                  alt="Live from space album cover"
                />
              </Card>
            ))}
          </Grid>
        </div>
      </Side>
    </>
  );
};

export default Mycompany;
