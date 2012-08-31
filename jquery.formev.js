// ----------------------------------------------------------------------------
/*
 * jQuery FormEV Plugin
 * version: 0.1 (2012-08-31)
 *
 * This document is licensed as free software under the terms of the
 * MIT License: http://www.opensource.org/licenses/mit-license.php
 *
 * @copy 2012, Tender.Pro team

    https://github.com/LeKovr/formEV
 */

$.fn.formEV = function(options) {
  var mode_edit = function (idx, container) {
    container.find('.editable').each(function() {
      $(this).children(options.names.childs[idx]).addClass('hide');
      $(this).children(options.names.childs[1-idx]).removeClass('hide');
    });
    container.find(options.names.buttons[idx]).removeClass('hide');
    container.find(options.names.buttons[1-idx]).addClass('hide');
  }

  function send(container) {
    // пример отправи формы в alert
    var form1 = container.children('form');
    var params = $(form1).serializeObject();
    var formid = form1.attr('id');
    params['API_METHOD'] = form1.attr('id');
    var post = $.toJSON(params);

    container.find('.val').not(':disabled').addClass('disabled_till_send').attr("disabled","disabled");
    // TODO: disable radio inside label
    setTimeout(function() {
      alert(post);
      cb_ok(container);
    }, 2000);
    // TODO: send data
  }

  var form2view = function(container) {
    container.find('.editable').each(function() {
      var field = $(this).children(options.names.childs[0]);
      if (field.is('select')) {
        val = field.children('option:selected').text();
      } else if ( field.is('label') ) {  // radio
        val = field.find('input[type="radio"]:checked').parent().text();
      } else if ( field.is('input[type="checkbox"]') ) {
        val = field.is(':checked') ? options.names.chkeckboxes[1] : options.names.chkeckboxes[0];
      } else  {
        // text field
        val = field.val();
      }
      $(this).children(options.names.childs[1]).text(val);

    });
  }

  var cb_ok = function(container) {
    form2view(container);
    mode_edit(0, container);
    container.find('.disabled_till_send').removeAttr("disabled").removeClass('disabled_till_send');
  }

  /* body */
  this.each(function(){
    var row = $(this);
    var form1 = row.children('form');
    $("input[name='edit_btnn']").each(function(){ // перебираю все, т.к. не знаю как по form1 выйти на ее input
      if ($(this.form).is(form1)) {
        $(this).click(function(){ mode_edit(1, row); });
      }
    });
    $("input[name='e1']").each(function(){
      if ($(this.form).is(form1)) {
        $(this).click(function(){ mode_edit(0, row); return true; });
      }
    });
    $("input[name='e2']").each(function(){
      if ($(this.form).is(form1)) {
        $(this).click(function(){ send(row); });
      }
    });
    form2view(row);
  });

};
// ----------------------------------------------------------------------------
// PGWS API code
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    var formid = this.attr('id');
    $.each(a, function() {
      if (o[this.name]) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || '');
      } else {
        o[this.name] = this.value || '';
      }
    });
    return o;
};
