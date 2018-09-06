!function($) {
    "use strict";

    //FORMS NO SUBMIT ACTION
	jQuery(".no-submit").submit(function(){return false});

    //DECLARE BOOTSTRAP TOOLTIPS
    jQuery('[data-toggle="tooltip"]').tooltip();

	//VALIDATE EMAIL
	function is_email(email){      
		var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		return emailReg.test(email); 
	}
	//VALIDATE INPUT DIGIT
	function is_digits(number){      
		var numberReg = /^[\d\,\.]*$/;
		return numberReg.test(number); 
	}

	//RANDOM TOKEN GENERATOR
	function randomString(length, chars){
		var result = '';
		for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
		return result;
	}

    //ADD COMMAS TO CURRENCY
    jQuery.fn.digits = function(){
        return this.each(function(){ 
            $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
        })
    }
    
    //LOGIN PAGE FORM SUBMIT FUNCTION
    jQuery(document).on("click", "#btn-login", function(){
        //SET BUTTON LOADING STATE
        jQuery("#btn-login").addClass("disabled");
        jQuery("#btn-login").addClass("ng-loading");

        //VALIDATE FIELDS > LOGIN USERNAME
        if(jQuery("#inputUsername").val().length<3){
            //SET BUTTON DEFAULT STATE
            jQuery("#btn-login").removeClass("disabled");
            jQuery("#btn-login").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Username!", "Please enter your username.", "warning");
        }
        //VALIDATE FIELDS > LOGIN PASSWORD
        else if(jQuery("#inputPass").val().length<3){
            //SET BUTTON DEFAULT STATE
            jQuery("#btn-login").removeClass("disabled");
            jQuery("#btn-login").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Password!", "Please enter your password.", "warning");
        }
        else{
			//REDIRECT TO HOME PAGE
			window.location.href = "home.html";
			/*
            //POST DETAILS TO SERVER
            jQuery.ajax({
                url: "assets/api/post/login",
                type: 'POST',
                data: {
                    user: jQuery("#inputUsername").val(),
                    pass: jQuery("#inputPass").val()
                },
                success: function(data){
                    data = data.split('#');
                    status = data[0];
                    data = data[1];
                    //CHECK RESPONSE STATUS > IF FAIL ALERT ERROR MESSAGE
                    if(status == 'fail'){
                        //SET BUTTON DEFAULT STATE
                        jQuery("#btn-login").removeClass("disabled");
                        jQuery("#btn-login").removeClass("ng-loading");
                        //ALERT ERROR
                        swal({   
                            title: "Oops! Something went wrong.",   
                            text: data,
                            type: "error"
                         });
                    }
                    //ELSE PERFORM SUCCESS EVENT
                    else{
                        //REDIRECT TO HOME PAGE
                        window.location.href = "home.html";
                    }
                },
                error: function(){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#btn-login").removeClass("disabled");
                    jQuery("#btn-login").removeClass("ng-loading");
                    //ALERT ERROR
                    swal({   
                        title: "Oops! Something went wrong.",   
                        text: "We could not reach OsusuMobile HQ. Please check your Internet connection and try again.",
                        type: "error"
                    });
                }
            });
			
			*/
        }
    });
	
	//NO INDICATORS AVAILABLE > HOME PAGE
    jQuery(document).on("click", ".btn-na", function(){
		//ALERT ERROR
		swal({   
			title: "Sorry! No Indicators.",   
			text: "Sadly there are no indicators for this module. please select another module.",
			type: "error"
		});
	});
	
	//NO AVAILABLE
    jQuery(document).on("click", ".btn-nw", function(){
		//ALERT ERROR
		swal({   
			title: "Sorry! No Available Actions.",   
			text: "No available actions for this button in the MVP. Save function will be available in the live version",
			type: "error"
		});
	});


    //SUBMIT INDICATOR FORMS FUNCTION - FORM 1
    jQuery(document).on("click", "#form_btn_submit_1", function(){

        //SET BUTTON LOADING STATE
        jQuery("#form_btn_submit_1").addClass("disabled");
        jQuery("#form_btn_submit_1").addClass("ng-loading");

        //VALIDATE FIELDS > TIME
        if(jQuery("#getstarted_time").val()==""){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_1").removeClass("disabled");
            jQuery("#form_btn_submit_1").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Please answer the question - What time did poll officials arrive?", "warning");
        }
		//VALIDATE FIELDS > FIGURES OFFICIALS
        else if(jQuery("#getstarted_figures_officials").val()==""){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_1").removeClass("disabled");
            jQuery("#form_btn_submit_1").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Please answer the question - How many poll officials present in polling unit?", "warning");
        }
		//VALIDATE FIELDS > FIGURES OFFICERS
        else if(jQuery("#getstarted_figures_officers").val()==""){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_1").removeClass("disabled");
            jQuery("#form_btn_submit_1").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Please answer the question - How many electoral officers present in polling unit?", "warning");
        }
		//VALIDATE FIELDS > TEXT AREA
        else if(jQuery("#getstarted_area").val().length<2){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_1").removeClass("disabled");
            jQuery("#form_btn_submit_1").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Comment!", "Please enter a comment.", "warning");
        }
        else{
			
            //CONFIRM ACTION
            swal({
                title: "Submit Form",
                text: "Are you sure you want to submit this form data?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#39c480",
                confirmButtonText: "Yes, submit form!",
                closeOnConfirm: false
            },
            function(isConfirm){
                if (isConfirm) {
                    //
                    swal({
                        title: "Submitting",   
                        text: "Just a sec, processing...",
                        html: true,
                        showConfirmButton: false
                     });

                    //POST DETAILS TO SERVER
                    jQuery.ajax({
                        url: "http://demos.osusumobile.com/thinkhat/emsc/dashboard/api/post/form.php",
                        type: 'POST',
                        data: {
							text_lga: jQuery("#getstarted_text_f").val(),
                            text_time: jQuery("#getstarted_time").val(),
                            text_officials: jQuery("#getstarted_figures_officials").val(),
							text_officers: jQuery("#getstarted_figures_officers").val(),
                            text_radio: jQuery( "input[type=radio][name=inlineRadioOptions]:checked" ).val(),
                            text_comments: jQuery("#getstarted_area").val(),
							text_form_id: jQuery("#form_id").val()
                        },
                        success: function(data){
							//
							swal({
								title: "Form Submitted!",   
								text: data,
								type: "success",
								showConfirmButton: false
							});
							//
							setTimeout(function(){ window.location.href = "home.html" }, 7000);
							/*
                            data = data.split('#');
                            status = data[0];
                            data = data[1];
                            //CHECK RESPONSE STATUS > IF FAIL ALERT ERROR MESSAGE
                            if(status == 'fail'){
                                //SET BUTTON DEFAULT STATE
                                jQuery("#getstarted_btn_submit").removeClass("disabled");
								jQuery("#getstarted_btn_submit").removeClass("ng-loading");
                                //ALERT ERROR
                                swal({   
                                    title: "Whoops! Something went wrong.",   
                                    text: data,
                                    type: "error"
                                 });
                            }
                            //ELSE PERFORM SUCCESS EVENT
                            else{
                                //
								swal({
									title: "Form Submitted!",   
									text: data,
									type: "success",
									showConfirmButton: false
								});
								//
								setTimeout(function(){ window.location.href = "home.html" }, 7000);
                            }
							*/
                        },
                        error: function(){
                            //SET BUTTON DEFAULT STATE
                            jQuery("#form_btn_submit_1").removeClass("disabled");
							jQuery("#form_btn_submit_1").removeClass("ng-loading");
                            //ALERT ERROR
                            swal({   
                                title: "Whoops! No Internet Access.",   
                                text: "Please save this form and try to submit later.",
                                type: "error"
                            });
                        }
                    });
                }
                else{
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_1").removeClass("disabled");
					jQuery("#form_btn_submit_1").removeClass("ng-loading");
                }

            });
        }
    });
	
	
	//SUBMIT INDICATOR FORMS FUNCTION - FORM 2
    jQuery(document).on("click", "#form_btn_submit_2", function(){

        //SET BUTTON LOADING STATE
        jQuery("#form_btn_submit_2").addClass("disabled");
        jQuery("#form_btn_submit_2").addClass("ng-loading");

        //VALIDATE FIELDS > TIME
        if(jQuery("#getstarted_time").val()==""){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_2").removeClass("disabled");
            jQuery("#form_btn_submit_2").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Please answer the question - What time did voting start?", "warning");
        }
		//VALIDATE FIELDS > TEXT AREA
        else if(jQuery("#getstarted_area").val().length<2){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_2").removeClass("disabled");
            jQuery("#form_btn_submit_2").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Comment!", "Please enter a comment.", "warning");
        }
        else{
			
            //CONFIRM ACTION
            swal({
                title: "Submit Form",
                text: "Are you sure you want to submit this form data?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#39c480",
                confirmButtonText: "Yes, submit form!",
                closeOnConfirm: false
            },
            function(isConfirm){
                if (isConfirm) {
                    //
                    swal({
                        title: "Submitting",   
                        text: "Just a sec, processing...",
                        html: true,
                        showConfirmButton: false
                     });

                    //POST DETAILS TO SERVER
                    jQuery.ajax({
                        url: "http://demos.osusumobile.com/thinkhat/emsc/dashboard/api/post/form.php",
                        type: 'POST',
                        data: {
							text_lga: jQuery("#getstarted_text_f").val(),
                            text_time: jQuery("#getstarted_time").val(),
                            text_comments: jQuery("#getstarted_area").val(),
							text_form_id: jQuery("#form_id").val()
                        },
                        success: function(data){
							//
							swal({
								title: "Form Submitted!",   
								text: data,
								type: "success",
								showConfirmButton: false
							});
							//
							setTimeout(function(){ window.location.href = "home.html" }, 7000);
							/*
                            data = data.split('#');
                            status = data[0];
                            data = data[1];
                            //CHECK RESPONSE STATUS > IF FAIL ALERT ERROR MESSAGE
                            if(status == 'fail'){
                                //SET BUTTON DEFAULT STATE
                                jQuery("#getstarted_btn_submit").removeClass("disabled");
								jQuery("#getstarted_btn_submit").removeClass("ng-loading");
                                //ALERT ERROR
                                swal({   
                                    title: "Whoops! Something went wrong.",   
                                    text: data,
                                    type: "error"
                                 });
                            }
                            //ELSE PERFORM SUCCESS EVENT
                            else{
                                //
								swal({
									title: "Form Submitted!",   
									text: data,
									type: "success",
									showConfirmButton: false
								});
								//
								setTimeout(function(){ window.location.href = "home.html" }, 7000);
                            }
							*/
                        },
                        error: function(){
                            //SET BUTTON DEFAULT STATE
                            jQuery("#form_btn_submit_2").removeClass("disabled");
							jQuery("#form_btn_submit_2").removeClass("ng-loading");
                            //ALERT ERROR
                            swal({   
                                title: "Whoops! No Internet Access.",   
                                text: "Please save this form and try to submit later.",
                                type: "error"
                            });
                        }
                    });
                }
                else{
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_2").removeClass("disabled");
					jQuery("#form_btn_submit_2").removeClass("ng-loading");
                }

            });
        }
    });

    
    //SUBMIT INDICATOR FORMS FUNCTION - FORM 3
    jQuery(document).on("click", "#form_btn_submit_3", function(){

        //SET BUTTON LOADING STATE
        jQuery("#form_btn_submit_3").addClass("disabled");
        jQuery("#form_btn_submit_3").addClass("ng-loading");
        
        //VALIDATE FIELDS
        if(jQuery("#form_questionnaire_62").val()=='0'){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_3").removeClass("disabled");
            jQuery("#form_btn_submit_3").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Please answer the question - Misinformation of the public by the media", "warning");
        }
        //VALIDATE FIELDS
        else if(jQuery("#form_questionnaire_63").val()=='0'){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_3").removeClass("disabled");
            jQuery("#form_btn_submit_3").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Please answer the question - Lack of professionalism", "warning");
        }
        //VALIDATE FIELDS
        else if(jQuery("#form_questionnaire_64").val()=='0'){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_3").removeClass("disabled");
            jQuery("#form_btn_submit_3").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Please answer the question - Broadcast and publishing of hatred", "warning");
        }
        //VALIDATE FIELDS
        else if(jQuery("#form_questionnaire_65").val()=='0'){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_3").removeClass("disabled");
            jQuery("#form_btn_submit_3").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Please answer the question - Unequal access to media", "warning");
        }
        //VALIDATE FIELDS
        else if(jQuery("#form_questionnaire_66").val()=='0'){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_3").removeClass("disabled");
            jQuery("#form_btn_submit_3").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Please answer the question - Partisanship, favouritism and partiality", "warning");
        }
        //VALIDATE FIELDS
        else if(jQuery("#form_questionnaire_67").val()=='0'){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_3").removeClass("disabled");
            jQuery("#form_btn_submit_3").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Please answer the question - Failure of regulatory bodies to ensure adherence to established rules by the media", "warning");
        }
        //VALIDATE FIELDS
        else if(jQuery("#form_questionnaire_68").val()=='0'){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_3").removeClass("disabled");
            jQuery("#form_btn_submit_3").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Please answer the question - Sensationalism and provocation by the media", "warning");
        }
        //VALIDATE FIELDS
        else if(jQuery("#form_questionnaire_69").val()=='0'){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_3").removeClass("disabled");
            jQuery("#form_btn_submit_3").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Please answer the question - Abuse of social media", "warning");
        }
        //VALIDATE FIELDS
        else if(jQuery("#form_questionnaire_70").val()=='0'){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_3").removeClass("disabled");
            jQuery("#form_btn_submit_3").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Please answer the question - On the whole, how do you think that this election will go?", "warning");
        }
        else{
            
            //CONFIRM ACTION
            swal({
                title: "Submit Form",
                text: "Are you sure you want to submit this form data?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#39c480",
                confirmButtonText: "Yes, submit form!",
                closeOnConfirm: false
            },
            function(isConfirm){
                if (isConfirm) {
                    //
                    swal({
                        title: "Submitting",   
                        text: "Just a sec, processing...",
                        html: true,
                        showConfirmButton: false
                     });

                    //POST DETAILS TO SERVER
                    jQuery.ajax({
                        url: "http://demos.osusumobile.com/thinkhat/emsc/dashboard/api/post/form.php",
                        type: 'POST',
                        data: {
                            form_questionnaire_name: jQuery("#form_questionnaire_name").val(),
                            form_questionnaire_gender: jQuery("#form_questionnaire_gender").val(),
                            form_questionnaire_lga: jQuery("#form_questionnaire_lga").val(),

                            form_questionnaire_community: jQuery("#form_questionnaire_community").val(),
                            form_questionnaire_senatorial: jQuery("#form_questionnaire_senatorial").val(),
                            //
                            form_questionnaire_1: jQuery("#form_questionnaire_1").val(),
                            form_questionnaire_2: jQuery("#form_questionnaire_2").val(),
                            form_questionnaire_3: jQuery("#form_questionnaire_3").val(),
                            form_questionnaire_4: jQuery("#form_questionnaire_4").val(),
                            form_questionnaire_5: jQuery("#form_questionnaire_5").val(),
                            form_questionnaire_6: jQuery("#form_questionnaire_6").val(),
                            form_questionnaire_7: jQuery("#form_questionnaire_7").val(),
                            form_questionnaire_8: jQuery("#form_questionnaire_8").val(),
                            form_questionnaire_9: "Undecided",
                            form_questionnaire_10: jQuery("#form_questionnaire_10").val(),
                            form_questionnaire_11: "Undecided",
                            form_questionnaire_12: jQuery("#form_questionnaire_12").val(),
                            form_questionnaire_13: jQuery("#form_questionnaire_13").val(),
                            form_questionnaire_14: jQuery("#form_questionnaire_14").val(),
                            form_questionnaire_15: jQuery("#form_questionnaire_15").val(),
                            form_questionnaire_16: jQuery("#form_questionnaire_16").val(),
                            form_questionnaire_17: jQuery("#form_questionnaire_17").val(),
                            form_questionnaire_18: jQuery("#form_questionnaire_18").val(),
                            form_questionnaire_19: jQuery("#form_questionnaire_19").val(),
                            form_questionnaire_20: jQuery("#form_questionnaire_20").val(),
                            //
                            form_questionnaire_21: jQuery("#form_questionnaire_21").val(),
                            form_questionnaire_22: jQuery("#form_questionnaire_22").val(),
                            form_questionnaire_23: jQuery("#form_questionnaire_23").val(),
                            form_questionnaire_24: jQuery("#form_questionnaire_24").val(),
                            form_questionnaire_25: jQuery("#form_questionnaire_25").val(),
                            form_questionnaire_26: jQuery("#form_questionnaire_26").val(),
                            form_questionnaire_27: jQuery("#form_questionnaire_27").val(),
                            form_questionnaire_28: jQuery("#form_questionnaire_28").val(),
                            form_questionnaire_29: jQuery("#form_questionnaire_29").val(),
                            form_questionnaire_30: jQuery("#form_questionnaire_30").val(),
                            form_questionnaire_31: jQuery("#form_questionnaire_31").val(),
                            form_questionnaire_32: jQuery("#form_questionnaire_32").val(),
                            form_questionnaire_33: jQuery("#form_questionnaire_33").val(),
                            form_questionnaire_34: jQuery("#form_questionnaire_34").val(),
                            form_questionnaire_35: jQuery("#form_questionnaire_35").val(),
                            form_questionnaire_36: jQuery("#form_questionnaire_36").val(),
                            form_questionnaire_37: jQuery("#form_questionnaire_37").val(),
                            form_questionnaire_38: jQuery("#form_questionnaire_38").val(),
                            form_questionnaire_39: jQuery("#form_questionnaire_39").val(),
                            form_questionnaire_40: jQuery("#form_questionnaire_40").val(),
                            //
                            form_questionnaire_41: jQuery("#form_questionnaire_41").val(),
                            form_questionnaire_42: jQuery("#form_questionnaire_42").val(),
                            form_questionnaire_43: jQuery("#form_questionnaire_43").val(),
                            form_questionnaire_44: jQuery("#form_questionnaire_44").val(),
                            form_questionnaire_45: jQuery("#form_questionnaire_45").val(),
                            form_questionnaire_46: jQuery("#form_questionnaire_46").val(),
                            form_questionnaire_47: jQuery("#form_questionnaire_47").val(),
                            form_questionnaire_48: jQuery("#form_questionnaire_48").val(),
                            form_questionnaire_49: jQuery("#form_questionnaire_49").val(),
                            form_questionnaire_50: jQuery("#form_questionnaire_50").val(),
                            form_questionnaire_51: jQuery("#form_questionnaire_51").val(),
                            form_questionnaire_52: jQuery("#form_questionnaire_52").val(),
                            form_questionnaire_53: jQuery("#form_questionnaire_53").val(),
                            form_questionnaire_54: jQuery("#form_questionnaire_54").val(),
                            form_questionnaire_55: jQuery("#form_questionnaire_55").val(),
                            form_questionnaire_56: jQuery("#form_questionnaire_56").val(),
                            form_questionnaire_57: jQuery("#form_questionnaire_57").val(),
                            form_questionnaire_58: jQuery("#form_questionnaire_58").val(),
                            form_questionnaire_59: jQuery("#form_questionnaire_59").val(),
                            form_questionnaire_60: jQuery("#form_questionnaire_60").val(),
                            //
                            form_questionnaire_61: jQuery("#form_questionnaire_61").val(),
                            form_questionnaire_62: jQuery("#form_questionnaire_62").val(),
                            form_questionnaire_63: jQuery("#form_questionnaire_63").val(),
                            form_questionnaire_64: jQuery("#form_questionnaire_64").val(),
                            form_questionnaire_65: jQuery("#form_questionnaire_65").val(),
                            form_questionnaire_66: jQuery("#form_questionnaire_66").val(),
                            form_questionnaire_67: jQuery("#form_questionnaire_67").val(),
                            form_questionnaire_68: jQuery("#form_questionnaire_68").val(),
                            form_questionnaire_69: jQuery("#form_questionnaire_69").val(),
                            form_questionnaire_70: jQuery("#form_questionnaire_70").val(),
                            text_form_id: jQuery("#form_id").val()
                        },
                        success: function(data){
                            //
                            swal({
                                title: "Form Submitted!",   
                                text: data,
                                type: "success",
                                showConfirmButton: false
                            });
                            //
                            setTimeout(function(){ window.location.href = "home.html" }, 7000);
                            /*
                            data = data.split('#');
                            status = data[0];
                            data = data[1];
                            //CHECK RESPONSE STATUS > IF FAIL ALERT ERROR MESSAGE
                            if(status == 'fail'){
                                //SET BUTTON DEFAULT STATE
                                jQuery("#getstarted_btn_submit").removeClass("disabled");
                                jQuery("#getstarted_btn_submit").removeClass("ng-loading");
                                //ALERT ERROR
                                swal({   
                                    title: "Whoops! Something went wrong.",   
                                    text: data,
                                    type: "error"
                                 });
                            }
                            //ELSE PERFORM SUCCESS EVENT
                            else{
                                //
                                swal({
                                    title: "Form Submitted!",   
                                    text: data,
                                    type: "success",
                                    showConfirmButton: false
                                });
                                //
                                setTimeout(function(){ window.location.href = "home.html" }, 7000);
                            }
                            */
                        },
                        error: function(){
                            //SET BUTTON DEFAULT STATE
                            jQuery("#form_btn_submit_3").removeClass("disabled");
                            jQuery("#form_btn_submit_3").removeClass("ng-loading");
                            //ALERT ERROR
                            swal({   
                                title: "Whoops! No Internet Access.",   
                                text: "Please save this form and try to submit later.",
                                type: "error"
                            });
                        }
                    });
                }
                else{
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                }

            });
        }
    });

    
    //SUBMIT INDICATOR FORMS FUNCTION - FORM 4
    jQuery(document).on("click", "#form_btn_submit_4", function(){

        //SET BUTTON LOADING STATE
        jQuery("#form_btn_submit_4").addClass("disabled");
        jQuery("#form_btn_submit_4").addClass("ng-loading");
        
        //VALIDATE FIELDS
        if(jQuery("#form_questionnaire_62").val()=='0'){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_4").removeClass("disabled");
            jQuery("#form_btn_submit_4").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Please answer the question - Misinformation of the public by the media", "warning");
        }
        //VALIDATE FIELDS
        else if(jQuery("#form_questionnaire_63").val()=='0'){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_4").removeClass("disabled");
            jQuery("#form_btn_submit_4").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Please answer the question - Lack of professionalism", "warning");
        }
        //VALIDATE FIELDS
        else if(jQuery("#form_questionnaire_64").val()=='0'){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_4").removeClass("disabled");
            jQuery("#form_btn_submit_4").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Please answer the question - Broadcast and publishing of hatred", "warning");
        }
        //VALIDATE FIELDS
        else if(jQuery("#form_questionnaire_65").val()=='0'){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_4").removeClass("disabled");
            jQuery("#form_btn_submit_4").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Please answer the question - Unequal access to media", "warning");
        }
        //VALIDATE FIELDS
        else if(jQuery("#form_questionnaire_66").val()=='0'){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_4").removeClass("disabled");
            jQuery("#form_btn_submit_4").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Please answer the question - Partisanship, favouritism and partiality", "warning");
        }
        //VALIDATE FIELDS
        else if(jQuery("#form_questionnaire_67").val()=='0'){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_4").removeClass("disabled");
            jQuery("#form_btn_submit_4").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Please answer the question - Failure of regulatory bodies to ensure adherence to established rules by the media", "warning");
        }
        //VALIDATE FIELDS
        else if(jQuery("#form_questionnaire_68").val()=='0'){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_4").removeClass("disabled");
            jQuery("#form_btn_submit_4").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Please answer the question - Sensationalism and provocation by the media", "warning");
        }
        //VALIDATE FIELDS
        else if(jQuery("#form_questionnaire_69").val()=='0'){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_4").removeClass("disabled");
            jQuery("#form_btn_submit_4").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Please answer the question - Abuse of social media", "warning");
        }
        //VALIDATE FIELDS
        else if(jQuery("#form_questionnaire_70").val()=='0'){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_4").removeClass("disabled");
            jQuery("#form_btn_submit_4").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Please answer the question - On the whole, how do you think that this election will go?", "warning");
        }
        else{
            
            //CONFIRM ACTION
            swal({
                title: "Submit Form",
                text: "Are you sure you want to submit this form data?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#39c480",
                confirmButtonText: "Yes, submit form!",
                closeOnConfirm: false
            },
            function(isConfirm){
                if (isConfirm) {
                    //
                    swal({
                        title: "Submitting",   
                        text: "Just a sec, processing...",
                        html: true,
                        showConfirmButton: false
                     });

                    //POST DETAILS TO SERVER
                    jQuery.ajax({
                        url: "http://demos.osusumobile.com/thinkhat/emsc/dashboard/api/post/form.php",
                        type: 'POST',
                        data: {
                            form_questionnaire_name: jQuery("#form_questionnaire_name").val(),
                            form_questionnaire_gender: jQuery("#form_questionnaire_gender").val(),
                            form_questionnaire_lga: jQuery("#form_questionnaire_lga").val(),

                            form_questionnaire_community: jQuery("#form_questionnaire_community").val(),
                            form_questionnaire_senatorial: jQuery("#form_questionnaire_senatorial").val(),
                            //
                            form_questionnaire_1: jQuery("#form_questionnaire_1").val(),
                            form_questionnaire_2: jQuery("#form_questionnaire_2").val(),
                            form_questionnaire_3: jQuery("#form_questionnaire_3").val(),
                            form_questionnaire_4: jQuery("#form_questionnaire_4").val(),
                            form_questionnaire_5: jQuery("#form_questionnaire_5").val(),
                            form_questionnaire_6: jQuery("#form_questionnaire_6").val(),
                            form_questionnaire_7: jQuery("#form_questionnaire_7").val(),
                            form_questionnaire_8: jQuery("#form_questionnaire_8").val(),
                            form_questionnaire_9: "Undecided",
                            form_questionnaire_10: jQuery("#form_questionnaire_10").val(),
                            form_questionnaire_11: jQuery("#form_questionnaire_11").val(),
                            form_questionnaire_12: jQuery("#form_questionnaire_12").val(),
                            form_questionnaire_13: jQuery("#form_questionnaire_13").val(),
                            form_questionnaire_14: jQuery("#form_questionnaire_14").val(),
                            form_questionnaire_15: jQuery("#form_questionnaire_15").val(),
                            form_questionnaire_16: jQuery("#form_questionnaire_16").val(),
                            form_questionnaire_17: jQuery("#form_questionnaire_17").val(),
                            form_questionnaire_18: jQuery("#form_questionnaire_18").val(),
                            form_questionnaire_19: jQuery("#form_questionnaire_19").val(),
                            form_questionnaire_20: jQuery("#form_questionnaire_20").val(),
                            //
                            form_questionnaire_21: jQuery("#form_questionnaire_21").val(),
                            form_questionnaire_22: jQuery("#form_questionnaire_22").val(),
                            form_questionnaire_23: jQuery("#form_questionnaire_23").val(),
                            form_questionnaire_24: jQuery("#form_questionnaire_24").val(),
                            form_questionnaire_25: jQuery("#form_questionnaire_25").val(),
                            form_questionnaire_26: jQuery("#form_questionnaire_26").val(),
                            form_questionnaire_27: jQuery("#form_questionnaire_27").val(),
                            form_questionnaire_28: jQuery("#form_questionnaire_28").val(),
                            form_questionnaire_29: jQuery("#form_questionnaire_29").val(),
                            form_questionnaire_30: jQuery("#form_questionnaire_30").val(),
                            form_questionnaire_31: jQuery("#form_questionnaire_31").val(),
                            form_questionnaire_32: jQuery("#form_questionnaire_32").val(),
                            form_questionnaire_33: jQuery("#form_questionnaire_33").val(),
                            form_questionnaire_34: jQuery("#form_questionnaire_34").val(),
                            form_questionnaire_35: jQuery("#form_questionnaire_35").val(),
                            form_questionnaire_36: jQuery("#form_questionnaire_36").val(),
                            form_questionnaire_37: jQuery("#form_questionnaire_37").val(),
                            form_questionnaire_38: jQuery("#form_questionnaire_38").val(),
                            form_questionnaire_39: jQuery("#form_questionnaire_39").val(),
                            form_questionnaire_40: jQuery("#form_questionnaire_40").val(),
                            //
                            form_questionnaire_41: jQuery("#form_questionnaire_41").val(),
                            form_questionnaire_42: jQuery("#form_questionnaire_42").val(),
                            form_questionnaire_43: jQuery("#form_questionnaire_43").val(),
                            form_questionnaire_44: jQuery("#form_questionnaire_44").val(),
                            form_questionnaire_45: jQuery("#form_questionnaire_45").val(),
                            form_questionnaire_46: jQuery("#form_questionnaire_46").val(),
                            form_questionnaire_47: jQuery("#form_questionnaire_47").val(),
                            form_questionnaire_48: jQuery("#form_questionnaire_48").val(),
                            form_questionnaire_49: jQuery("#form_questionnaire_49").val(),
                            form_questionnaire_50: jQuery("#form_questionnaire_50").val(),
                            form_questionnaire_51: jQuery("#form_questionnaire_51").val(),
                            form_questionnaire_52: jQuery("#form_questionnaire_52").val(),
                            form_questionnaire_53: jQuery("#form_questionnaire_53").val(),
                            form_questionnaire_54: jQuery("#form_questionnaire_54").val(),
                            form_questionnaire_55: jQuery("#form_questionnaire_55").val(),
                            form_questionnaire_56: jQuery("#form_questionnaire_56").val(),
                            form_questionnaire_57: jQuery("#form_questionnaire_57").val(),
                            form_questionnaire_58: jQuery("#form_questionnaire_58").val(),
                            form_questionnaire_59: jQuery("#form_questionnaire_59").val(),
                            form_questionnaire_60: jQuery("#form_questionnaire_60").val(),
                            //
                            form_questionnaire_61: jQuery("#form_questionnaire_61").val(),
                            form_questionnaire_62: jQuery("#form_questionnaire_62").val(),
                            form_questionnaire_63: jQuery("#form_questionnaire_63").val(),
                            form_questionnaire_64: jQuery("#form_questionnaire_64").val(),
                            form_questionnaire_65: jQuery("#form_questionnaire_65").val(),
                            form_questionnaire_66: jQuery("#form_questionnaire_66").val(),
                            form_questionnaire_67: jQuery("#form_questionnaire_67").val(),
                            form_questionnaire_68: jQuery("#form_questionnaire_68").val(),
                            form_questionnaire_69: jQuery("#form_questionnaire_69").val(),
                            form_questionnaire_70: jQuery("#form_questionnaire_70").val(),
                            text_form_id: jQuery("#form_id").val()
                        },
                        success: function(data){
                            //
                            swal({
                                title: "Form Submitted!",   
                                text: data,
                                type: "success",
                                showConfirmButton: false
                            });
                            //
                            setTimeout(function(){ window.location.href = "home.html" }, 7000);
                            /*
                            data = data.split('#');
                            status = data[0];
                            data = data[1];
                            //CHECK RESPONSE STATUS > IF FAIL ALERT ERROR MESSAGE
                            if(status == 'fail'){
                                //SET BUTTON DEFAULT STATE
                                jQuery("#getstarted_btn_submit").removeClass("disabled");
                                jQuery("#getstarted_btn_submit").removeClass("ng-loading");
                                //ALERT ERROR
                                swal({   
                                    title: "Whoops! Something went wrong.",   
                                    text: data,
                                    type: "error"
                                 });
                            }
                            //ELSE PERFORM SUCCESS EVENT
                            else{
                                //
                                swal({
                                    title: "Form Submitted!",   
                                    text: data,
                                    type: "success",
                                    showConfirmButton: false
                                });
                                //
                                setTimeout(function(){ window.location.href = "home.html" }, 7000);
                            }
                            */
                        },
                        error: function(){
                            //SET BUTTON DEFAULT STATE
                            jQuery("#form_btn_submit_4").removeClass("disabled");
                            jQuery("#form_btn_submit_4").removeClass("ng-loading");
                            //ALERT ERROR
                            swal({   
                                title: "Whoops! No Internet Access.",   
                                text: "Please save this form and try to submit later.",
                                type: "error"
                            });
                        }
                    });
                }
                else{
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                }

            });
        }
    });


    //SUBMIT INDICATOR FORMS FUNCTION - FORM 5
    jQuery(document).on("click", "#form_btn_submit_5", function(){

        //SET BUTTON LOADING STATE
        jQuery("#form_btn_submit_5").addClass("disabled");
        jQuery("#form_btn_submit_5").addClass("ng-loading");
        
        //VALIDATE FIELDS
        if(jQuery("#form_questionnaire_11").val()=='0'){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_5").removeClass("disabled");
            jQuery("#form_btn_submit_5").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Please answer the question - Do you think that reliability of election equipment could cause electoral violence in this area?", "warning");
        }
        //VALIDATE FIELDS
        else if(jQuery("#form_questionnaire_11_b").val()==''){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_5").removeClass("disabled");
            jQuery("#form_btn_submit_5").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Kindly explain why", "warning");
        }
        //VALIDATE FIELDS
        else if(jQuery("#form_questionnaire_12").val()=='0'){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_5").removeClass("disabled");
            jQuery("#form_btn_submit_5").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Please answer the question - Do you think that inadequate training and conduct of security agents is a factor that could lead to electoral violence in this area?", "warning");
        }
        //VALIDATE FIELDS
        else if(jQuery("#form_questionnaire_12_b").val()==''){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_5").removeClass("disabled");
            jQuery("#form_btn_submit_5").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Kindly explain why", "warning");
        }
        //VALIDATE FIELDS
        else if(jQuery("#form_questionnaire_13").val()=='0'){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_5").removeClass("disabled");
            jQuery("#form_btn_submit_5").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Please answer the question - Do you think that inadequate training and conduct of party agents is a factor that could lead to electoral violence in this area?", "warning");
        }
        //VALIDATE FIELDS
        else if(jQuery("#form_questionnaire_13_b").val()==''){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_5").removeClass("disabled");
            jQuery("#form_btn_submit_5").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Kindly explain why", "warning");
        }
        //VALIDATE FIELDS
        else if(jQuery("#form_questionnaire_14").val()=='0'){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_5").removeClass("disabled");
            jQuery("#form_btn_submit_5").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Please answer the question - Do you think that relationship between executives and legislature at federal and state levels contributes to electoral violence in this area?", "warning");
        }
        //VALIDATE FIELDS
        else if(jQuery("#form_questionnaire_14_b").val()==''){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_5").removeClass("disabled");
            jQuery("#form_btn_submit_5").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Kindly explain why", "warning");
        }
        //VALIDATE FIELDS
        else if(jQuery("#form_questionnaire_15").val()=='0'){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_5").removeClass("disabled");
            jQuery("#form_btn_submit_5").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Please answer the question - Do you think that relationship among the federal, state and local governments contributes to violence during the last election?", "warning");
        }
        //VALIDATE FIELDS
        else if(jQuery("#form_questionnaire_15_b").val()==''){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_5").removeClass("disabled");
            jQuery("#form_btn_submit_5").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Kindly explain why", "warning");
        }
        //VALIDATE FIELDS
        else if(jQuery("#form_questionnaire_16").val()=='0'){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_5").removeClass("disabled");
            jQuery("#form_btn_submit_5").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Please answer the question - Do you think that INEC’s information management is a factor that can contribute to electoral violence in this area?", "warning");
        }
        //VALIDATE FIELDS
        else if(jQuery("#form_questionnaire_16_b").val()==''){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_5").removeClass("disabled");
            jQuery("#form_btn_submit_5").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Kindly explain why", "warning");
        }
        //VALIDATE FIELDS
        else if(jQuery("#form_questionnaire_17").val()=='0'){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_5").removeClass("disabled");
            jQuery("#form_btn_submit_5").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Please answer the question - Do you agree that strong opposition can cause electoral violence in this area?", "warning");
        }
        //VALIDATE FIELDS
        else if(jQuery("#form_questionnaire_17_b").val()==''){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_5").removeClass("disabled");
            jQuery("#form_btn_submit_5").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Kindly explain why", "warning");
        }
        //VALIDATE FIELDS
        else if(jQuery("#form_questionnaire_18").val()=='0'){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_5").removeClass("disabled");
            jQuery("#form_btn_submit_5").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Please answer the question - Do you think that political interference with the work of INEC could lead to electoral violence in this area?", "warning");
        }
        //VALIDATE FIELDS
        else if(jQuery("#form_questionnaire_18_b").val()==''){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_5").removeClass("disabled");
            jQuery("#form_btn_submit_5").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Kindly explain why", "warning");
        }
        //VALIDATE FIELDS
        else if(jQuery("#form_questionnaire_19").val()=='0'){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_5").removeClass("disabled");
            jQuery("#form_btn_submit_5").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Please answer the question - Do you think that the involvement of informal policing groups could lead to electoral violence in the area?", "warning");
        }
        //VALIDATE FIELDS
        else if(jQuery("#form_questionnaire_19_b").val()==''){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_5").removeClass("disabled");
            jQuery("#form_btn_submit_5").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Kindly explain why", "warning");
        }
        else{
            
            //CONFIRM ACTION
            swal({
                title: "Submit Form",
                text: "Are you sure you want to submit this form data?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#39c480",
                confirmButtonText: "Yes, submit form!",
                closeOnConfirm: false
            },
            function(isConfirm){
                if (isConfirm) {
                    //
                    swal({
                        title: "Submitting",   
                        text: "Just a sec, processing...",
                        html: true,
                        showConfirmButton: false
                     });

                    //POST DETAILS TO SERVER
                    jQuery.ajax({
                        url: "http://demos.osusumobile.com/thinkhat/emsc/dashboard/api/post/form.php",
                        type: 'POST',
                        data: {
                            form_questionnaire_name: jQuery("#form_questionnaire_name").val(),
                            form_questionnaire_gender: jQuery("#form_questionnaire_gender").val(),
                            form_questionnaire_lga: jQuery("#form_questionnaire_lga").val(),

                            form_questionnaire_community: jQuery("#form_questionnaire_community").val(),
                            form_questionnaire_senatorial: jQuery("#form_questionnaire_senatorial").val(),
                            //
                            form_questionnaire_1: jQuery("#form_questionnaire_1").val(),
                            form_questionnaire_1_b: jQuery("#form_questionnaire_1_b").val(),
                            form_questionnaire_2: jQuery("#form_questionnaire_2").val(),
                            form_questionnaire_2_b: jQuery("#form_questionnaire_2_b").val(),
                            form_questionnaire_3: jQuery("#form_questionnaire_3").val(),
                            form_questionnaire_3_b: jQuery("#form_questionnaire_3_b").val(),
                            form_questionnaire_4: jQuery("#form_questionnaire_4").val(),
                            form_questionnaire_4_b: jQuery("#form_questionnaire_4_b").val(),
                            form_questionnaire_5: jQuery("#form_questionnaire_5").val(),
                            form_questionnaire_5_b: jQuery("#form_questionnaire_5_b").val(),
                            form_questionnaire_6: jQuery("#form_questionnaire_6").val(),
                            form_questionnaire_6_b: jQuery("#form_questionnaire_6_b").val(),
                            form_questionnaire_7: jQuery("#form_questionnaire_7").val(),
                            form_questionnaire_7_b: jQuery("#form_questionnaire_7_b").val(),
                            form_questionnaire_8: jQuery("#form_questionnaire_8").val(),
                            form_questionnaire_8_b: jQuery("#form_questionnaire_8_b").val(),
                            form_questionnaire_9: jQuery("#form_questionnaire_9").val(),
                            form_questionnaire_9_b: jQuery("#form_questionnaire_9_b").val(),
                            form_questionnaire_10: jQuery("#form_questionnaire_10").val(),
                            form_questionnaire_10_b: jQuery("#form_questionnaire_10_b").val(),
                            form_questionnaire_11: jQuery("#form_questionnaire_11").val(),
                            form_questionnaire_11_b: jQuery("#form_questionnaire_11_b").val(),
                            form_questionnaire_12: jQuery("#form_questionnaire_12").val(),
                            form_questionnaire_12_b: jQuery("#form_questionnaire_12_b").val(),
                            form_questionnaire_13: jQuery("#form_questionnaire_13").val(),
                            form_questionnaire_13_b: jQuery("#form_questionnaire_13_b").val(),
                            form_questionnaire_14: jQuery("#form_questionnaire_14").val(),
                            form_questionnaire_14_b: jQuery("#form_questionnaire_14_b").val(),
                            form_questionnaire_15: jQuery("#form_questionnaire_15").val(),
                            form_questionnaire_15_b: jQuery("#form_questionnaire_15_b").val(),
                            form_questionnaire_16: jQuery("#form_questionnaire_16").val(),
                            form_questionnaire_16_b: jQuery("#form_questionnaire_16_b").val(),
                            form_questionnaire_17: jQuery("#form_questionnaire_17").val(),
                            form_questionnaire_17_b: jQuery("#form_questionnaire_17_b").val(),
                            form_questionnaire_18: jQuery("#form_questionnaire_18").val(),
                            form_questionnaire_18_b: jQuery("#form_questionnaire_18_b").val(),
                            form_questionnaire_19: jQuery("#form_questionnaire_19").val(),
                            form_questionnaire_19_b: jQuery("#form_questionnaire_19_b").val(),
                            //
                            text_form_id: jQuery("#form_id").val()
                        },
                        success: function(data){
                            //
                            swal({
                                title: "Form Submitted!",   
                                text: data,
                                type: "success",
                                showConfirmButton: false
                            });
                            //
                            setTimeout(function(){ window.location.href = "home.html" }, 7000);
                            /*
                            data = data.split('#');
                            status = data[0];
                            data = data[1];
                            //CHECK RESPONSE STATUS > IF FAIL ALERT ERROR MESSAGE
                            if(status == 'fail'){
                                //SET BUTTON DEFAULT STATE
                                jQuery("#getstarted_btn_submit").removeClass("disabled");
                                jQuery("#getstarted_btn_submit").removeClass("ng-loading");
                                //ALERT ERROR
                                swal({   
                                    title: "Whoops! Something went wrong.",   
                                    text: data,
                                    type: "error"
                                 });
                            }
                            //ELSE PERFORM SUCCESS EVENT
                            else{
                                //
                                swal({
                                    title: "Form Submitted!",   
                                    text: data,
                                    type: "success",
                                    showConfirmButton: false
                                });
                                //
                                setTimeout(function(){ window.location.href = "home.html" }, 7000);
                            }
                            */
                        },
                        error: function(){
                            //SET BUTTON DEFAULT STATE
                            jQuery("#form_btn_submit_5").removeClass("disabled");
                            jQuery("#form_btn_submit_5").removeClass("ng-loading");
                            //ALERT ERROR
                            swal({   
                                title: "Whoops! No Internet Access.",   
                                text: "Please save this form and try to submit later.",
                                type: "error"
                            });
                        }
                    });
                }
                else{
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_5").removeClass("disabled");
                    jQuery("#form_btn_submit_5").removeClass("ng-loading");
                }

            });
        }
    });


    //SUBMIT INDICATOR FORMS FUNCTION - FORM 6
    jQuery(document).on("click", "#form_btn_submit_6", function(){

        //SET BUTTON LOADING STATE
        jQuery("#form_btn_submit_6").addClass("disabled");
        jQuery("#form_btn_submit_6").addClass("ng-loading");
        
         //VALIDATE FIELDS
        if(jQuery("#form_questionnaire_name").val()==''){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_6").removeClass("disabled");
            jQuery("#form_btn_submit_6").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Please enter name", "warning");
        }
        //VALIDATE FIELDS
        else if(jQuery("#form_questionnaire_gender").val()=='0'){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_6").removeClass("disabled");
            jQuery("#form_btn_submit_6").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Please answer the question - Please select gender", "warning");
        }
        //VALIDATE FIELDS
        else if(jQuery("#form_questionnaire_community").val()==''){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_6").removeClass("disabled");
            jQuery("#form_btn_submit_6").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Please answer the question - What community are you covering?", "warning");
        }
        //VALIDATE FIELDS
        else if(jQuery("#form_questionnaire_senatorial").val()==''){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_6").removeClass("disabled");
            jQuery("#form_btn_submit_6").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Please answer the question - What senatorial district are you covering?", "warning");
        }
        //VALIDATE FIELDS
        else if(jQuery("#form_questionnaire_lga").val()=='0'){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_6").removeClass("disabled");
            jQuery("#form_btn_submit_6").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Please answer the question - What LGA are you covering?", "warning");
        }
        //VALIDATE FIELDS
        else if(jQuery("#form_questionnaire_1").val()=='0'){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_6").removeClass("disabled");
            jQuery("#form_btn_submit_6").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Please answer the question - Has voter education campaign started in your LGA?", "warning");
        }
        //VALIDATE FIELDS
        else if(jQuery("#form_questionnaire_2").val()=='0'){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_6").removeClass("disabled");
            jQuery("#form_btn_submit_6").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Please answer the question - Is the voter education sensitive about, and accessible to all citizens?", "warning");
        }
        //VALIDATE FIELDS
        else if(jQuery("#form_questionnaire_3").val()=='0'){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_6").removeClass("disabled");
            jQuery("#form_btn_submit_6").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Please answer the question - How will you rate the level of voter understanding of the voting procedures in your LGA?", "warning");
        }
        //VALIDATE FIELDS
        else if(jQuery("#form_questionnaire_4").val()=='0'){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_6").removeClass("disabled");
            jQuery("#form_btn_submit_6").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Please answer the question - Through which medium are voter education information dissemination in your LGA?", "warning");
        }
        //VALIDATE FIELDS
        else if(jQuery("#form_questionnaire_4_b").val()==''){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_6").removeClass("disabled");
            jQuery("#form_btn_submit_6").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Please answer the question - Kindly explain others", "warning");
        }
        //VALIDATE FIELDS
        else if(jQuery("#form_questionnaire_5").val()==''){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_6").removeClass("disabled");
            jQuery("#form_btn_submit_6").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Please answer the question - Which medium was more helpful?", "warning");
        }
        //VALIDATE FIELDS
        else if(jQuery("#form_questionnaire_6").val()=='0'){
            //SET BUTTON DEFAULT STATE
            jQuery("#form_btn_submit_6").removeClass("disabled");
            jQuery("#form_btn_submit_6").removeClass("ng-loading");
            //ALERT ERROR
            swal("Invalid Answer!", "Please answer the question - Are you satisfied with the content and level of information dissemination?", "warning");
        }
        else{
            
            //CONFIRM ACTION
            swal({
                title: "Submit Form",
                text: "Are you sure you want to submit this form data?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#39c480",
                confirmButtonText: "Yes, submit form!",
                closeOnConfirm: false
            },
            function(isConfirm){
                if (isConfirm) {
                    //
                    swal({
                        title: "Submitting",   
                        text: "Just a sec, processing...",
                        html: true,
                        showConfirmButton: false
                     });

                    //POST DETAILS TO SERVER
                    jQuery.ajax({
                        url: "http://demos.osusumobile.com/thinkhat/emsc/dashboard/api/post/form.php",
                        type: 'POST',
                        data: {
                            form_questionnaire_name: jQuery("#form_questionnaire_name").val(),
                            form_questionnaire_gender: jQuery("#form_questionnaire_gender").val(),
                            form_questionnaire_lga: jQuery("#form_questionnaire_lga").val(),

                            form_questionnaire_community: jQuery("#form_questionnaire_community").val(),
                            form_questionnaire_senatorial: jQuery("#form_questionnaire_senatorial").val(),
                            //
                            form_questionnaire_1: jQuery("#form_questionnaire_1").val(),
                            form_questionnaire_2: jQuery("#form_questionnaire_2").val(),
                            form_questionnaire_3: jQuery("#form_questionnaire_3").val(),
                            form_questionnaire_4: jQuery("#form_questionnaire_4").val(),
                            form_questionnaire_4_b: jQuery("#form_questionnaire_4_b").val(),
                            form_questionnaire_5: jQuery("#form_questionnaire_5").val(),
                            form_questionnaire_6: jQuery("#form_questionnaire_6").val(),
                            //
                            text_form_id: jQuery("#form_id").val()
                        },
                        success: function(data){
                            //
                            swal({
                                title: "Form Submitted!",   
                                text: data,
                                type: "success",
                                showConfirmButton: false
                            });
                            //
                            setTimeout(function(){ window.location.href = "home.html" }, 7000);
                            /*
                            data = data.split('#');
                            status = data[0];
                            data = data[1];
                            //CHECK RESPONSE STATUS > IF FAIL ALERT ERROR MESSAGE
                            if(status == 'fail'){
                                //SET BUTTON DEFAULT STATE
                                jQuery("#getstarted_btn_submit").removeClass("disabled");
                                jQuery("#getstarted_btn_submit").removeClass("ng-loading");
                                //ALERT ERROR
                                swal({   
                                    title: "Whoops! Something went wrong.",   
                                    text: data,
                                    type: "error"
                                 });
                            }
                            //ELSE PERFORM SUCCESS EVENT
                            else{
                                //
                                swal({
                                    title: "Form Submitted!",   
                                    text: data,
                                    type: "success",
                                    showConfirmButton: false
                                });
                                //
                                setTimeout(function(){ window.location.href = "home.html" }, 7000);
                            }
                            */
                        },
                        error: function(){
                            //SET BUTTON DEFAULT STATE
                            jQuery("#form_btn_submit_6").removeClass("disabled");
                            jQuery("#form_btn_submit_6").removeClass("ng-loading");
                            //ALERT ERROR
                            swal({   
                                title: "Whoops! No Internet Access.",   
                                text: "Please save this form and try to submit later.",
                                type: "error"
                            });
                        }
                    });
                }
                else{
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_6").removeClass("disabled");
                    jQuery("#form_btn_submit_6").removeClass("ng-loading");
                }

            });
        }
    });


    //CHECK IF PAGE IS START > 
    if(document.getElementById('current_page_start')){
        
        //GET PIN CONFIRMED > CHECK IF PIN CONFIRMED IS 1
        if(jQuery("#user_pin_confirm").val() == 1){
            //REMOVE LOADING ICON & SHOW SUCCESS ICON
            jQuery(".page-activate").addClass("success");
            jQuery(".activate-icon").html("<i class='pe-7s-check'></i>");
            //SET SUCCESS MESSAGE
            jQuery(".activate-text").html("Saver's profile successfully created.");
            jQuery(".showActivated").show();
        }
        else{
            
        }

    }

    //SAVE FORM SUBMIT FUNCTION
    jQuery(document).on("click", ".btn-save-q", function(){
		
        //SET BUTTON LOADING STATE
        jQuery(".btn-save-q").addClass("disabled");
        jQuery(".btn-save-q").addClass("ng-loading");
		
		//
		swal({   
			title: "Form Saved!",   
			text: "Your Form has been successfully saved. You can return to it at any time. Please wait while we redirect you back home...",
			type: "success",
			showConfirmButton: false
		});
		//
		setTimeout(function(){ window.location.href = "home.html" }, 7000);
		
	});
	
	
	//GO-TO NEXT PAGE FUNCTION
    jQuery(document).on("click", ".btn-next-section", function(){
		//
		var getFormSteps = jQuery("#form_section_steps").val();
        var getFormID = jQuery("#form_id").val();

        //CHECK IF 3RD FORM
        if(getFormID == 3){

            //VALIDATE FORMS
            if(getFormSteps == 1){

                //VALIDATE FIELDS
                if(jQuery("#form_questionnaire_name").val()==''){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please enter name", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_gender").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Please select gender", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_community").val()==''){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - What community are you covering?", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_senatorial").val()==''){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - What senatorial district are you covering?", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_lga").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - What LGA are you covering?", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_1").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Do you agree that election in this area will be peaceful?", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_2").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Do you agree that there has been a history of electoral violence in this area?", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_3").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Do you agree that hate speech can make election violent in this area?", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_4").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Do you agree that inter-ethnic/religious/communal conflicts can cause election violence in this area?", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_5").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Do you agree that troublesome politicians, political parties, leaders and candidates could cause electoral violence in this area?", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_6").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Do you agree that attempt by illegal immigrants to participate in the electoral process could cause electoral violence in this area?", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_7").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Do you agree that citizens' disaffection with government could result to electoral violence in this area?", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_8").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Do you agree that widespread availability and use of hard drugs can bring about electoral violence in this area?", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_10").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Do you agree that confusing electoral laws could bring about electoral violence in this area?", "warning");
                }
                else{
                    
                    getFormSteps = ++getFormSteps;
                    jQuery(".form-sections").hide();
                    jQuery("#section"+getFormSteps).show();
                    jQuery("#form_section_steps").val(getFormSteps);
                }
            }
            else if(getFormSteps == 2){

                //VALIDATE FIELDS
                if(jQuery("#form_questionnaire_12").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Ethnic minorities", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_13").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Women", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_14").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - The youth", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_15").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - The elderly", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_16").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - People living with disability", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_17").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Religious groups", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_18").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Sexuality", "warning");
                }
                else{
                    
                    getFormSteps = ++getFormSteps;
                    jQuery(".form-sections").hide();
                    jQuery("#section"+getFormSteps).show();
                    jQuery("#form_section_steps").val(getFormSteps);
                }
            }
            else if(getFormSteps == 3){

                //VALIDATE FIELDS
                if(jQuery("#form_questionnaire_19").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Political parties (intra and inter party)", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_20").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - INEC", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_21").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Security agencies", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_22").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - The judiciary", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_23").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - The media", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_24").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Traditional institutions", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_25").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Party thugs", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_26").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Vigilante groups", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_27").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Insurgents", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_28").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Religious extremists, cultists, and other armed groups", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_29").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Civil Society Organisations (CSOs)", "warning");
                }
                else{
                    
                    getFormSteps = ++getFormSteps;
                    jQuery(".form-sections").hide();
                    jQuery("#section"+getFormSteps).show();
                    jQuery("#form_section_steps").val(getFormSteps);
                }
            }
            else if(getFormSteps == 4){

                //VALIDATE FIELDS
                if(jQuery("#form_questionnaire_30").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Contentious party conventions/ primaries/meetings", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_31").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Disorderly party rallies, processions and campaigns", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_32").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Lack of respect for party rules", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_33").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Undue influence of money and godfathers", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_34").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Lack of transparency and disagreements over the selection of party officials and candidates", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_35").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Defections and cross carpeting from one party to another", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_36").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Lack of training and corruption of party agents", "warning");
                }
                else{
                    
                    getFormSteps = ++getFormSteps;
                    jQuery(".form-sections").hide();
                    jQuery("#section"+getFormSteps).show();
                    jQuery("#form_section_steps").val(getFormSteps);
                }
            }
            else if(getFormSteps == 5){

                //VALIDATE FIELDS
                if(jQuery("#form_questionnaire_37").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Problems associated with the continuous voter registration exercise", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_38").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Problems of underage registration", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_39").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Problems associated with the distribution of PVCs", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_40").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Poor voter education by INEC", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_41").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Movement and distribution of election materials", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_42").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Quality of election officials", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_43").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Substitution of trained electoral officials", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_44").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Problems associated with the distribution, location and adequacy of polling units and voting points", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_45").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Failure to prosecute electoral offenders", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_46").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Partiality of INEC officials", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_47").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Do you agree that INEC’s overall preparedness constitutes a threat to peaceful conduct of this election?", "warning");
                }
                else{
                    
                    getFormSteps = ++getFormSteps;
                    jQuery(".form-sections").hide();
                    jQuery("#section"+getFormSteps).show();
                    jQuery("#form_section_steps").val(getFormSteps);
                }
            }
            else if(getFormSteps == 6){

                //VALIDATE FIELDS
                if(jQuery("#form_questionnaire_48").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Partiality of security agents", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_49").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Inadequate or excessive presence of security agents", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_50").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Aggressive and excessive use of force", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_51").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Poor training and low professionalism of security agents", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_52").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Lack of synergy among security agents", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_53").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Lack of synergy between INEC and security agencies", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_54").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Low sense of safety among members of the public (banditry, kidnapping, assassination, etc)", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_55").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Problems associated with the deployment of security agents", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_56").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Problem associated with the welfare of security agents", "warning");
                }
                else{
                    
                    getFormSteps = ++getFormSteps;
                    jQuery(".form-sections").hide();
                    jQuery("#section"+getFormSteps).show();
                    jQuery("#form_section_steps").val(getFormSteps);
                }
            }
            else if(getFormSteps == 7){
                
                //VALIDATE FIELDS
                if(jQuery("#form_questionnaire_57").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Delays in the handling of pre-election cases", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_58").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Partiality of the judiciary", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_59").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Corruption and integrity of the judiciary", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_60").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Capacity of the judiciary (including inadequacy of judges)", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_61").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_3").removeClass("disabled");
                    jQuery("#form_btn_submit_3").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Confusing and contradictory court decisions", "warning");
                }
                else{
                    
                    getFormSteps = ++getFormSteps;
                    jQuery(".form-sections").hide();
                    jQuery("#section"+getFormSteps).show();
                    jQuery("#form_section_steps").val(getFormSteps);
                }
            }
            else{

                getFormSteps = ++getFormSteps;
                jQuery(".form-sections").hide();
                jQuery("#section"+getFormSteps).show();
                jQuery("#form_section_steps").val(getFormSteps);
            }

        }
        //ELSE IF 4TH FORM
        else if(getFormID == 4){

            //VALIDATE FORMS
            if(getFormSteps == 1){

                //VALIDATE FIELDS
                if(jQuery("#form_questionnaire_name").val()==''){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please enter name", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_gender").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Please select gender", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_community").val()==''){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - What community are you covering?", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_senatorial").val()==''){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - What senatorial district are you covering?", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_lga").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - What LGA are you covering?", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_1").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Do you agree that election in this area will be peaceful?", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_2").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Do you agree that there has been a history of electoral violence in this area?", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_3").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Do you agree that hate speech can make election violent in this area?", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_4").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Do you agree that inter-ethnic/religious/communal conflicts can cause election violence in this area?", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_5").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Do you agree that troublesome politicians, political parties, leaders and candidates could cause electoral violence in this area?", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_6").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Do you agree that attempt by illegal immigrants to participate in the electoral process could cause electoral violence in this area?", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_7").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Do you agree that citizens' disaffection with government could result to electoral violence in this area?", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_8").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Do you agree that widespread availability and use of hard drugs can bring about electoral violence in this area?", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_10").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Do you agree that confusing electoral laws could bring about electoral violence in this area?", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_11").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Do you agree that overall disenchantment with the electoral process can lead to electoral violence in this area?", "warning");
                }
                else{
                    
                    getFormSteps = ++getFormSteps;
                    jQuery(".form-sections").hide();
                    jQuery("#section"+getFormSteps).show();
                    jQuery("#form_section_steps").val(getFormSteps);
                }
            }
            else if(getFormSteps == 2){

                //VALIDATE FIELDS
                if(jQuery("#form_questionnaire_12").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Ethnic minorities", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_13").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Women", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_14").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - The youth", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_15").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - The elderly", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_16").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - People living with disability", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_17").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Religious groups", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_18").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Sexuality", "warning");
                }
                else{
                    
                    getFormSteps = ++getFormSteps;
                    jQuery(".form-sections").hide();
                    jQuery("#section"+getFormSteps).show();
                    jQuery("#form_section_steps").val(getFormSteps);
                }
            }
            else if(getFormSteps == 3){

                //VALIDATE FIELDS
                if(jQuery("#form_questionnaire_19").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Political parties (intra and inter party)", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_20").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - INEC", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_21").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Security agencies", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_22").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - The judiciary", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_23").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - The media", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_24").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Traditional institutions", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_25").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Party thugs", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_26").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Vigilante groups", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_27").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Insurgents", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_28").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Religious extremists, cultists, and other armed groups", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_29").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Civil Society Organisations (CSOs)", "warning");
                }
                else{
                    
                    getFormSteps = ++getFormSteps;
                    jQuery(".form-sections").hide();
                    jQuery("#section"+getFormSteps).show();
                    jQuery("#form_section_steps").val(getFormSteps);
                }
            }
            else if(getFormSteps == 4){

                //VALIDATE FIELDS
                if(jQuery("#form_questionnaire_30").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Contentious party conventions/ primaries/meetings", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_31").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Disorderly party rallies, processions and campaigns", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_32").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Lack of respect for party rules", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_33").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Undue influence of money and godfathers", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_34").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Lack of transparency and disagreements over the selection of party officials and candidates", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_35").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Defections and cross carpeting from one party to another", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_36").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Lack of training and corruption of party agents", "warning");
                }
                else{
                    
                    getFormSteps = ++getFormSteps;
                    jQuery(".form-sections").hide();
                    jQuery("#section"+getFormSteps).show();
                    jQuery("#form_section_steps").val(getFormSteps);
                }
            }
            else if(getFormSteps == 5){

                //VALIDATE FIELDS
                if(jQuery("#form_questionnaire_37").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Problems associated with the continuous voter registration exercise", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_38").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Problems of underage registration", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_39").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Problems associated with the distribution of PVCs", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_40").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Poor voter education by INEC", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_41").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Movement and distribution of election materials", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_42").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Quality of election officials", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_43").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Substitution of trained electoral officials", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_44").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Problems associated with the distribution, location and adequacy of polling units and voting points", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_45").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Failure to prosecute electoral offenders", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_46").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Partiality of INEC officials", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_47").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Do you agree that INEC’s overall preparedness constitutes a threat to peaceful conduct of this election?", "warning");
                }
                else{
                    
                    getFormSteps = ++getFormSteps;
                    jQuery(".form-sections").hide();
                    jQuery("#section"+getFormSteps).show();
                    jQuery("#form_section_steps").val(getFormSteps);
                }
            }
            else if(getFormSteps == 6){

                //VALIDATE FIELDS
                if(jQuery("#form_questionnaire_48").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Partiality of security agents", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_49").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Inadequate or excessive presence of security agents", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_50").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Aggressive and excessive use of force", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_51").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Poor training and low professionalism of security agents", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_52").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Lack of synergy among security agents", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_53").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Lack of synergy between INEC and security agencies", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_54").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Low sense of safety among members of the public (banditry, kidnapping, assassination, etc)", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_55").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Problems associated with the deployment of security agents", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_56").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Problem associated with the welfare of security agents", "warning");
                }
                else{
                    
                    getFormSteps = ++getFormSteps;
                    jQuery(".form-sections").hide();
                    jQuery("#section"+getFormSteps).show();
                    jQuery("#form_section_steps").val(getFormSteps);
                }
            }
            else if(getFormSteps == 7){
                
                //VALIDATE FIELDS
                if(jQuery("#form_questionnaire_57").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Delays in the handling of pre-election cases", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_58").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Partiality of the judiciary", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_59").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Corruption and integrity of the judiciary", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_60").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Capacity of the judiciary (including inadequacy of judges)", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_61").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_4").removeClass("disabled");
                    jQuery("#form_btn_submit_4").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Confusing and contradictory court decisions", "warning");
                }
                else{
                    
                    getFormSteps = ++getFormSteps;
                    jQuery(".form-sections").hide();
                    jQuery("#section"+getFormSteps).show();
                    jQuery("#form_section_steps").val(getFormSteps);
                }
            }
            else{

                getFormSteps = ++getFormSteps;
                jQuery(".form-sections").hide();
                jQuery("#section"+getFormSteps).show();
                jQuery("#form_section_steps").val(getFormSteps);
            }

        }
        //ELSE IF 5TH FORM
        else{

            if(getFormSteps == 1){
                
                //VALIDATE FIELDS
                if(jQuery("#form_questionnaire_name").val()==''){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_5").removeClass("disabled");
                    jQuery("#form_btn_submit_5").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please enter name", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_gender").val()=='0'){
                   //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_5").removeClass("disabled");
                    jQuery("#form_btn_submit_5").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Please select gender", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_community").val()==''){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_5").removeClass("disabled");
                    jQuery("#form_btn_submit_5").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - What community are you covering?", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_senatorial").val()==''){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_5").removeClass("disabled");
                    jQuery("#form_btn_submit_5").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - What senatorial district are you covering?", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_lga").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_5").removeClass("disabled");
                    jQuery("#form_btn_submit_5").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - What LGA are you covering?", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_1").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_5").removeClass("disabled");
                    jQuery("#form_btn_submit_5").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Do you think that geographical terrain of this area is a factor that could lead to electoral violence?", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_1_b").val()==''){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_5").removeClass("disabled");
                    jQuery("#form_btn_submit_5").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Kindly explain why", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_2").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_5").removeClass("disabled");
                    jQuery("#form_btn_submit_5").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Do you think that non adherence to processes and procedures could lead to electoral violence in this area?", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_2_b").val()==''){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_5").removeClass("disabled");
                    jQuery("#form_btn_submit_5").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Kindly explain why", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_3").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_5").removeClass("disabled");
                    jQuery("#form_btn_submit_5").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Do you think that population displacement and population movement has been creating tension and violence in this area that may affect the election?", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_3_b").val()==''){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_5").removeClass("disabled");
                    jQuery("#form_btn_submit_5").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Kindly explain why", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_4").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_5").removeClass("disabled");
                    jQuery("#form_btn_submit_5").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Do you think that foreign interests (including foreign election observers) and interference could lead to electoral violence in this area?", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_4_b").val()==''){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_5").removeClass("disabled");
                    jQuery("#form_btn_submit_5").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Kindly explain why", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_5").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_5").removeClass("disabled");
                    jQuery("#form_btn_submit_5").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Do you think that funding of election is a factor that could trigger violence in this area?", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_5_b").val()==''){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_5").removeClass("disabled");
                    jQuery("#form_btn_submit_5").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Kindly explain why", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_6").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_5").removeClass("disabled");
                    jQuery("#form_btn_submit_5").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Do you think that problems with payment of election workers is a factor to be considered in electoral violence in this area?", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_6_b").val()==''){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_5").removeClass("disabled");
                    jQuery("#form_btn_submit_5").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Kindly explain why", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_7").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_5").removeClass("disabled");
                    jQuery("#form_btn_submit_5").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Do you think problems associated with the recruitment of INEC ad-hoc staff could lead to electoral violence in this area?", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_7_b").val()==''){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_5").removeClass("disabled");
                    jQuery("#form_btn_submit_5").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Kindly explain why", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_8").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_5").removeClass("disabled");
                    jQuery("#form_btn_submit_5").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - >Do you think that power of incumbency has a role to play in causing electoral violence in this area?", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_8_b").val()==''){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_5").removeClass("disabled");
                    jQuery("#form_btn_submit_5").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Kindly explain why", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_9").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_5").removeClass("disabled");
                    jQuery("#form_btn_submit_5").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - >Do you agree that proliferation of small arms and light weapons can bring about violence during elections in this area?", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_9_b").val()==''){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_5").removeClass("disabled");
                    jQuery("#form_btn_submit_5").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Kindly explain why", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_10").val()=='0'){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_5").removeClass("disabled");
                    jQuery("#form_btn_submit_5").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Please answer the question - Do you agree that corruption among INEC officials contributes to electoral violence?", "warning");
                }
                //VALIDATE FIELDS
                else if(jQuery("#form_questionnaire_10_b").val()==''){
                    //SET BUTTON DEFAULT STATE
                    jQuery("#form_btn_submit_5").removeClass("disabled");
                    jQuery("#form_btn_submit_5").removeClass("ng-loading");
                    //ALERT ERROR
                    swal("Invalid Answer!", "Kindly explain why", "warning");
                }
                else{
                    
                    getFormSteps = ++getFormSteps;
                    jQuery(".form-sections").hide();
                    jQuery("#section"+getFormSteps).show();
                    jQuery("#form_section_steps").val(getFormSteps);
                }
            }
            else{

                getFormSteps = ++getFormSteps;
                jQuery(".form-sections").hide();
                jQuery("#section"+getFormSteps).show();
                jQuery("#form_section_steps").val(getFormSteps);
            }

        }
		
	});
	
	//GO-Back PREVIOUS PAGE FUNCTION
    jQuery(document).on("click", ".btn-forms-back", function(){
		//
		var getFormSteps = jQuery("#form_section_steps").val();
		getFormSteps = --getFormSteps;
		jQuery(".form-sections").hide();
		jQuery("#section"+getFormSteps).show();
		jQuery("#form_section_steps").val(getFormSteps);
	});


    jQuery(document).on("change", "#form_questionnaire_4", function(){
        //
        if(jQuery(this).val() == "Others"){
            //SHOW
            jQuery(".question_4_b").show();
        }
        else{
            //HIDE
            jQuery(".question_4_b").hide();
        }
    });

}(window.jQuery);