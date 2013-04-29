api = $('.fotorama').data('api')

api.setOptions({orientation: 'vertical'})

api.setOptions({loop: 'true'})

api.setOptions({nav: 'dots'})

api.push({img: 'i/okonechnikov/20090807-_DSC6313.jpg'}).show(3)

api.reverse()

api.push({video: 'http://vimeo.com/57463725'}).show(4)