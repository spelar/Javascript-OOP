
function ImageSlider(selector){
  this.imageSlider = null;
  this.images = null;
  this.currentIndex = -1;

  this.init(selector);
  this.initImages();
  this.initEvent();

  this.showImageAt(0);
};

ImageSlider.prototype.init = function(selector){
  this.imageSlider = $(selector);
  this.images = this.imageSlider.find('.image-list .image-wrap');
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
  this.showImageAt(this.currentIndex-1);
};

ImageSlider.prototype.nextImage = function(){
  this.showImageAt(this.currentIndex+1);
};

ImageSlider.prototype.showImageAt = function(index){

  if(index<0){
    index = this.images.length-1;
  }
  if(index>=this.images.length){
    index = 0;
  }

  var currentImage = this.images.eq(this.currentIndex);
  var newImage = this.images.eq(index);

  currentImage.css({
    opacity: 0.0
  });
  newImage.css({
    left: 0,
    opacity: 1
  });

  this.currentIndex = index;
};
