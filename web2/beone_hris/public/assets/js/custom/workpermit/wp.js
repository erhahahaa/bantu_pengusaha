"use strict";

$('#desc').maxlength({
    threshold: 255,
    warningClass: "badge badge-primary",
    limitReachedClass: "badge badge-success"
});

function selectElement(id, valueToSelect) {
    let element = document.getElementById(id);
    element.value = valueToSelect;
}

function approveshe(id) {
    var currentLocation = window.location;
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: "post",
        url: uri + "/getone" ,
        data: { idwp: id },
        dataType: 'json',
        success: function(res) {
            console.log(res);
            $('#idworkpermit').val(res['idworkpermit']);
            $('#namapekerjaan').val(res['namapekerjaan']);
            $('#kt_modal_update_user').modal('show');
        }
    });
}

function approvega(id) {
    var currentLocation = window.location;
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: "post",
        url: uri + "/getone" ,
        data: { idwp: id },
        dataType: 'json',
        success: function(res) {
            console.log(res);
            $('#idworkpermitga').val(res['idworkpermit']);
            $('#namapekerjaanga').val(res['namapekerjaan']);
            $('#kt_modal_approve_ga').modal('show');
        }
    });
}



function insert(){
    const t = document.getElementById("kt_modal_add_user");
    const i = t.querySelector('[data-kt-users-modal-action="submit"]');
    const url = uri + "/insertutility";
    fetch(url, {
        method : "POST",
        body: new FormData(document.getElementById("kt_modal_add_user_form")),
    }).then(
        response => response.text()// .json(), etc.
    ).then(
        (result) => {
            console.log(result)
            if(result == 'true' || result == true){
                Swal.fire({
                    text: "Form has been successfully submitted!",
                    icon: "success",
                    buttonsStyling: !1,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    }
                }).then((function(t) {
                    t.isConfirmed
                    i.removeAttribute("data-kt-indicator"),
                    i.disabled = !1;
                    $("#kt_modal_add_user").modal('hide');
                    $('#kt_datatable_example_1').DataTable().ajax.reload();
                    document.getElementById("kt_modal_add_user_form").reset();
                }
                ))
            }else{
                Swal.fire({
                    text: "Sorry, looks like there are some errors detected, please try again.",
                    icon: "error",
                    buttonsStyling: !1,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    }
                }),
                i.removeAttribute("data-kt-indicator"),
                i.disabled = !1
            }
        }
    ).catch((error) => {
    console.error('Error:', error);
    });
};


var KTUsersEditUser = function() {
    const t = document.getElementById("kt_modal_update_user")
      , e = t.querySelector("#kt_modal_edit_user_form")
      , n = new bootstrap.Modal(t);
    return {
        init: function() {
            (()=>{
                var o = FormValidation.formValidation(e, {
                    fields: {
                        // namautilityedit: {
                        //     validators: {
                        //         notEmpty: {
                        //             message: "Utility name is required"
                        //         }
                        //     }
                        // },
                    },
                    plugins: {
                        trigger: new FormValidation.plugins.Trigger,
                        bootstrap: new FormValidation.plugins.Bootstrap5({
                            rowSelector: ".fv-row",
                            eleInvalidClass: "",
                            eleValidClass: ""
                        })
                    }
                });
                const i = t.querySelector('[data-kt-usersedt-modal-action="submit"]');
                i.addEventListener("click", (t=>{
                    t.preventDefault(),
                    o && o.validate().then((function(t) {
                        console.log("validated!"),
                        "Valid" == t ? (i.setAttribute("data-kt-indicator", "on"),
                        i.disabled = !0,
                        setTimeout((function() {
                            i.removeAttribute("data-kt-indicator"),
                            i.disabled = !1,

                            approvesheaction()

                        }
                        ), 2e3)) : Swal.fire({
                            text: "Sorry, looks like there are some errors detected, please try again.",
                            icon: "error",
                            buttonsStyling: !1,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        })
                    }
                    ))
                }
                )),
                t.querySelector('[data-kt-usersedt-modal-action="cancel"]').addEventListener("click", (t=>{
                    t.preventDefault(),
                    Swal.fire({
                        text: "Are you sure you would like to cancel?",
                        icon: "warning",
                        showCancelButton: !0,
                        buttonsStyling: !1,
                        confirmButtonText: "Yes, cancel it!",
                        cancelButtonText: "No, return",
                        customClass: {
                            confirmButton: "btn btn-primary",
                            cancelButton: "btn btn-active-light"
                        }
                    }).then((function(t) {
                        t.value ? (e.reset()) : "cancel" === t.dismiss && Swal.fire({
                            text: "Your form has not been cancelled!.",
                            icon: "error",
                            buttonsStyling: !1,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        })
                    }
                    ))
                }
                )),
                t.querySelector('[data-kt-usersedt-modal-action="close"]').addEventListener("click", (t=>{
                    t.preventDefault(),
                    Swal.fire({
                        text: "Are you sure you would like to cancel?",
                        icon: "warning",
                        showCancelButton: !0,
                        buttonsStyling: !1,
                        confirmButtonText: "Yes, cancel it!",
                        cancelButtonText: "No, return",
                        customClass: {
                            confirmButton: "btn btn-primary",
                            cancelButton: "btn btn-active-light"
                        }
                    }).then((function(t) {
                        t.value ? (e.reset(),
                        n.hide()) : "cancel" === t.dismiss && Swal.fire({
                            text: "Your form has not been cancelled!.",
                            icon: "error",
                            buttonsStyling: !1,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        })
                    }
                    ))
                }
                ))
            }
            )()
        }
    }
}();
KTUtil.onDOMContentLoaded((function() {
    KTUsersEditUser.init()
}
));

var KTApproveGA = function() {
    const t = document.getElementById("kt_modal_approve_ga")
      , e = t.querySelector("#kt_modal_approve_ga_form")
      , n = new bootstrap.Modal(t);
    return {
        init: function() {
            (()=>{
                var o = FormValidation.formValidation(e, {
                    fields: {
                        // namautilityedit: {
                        //     validators: {
                        //         notEmpty: {
                        //             message: "Utility name is required"
                        //         }
                        //     }
                        // },
                    },
                    plugins: {
                        trigger: new FormValidation.plugins.Trigger,
                        bootstrap: new FormValidation.plugins.Bootstrap5({
                            rowSelector: ".fv-row",
                            eleInvalidClass: "",
                            eleValidClass: ""
                        })
                    }
                });
                const i = t.querySelector('[data-kt-usersedt-modal-action="submit"]');
                i.addEventListener("click", (t=>{
                    t.preventDefault(),
                    o && o.validate().then((function(t) {
                        console.log("validated!"),
                        "Valid" == t ? (i.setAttribute("data-kt-indicator", "on"),
                        i.disabled = !0,
                        setTimeout((function() {
                            i.removeAttribute("data-kt-indicator"),
                            i.disabled = !1,

                            approvegaaction()

                        }
                        ), 2e3)) : Swal.fire({
                            text: "Sorry, looks like there are some errors detected, please try again.",
                            icon: "error",
                            buttonsStyling: !1,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        })
                    }
                    ))
                }
                )),
                t.querySelector('[data-kt-usersedt-modal-action="cancel"]').addEventListener("click", (t=>{
                    t.preventDefault(),
                    Swal.fire({
                        text: "Are you sure you would like to cancel?",
                        icon: "warning",
                        showCancelButton: !0,
                        buttonsStyling: !1,
                        confirmButtonText: "Yes, cancel it!",
                        cancelButtonText: "No, return",
                        customClass: {
                            confirmButton: "btn btn-primary",
                            cancelButton: "btn btn-active-light"
                        }
                    }).then((function(t) {
                        t.value ? (e.reset()) : "cancel" === t.dismiss && Swal.fire({
                            text: "Your form has not been cancelled!.",
                            icon: "error",
                            buttonsStyling: !1,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        })
                    }
                    ))
                }
                )),
                t.querySelector('[data-kt-usersedt-modal-action="close"]').addEventListener("click", (t=>{
                    t.preventDefault(),
                    Swal.fire({
                        text: "Are you sure you would like to cancel?",
                        icon: "warning",
                        showCancelButton: !0,
                        buttonsStyling: !1,
                        confirmButtonText: "Yes, cancel it!",
                        cancelButtonText: "No, return",
                        customClass: {
                            confirmButton: "btn btn-primary",
                            cancelButton: "btn btn-active-light"
                        }
                    }).then((function(t) {
                        t.value ? (e.reset(),
                        n.hide()) : "cancel" === t.dismiss && Swal.fire({
                            text: "Your form has not been cancelled!.",
                            icon: "error",
                            buttonsStyling: !1,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        })
                    }
                    ))
                }
                ))
            }
            )()
        }
    }
}();
KTUtil.onDOMContentLoaded((function() {
    KTApproveGA.init()
}
));

function approvesheaction(){
    const t = document.getElementById("kt_modal_update_user");
    const i = t.querySelector('[data-kt-usersedt-modal-action="submit"]');
    const url = uri + "/approveSHE";
    fetch(url, {
        method : "POST",
        body: new FormData(document.getElementById("kt_modal_edit_user_form")),
    }).then(
        response => response.json()// .json(), etc.
    ).then(
        (result) => {
            console.log(result)
            if(result.status == false){
                Swal.fire({
                    text:  result.message,
                    icon: "error",
                    buttonsStyling: !1,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    }
                })
            }else{
                Swal.fire({
                    text:  result.message,
                    icon: "success",
                    buttonsStyling: !1,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    }
                }).then((function(t) {
                    t.isConfirmed
                    $("#kt_modal_update_user").modal('hide');
                    $('#kt_datatable_example_1').DataTable().ajax.reload();
                    document.getElementById("kt_modal_edit_user_form").reset();
                }
                ))
            }
        }
    ).catch((error) => {
    console.error('Error:', error);
    });
};

function approvegaaction(){
    const t = document.getElementById("kt_modal_approve_ga");
    const i = t.querySelector('kt_modal_edit_user_form');
    const url = uri + "/approveGA";
    fetch(url, {
        method : "POST",
        body: new FormData(document.getElementById("kt_modal_approve_ga_form")),
    }).then(
        response => response.json()// .json(), etc.
    ).then(
        (result) => {
            console.log(result)
            if(result.status == false){
                Swal.fire({
                    text:  result.message,
                    icon: "error",
                    buttonsStyling: !1,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    }
                })
            }else{
                Swal.fire({
                    text:  result.message,
                    icon: "success",
                    buttonsStyling: !1,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    }
                }).then((function(t) {
                    t.isConfirmed
                    $("#kt_modal_approve_ga").modal('hide');
                    $('#kt_datatable_example_1').DataTable().ajax.reload();
                    document.getElementById("kt_modal_approve_ga_form").reset();
                }
                ))
            }
        }
    ).catch((error) => {
    console.error('Error:', error);
    });
};