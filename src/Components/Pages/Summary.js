import { Card, Grid, Stack, Typography } from '@mui/material';
import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSummaryAction } from '../../Actions/ActionsRequests'
import Side from '../Layout/Side';
import Loading from '../Utils/Loading';
const Summary = () => {
    const dispatch = useDispatch()
    const loadSummary = () => dispatch(getSummaryAction())
  useEffect(async () => {
    loadSummary()
  }, [dispatch])
  const { summary } = useSelector((state) => state.request)
    return ( 
        <Side>
          {summary ? (
            <>
             <h3>Summary</h3>
            <Stack container direction='column' spacing={3}>
            <Card sx={{padding : '1rem'}}>
              <Typography>Ingresos de los últimos 30 días</Typography>
              {summary.earnings} 
             </Card>
             <Card sx={{padding : '1rem'}}>
              <Typography>Numero Total de Ventas</Typography>
              {summary.earnings} 
             </Card>
            </Stack>
            </>
          ) :
            (<Loading/>)
           }
        </Side>
     );
}
 
export default Summary;