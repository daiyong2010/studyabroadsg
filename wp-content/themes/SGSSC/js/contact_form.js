$(document).ready(function(){
	var nameError = true;
	var emailError = true;
	var messageError = true;
	
/*	var emailVal;
	var nameVal;
	var messageVal;
	*/
	$(".error").hide();
	
	jQuery.fn.checkEmail = function(){
		var emailVal = $(this).val();
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		
		if(emailVal == '') {
			$(this).next("p").fadeOut("fast").html("Please enter your email address").fadeIn("fast");
			emailError = true;
		} else if(!emailReg.test(emailVal)) {
			$(this).next("p").fadeOut("fast").html("Please enter a valid email address").fadeIn("fast");
			emailError = true;
		} else {
			$(this).next("p").fadeOut("fast");
			emailError = false;
		}
	}
	
	jQuery.fn.checkName = function(){
		var nameVal = $(this).val();
		
		if(nameVal == '') {
			$(this).next("p").fadeOut("fast").html("Please enter your name").fadeIn("fast");
			nameError = true;
		} else {
			$(this).next("p").fadeOut("fast");
			nameError = false;
		}		
	}
	
	jQuery.fn.checkMessage = function(){
		var messageVal = $(this).val();
		
		if(messageVal == '') {
			$(this).next("p").fadeOut("fast").html("Please enter your message to us").fadeIn("fast");
			messageError = true;
		} else {
			$(this).next("p").fadeOut("fast");
			messageError = false;
		}
	}

	$("#contact_email").change(function(){
		$(this).checkEmail();
	});
	
	$("#contact_name").change(function(){
		$(this).checkName();
	});
	
	$("#contact_message").change(function(){
		$(this).checkMessage();
	});
	
	$("#submit").click(function(){
		$("#contact_email").checkEmail();
		$("#contact_name").checkName();
		$("#contact_message").checkMessage();
		
		if(!emailError && !nameError && !messageError) {
			$(this).hide();
			$(this).parent("li").append("<img src='http://studyabroadsg.com/wp-content/themes/SGSSC/images/loading.gif' alt='Loading' width='32' height='32' />");
			
			nameVal    = $("#contact_name").val();
			emailVal   = $("#contact_email").val();
			messageVal = $("#contact_message").val();
			
			$.post("http://studyabroadsg.com/wp-content/themes/SGSSC/sendemail.php",
   				{ contact_name: nameVal, contact_email: emailVal, contact_message: messageVal },
   					function(data){
						$("#contact_form").slideUp("slow", function() {				   
							
							$("#contact_form").before("<h4>Success!</h4><p>Your message has been sent! We'll contact you shortly.</p>");
						});
   					}
				 );
		}
		
		return false;
	});
	
});