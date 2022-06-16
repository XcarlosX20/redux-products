import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getInfoCompanyAction,
  setInfoCompanyAction,
} from "../../../Actions/ActionsCompany";
import {
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import Side from "../../Layout/Side";
import Loading from "../../Utils/Loading";
import { axiosClient } from "../../../config/axios";
//import moment from "moment";
const WorkSchedules = () => {
  //const hrformat = "HH:mm";
  let dispatch = useDispatch();
  const setInfoCompany = (data) => dispatch(setInfoCompanyAction(data));
  const infoCompany = useSelector((state) => state.company);
  //console.log(infoCompanydos);
  const [newWorkSchedule, setNewWorkSchedule] = useState({
    daysSelected: [],
    workTime: { startTime: "", endTime: "" },
  });
  useEffect(() => {
    const loadInfoCompany = async () => await dispatch(getInfoCompanyAction());
    loadInfoCompany();
  }, [dispatch]);
  useEffect(() => {
    if (infoCompany) {
      setNewWorkSchedule({
        daysSelected: infoCompany.workdays,
        workTime: {
          startTime: infoCompany.workTime[0],
          endTime: infoCompany.workTime[1],
        },
      });
    }
  }, [infoCompany]);

  const handleWorkschedules = ({ e, weekday }) => {
    const alreadySelected = newWorkSchedule.daysSelected.includes(weekday);
    if (alreadySelected) {
      const filtered = newWorkSchedule.daysSelected.filter(
        (item) => item !== weekday
      );
      setNewWorkSchedule({ ...newWorkSchedule, daysSelected: filtered });
    } else {
      setNewWorkSchedule({
        ...newWorkSchedule,
        daysSelected: [...newWorkSchedule.daysSelected, weekday],
      });
    }
    //console.log(moment(value, hrformat).format("hh:mm a"));
    if (e.target.type === "time") {
      const { name, value } = e.target;
      setNewWorkSchedule({
        ...newWorkSchedule,
        workTime: { ...newWorkSchedule.workTime, [name]: value },
      });
    }
  };
  const checkIfChange = () => {
    const { daysSelected, workTime } = newWorkSchedule;
    let arr1 = daysSelected.sort();
    let arr2 = infoCompany.workdays.sort();
    let different = false;
    arr1.forEach((item, index) => {
      if (arr2[index] !== item) {
        different = true;
      }
    });
    if (
      arr1.length !== arr2.length ||
      workTime.startTime !== infoCompany.workTime[0] ||
      workTime.endTime !== infoCompany.workTime[1]
    ) {
      different = true;
    }
    return !different;
  };
  const submitWorkSchedules = () => {
    const data = {
      ...infoCompany,
      workdays: newWorkSchedule.daysSelected,
      workTime: [
        newWorkSchedule.workTime.startTime,
        newWorkSchedule.workTime.endTime,
      ],
    };
    setInfoCompany(data);
  };
  const { workTime, daysSelected } = newWorkSchedule;
  if (
    (!newWorkSchedule.workTime.startTime &&
      !newWorkSchedule.workTime.endTime) ||
    !infoCompany
  )
    return (
      <Side>
        {infoCompany.loading && <Loading />}
        {infoCompany.error && (
          <Alert severity="error">
            There was an error loading your company information
          </Alert>
        )}
      </Side>
    );
  //console.log(moment("2022-06-12T21:00:00-04:00").format("hh:mm a"));
  return (
    <Side>
      <h3>Work Schedules</h3>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {[
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ].map((weekday) => {
          const labelId = `checkbox-list-label-${weekday}`;
          return (
            <ListItem key={weekday} disablePadding>
              <ListItemButton
                role={undefined}
                onClick={(e) => handleWorkschedules({ e, weekday })}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={daysSelected && daysSelected.includes(weekday)}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={weekday} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Grid container direction={"row"} gap={2}>
        <TextField
          id="time"
          label="opening time"
          type="time"
          defaultValue={workTime.startTime}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
          sx={{ width: 150 }}
          name="startTime"
          onChange={(e) => handleWorkschedules({ e })}
        />
        <TextField
          id="time"
          label="departure time"
          type="time"
          name="endTime"
          defaultValue={workTime.endTime}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
          sx={{ width: 150 }}
          onChange={(e) => handleWorkschedules({ e })}
        />
        <Button
          variant={"contained"}
          onClick={submitWorkSchedules}
          disabled={checkIfChange()}
        >
          Save changes
        </Button>
      </Grid>
    </Side>
  );
};

export default WorkSchedules;
