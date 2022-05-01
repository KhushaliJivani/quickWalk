'use strict';

var _webPush = require('web-push');

var _webPush2 = _interopRequireDefault(_webPush);

var _users = require('../app/models/users.model');

var _users2 = _interopRequireDefault(_users);

var _notification = require('../app/models/notification.model');

var _notification2 = _interopRequireDefault(_notification);

var _group = require('../app/models/group.model');

var _group2 = _interopRequireDefault(_group);

var _challenge = require('../app/models/challenge.model');

var _challenge2 = _interopRequireDefault(_challenge);

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.sendNotification = function (params) {
    try {
        _notification2.default.findById(params._id).then(function (notification) {
            _notification2.default.populate(notification, [{ 'path': 'groupId', model: _group2.default, select: { '_id': 1, 'name': 1 } }, { 'path': 'action.challengeId', model: _challenge2.default, select: { '_id': 1, 'name': 1 } }, { 'path': 'actionUserId', model: _users2.default, select: { '_id': 1, 'username': 1 } }]).then(function (notify) {
                // console.log('notify', notify);
                var text = '';
                if (params.action.type == 'invite') {
                    text = notify.groupId.name + ' has invited you for the challenge called ' + notify.action.challengeId.name;
                } else if (params.action.type == 'accept') {
                    text = notify.groupId.name + ' has accepted the challenge <br> Challenge Name: ' + notify.action.challengeId.name;
                } else if (params.action.type == 'decline') {
                    text = notify.groupId.name + ' has declined the challenge <br> Challenge Name: ' + notify.action.challengeId.name;
                } else {
                    text = 'has declined the challenge <br> Challenge Name';
                }
                var payload = {
                    'notification': {
                        'title': params.action.type.charAt(0).toUpperCase() + params.action.type.slice(1),
                        'body': text,
                        'icon': 'assets/main-page-logo-small-hat.png',
                        'vibrate': [100, 50, 100],
                        'data': {
                            'url': "https://premove.viitorcloud.in"
                        }
                    }
                };
                //  console.log('payload', payload)
                params.userStatus.forEach(function (notify) {
                    _users2.default.findById(notify.userId).then(function (user) {
                        if (user && user.notificationSubscriptionDetail !== null) {
                            var pushSubscription = {
                                endpoint: user.notificationSubscriptionDetail.endpoint,
                                keys: {
                                    p256dh: user.notificationSubscriptionDetail.keys.p256dh,
                                    auth: user.notificationSubscriptionDetail.keys.auth
                                }
                            };
                            var pushPayload = JSON.stringify(payload);
                            var pushOptions = {
                                vapidDetails: {
                                    subject: _config2.default.frontendUrl,
                                    privateKey: _config2.default.vapPrivateKey,
                                    publicKey: _config2.default.vapPublicKey
                                },
                                //    TTL: notificationPayload.ttl,
                                headers: {}
                            };
                            _webPush2.default.sendNotification(pushSubscription, pushPayload, pushOptions).then(function (value) {}).catch(function (err) {});
                        }
                    });
                });
            }).catch(function (err) {});
        }).catch(function (err) {});
    } catch (err) {}
};