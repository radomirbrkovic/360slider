/**
* @author Radomir Brkovic <brkovic.radomir@gmail.com>
* @description
* This is a simple jQuery plugin for 360° image slider which provides you easy implementation and a lot of control options. 
* Included functionality are:
  - autoplay
  - next and previous buttons
  - Scroller
  - Scroll images by mouse movement

For more information please take a look on https://github.com/radomirbrkovic/360slider

*/


(function ($) {

  $.ThreeSixtySlider = function (options) {

       const defaults = {
           autoplay: true,
           wrapper: null,
           image: {
             width: 600,
             height: 300,
             id_prefix: "__three-sixty-image"
           },
           images: [],
           navigation: {
             control_panel: "__three-sixty-control-panel",
             play: "__three-sixty-play-button",
             left: "__three-sixty-arrow-left",
             right: "__three-sixty-arrow-right",
             scroll_bar: "__three-sixty-scroll-bar",
             scroller: "__three-sixty-scroller"
           }
       }

       this.active = 0
       const _this = this
       _this.settings = $.extend(true, {}, defaults, _this.settings, options)

       _this.setNavigation()
       _this.setImages()
       _this.setActiveImage(this.active)

   }

   $.ThreeSixtySlider.prototype.setImages = function(){
     for(let i=0; i < this.settings.images.length; i++){
       this.settings.wrapper.append(`<img id="${this.settings.image.id_prefix}-${i}" 
                                      width="${this.settings.image.width}" 
                                      style="display:none" 
                                      draggable='false' 
                                      height="${this.settings.image.height}" 
                                      src="${this.settings.images[i]}" />`)
     }

   }

   $.ThreeSixtySlider.prototype.setNavigation = function(){

     if(this.settings.images.length){
       if(this.settings.autoplay){
          var playBtnIconClass = "fa-pause"
       } else{
          var playBtnIconClass = "fa-play"
       }

       this.settings.wrapper.append(`<div id="${this.settings.navigation.control_panel}"></div>`)
       let controlPanel = this.settings.wrapper.find("#"+this.settings.navigation.control_panel)
       controlPanel.append(`<a href="#" class="btn btn-default" id="${this.settings.navigation.play}">
                              <i class="fa ${playBtnIconClass}"></i>
                            </a>`)
       controlPanel.append(`<a href="#" class="btn btn-default" id="${this.settings.navigation.left}">
                              <i class="fa fa-chevron-left"></i>
                            </a>`)
       controlPanel.append(`<a href="#" class="btn btn-default" id="${this.settings.navigation.right}">
                              <i class='fa fa-chevron-right'></i>
                            </a>`)
       controlPanel.append(`<div id="${this.settings.navigation.scroll_bar}"></div>`)
       this.settings.wrapper.find("#"+this.settings.navigation.scroll_bar)
                            .append(`<a href="#" id="${this.settings.navigation.scroller}"></div>`)
     }

   }

   $.ThreeSixtySlider.prototype.setActiveImage = function(index){
      if(index == this.settings.images.length) {
        index = 0
      }
        

      if (index == 0) {
        var scrollerLeft = 0
      } else {
        var scrollerLeft = (index/this.settings.images.length) * 100  
      }



      $("#"+this.settings.navigation.scroller).css('left', `${scrollerLeft}%`)

      this.active = index
      this.settings.wrapper.find("img").hide()
      this.settings.wrapper.find(`#${this.settings.image.id_prefix}-${this.active}`).show()

      const _this = this

      if(this.settings.autoplay && this.settings.images.length){
        setTimeout(function(){
          _this.setActiveImage(index+1)
        }, 100)
      }

   }




}(jQuery));

(function($) {
    $.fn.threeSixtySlider = function(options) {

      options['wrapper'] = this
      const slider =   new $.ThreeSixtySlider(options)
      var clientX = 0
      const _this = this
      var element = document.getElementById(this.attr('id'))

      this.mousemove(function(e){
        e.preventDefault()
          if(e.buttons==1){
            if(clientX == 0)
              clientX= e.clientX

            slider.settings.autoplay = false
            if(e.clientX > (clientX+10)){
              clientX = e.clientX
              slider.setActiveImage(slider.active + 1)

            }
            else if (e.clientX < (clientX - 10)) {
                  clientX = e.clientX
                var index = slider.active

                if(index == 0){
                  index = slider.settings.images.length
                }
                 
                slider.setActiveImage(index - 1)

            }


          }
      }).mouseup(function(e){
        e.preventDefault()
        clientX = 0
      })

      $(document).on('click', `#${slider.settings.navigation.left}`, function(e){
        e.preventDefault()
        var index = slider.active

          slider.settings.autoplay = false

        if(index == 0)
          index = slider.settings.images.length
        slider.setActiveImage(index - 1)
      })

      $(document).on('click', `#${slider.settings.navigation.right}`, function(e){
        e.preventDefault()
          slider.settings.autoplay = false
        slider.setActiveImage(slider.active + 1)
      })

      $(document).on('click', `#${slider.settings.navigation.play}`, function(e){
        e.preventDefault()
        if(!slider.settings.autoplay){
          slider.settings.autoplay = true
          slider.setActiveImage(slider.active)
            $(this).find('i').removeClass('fa-play').addClass('fa-pause')
        } else {
          slider.settings.autoplay = false
           $(this).find('i').removeClass('fa-pause').addClass('fa-play')
        }

      })

      element.addEventListener('touchmove', function(e) {
        e.preventDefault()
        var touch = e.touches[0];
        if(clientX == 0)
          clientX= touch.pageX

        slider.settings.autoplay = false
        if(touch.pageX > (clientX+10)){
          clientX = touch.pageX
          slider.setActiveImage(slider.active + 1)
        } else if (touch.pageX < (clientX - 10)) {
            clientX = touch.pageX 
            var index = slider.active
            if(index == 0){
                index = slider.settings.images.length
            }
            slider.setActiveImage(index - 1)
        }
      })

      element.addEventListener('touchend', function(e) {
        e.preventDefault()
        clientX = 0
      })
    }

}(jQuery))
