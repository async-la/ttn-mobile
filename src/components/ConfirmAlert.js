//@flow
import { Alert } from 'react-native'

type Props = {
  title?: string,
  message?: string,
  confirmButtonTitle?: string,
  denyButtonTitle?: string,
  onConfirm?: () => any,
  onDeny?: () => any,
  style?: string,
}

const ConfirmAlert = ({
  title = 'Alert',
  message = 'Are you sure?',
  confirmButtonTitle = 'OK',
  denyButtonTitle = 'Cancel',
  style = 'default',
  onConfirm = () => {},
  onDeny = () => {},
}: Props) => {
  Alert.alert(title, message, [
    { text: denyButtonTitle, onPress: onDeny, style: 'cancel' },
    { text: confirmButtonTitle, onPress: onConfirm, style },
  ])
  return null
}

export default ConfirmAlert
