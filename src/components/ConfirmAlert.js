//@flow
import { Alert } from 'react-native'

type Props = {
  title: string,
  message: string,
  confirmButtonTitle: string,
  denyButtonTitle: string,
  onConfirm: () => void,
  onDeny: () => void,
}

const ConfirmAlert = ({
  title = 'Alert',
  message = 'Are you sure?',
  confirmButtonTitle = 'OK',
  denyButtonTitle = 'Cancel',
  onConfirm = () => any,
  onDeny = () => any,
}: Props) => {
  Alert.alert(title, message, [
    { text: denyButtonTitle, onPress: onDeny },
    { text: confirmButtonTitle, onPress: onConfirm },
  ])
  return null
}

export default ConfirmAlert
