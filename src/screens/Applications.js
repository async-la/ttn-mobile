import React, { Component } from 'react';
import {
  AppRegistry,
  AsyncStorage,
  ListView,
  Linking,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import queryString from 'query-string'
import base64 from 'base-64'

export default class TTNConsole extends Component {
  state = {
    dataSource: null,
  }

  async componentDidMount() {
    // await this.getData()
    console.log('Mounted')
    Linking.openURL('https://account.thethingsnetwork.org/users/authorize?client_id=async-llc&redirect_uri=ttn://oauth&response_type=code')
    Linking.addEventListener('url', this._handleOpenURL)
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this._handleOpenURL)
  }

  _handleOpenURL = async (event) => {
    console.log('event', event)
    let params = event.url.split('?')[1]
    let query = queryString.parse(params)
    console.log('query', query.code)

    const result = await fetch('https://account.thethingsnetwork.org/users/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${base64.encode('async-llc:1f1f78bf32611b4f22a12e2bc040c2afbd161dffa683a0a3d049292425cd99d2')}`,
        'Content-Type': 'application/json'

      },
      body: JSON.stringify({
        grant_type: "authorization_code",
        code: query.code,
        redirect_uri: "ttn://oauth"
      })
    })

    const json = await result.json()
    await AsyncStorage.setItem('oauth', JSON.stringify(json))

    const oauthStorage = await AsyncStorage.getItem('oauth')
    const oauthToken = JSON.parse(oauthStorage)
    const response = await fetch(`https://console.thethingsnetwork.org/api/applications/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${oauthToken.access_token}`,
        'Content-Type': 'application/json'
      },
    })
    const apps = await response.json()
    console.log('RESULT!!!', apps)
  }

  getData = async () => {
    const applications = await this.getApplications()
    console.log('Apps:', applications)
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({ dataSource: ds.cloneWithRows(applications) })
  }

  async getApplications() {
    const response = await fetch('https://console.thethingsnetwork.org/api/applications/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI1ODY2OTc2OTdiMzQ0YTAwMzIwOTc5MWUiLCJpc3MiOiJ0dG4tYWNjb3VudC12MiIsImlhdCI6MTQ4OTIzOTcyNCwidHlwZSI6InVzZXIiLCJjbGllbnQiOiJ0dG4tY29uc29sZSIsInNjb3BlIjpbImFwcHMiLCJnYXRld2F5cyIsInByb2ZpbGUiXSwiaW50ZXJjaGFuZ2VhYmxlIjp0cnVlLCJ1c2VybmFtZSI6ImNocmlzdG9waGVyZHJvIiwiZW1haWwiOiJjYXNoZWdoaWFuQGdtYWlsLmNvbSIsImNyZWF0ZWQiOiIyMDE2LTEyLTMwVDE3OjIwOjQxLjc3MFoiLCJuYW1lIjp7ImZpcnN0IjoiQ2hyaXN0b3BoZXIiLCJsYXN0IjoiRHJvIn0sInZhbGlkIjp0cnVlLCJfaWQiOiI1ODY2OTc2OTdiMzQ0YTAwMzIwOTc5MWUiLCJleHAiOjE0ODkzMDMzMjR9.n3Zc1V_SO8YKyVg884rOL34gmrQ-L2wSFFcGM0Ihpozw0b_Y-p9aVgzO3dBVxffTzGcvNFSBLIH8XSpI7PlYmeP432toCb3VWL3MwlsM2ai7KsjQNA_OTq2AaMUuD-B1nFe8vBQg7q3ZHSM6NK2phFH9l3vhUAXTUuE6DLozL5A8I0PIv0pUaygaffik2pxLhxsSrjN-yKwggEhr8QZQ_foNVXgjPbotbso3Y3qxJpZRrO4zICe-WwDZ_QYTlOGvW8YjhgAIejeQw2o0zBuDweRkYaUd8lIyANtQjBxk9P-zxGmvFJDPzbDzksHL-zIBxyEIHZBNTHlAp317pGfaZy0yPs8INE6U3XYdYydZzvY8UNnLpx3N47LTenuF1KoEvEhth8oEksXeMYklMzGq53IU6gm3_pPil6-ovJPuiTRQYlvL1afuLkhRu7GAIdw244XVcfKT6MsQcJ8lpSSTNAIGFf7DvorMDegLYiBDDR-xj3pJuXbjEN8SGLc-cdYEG4c0fcFv4j-B8Oz3Qyzl6-3FmMsK9sYAsY4M15tN5vk-Y8ez1NUTWBplkpzpOqXyW9HbM5h63S-6dpHKRBqWmQglDvxtB2YcAwnaW4uIt9G9dej1HD3XEpH0jyilT1x_vGYyLXhDyrPHJLOFGj_uY7jJUEGr_xUYqLCw2Y0ka0U`,
        'Content-Type': 'application/json'
      },
    })
    const json = await response.json()
    return json
  }

  _renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => this._onPress(item)}>
        <Text>{item.title}}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
      <Text>Test</Text>
      {this.state.dataSource && <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <Text>{rowData.name}</Text>}
      />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
