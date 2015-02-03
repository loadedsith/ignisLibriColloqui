/* jshint undef:true, -W030*/
/* global describe, it, expect, beforeEach, inject */
'use strict';
define(['services/serviceModule', 'angular-mocks'], function() {
  describe('ILC Server Services', function() {
    var ilcServerService;
    var scope;
    var socket;
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
    beforeEach(module('ignisLibriColloqui.services'));

    beforeEach(inject(function($socket) {
      socket = $socket;
      spyOn(socket,'on')
    }));

    beforeEach(inject(function(ILCServerService) {
      ilcServerService = ILCServerService;
    }));


     describe('ilcServerService', function() {
      it('should execute normally', function() {
        expect(true);// just by getting here you've verified the callback (it was done())
      });
      it('should have a server url', function() {
        expect(ilcServerService.ilcServerUrl).toBeDefined();
      });
      it('should have an instance of $socket', function() {
        expect(socket).toBeDefined();
      });
    });
    describe('has many socket connections', function() {
      it('at least one on call', function() {
        expect(socket.on).toHaveBeenCalled();
      });
      for (var i = events.length - 1; i >= 0; i--) {
        var event = events[i];
        it('should listen for event['+i+']: on(\'' + event + '\')', function() {
          expect(socket.on).toHaveBeenCalledWith(event, jasmine.any(Function));
        });
      }
    });

  });
});
