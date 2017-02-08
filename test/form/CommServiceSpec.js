describe('CommService spec', function() {
  beforeEach(module('metadata.form'));

  var CommService;

  beforeEach(inject(function(_CommService_) {
    CommService = _CommService_;
  }));

  it('CommService', function() {
    expect(CommService).toBeDefined();
  });

  it('CommService callback', function() {
    var thing = {
      cb: function(m) {}
    };

    spyOn(thing, 'cb');

    CommService.setCallback(thing.cb);
    CommService.update(null);

    expect(thing.cb).toHaveBeenCalled();
    expect(thing.cb).toHaveBeenCalledWith(null);
  });
});