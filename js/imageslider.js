
function ImageSlider(selector){
  this.imageSlider = null;
  this.images = null;
  this.currentIndex = -1;
  this.imageWidth = 0;

  this.init(selector);
  this.initImages();
  this.initEvent();
  this.showImageAt(0);
};

ImageSlider.prototype.init = function(selector){
  this.imageSlider = $(selector);
  this.images = this.imageSlider.find('.image-list .image-wrap');
  this.imageWidth = this.imageSlider.find('.slider-body').width();
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
    }, 5300, "easeOutQuint");
    newImage.css({
      left: nextStartLeft,
      opacity: 0
    });
    newImage.stop().animate({
      left: 0,
      opacity: 1
    }, 5300, 'easeOutQuint');
  } else {
    currentImage.css({
      opacity: 0.0
    });
    newImage.css({
      left: 0,
      opacity: 1
    });
  }
  this.currentIndex = index;
};
