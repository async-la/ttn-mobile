//
//  TTNMQTT.h
//  TTNConsole
//
//  Created by Christopher Dro on 4/7/17.
//  Copyright © 2017 Async LLC. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <MQTTClient/MQTTClient.h>
#import <MQTTClient/MQTTSessionManager.h>

@interface TTNMQTT : RCTEventEmitter <RCTBridgeModule, MQTTSessionDelegate>
@property (strong, nonatomic) MQTTSession *session;
@end
