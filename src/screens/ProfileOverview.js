//@flow

import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

import { WHITE } from '../constants/colors'

import Avatar from '../components/Avatar'
import DeleteButton from '../components/DeleteButton'
import ImagePicker from 'react-native-image-picker'
import FormInput from '../components/FormInput'
import FormLabel from '../components/FormLabel'
import SubmitButton from '../components/SubmitButton'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'

import * as authActions from '../scopes/auth/actions'
import { connect } from 'react-redux'

import type { User } from '../scopes/auth/types'

const BUTTON_SIZE = 60

type Props = {
  deleteUserAvatarAsync: typeof authActions.deleteUserAvatarAsync,
  getUserAsync: typeof authActions.getUserAsync,
  updateUserAsync: typeof authActions.updateUserAsync,
  uploadUserAvatar: typeof authActions.uploadUserAvatar,
  user: User,
}

type State = {
  idValid: boolean,
  inProgress: boolean,
  user: Object,
}

class ProfileOverview extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <Text
          style={{ margin: 10 }}
          onPress={() => navigation.dispatch(authActions.resetAuth())}
        >
          Logout
        </Text>
      ),
      title: 'My Profile',
    }
  }
  _usernameInput: TextInput
  _emailInput: TextInput
  _firstNameInput: TextInput
  _lastNameInput: TextInput
  props: Props
  state: State = {
    idValid: false,
    inProgress: false,
    user: {
      username: null,
      email: null,
      name: null,
    },
  }
  componentDidMount() {
    this.props.getUserAsync()
  }

  _onChangeText = (text, formInputId) => {
    switch (formInputId) {
      case 'email':
        this.setState({
          user: {
            ...this.state.user,
            email: text,
          },
        })
        break
      case 'firstName':
        this.setState({
          user: {
            ...this.state.user,
            firstName: text,
          },
        })
        break
      case 'lastName':
        this.setState({
          user: {
            ...this.state.user,
            lastName: text,
          },
        })
        break
    }
  }
  _onSubmit = async () => {
    const payload = {
      username: this._usernameInput.props.value ||
        this._usernameInput.props.defaultValue,
      email: this._emailInput.props.value ||
        this._emailInput.props.defaultValue,
      name: {
        first: this._firstNameInput.props.value ||
          this._firstNameInput.props.defaultValue,
        last: this._lastNameInput.props.value ||
          this._lastNameInput.props.defaultValue,
      },
    }

    this.setState({ inProgress: true })
    try {
      await this.props.updateUserAsync(payload)
      this.setState({ inProgress: false })

      if (
        this.state.user.email !== null &&
        this.state.user.email !== this.props.user.email
      ) {
        alert(
          'Profile updated successfully. An email confirmation has been sent to your new email address.'
        )
      } else {
        alert('Profile updated successfully.')
      }
    } catch (err) {
      alert('Error updating profile. Please try again.')
      this.setState({ inProgress: false })
    }
  }
  _inputRefs = () => {
    return [this._emailInput, this._firstNameInput, this._lastNameInput]
  }
  _showImagePicker = async () => {
    // Options for react-native-image-picker
    const options = {
      title: null, // specify null or empty string to remove the title
      cancelButtonTitle: 'Cancel',
      takePhotoButtonTitle: 'Take Photo...', // specify null or empty string to remove this button
      chooseFromLibraryButtonTitle: 'Choose from Library...', // specify null or empty string to remove this button
      cameraType: 'front', // 'front' or 'back'
      mediaType: 'photo', // 'photo' or 'video'
      videoQuality: 'high', // 'low', 'medium', or 'high'
      durationLimit: 10, // video recording max time in seconds
      maxWidth: 250, // photos only
      maxHeight: 250, // photos only
      aspectX: 2, // android only - aspectX:aspectY, the cropping image's ratio of width to height
      aspectY: 1, // android only - aspectX:aspectY, the cropping image's ratio of width to height
      quality: 0.5, // 0 to 1, photos only
      angle: 0, // android only, photos only
      allowsEditing: true, // Built in functionality to resize/reposition the image after selection
      noData: true, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
      storageOptions: {
        // if this key is provided, the image will get saved in the documents directory on ios, and the pictures directory on android (rather than a temporary directory)
        skipBackup: true, // ios only - image will NOT be backed up to icloud
        path: 'images', // ios only - will save image at /Documents/images rather than the root
      },
    }

    ImagePicker.showImagePicker(options, async response => {
      if (response.error) {
        alert(response.error)
      } else if (response.didCancel) {
        return
      } else {
        try {
          await this.props.uploadUserAvatar(response.uri)
          alert('Profile photo updated.')
        } catch (err) {
          alert('Error uploading photo. Please try again.')
        }
      }
    })
  }
  render() {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        getTextInputRefs={this._inputRefs}
      >
        <View style={styles.avatarContainer}>
          <Avatar onPress={this._showImagePicker} size={100} />
          <View style={styles.avatarOptions}>
            <DeleteButton
              small
              title="Delete"
              confirm
              onConfirm={this.props.deleteUserAvatarAsync}
              onDeny={() => {}}
            />
          </View>
        </View>
        <FormLabel primaryText="USERNAME" />
        <FormInput
          ref={ref => (this._usernameInput = ref)}
          id="username"
          editable={false}
          value={this.props.user && this.props.user.username}
        />

        <FormLabel primaryText="E-MAIL ADDRESS" />
        <FormInput
          ref={ref => (this._emailInput = ref)}
          id="email"
          validationType="email"
          onChangeText={this._onChangeText}
          defaultValue={this.props.user && this.props.user.email}
          value={this.state.user && this.state.user.email}
          returnKeyType="next"
          onSubmitEditing={() => this._firstNameInput.focus()}
        />

        <FormLabel primaryText="FIRST NAME" />
        <FormInput
          ref={ref => (this._firstNameInput = ref)}
          id="firstName"
          onChangeText={this._onChangeText}
          defaultValue={
            this.props.user &&
              this.props.user.name &&
              this.props.user.name.first
          }
          value={this.state.user && this.state.user.firstName}
          returnKeyType="next"
          onSubmitEditing={() => this._lastNameInput.focus()}
        />

        <FormLabel primaryText="LAST NAME" />
        <FormInput
          ref={ref => (this._lastNameInput = ref)}
          id="lastName"
          onChangeText={this._onChangeText}
          defaultValue={
            this.props.user && this.props.user.name && this.props.user.name.last
          }
          value={this.state.user && this.state.user.lastName}
          returnKeyType="done"
          onSubmitEditing={this._onSubmit}
        />
        <View style={styles.buttonRow}>
          <SubmitButton
            active
            inProgress={this.state.inProgress}
            onPress={this._onSubmit}
            style={styles.submitButton}
            title="Save Changes"
          />
        </View>
      </KeyboardAwareScrollView>
    )
  }
}

export default connect(
  state => ({
    user: state.auth.user,
  }),
  authActions
)(ProfileOverview)

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    padding: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  avatarOptions: {
    marginVertical: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 20,
  },
  submitButton: {
    width: BUTTON_SIZE * 3.5,
    height: BUTTON_SIZE,
    marginBottom: 15,
  },
})
