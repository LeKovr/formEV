formEV
======

## Description

formEV is a jQuery plugin which allows to show from in two modes, one for editing (as usual) and other for viewing.
In View mode fields are showed as plain text values.
When switching to Edit mode these values will be replaced with form fields and "Edit" button will be replaced by "Submit" and "Reset".
User defined callback (as value of cbSave option) will be called when "Submit" clicked.

## Form structure (via classes)

    └── form container
        └── form
            ├── {field container} (class fldContainerClass), for each field
            │   ├── field edit element (class fldEditClass)
            │   └── field view container (class fldViewClass)
            ├── Edit button (class btnEditOnClass)
            ├── Submint button (classes btnEditOffClass, btnSaveClass)
            └── Reset button  (classes btnEditOffClass, btnResetClass)

Fields with type checkbox has slightly more complex field view container:

    └── field view container  (class fldViewClass)
        ├── container for checked=true (class chkOnClass)
        └── container for checked=false (class chkOffClass)

## Callbacks

### onSubmit(container, cbSaveSuccess, cbFormDisable, cbFormEnable)

Required. Called when user clicks Submit.

Arguments:

* container - form container object
* cbSaveSuccess - function to call after successfull submitting, switches form to View mode
* cbFormDisable - function to call after field serialize, disables all form fields
* cbFormEnable - function to call after successfull submitting, enables disabled form fields back

### onViewReady(container)

Optional. Called when fields are ready to be shown in View mode.

Arguments:

* container - form container object

## Requirements

* jQuery (tested on v1.7.2)

Example page requires also:

* jQuery JSON plugin (tested on v2.3)
