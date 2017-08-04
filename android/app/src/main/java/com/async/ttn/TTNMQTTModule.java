package com.async.ttn;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import org.eclipse.paho.client.mqttv3.IMqttActionListener;
import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.IMqttToken;
import org.eclipse.paho.client.mqttv3.MqttAsyncClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;

import javax.annotation.Nullable;

public class TTNMQTTModule extends ReactContextBaseJavaModule implements MqttCallback {

  ReactApplicationContext reactContext;
  MemoryPersistence mememoryPersistence;
  MqttAsyncClient   client;
  MqttConnectOptions mqttConnectOptions;

  final static String statusConnected = "CONNECTED";
  final static String statusClosed = "CLOSED";
  ;
  public TTNMQTTModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "TTNMQTT";
  }

  @ReactMethod
  public void createSessionAsync(ReadableMap options, final Promise promise) {
    mqttConnectOptions = new MqttConnectOptions();
    mqttConnectOptions.setUserName(options.getString("username"));
    mqttConnectOptions.setPassword(options.getString("password").toCharArray());
    mememoryPersistence = new MemoryPersistence();

    // Create Client
    try {
      client = new MqttAsyncClient("tcp://" + options.getString("host"), "async-llc", mememoryPersistence);
      client.setCallback(this);
    } catch(MqttException e) {
      promise.reject(Integer.toString(e.getReasonCode()), e.getLocalizedMessage());
    }

    // Create session
    try {
      client.connect(mqttConnectOptions, reactContext, new IMqttActionListener() {
        public void onSuccess(IMqttToken asyncActionToken) {
          android.util.Log.d("ReactNative", "Connected");
          promise.resolve(null);
        }

        public void onFailure(IMqttToken asyncActionToken, Throwable exception) {
          promise.reject(exception.getLocalizedMessage(), exception.getMessage());
        }
      });
    } catch (MqttException e) {
      promise.reject(Integer.toString(e.getReasonCode()), e.getLocalizedMessage());
    }
  }


  @ReactMethod
  public void subscribeAsync(final String topic, final Promise promise) {
    try {
      client.subscribe(topic, 1, reactContext, new IMqttActionListener() {
        public void onSuccess(IMqttToken asyncActionToken) {
          android.util.Log.d("ReactNative", "Subscribed");
          promise.resolve(null);
        }

        public void onFailure(IMqttToken asyncActionToken, Throwable exception) {
          promise.reject(exception.getLocalizedMessage(), exception.getMessage());
        }
      });
    } catch (MqttException e) {
      promise.reject(Integer.toString(e.getReasonCode()), e.getLocalizedMessage());
    }
  }

  @ReactMethod
  public void unsubscribeAsync(String topic, Promise promise) {
    try {
      client.unsubscribe(topic);
    } catch (MqttException e) {
      promise.reject(Integer.toString(e.getReasonCode()), e.getLocalizedMessage());
    }
  }


  @ReactMethod
  public void getSessionStatus(Callback callback) {
    if (client != null && client.isConnected()) {
      callback.invoke(null, statusConnected);
    } else {
      callback.invoke(null, statusClosed);
    }
  }

  @ReactMethod
  public void destroySessionAsync(Promise promise) {
    try {
      client.disconnect();
      promise.resolve(null);
    } catch (MqttException e) {
      promise.reject(Integer.toString(e.getReasonCode()), e.getLocalizedMessage());
    }
  }


  private void sendEvent(String eventName,
                         @Nullable String message) {
    reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit(eventName, message);
  }


  /****************************************************************/
  /* Start MqttCallback interface              */
  /****************************************************************/

  public void messageArrived(String topic, MqttMessage message) {
    // Called when a message arrives from the server that matches any
    // subscription made by the client
    sendEvent("newMessage", new String(message.getPayload()));

  }

  public void connectionLost(Throwable cause) {
    // Called when the connection to the server has been lost.
    // An application may choose to implement reconnection
    // logic at this point. This sample simply exits.
    sendEvent("connectionLost", null);
  }

  public void deliveryComplete(IMqttDeliveryToken token) {}

  /****************************************************************/
  /* End MqttCallback interface              */
  /****************************************************************/

}