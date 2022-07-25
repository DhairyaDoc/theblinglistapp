import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const LoggedInAlert = (props) => {
    let alertMsg = props.alertMsg;

  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="success">{alertMsg}</Alert>
    </Stack>
  );
}
export default LoggedInAlert;