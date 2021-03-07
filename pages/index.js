import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {

  const RingCentral = require('@ringcentral/sdk').SDK

  const SAHAP_NUMBER = '+442045324603';//sahap
  //const SAHAP_NUMBER = '+442045328103';//gokay

  const EMMANUEL_NUMBER = '+442045326829'; //real number
 
 const RINGCENTRAL_CLIENTID = 'woZG42_1QdywuVvo9E6qcQ'
 const RINGCENTRAL_CLIENTSECRET = 'BWrzSXTASeSCyFCmlgfP8gZIRAz2J9TJ6Q4htvKHVvgw'
 const RINGCENTRAL_SERVER = 'https://platform.ringcentral.com'
  
 const RINGCENTRAL_USERNAME = '+442045324603'//'+33188454644'
  
 const RINGCENTRAL_PASSWORD = 'Pa$$w0rd'
 const RINGCENTRAL_EXTENSION = '350'
 
 var rcsdk = new RingCentral({ server: RINGCENTRAL_SERVER, clientId: RINGCENTRAL_CLIENTID, clientSecret: RINGCENTRAL_CLIENTSECRET });
 var platform = rcsdk.platform();
 platform.login({ username: RINGCENTRAL_USERNAME, password: RINGCENTRAL_PASSWORD, extension: RINGCENTRAL_EXTENSION })
 
 platform.on(platform.events.loginSuccess, function(response) {
   call_ringout()
 })
 //+442045328155
 async function call_ringout() {
   try {
     var resp = await platform.post('/restapi/v1.0/account/~/extension/~/ring-out', {
       'from': { 'phoneNumber': SAHAP_NUMBER  },
       'to': { 'phoneNumber': EMMANUEL_NUMBER },
       'playPrompt': false
     })
     var jsonObj = await resp.json()
     console.log("Call placed. Call status: " + jsonObj.status.callStatus)
   } catch (e) {
     console.log(e.message)
   }
 }

  return (
    <h1>Unify office dialer ring out</h1>
  )
}
