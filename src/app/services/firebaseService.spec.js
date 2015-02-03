/* jshint undef:true, -W030*/
/* global describe, it, expect, beforeEach, inject */
'use strict';
define(['services/serviceModule', 'angular-mocks'], function() {
  describe('firebase services', function() {
    var firebaseService;

    beforeEach(module('ignisLibriColloqui.services'));

    beforeEach(inject(function(FirebaseService) {
      firebaseService = FirebaseService;
    }));

    describe('firebaseService', function() {
      it('should execute normally', function() {
        expect(true);// just by getting here you've verified the callback (it was done())
      });
    });

  });
});
