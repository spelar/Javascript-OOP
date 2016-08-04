
function ImageSlider(selector){
  this.imageSlider = null;
  this.images = null;
  this.currentIndex = -1;
  this.imageWidth = 0;
  this.indexItems = null;
  this.timerID = 0;
  this.autoPlayDelayTime = 2000;

  this.init(selector);
  this.initImages();
  this.initEvent();
  this.showImageAt(0);
  this.startAutoPlay();
};

ImageSlider.prototype.init = function(selector){
  this.imageSlider = $(selector);
  this.images = this.imageSlider.find('.image-list .image-wrap');
  this.imageWidth = this.imageSlider.find('.slider-body').width();
  this.indexItems = this.imageSlider.find('.index-nav li a');
};

ImageSlider.prototype.initImages = function(selector){
  this.images.each(function(){
    $(this).css({
      opacity: 0.0
    });
  });
};

ImageSlider.prototype.initEvent = function(){
  var objThis = this;
  this.imageSlider.find('.slider-btn-prev').on("click", function(){
    objThis.prevImage();
  });
  this.imageSlider.find('.slider-btn-next').on("click", function(){
    objThis.nextImage();
  });

  this.indexItems.on("mouseenter", function(){
    var index = objThis.indexItems.index(this);
    if(objThis.currentIndex > index){
      objThis.showImageAt(index, "prev");
    } else {
      objThis.showImageAt(index, "next");
    }
  });

  this.imageSlider.on("mouseenter", function(){
    objThis.stopAutoPlay();
  });
  this.imageSlider.on("mouseleave", function(){
    objThis.startAutoPlay();
  });
};

ImageSlider.prototype.prevImage = function(){
  this.showImageAt(this.currentIndex-1, "prev");
};

ImageSlider.prototype.nextImage = function(){
  this.showImageAt(this.currentIndex+1, "next");
};

ImageSlider.prototype.showImageAt = function(index, direction){

  if(index<0){
    index = this.images.length-1;
  }
  if(index>=this.images.length){
    index = 0;
  }

  var currentImage = this.images.eq(this.currentIndex);
  var newImage = this.images.eq(index);

  if(direction == "prev" || direction == 'next') {
    var currentEndLeft = this.imageWidth;
    var nextStartLeft = -this.imageWidth;
    if(direction == 'next'){
      currentEndLeft = -this.imageWidth;
      nextStartLeft = this.imageWidth;
    }
    currentImage.stop().animate({
      left: currentEndLeft,
      opacity: 0
    }, 300, "easeOutQuint");
    newImage.css({
      left: nextStartLeft,
      opacity: 0
    });
    newImage.stop().animate({
      left: 0,
      opacity: 1
    }, 300, 'easeOutQuint');
  } else {
    currentImage.css({
      opacity: 0.0
    });
    newImage.css({
      left: 0,
      opacity: 1
    });
  }
  this.selectIndexAt(index);
  this.currentIndex = index;
};

ImageSlider.prototype.selectIndexAt = function(index){
  if(this.currentIndex != -1){
    this.indexItems.removeClass('select');
  }
  this.indexItems.eq(index).addClass('select');
};

ImageSlider.prototype.startAutoPlay = function(){
  var objThis = this;
  if(this.timerID == 0){
    this.timerID = setInterval(function(){
      objThis.nextImage();
    },this.autoPlayDelayTime);
  }
};

ImageSlider.prototype.stopAutoPlay = function(){
  if(this.timerID != 0){
    this.timerID = clearInterval(this.timerID);
    this.timerID = 0;
  }
};
