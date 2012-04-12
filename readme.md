# Jelly

### About
Jelly has expanded from a pure adaptive + responsive grid system to a oocss framework, taking combines advantage of lessxless framework, taking adaptive design to the next peak.

Unlike lessxless, Jelly it self is a pure css without any less/scss/sass… requirement, but it will appear as mixing files which it can be compeletely ignored and modify the css file and build it by manually, or utilitzing the mixing to make a componenet, this way it will ensure accessbility to your team even if they don't like use compilers. And it also made management less dependencies easier (when less gets complicated, you start to lose track of where and where unless you keep a welll organised doc). Writing in oocss lets you managem them easier.


### Organising
Jelly designed with a little strange file structure, normally you should see something like this
    index.html
      js
        script.js
        vendor/
      css
      	style.css
      	blah.css
      img

But considering that a lot of the javascript plugins now days comes with their own css ready, so it really should be treated like a total plugin, rather than seperating its css into your css folder and js into your js folder, so Jelly do it this way

<pre>                                   +--------------+
                                   |  index.html  |
                                   +------+-------+
                                          |
                                     +----v-----+
                                     |   src    |
                                     |----------|
                       +-------------+ img/     |
                       |             | plugins/ +--------------+
                       |             | css/+--+ |              |
                       |             +--------|-+              |
                       |                      |                |
                       |                      |                |
                   +---v---+       +----------v----+    +------v--------+
                   |  img  |       |      css      |    |    plugins    |
                   |-------|       |---------------|    |---------------|
                   | ...   |       |  app.css  &lt;-+ |    | app_dev.js    |
                   +-------+       | config.css ++ |    | app_helper.js |
                                   | + _m/ +---+   |    | app.js        |
                                   +-----------|---+    | + lib/+-+     |
                                               |        +---------|-----+
                                               |                  |
                                 +-------------v-----+  +---------v-----+
                                 |        _m         |  |      lib      |
                                 |-------------------|  |---------------|
                                 | _base_reset.css   |  | jquery.js     |
                                 | _base_form.css    |  | backbone.js   |
                                 | _base_font.css    |  | underscore.js |
                                 | _base_grid.css    |  | otherplugin   |
                                 | _base_table.css   |  |   /js/        |
                                 | _base_layout.css  |  |   /img/       |
                                 | _base_nav.css     |  |   /css/       |
                                 | _base_utility.css |  | spriteSet     |
                                 | _ui_jelly.css     |  |   /img/       |
                                 | ....              |  |   /css/       |
                                 | + src/            |  +---------------+
                                 +-------------------+</pre>

	index.html
	  src
	  	app.css
	  	config.css				|| main controller of all your css files
	  	app.js  				|| all your custom javascript here
	  	app/ 					|| optional, if its a heavy js webapp such as sencha, backbone... eg:
	  	  underscore.js
	  	  backbone.js
	  	  gallery.controller.js
	  	  gallery.model.js
	  	_m/						|| all modualr css files
	  	  _base_......css
	  	  _plugin_....css 		|| name your css plugins like so eg:
	  	  _plugin_form_coolform.css
	  	  _sprite_....css
	  	  _anything_..css
	  	_p/						|| your plugin folder
	  	  jquery.min.js 		|| place js libraries here
	  	  jquery.plugin/		|| put your plugins like this, or it can all go to a plugin folder
	  	    plugin.min.js
	  	    plugin.css	  	    



### Pushing to live
Are you ready to hit live? its time to compile your code by getting rid of your @import and minifying your css codes.
The easierst option is to use juicer: A commandline tool for merging and minify your css and js file for you, it also parse through jslint to check your js error, although sometimes it won't go through because the spacing or plugin, you will need to skip jslint by juicer merge -s app.js.

So to compile your code, simply just type juicer merge app.css, it will get through your config.css file.

* sometimes, it might have issues that it looks different after you have combine the files, in this case, you might want have some file be stand alone, such as the media-querie.css, it somtimes won't work if its part of a huge file, or you might want to seperate out your ie.css… 



### Tip
1. Use livereload
2. use livereload shell to parse through css3prefixr
3. Name your file structure caferully, be as object oriented as possible, so it can be reuse or extend.
4. Break your parts down like OOCSS, eg: 
	- base(reuseble)
	- ui( skin layer, for custome )
	- js-enable ( js layer, for extra functionality, eg: addClass/removeClass )