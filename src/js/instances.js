$.Fotorama.instances = [];

function calculateIndexes () {
  $.each($.Fotorama.instances, function (index, instance) {
    instance.index = index;
  });
}

function addInstance (instance) {
  $.Fotorama.instances.push(instance);
  calculateIndexes();
}

function hideInstance (instance) {
  $.Fotorama.instances.splice(instance.index, 1);
  calculateIndexes();
}