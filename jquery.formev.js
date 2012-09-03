// ----------------------------------------------------------------------------
/*
 * jQuery FormEV Plugin
 * version: 0.2 (2012-09-04)
 *
 * This document is licensed as free software under the terms of the
 * MIT License: http://www.opensource.org/licenses/mit-license.php
 *
 * @copy 2012, Tender.Pro team
 *
 * Project repository: https://github.com/LeKovr/formEV
 */

$.fn.formEV = function(options) {

  // ----------------------------------------------------------------------------
  // Saving callback example
  var onSubmitExample = function(container, cbSaveSuccess, cbFormDisable, cbFormEnable) {
    var form = container.children('form');
    var params = $(form).serializeArray();
    var post = $.toJSON(params);
    cbFormDisable(container);
    setTimeout(function() {
      alert("Ready to send:\n" + post);
      cbFormEnable(container);
      cbSaveSuccess(container);
    }, 2000);
  };

  // ----------------------------------------------------------------------------
  // All options listed here
  options = $.extend(true, {
    fldContainerClass:'editable'
  , fldViewClass:     'view'
  , fldEditClass:     'edit'
  , btnEditOnClass:   'edit_on'
  , btnEditOffClass:  'edit_off'
  , btnSaveClass:     'save'
  , btnResetClass:    'reset'
  , chkOnClass:       'on'
  , chkOffClass:      'off'
  , onSubmit:         onSubmitExample   // Called when user clicks Submit
  , onViewReady:      null              // Called when fields are ready to be shown in View mode
  }, options);

  // ----------------------------------------------------------------------------
  // Set Edit/View mode
  var setMode = function (isEdit, container) {
    with (options) {
      container.find('.' + fldContainerClass).each(function() {
        $(this).children('.' + (isEdit ? fldViewClass : fldEditClass)).addClass('hide');
        $(this).children('.' + (isEdit ? fldEditClass : fldViewClass)).removeClass('hide');
      });
      container.find('.' + (isEdit ? btnEditOnClass : btnEditOffClass)).addClass('hide');
      container.find('.' + (isEdit ? btnEditOffClass : btnEditOnClass)).removeClass('hide');
    };
  };

  // ----------------------------------------------------------------------------
  // Fill Read mode data from inputs
  var viewModeRefresh = function(container) {
    container.find('.'+options.fldContainerClass).each(function() {
      var field = $(this).children('.' + options.fldEditClass);
      var needWrite = true;
      var target = $(this).children('.' + options.fldViewClass);
      if (field.is('select')) {
        val = field.children('option:selected').text();
      } else if ( field.is('label') ) {  // radio
        val = field.find('input[type="radio"]:checked').parent().text();
      } else if ( field.is('input[type="checkbox"]') ) {
        with (options) {
          target.children('.' + (field.is(':checked') ? chkOffClass : chkOnClass)).addClass('hide');
          target.children('.' + (field.is(':checked') ? chkOnClass : chkOffClass)).removeClass('hide');
        }
        needWrite = false;
      } else  {
        // text field
        val = field.val();
      }
      if (needWrite) {
        target.text(val);
      }
    });
    if (options.onViewReady) { options.onViewReady(container) }

  };

  // ----------------------------------------------------------------------------
  // Switch to view mode after successfull submit
  var cbSubmitSuccess = function(container) {
    viewModeRefresh(container);
    setMode(false, container);
  };

  // ----------------------------------------------------------------------------
  // Disable fields for edit while saving
  var cbFormDisable = function(container) {
    container.find('.' + options.fldEditClass).not(':disabled').addClass('disabled_till_send').attr('disabled', 'disabled');
    // disable radio inside label
    container.find('.' + options.fldEditClass + ' :input').not(':disabled').addClass('disabled_till_send').attr('disabled', 'disabled');
  };

  // ----------------------------------------------------------------------------
  // Enable back fields for edit after successfull saving
  var cbFormEnable = function(container) {
    container.find('.disabled_till_send').removeAttr('disabled').removeClass('disabled_till_send');
  };

  // ----------------------------------------------------------------------------
  // Save form data
  var submitForm = function(container) {
    options.onSubmit(container, cbSubmitSuccess, cbFormDisable, cbFormEnable);
  };

  // ----------------------------------------------------------------------------
  // Initialize containers at start
  this.each(function(){
    var row = $(this);
    row.find('.' + options.btnEditOnClass).each(function(){
      $(this).click(function(){ setMode(true, row); });
    });
    row.find('.' + options.btnResetClass).each(function(){
      $(this).click(function(){ setMode(false, row); return true; });
    });
      row.find('.' + options.btnSaveClass).each(function(){
      $(this).click(function(){ submitForm(row); });
    });
    viewModeRefresh(row);
  });

};
