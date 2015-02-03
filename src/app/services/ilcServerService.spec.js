/* jshint undef:true, -W030*/
/* global describe, it, expect, beforeEach, inject */
'use strict';
define(['services/serviceModule', 'angular-mocks'], function() {
  describe('ILC Server Services', function() {
    var ilcServerService;

    beforeEach(module('ignisLibriColloqui.services'));

    beforeEach(inject(function(ILCServerService) {
      ilcServerService = ILCServerService;
    }));

    describe(' ilcServerService ', function() {
      it(' should execute normally', function() {
        expect(true);// just by getting here you've verified the callback (it was done())
      });
    });

  });
});
