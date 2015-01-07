/* jshint undef:true, -W030*/
/* global describe, it, expect, beforeEach, inject */
'use strict';

describe('facebook services', function(){
  var facebookService;

  beforeEach(module('ignisLibriColloqui.Facebook'));
  
  beforeEach(inject(function(FacebookService) {
    facebookService = FacebookService;
  }));

  it('should have an FB and service references ', inject(function() {
    expect(FB).toBeUndefined();

    expect(facebookService).toBeDefined();
  }));
});
