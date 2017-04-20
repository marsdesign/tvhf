function createCookie(name,value,days) {
  if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
  }
  else var expires = "";
  document.cookie = name+"="+value+expires+"; path=/";

  // testing that its actually set
  var cookie = readCookie(name);
  if(cookie === null){
    return false;
  }else{
    return true;
  }
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function daysBetween(date1, date2) {
    // The number of milliseconds in one day
    var ONE_DAY = 1000 * 60 * 60 * 24
    // Calculate the difference in milliseconds
    var difference_ms = Math.abs(date1 - date2)
    // Convert back to days and return
    return Math.round(difference_ms/ONE_DAY)
}

function popModal(modalId,bootstrapMode){
  if(bootstrapMode){
    jQuery(modalId).modal('show');
  }else{
    jQuery(modalId).addClass('show');
  } 
}

function hideModal(modalId,bootstrapMode){
  if(bootstrapMode){
    jQuery(modalId).modal('hide');
  }else{
    jQuery(modalId).removeClass('show');
  } 
}

function showModal(mode,delay,modalId,cookieName,bootstrapMode){

  if(mode == 'scroll'){
    modalShown = 0;
    jQuery(window).scroll(function(e){
      var scrollTop = jQuery(window).scrollTop();
      var docHeight = jQuery(document).height();
      var winHeight = jQuery(window).height();
      var scrollPct = (scrollTop) / (docHeight - winHeight);
      var scrollPctRounded = Math.round(scrollPct*100);
      if(scrollPctRounded >= pct && modalShown == 0){
        popModal(modalId,bootstrapMode);
        modalShown = 1;
      }
    });

  }else if(mode == 'delay'){
    setTimeout(function() {
      popModal(modalId,bootstrapMode);
    }, delay); 
  }
  return false;
}

function localstorageTest() {
  var mod = 'test';
  try {
      localStorage.setItem(mod, mod);
      localStorage.removeItem(mod);
      return true;
  } catch(e) {
      return false;
  }
}

function initModal(mode,delay,modalId,cookieName,interval,bootstrapMode){

  var enabledLocal = localstorageTest();

  if (enabledLocal) {
    // use local storage to show pop up only once

    var cookie  = localStorage.getItem(cookieName); // get local storage
    var today   = new Date();

    if (cookie === null) {

        // if no storage item
        showModal(mode,delay,modalId,cookieName,bootstrapMode); // show subscribe
        localStorage.setItem(cookieName, today); // set storage item today date

    }else{

       // we have a storage item - get it
      var cookieDate  = Date.parse(cookie); // parse into epoch seconds
      var todayDate   = Date.parse(today); // parse today into epoch seconds
      var days        = daysBetween(todayDate,cookieDate); // get the difference in days

      // if greater than = to ten days - redo the process
      if(days >= interval){
        showModal(mode,delay,modalId,cookieName,bootstrapMode); // show subscribe
        localStorage.setItem(cookieName, today); // set local sto             
      }

    }

 } else {

    var cookie = readCookie(cookieName); // grab cookie

    if (cookie === null) {

        var created = createCookie(cookieName,1,interval);
        if(created){
          showModal(mode,delay,modalId,cookieName,bootstrapMode); 
        }

    }
 }
}

// Vertical centered modals
// you can give custom class like this // var modalVerticalCenterClass = ".modal.modal-vcenter";

var modalVerticalCenterClass = ".modal";
function centerModals(element) {
    var modals;
    if (element.length) {
        modals = element;
    } else {
        modals = $j(modalVerticalCenterClass + ':visible');
    }
    modals.each( function(i) {
        var clone = $j(this).clone().css('display', 'block').appendTo('body');
        var top = Math.round((clone.height() - clone.find('.modal-content').height()) / 2);
        top = top > 0 ? top : 0;
        clone.remove();
        $j(this).find('.modal-content').css("margin-top", top);
    });
}
$j(window).on('resize', centerModals);  