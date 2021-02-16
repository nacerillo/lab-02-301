'use strict';

//TODO: filtering
function hornPic(title, image_url, description, keyword) {
  this.title = title;
  this.image_url = image_url;
  this.description = description;
  this.keyword = keyword;
  hornPic.allHornPics.push(this);
}
hornPic.allHornPics = [];

hornPic.prototype.renderHorns = function(){
  // When we render with Jquery, we can use templates
  // we can use pre-existing pieces of the page to build similar pieces.

  //1. copy an existing element
  const $liCopy = $('li:first-child').clone();
  // $liCopy.children()[0].textContent ='Hotdog';
  $liCopy.find('h2').text(this.title);
  $liCopy.find('p').text(this.description);
  $liCopy.find('img').attr('src', this.image_url);
  // console.log(this);
  $('ul').append($liCopy);
};

$.ajax('Data/page-1.json').then(callback);

function callback(retreivedImages) {
  // console.log(retreivedImages);

  retreivedImages.forEach(hornJsonObject => {
    new hornPic(hornJsonObject.title, hornJsonObject.image_url, hornJsonObject.description, hornJsonObject.keyword);
  });
//  === 
  hornPic.allHornPics.forEach(hornPic => hornPic.renderHorns());

}


// $('button:nth-of-type(1)').on('click', handleClickingOnOdieButton);
// $('button:nth-of-type(2)').on('click', handleClickingOnCliffordButton);

// function handleClickingOnOdieButton(){
//   // Hide and show way: hide all and then show some : HTML focused
//   $('li').hide();
//   // $('li:first-child').show();
//   //find the one that contains 'Odie'
//   $('li:contains(Odie)').show();
// }

// function handleClickingOnCliffordButton(){
//   //  TODO: find the object with name clifford: JS/DATA focused
//   //delete and then rerender
//   $('ul').empty();
//   hornPic.allHornPics.forEach(dogPic => {
//     if(dogPic.name === 'Clifford'){
//       dogPic.renderHorns();
//     }
//   });
// }