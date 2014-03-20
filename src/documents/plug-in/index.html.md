---
title: "Plug in"
layout: "page"
menuOrder: 3
---

Integrate Fotorama with your favorite framework, service, or <abbr>CMS</abbr>.

## Wordpress
1. Install Fotorama via the <a href="http://wordpress.org/plugins/fotorama/" class="js-analytics-click" data-action="outbound">WordPress.org plugin directory</a>.
2. After activating Fotorama your galleries turn into fotoramas.
3. Say Hi to Fotorama!

<div style="position: relative; width: 100%; background-color: #000; padding-bottom: 56.25%;">
  <iframe style="position: absolute; width: 100%; height: 100%; top: 0; right: 0; bottom: 0; left: 0;" src="http://www.youtube.com/embed/gsObwOvtt_o?vq=hd720&rel=0" frameborder="0" allowfullscreen></iframe>
</div>

## Ruby on Rails
To&nbsp;use Fotorama with Assets Pipeline in&nbsp;Ruby on&nbsp;Rails, add <a href="https://github.com/ai/fotoramajs" class="js-analytics-click" data-action="outbound">fotoramajs gem</a> to&nbsp;`Gemfile`:

```ruby
gem "fotoramajs"
```

Include Fotorama to your scripts:

```coffeescript
#= require fotorama
```

...and styles:

```css
@import "fotorama"
```