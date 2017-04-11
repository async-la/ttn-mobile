//
//  TTNMQTT.m
//  TTNConsole
//
//  Created by Christopher Dro on 4/7/17.
//  Copyright © 2017 Async LLC. All rights reserved.
//

#import "TTNMQTT.h"
#import "MQTTClient.h"

static NSString* statusCreated = @"CREATED";
static NSString* statusConnecting = @"CONNECTING";
static NSString* statusConnected = @"CONNECTED";
static NSString* statusDisconnecting = @"DISCONNECTING";
static NSString* statusClosed = @"CLOSED";
static NSString* statusError = @"ERROR";

@implementation TTNMQTT

RCT_EXPORT_MODULE()

@synthesize bridge = _bridge;

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"newMessage", @"connectionLost"];
}

- (instancetype)init
{
  if ((self = [super init])) {
    _session = [[MQTTSession alloc] init];
    _session.clientId = @"async-llc";
  }
  return self;
}

RCT_EXPORT_METHOD(createSessionAsync:(NSDictionary *)options
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{

  _session.userName = options[@"username"];
  _session.password = options[@"password"];
  _session.delegate = self;
  
  
  [_session connectToHost:options[@"host"] port:1883 usingSSL:NO connectHandler:^(NSError *error) {
    if (error) {
      reject(@"createSession", error.localizedDescription, error);
    } else {
      resolve(nil);
    }
  }];
}

RCT_EXPORT_METHOD(subscribeAsync:(NSString *) topic
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  [_session subscribeToTopic:topic atLevel:1 subscribeHandler:^(NSError *error, NSArray<NSNumber *> *gQoss){
    if (error) {
      NSLog(@"Subscription failed %@", error.localizedDescription);
      reject(@"subscribe", error.localizedDescription, error);
    } else {
      resolve(nil);
    }
  }];
}

RCT_EXPORT_METHOD(unsubscribeAsync:(NSString *) topic
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  [_session unsubscribeTopic:topic unsubscribeHandler:^(NSError *error) {
    if (error) {
      reject(@"unsubscribe", error.localizedDescription, error);
    } else {
      NSLog(@"Unsubscription sucessfull");
      resolve(nil);
    }
  }];
}


RCT_EXPORT_METHOD(getSessionStatus:(RCTResponseSenderBlock)callback)
{
  switch (_session.status) {
    case MQTTSessionStatusCreated:
      callback(@[[NSNull null], statusCreated]);
      break;
    case MQTTSessionStatusConnecting:
      callback(@[[NSNull null], statusConnecting]);
      break;
    case MQTTSessionStatusConnected:
      callback(@[[NSNull null], statusConnected]);
      break;
    case MQTTSessionStatusDisconnecting:
      callback(@[[NSNull null], statusDisconnecting]);
      break;
    case MQTTSessionStatusClosed:
      callback(@[[NSNull null], statusClosed]);
      break;
    case MQTTSessionStatusError:
      callback(@[[NSNull null], statusError]);
      break;
  }
}


RCT_EXPORT_METHOD(destroySessionAsync:
                  (RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  [_session closeWithDisconnectHandler:^(NSError *error) {
    if (error) {
      reject(@"unsubscribe", error.localizedDescription, error);
    } else {
      NSLog(@"Disconnect sucessfull");
      resolve(nil);
    }
  }];
}

/** Session delegate gives your application control over the MQTTSession
 @note all callback methods are optional
 */


/** gets called when a new message was received
 @param session the MQTTSession reporting the new message
 @param data the data received, might be zero length
 @param topic the topic the data was published to
 @param qos the qos of the message
 @param retained indicates if the data retransmitted from server storage
 @param mid the Message Identifier of the message if qos = 1 or 2, zero otherwise
 */
- (void)newMessage:(MQTTSession *)session
              data:(NSData *)data
           onTopic:(NSString *)topic
               qos:(MQTTQosLevel)qos
          retained:(BOOL)retained
               mid:(unsigned int)mid
{
  [self sendEventWithName:@"newMessage" body: [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding]];
}


/** gets called when a connection has been closed
 @param session the MQTTSession reporting the close
 */
- (void)connectionClosed:(MQTTSession *)session {
  [self sendEventWithName:@"connectionLost" body: nil];
}

// UNUSED

/** for mqttio-OBJC backward compatibility
 @param session see newMessage for description
 @param data see newMessage for description
 @param topic see newMessage for description
 */
- (void)session:(MQTTSession*)session newMessage:(NSData*)data onTopic:(NSString*)topic {}

/** gets called when a connection is established, closed or a problem occurred
 @param session the MQTTSession reporting the event
 @param eventCode the code of the event
 @param error an optional additional error object with additional information
 */
- (void)handleEvent:(MQTTSession *)session event:(MQTTSessionEvent)eventCode error:(NSError *)error {}

/** for mqttio-OBJC backward compatibility
 @param session the MQTTSession reporting the event
 @param eventCode the code of the event
 */
- (void)session:(MQTTSession*)session handleEvent:(MQTTSessionEvent)eventCode {}

/** gets called when a connection has been successfully established
 @param session the MQTTSession reporting the connect
 
 */
- (void)connected:(MQTTSession *)session {}

/** gets called when a connection has been successfully established
 @param session the MQTTSession reporting the connect
 @param sessionPresent represents the Session Present flag sent by the broker
 
 */
- (void)connected:(MQTTSession *)session sessionPresent:(BOOL)sessionPresent {}

/** gets called when a connection has been refused
 @param session the MQTTSession reporting the refusal
 @param error an optional additional error object with additional information
 */
- (void)connectionRefused:(MQTTSession *)session error:(NSError *)error {}

/** gets called when a connection error happened
 @param session the MQTTSession reporting the connect error
 @param error an optional additional error object with additional information
 */
- (void)connectionError:(MQTTSession *)session error:(NSError *)error {}

/** gets called when an MQTT protocol error happened
 @param session the MQTTSession reporting the protocol error
 @param error an optional additional error object with additional information
 */
- (void)protocolError:(MQTTSession *)session error:(NSError *)error {}

/** gets called when a published message was actually delivered
 @param session the MQTTSession reporting the delivery
 @param msgID the Message Identifier of the delivered message
 @note this method is called after a publish with qos 1 or 2 only
 */
- (void)messageDelivered:(MQTTSession *)session msgID:(UInt16)msgID {}

/** gets called when a subscription is acknowledged by the MQTT broker
 @param session the MQTTSession reporting the acknowledge
 @param msgID the Message Identifier of the SUBSCRIBE message
 @param qoss an array containing the granted QoS(s) related to the SUBSCRIBE message
 (see subscribeTopic, subscribeTopics)
 */
- (void)subAckReceived:(MQTTSession *)session msgID:(UInt16)msgID grantedQoss:(NSArray<NSNumber *> *)qoss {}

/** gets called when an unsubscribe is acknowledged by the MQTT broker
 @param session the MQTTSession reporting the acknowledge
 @param msgID the Message Identifier of the UNSUBSCRIBE message
 */
- (void)unsubAckReceived:(MQTTSession *)session msgID:(UInt16)msgID {}

/** gets called when a command is sent to the MQTT broker
 use this for low level monitoring of the MQTT connection
 @param session the MQTTSession reporting the sent command
 @param type the MQTT command type
 @param qos the Quality of Service of the command
 @param retained the retained status of the command
 @param duped the duplication status of the command
 @param mid the Message Identifier of the command
 @param data the payload data of the command if any, might be zero length
 */
- (void)sending:(MQTTSession *)session type:(MQTTCommandType)type qos:(MQTTQosLevel)qos retained:(BOOL)retained duped:(BOOL)duped mid:(UInt16)mid data:(NSData *)data {}

/** gets called when a command is received from the MQTT broker
 use this for low level monitoring of the MQTT connection
 @param session the MQTTSession reporting the received command
 @param type the MQTT command type
 @param qos the Quality of Service of the command
 @param retained the retained status of the command
 @param duped the duplication status of the command
 @param mid the Message Identifier of the command
 @param data the payload data of the command if any, might be zero length
 */
- (void)received:(MQTTSession *)session type:(MQTTCommandType)type qos:(MQTTQosLevel)qos retained:(BOOL)retained duped:(BOOL)duped mid:(UInt16)mid data:(NSData *)data {}

@end
