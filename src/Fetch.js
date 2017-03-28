/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'

export default class TTNConsole extends Component {
  getData = async () => {
    const applications = await this.getApplications()
    const gateways = await this.getGateways()
    console.log('Apps:', applications)
    console.log('Gateways:', gateways)

    const singleApp = await this.getApplication(applications[0].id)
    const singleAppDevices = await this.getApplicationDevices(
      applications[0].id
    )

    console.log('Single App:', singleApp)
    console.log('Single App Devices:', singleAppDevices)
  };
  async getApplications() {
    const response = await fetch(
      'https://console.thethingsnetwork.org/api/applications/',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI1ODY2OTc2OTdiMzQ0YTAwMzIwOTc5MWUiLCJpc3MiOiJ0dG4tYWNjb3VudC12MiIsImlhdCI6MTQ4Njg2NjE0NCwidHlwZSI6InVzZXIiLCJjbGllbnQiOiJ0dG4tY29uc29sZSIsInNjb3BlIjpbImFwcHMiLCJnYXRld2F5cyIsInByb2ZpbGUiXSwiaW50ZXJjaGFuZ2VhYmxlIjp0cnVlLCJ1c2VybmFtZSI6ImNocmlzdG9waGVyZHJvIiwiZW1haWwiOiJjYXNoZWdoaWFuQGdtYWlsLmNvbSIsImNyZWF0ZWQiOiIyMDE2LTEyLTMwVDE3OjIwOjQxLjc3MFoiLCJuYW1lIjp7ImZpcnN0IjoiQ2hyaXN0b3BoZXIiLCJsYXN0IjoiRHJvIn0sInZhbGlkIjp0cnVlLCJfaWQiOiI1ODY2OTc2OTdiMzQ0YTAwMzIwOTc5MWUiLCJleHAiOjE0ODY5Mjk3NDR9.GAW_vIiXsAyRlk5v67t92u69LnNUzATNKUNjI-HNLxe_pufQaJgmhokqAC1ObjWo56RVw8p8OynWmlNCoCVzf2-Gv3XdO1LUuQS-nIpWDWZxFiuqVncY4jX5eByCvaWLAwtSAwqrvy9RGylP-aTNyyU7sGnhYKY81v75L6wEgweQk-kAOWtCE4MeAAMHRYrSZ__hbAENY8bODFDN2hQ34R8F5W7-XbGgNZKiLqMl2dhDKf3I1OPA5FJssJ6nPGGjTfMjng9pKtgul4uGbE44QwBVws91ooa6wB8b-oZEN670dyAWNBQ-wWxTtfUmNvVqQni-d4eZMOW2F1rJJAxkX3SJFjIqTOlAevbrxD2fiDbX1lbp0q3P3Cwq6MAiymbpeeOG6nx6a2bPgsu41wPRzuxZbxKdU_XGhkDhMjynCu2TPDj2Q4uysfwH4fnQCiQRY6ksEXpWujMPPTfwq_Swgtj1wcmp22csajQR5B26drr5JSgHnHJBw0QWmdhC1C13rR_NdHJ3FidnitIYCVUUoQP7YQsxnN5hDJYU02FHcq6etjugUnSRzuIuHHOuKOta373d0MQ2rcZjTtxSnrWwgGVptUImi0lvAyKi2YZ68_ntPPa4W8NHJJQVR3muDU8WVWXTCm8No15uCfPNSBam0Qwul8uxszbLFJ-qp8A7U0c`,
          'Content-Type': 'application/json',
        },
      }
    )
    const json = await response.json()
    return json
  }

  async getApplication(applicationId) {
    const response = await fetch(
      `https://console.thethingsnetwork.org/api/applications/${applicationId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI1ODY2OTc2OTdiMzQ0YTAwMzIwOTc5MWUiLCJpc3MiOiJ0dG4tYWNjb3VudC12MiIsImlhdCI6MTQ4OTIzNDE4NSwidHlwZSI6InVzZXIiLCJjbGllbnQiOiJ0dG4tY29uc29sZSIsInNjb3BlIjpbImFwcHMiLCJnYXRld2F5cyIsInByb2ZpbGUiXSwiaW50ZXJjaGFuZ2VhYmxlIjp0cnVlLCJ1c2VybmFtZSI6ImNocmlzdG9waGVyZHJvIiwiZW1haWwiOiJjYXNoZWdoaWFuQGdtYWlsLmNvbSIsImNyZWF0ZWQiOiIyMDE2LTEyLTMwVDE3OjIwOjQxLjc3MFoiLCJuYW1lIjp7ImZpcnN0IjoiQ2hyaXN0b3BoZXIiLCJsYXN0IjoiRHJvIn0sInZhbGlkIjp0cnVlLCJfaWQiOiI1ODY2OTc2OTdiMzQ0YTAwMzIwOTc5MWUiLCJleHAiOjE0ODkyOTc3ODV9.W3CWFpASRoxqe273bC__etes4f62U38f4stXq5ue3DLI59S9GsfpyEw6ggPx2MVj5awXiUzNgKiKA8ZiFyuenEavyZoJqTFrlaxDI2SkP_HOTAY1__-SMDKv1AS965sOyBbHQ049fgkBpjTdYdQ1gxoFjFOpuPU6OTi-lqBG7kWOyYv3-U3f7cmNhKVhEgC6rFqnsYG_oHR0D4Sak7JTDZulzZhxsmzggnOWEV_VBPOI3MT9QH_PrFs2dqUF3qRURQFnshhzXUnY2372C-kElVlyymxRDMEev8IgvSnOBGKgF8t7XR7nSJLuGfVsQ1HEDIlBkoOz05MrHeZ2thjKhYD27hdJsxca0d_izs56uzQpqieq_alRv94fe0M5OLu0I1M7LALkYKfPsUd8ECvkdbTsoqjqFeoNdFZ5eUDHSu32bUYMLB2rEoJGBjxrbD_B3qmbkweGlo8FEbVZqvLQ5tYQr_ieApoCbF9eeC5jQXuWyO8wqcbx_tF3BdhHdktqhp6Iz22amr_2V06y6teYuJTeebGnWcco9bWv5q3OZkswhy87HuSULw82ifR1YtrW_wQw3c-UOgVmJnKLO-Cx0wMPSlEx5AGlpj7aRZODyTfjgme1jgo900jXYF0j8t0iD-LuPZp3d6Zv-PoQKvesC5hW2MxuNyZBCTqUDRjsOMU`,
          'Content-Type': 'application/json',
        },
      }
    )
    const json = await response.json()
    return json
  }

  async getGateways() {
    const response = await fetch(
      'https://console.thethingsnetwork.org/api/gateways/',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI1ODY2OTc2OTdiMzQ0YTAwMzIwOTc5MWUiLCJpc3MiOiJ0dG4tYWNjb3VudC12MiIsImlhdCI6MTQ4OTIzNDE4NSwidHlwZSI6InVzZXIiLCJjbGllbnQiOiJ0dG4tY29uc29sZSIsInNjb3BlIjpbImFwcHMiLCJnYXRld2F5cyIsInByb2ZpbGUiXSwiaW50ZXJjaGFuZ2VhYmxlIjp0cnVlLCJ1c2VybmFtZSI6ImNocmlzdG9waGVyZHJvIiwiZW1haWwiOiJjYXNoZWdoaWFuQGdtYWlsLmNvbSIsImNyZWF0ZWQiOiIyMDE2LTEyLTMwVDE3OjIwOjQxLjc3MFoiLCJuYW1lIjp7ImZpcnN0IjoiQ2hyaXN0b3BoZXIiLCJsYXN0IjoiRHJvIn0sInZhbGlkIjp0cnVlLCJfaWQiOiI1ODY2OTc2OTdiMzQ0YTAwMzIwOTc5MWUiLCJleHAiOjE0ODkyOTc3ODV9.W3CWFpASRoxqe273bC__etes4f62U38f4stXq5ue3DLI59S9GsfpyEw6ggPx2MVj5awXiUzNgKiKA8ZiFyuenEavyZoJqTFrlaxDI2SkP_HOTAY1__-SMDKv1AS965sOyBbHQ049fgkBpjTdYdQ1gxoFjFOpuPU6OTi-lqBG7kWOyYv3-U3f7cmNhKVhEgC6rFqnsYG_oHR0D4Sak7JTDZulzZhxsmzggnOWEV_VBPOI3MT9QH_PrFs2dqUF3qRURQFnshhzXUnY2372C-kElVlyymxRDMEev8IgvSnOBGKgF8t7XR7nSJLuGfVsQ1HEDIlBkoOz05MrHeZ2thjKhYD27hdJsxca0d_izs56uzQpqieq_alRv94fe0M5OLu0I1M7LALkYKfPsUd8ECvkdbTsoqjqFeoNdFZ5eUDHSu32bUYMLB2rEoJGBjxrbD_B3qmbkweGlo8FEbVZqvLQ5tYQr_ieApoCbF9eeC5jQXuWyO8wqcbx_tF3BdhHdktqhp6Iz22amr_2V06y6teYuJTeebGnWcco9bWv5q3OZkswhy87HuSULw82ifR1YtrW_wQw3c-UOgVmJnKLO-Cx0wMPSlEx5AGlpj7aRZODyTfjgme1jgo900jXYF0j8t0iD-LuPZp3d6Zv-PoQKvesC5hW2MxuNyZBCTqUDRjsOMU`,
          'Content-Type': 'application/json',
        },
      }
    )
    const json = await response.json()
    return json
  }

  async getApplicationDevices(applicationId) {
    const response = await fetch(
      'https://console.thethingsnetwork.org/api/applications/7581206457/devices/',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI1ODY2OTc2OTdiMzQ0YTAwMzIwOTc5MWUiLCJpc3MiOiJ0dG4tYWNjb3VudC12MiIsImlhdCI6MTQ4OTIzNDE4NSwidHlwZSI6InVzZXIiLCJjbGllbnQiOiJ0dG4tY29uc29sZSIsInNjb3BlIjpbImFwcHMiLCJnYXRld2F5cyIsInByb2ZpbGUiXSwiaW50ZXJjaGFuZ2VhYmxlIjp0cnVlLCJ1c2VybmFtZSI6ImNocmlzdG9waGVyZHJvIiwiZW1haWwiOiJjYXNoZWdoaWFuQGdtYWlsLmNvbSIsImNyZWF0ZWQiOiIyMDE2LTEyLTMwVDE3OjIwOjQxLjc3MFoiLCJuYW1lIjp7ImZpcnN0IjoiQ2hyaXN0b3BoZXIiLCJsYXN0IjoiRHJvIn0sInZhbGlkIjp0cnVlLCJfaWQiOiI1ODY2OTc2OTdiMzQ0YTAwMzIwOTc5MWUiLCJleHAiOjE0ODkyOTc3ODV9.W3CWFpASRoxqe273bC__etes4f62U38f4stXq5ue3DLI59S9GsfpyEw6ggPx2MVj5awXiUzNgKiKA8ZiFyuenEavyZoJqTFrlaxDI2SkP_HOTAY1__-SMDKv1AS965sOyBbHQ049fgkBpjTdYdQ1gxoFjFOpuPU6OTi-lqBG7kWOyYv3-U3f7cmNhKVhEgC6rFqnsYG_oHR0D4Sak7JTDZulzZhxsmzggnOWEV_VBPOI3MT9QH_PrFs2dqUF3qRURQFnshhzXUnY2372C-kElVlyymxRDMEev8IgvSnOBGKgF8t7XR7nSJLuGfVsQ1HEDIlBkoOz05MrHeZ2thjKhYD27hdJsxca0d_izs56uzQpqieq_alRv94fe0M5OLu0I1M7LALkYKfPsUd8ECvkdbTsoqjqFeoNdFZ5eUDHSu32bUYMLB2rEoJGBjxrbD_B3qmbkweGlo8FEbVZqvLQ5tYQr_ieApoCbF9eeC5jQXuWyO8wqcbx_tF3BdhHdktqhp6Iz22amr_2V06y6teYuJTeebGnWcco9bWv5q3OZkswhy87HuSULw82ifR1YtrW_wQw3c-UOgVmJnKLO-Cx0wMPSlEx5AGlpj7aRZODyTfjgme1jgo900jXYF0j8t0iD-LuPZp3d6Zv-PoQKvesC5hW2MxuNyZBCTqUDRjsOMU`,
          'Content-Type': 'application/json',
        },
      }
    )
    const json = await response.json()
    return json
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.getData}>
          <Text style={styles.welcome}>Welcome to React Native!</Text>
        </TouchableHighlight>
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
})

AppRegistry.registerComponent('TTNConsole', () => TTNConsole)
