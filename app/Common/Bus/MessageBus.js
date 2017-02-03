/**
 * MessageBus.js - Client side message bus for TypeScript projects.
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 Stayhard AB
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var MessageBus;
    return {
        setters: [],
        execute: function () {/**
             * MessageBus.js - Client side message bus for TypeScript projects.
             *
             * The MIT License (MIT)
             *
             * Copyright (c) 2014 Stayhard AB
             *
             * Permission is hereby granted, free of charge, to any person obtaining a copy
             * of this software and associated documentation files (the "Software"), to deal
             * in the Software without restriction, including without limitation the rights
             * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
             * copies of the Software, and to permit persons to whom the Software is
             * furnished to do so, subject to the following conditions:
             *
             * The above copyright notice and this permission notice shall be included in all
             * copies or substantial portions of the Software.
             *
             * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
             * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
             * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
             * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
             * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
             * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
             * SOFTWARE.
             */
            (function (MessageBus) {
                function Message(name) {
                    var definition = function () {
                        function F() { }
                        F.prototype = definition.prototype;
                        F.prototype.messageType = name;
                        return new F();
                    };
                    definition.messageType = name;
                    return definition;
                }
                MessageBus.Message = Message;
                ;
                MessageBus.UnexpectedExceptionMessage = Message("UnexpectedExceptionMessage");
                var Subscription = (function () {
                    function Subscription(pattern, handler) {
                        this.pattern = pattern;
                        this.handler = handler;
                        this.regex = new RegExp(pattern);
                    }
                    Subscription.prototype.getPattern = function () {
                        return this.pattern;
                    };
                    Subscription.prototype.isMatch = function (messageType) {
                        return this.regex.test(messageType);
                    };
                    return Subscription;
                }());
                var ChannelSubscriptions = (function () {
                    function ChannelSubscriptions() {
                        this.subscriptions = [];
                    }
                    ChannelSubscriptions.prototype.add = function (pattern, handler) {
                        var subscription = new Subscription(pattern, handler);
                        this.subscriptions.push(subscription);
                        return subscription;
                    };
                    ChannelSubscriptions.prototype.remove = function (pattern, handler) {
                        this.subscriptions = this.subscriptions.filter(function (s) { return s.getPattern() !== pattern && s.handler !== handler; });
                    };
                    /**
                     * Iterates over all the contained subscriptions and calls the specified callback.
                     * @param callback A callback to call for each subscription.
                     */
                    ChannelSubscriptions.prototype.forEach = function (callback) {
                        this.subscriptions.forEach(callback);
                    };
                    ChannelSubscriptions.prototype.createCallback = function (messageDefinition, messageConstructor, replyChannel) {
                        return function (s) {
                            var messageType = messageDefinition.messageType;
                            if (!s.isMatch(messageType)) {
                                // This subscription should not handle this message.
                                return;
                            }
                            // Create actual message for each handler
                            var message = messageDefinition();
                            if (messageConstructor) {
                                messageConstructor(message);
                            }
                            // Pass message to handler
                            try {
                                s.handler(message, replyChannel);
                            }
                            catch (error) {
                                replyChannel.publish(MessageBus.UnexpectedExceptionMessage, function (message) {
                                    message.exception = error;
                                });
                            }
                            ;
                        };
                    };
                    return ChannelSubscriptions;
                }());
                /**
                 * Returns the regex pattern for the specified input used to match handlers with message type names.
                 */
                function toPattern(input) {
                    if (typeof input === 'string') {
                        return input;
                    }
                    if (!input.messageType) {
                        throw "Invalid message type. Missing messageType property.";
                    }
                    return '^' + input.messageType + '$';
                }
                ;
                var Channel = (function () {
                    function Channel() {
                        this.subscriptions = new ChannelSubscriptions();
                    }
                    Channel.prototype.on = function (pattern, handler) {
                        // toPattern converts message types to string patterns (in case this method is called with the generic overload)
                        pattern = toPattern(pattern);
                        this.subscriptions.remove(pattern, handler);
                        this.subscriptions.add(pattern, handler);
                        return this;
                    };
                    Channel.prototype.off = function (pattern, handler) {
                        // toPattern converts message types to string patterns (in case this method is called with the generic overload)
                        pattern = toPattern(pattern);
                        this.subscriptions.remove(pattern, handler);
                        return this;
                    };
                    /**
                     * Publishes a message on the bus and returns a new channel for listening on replies from subscribers. Messages published on this reply channel bubbles up to the main channel.
                     */
                    Channel.prototype.publish = function (messageDefinition, messageConstructor) {
                        var replyChannel = new ReplyChannel(this);
                        if (!messageDefinition.messageType) {
                            throw "Invalid message type. Missing messageType property.";
                        }
                        var callback = this.subscriptions.createCallback(messageDefinition, messageConstructor, replyChannel);
                        this.subscriptions.forEach(callback);
                        return replyChannel;
                    };
                    return Channel;
                }());
                MessageBus.Channel = Channel;
                var ReplyChannel = (function () {
                    function ReplyChannel(rootChannel) {
                        this.rootChannel = rootChannel;
                        this.subscriptions = new ChannelSubscriptions();
                        this.queue = [];
                    }
                    ReplyChannel.prototype.on = function (pattern, handler) {
                        // toPattern converts message types to string patterns (in case this method is called with the generic overload)
                        pattern = toPattern(pattern);
                        var subscription = this.subscriptions.add(pattern, handler);
                        // Send any queued messages to the handler
                        this.queue.forEach(function (p) {
                            p(subscription);
                        });
                        return this;
                    };
                    ReplyChannel.prototype.off = function (pattern, handler) {
                        // toPattern converts message types to string patterns (in case this method is called with the generic overload)
                        pattern = toPattern(pattern);
                        this.subscriptions.remove(pattern, handler);
                        return this;
                    };
                    /**
                     * Publishes a message on the bus and returns a new channel for listening on replies from subscribers. Messages published on this reply channel bubbles up to the main channel.
                     */
                    ReplyChannel.prototype.publish = function (messageDefinition, messageConstructor) {
                        if (!messageDefinition.messageType) {
                            throw "Invalid message type. Missing messageType property.";
                        }
                        var callback = this.subscriptions.createCallback(messageDefinition, messageConstructor, this);
                        this.subscriptions.forEach(callback);
                        // Save to queue
                        this.queue.push(callback);
                        if (this.rootChannel) {
                            this.rootChannel.publish(messageDefinition, messageConstructor);
                        }
                        return this;
                    };
                    return ReplyChannel;
                }());
                MessageBus.ReplyChannel = ReplyChannel;
            })(MessageBus || (MessageBus = {}));
            exports_1("MessageBus", MessageBus);
        }
    };
});
//# sourceMappingURL=MessageBus.js.map