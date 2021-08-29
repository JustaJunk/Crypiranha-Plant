import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Container, Box, Grid, Typography, Paper, Button, Dialog, DialogTitle} from '@material-ui/core'
import Collectible from './Collectible';
import PropTypes from 'prop-types';
import Recruit from './Recruit';
import AddIcon from '@material-ui/icons/Add';
import clsx from 'clsx';
import PairMap from '../assets/map/index.js'

// const defaultProps = {
//   bgcolor: 'background.paper',
//   m: 1,
//   border: 1,
//   style: { width: '5rem', height: '5rem' },
// };
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 10,
    maxHeight: 580,
    overflow: 'auto',
    maxWidth: 1040
  },
  search: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  paper: {
    marginTop: '20px',
    padding: '32px',
  },
  green: {
    background: '#1CBA1C',
    borderRadius: 10,
    color: "#FFFFFF",
    padding: 10,
    fontWeight: 'bold',
    border: "none"
  },
  red: {
    background: '#FF1F5E',
    borderRadius: 10,
    color: "#FFFFFF",
    padding: 10,
    fontWeight: 'bold',
    border: "none"
  },
  gif: {
    width: '70%',
    height: '70%',
    paddingBottom: 100
  }
}));

export default function CollectibleList(props) {
  const { checked, list, onArm, onTrain, onBoost, onHeal, onSell, onRecruit } = props
  const [data, setData] = useState([])
  const [open, setOpen] = useState(false)

  const classes = useStyles();
  useEffect(() => {
    if (list) {
      let temp = []
      for (const key in list) {
        temp.push({
          _id: key,
          address: PairMap[list[key][0]],
          isArmed: list[key][1],
          price: list[key][2],
          power: list[key][3],
          tokenURI: list[key][4]
        })
      }
      setData(temp);
    }
  }, [list])
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false);
  };
  return (

    <div>
      <Container maxWidth="lg">
        <Box display="flex" flexDirection="row" justifyContent="space-between" maxWidth={1000} >
          <Box >
            <Typography variant='h6' style={{ fontWeight: 'bold' }}> Collectibles</Typography>
          </Box>
          <Box>
            <Button className={clsx(classes.green, {
              [classes.red]: checked
            })} variant='outlined'
              endIcon={<AddIcon />}
              onClick={handleClickOpen}>
              Recruit Minion
            </Button>
            <Dialog open={open} style={{ textAlign: 'center' }} onClose={handleClose}>
              <DialogTitle id="form-dialog-title">Recruit Minion</DialogTitle>
              <Recruit onRecruit={onRecruit} onClose={handleClose} />
            </Dialog>
          </Box>
        </Box>
        <Grid container spacing={5} className={classes.root} alignItems="center">
          {(data.length) ?
            data.map((item, i) => (
              <Grid item lg={6} key={i} >
                <Collectible checked={checked}
                  _id={item._id}
                  address={item.address}
                  isArmed={item.isArmed}
                  price={item.price}
                  power={item.power}
                  tokenURI={item.tokenURI}
                  onArm={onArm}
                  onTrain={onTrain}
                  onBoost={onBoost}
                  onHeal={onHeal}
                  onSell={onSell}
                />
              </Grid>)) :
            <Grid item lg={12}>
              <Paper className={classes.paper} style={{ minWidth: 800,borderRadius:20}}>
                <Typography >
                  You don't have any collectible yet. Recruit a minoin to have your first one!
                </Typography>
              </Paper>
            </Grid>
          }
        </Grid>

      </Container>
    </div>
  )
}


CollectibleList.propTypes = {
  list: PropTypes.object.isRequired,
  tokenURI:PropTypes.array.isRequired,
  onArm: PropTypes.func.isRequired,
  onTrain: PropTypes.func.isRequired,
  onBoost: PropTypes.func.isRequired,
  onHeal: PropTypes.func.isRequired,
  onSell: PropTypes.func.isRequired,
  onRecruit: PropTypes.func.isRequired
}