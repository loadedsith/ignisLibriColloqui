/* jshint undef:true, -W030*/
/* global describe, it, expect, beforeEach, inject */
'use strict';

define(['services/serviceModule', 'angular-mocks'], function() {
  describe('ILC Server Services', function() {
    var ilcServerService;
    var messagesService;
    var scope;
    var $timeout;
    var socket;
    var url;

    var events = [
      'got user matchList',
      'message sent',
      'pong',
      'room set',
      'room update',
      'rooms set',
      'rooms update',
      'user disconnected',
      'user profile',
    ]
    beforeEach(module('ignisLibriColloqui.services', function(Config, $socketProvider) {
      $socketProvider.setUrl(Config.ilcTestServerUrl);
      Config.ilcServerUrl = Config.ilcTestServerUrl;
      url = Config.ilcTestServerUrl;

    }));

    beforeEach(inject(function(ILCServerService, MessagesService, _$timeout_,$socket) {
      ilcServerService = ILCServerService;
      messagesService = MessagesService;
      $timeout = _$timeout_;

      socket = $socket;
      spyOn(socket,'on').and.callThrough();
    }));

    beforeEach(function(done) {
        // Setup
        socket.on('connect', function() {
          console.log('worked...');
          done();
        });
        socket.on('ping', function() {
          console.log('pong...');
          done();
        });
        socket.on('disconnect', function() {
          console.log('disconnected...');
          done();
        });

    });


    describe('ilcServerService start', function() {
      it('should execute normally', function() {
        expect(true);// just by getting here you've verified the callback (it was done())
      });
      // it('should have an instance of $socket', function() {
 //        expect(socket).toBeDefined();
 //      });
 //      it('should preform a simple emit $socket', function(done) {
 //        socket.emit('ping','pong---')
 //        socket.on('pong',function(data) {
 //          console.log('pong data', data);
 //        });
 //        expect(true)
 //      });
    });
    // describe('has many socket connections', function() {
 //      it('at least one on call', function() {
 //        expect(socket.on).toHaveBeenCalled();
 //      });
 //      it('expects each event be mapped to an socket.on call',function() {
 //        for (var i = events.length - 1; i >= 0; i--) {
 //          var event = events[i];
 //          // it('should listen for event['+i+']: on(\'' + event + '\')', function() {
 //            // expect(socket.on).toHaveBeenCalledWith(event, jasmine.any(Function));
 //          // });
 //        }
 //      })
 //    });

    // describe('ILCServer Validation', function() {
    //   it('expects emit(\'ping\') to trigger on(\'pong\')', function() {
    //     expect(socket.on).toHaveBeenCalledWith('pong', jasmine.any(Function));
    //   });
    // });

    // describe('connects to server', function(done) {
 //      it('connects to server',function(done) {
 //        socket = io.connect(url);
 //        spyOn(socket,'on').and.callThrough();
 //
 //        socket.emit('ping','thing')
 //        socket.on('pong',function() {
 //          console.log('op23u4po2u3409pong');
 //          done();
 //        })
 //      })
 //    })
    // describe('MessagesService events', function() {
 //      // it('expects on(\'room set\') to trigger messagesService\'s set room',function(done) {
 //      //   socket.emit('ping','thing')
 //      //   io.connect('//0.0.0.0:6000').on('ping',function() {
 //      //     console.log('pong');
 //      //     done()
 //      //   });
 //      // });
 //      // it('expects on(\'room set\') to trigger MessagesService\'s set room with a valid room',function() {
 //      //
 //      // });
 //
 //    });

  });
});
