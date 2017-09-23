
$(document).ready(function() {
	var top_height = $(".top_bar").height();
	var lastScroll = 0;
	var menu_show = 1;
	/*
	$("#hide").click(function() {
		if (menu_show == 1) {
			menu_show = 0;
			$(".main_menu").slideUp();
		}
		else {
			menu_show = 1;
			$(".main_menu").slideDown();
		}
		$("#hide i").toggleClass("down");
	});
	*/

	$("#me").click(function() {
		$("#me").css({"margin-left": "10vh"})
		$("#qmark").css({"opacity": "0"});
		$("#me_picture").css({"opacity": "1"});
		$("#info").css({"opacity": "1", "transform": "scale(1)", "width": "60vw"});
	});

	$(window).scroll(function() {
		if ($(window).scrollTop() <= top_height) {
			$(".nar_bar").css({"position": ""});
			$(".nar_bar").css({"position": ""});
		}
		else {
			$(".nar_bar").css({"position": "fixed", "top": "0px"});
			$(".side_bar").css({"position": "fixed", "top": "7vh"});
			$(".content").css({"padding-top": "7vh"});
			if (lastScroll > $(window).scrollTop()) {
				$(".nar_bar").slideDown();
				$(".side_bar").css({"top": "7vh"});
			}
			else {
				$(".nar_bar").slideUp();
				$(".side_bar").css({"top": "0vh"});
			}
			
		}
		lastScroll = $(window).scrollTop();
	});


	//news
	$('input[type="checkbox"]:eq(0)').change(function() {
		$('input[type="checkbox"]').prop('checked',$(this).prop('checked'));
	});
	$('#add').click(function() {
		location.replace("index.php?tab=add_"+tab);
	});
	$('#reload').click(function() {
		location.reload();
	});
	$('#delete').click(function() {
		$confirm = confirm("Are you sure to delete all selected " + tab + "?");
		if ($confirm) {
			console.log("confirm");
			var id = [];
			$('input[type="checkbox"]:checkbox:checked').each(function(i) {
				id[i] = $(this).val();
			});
			if (id.length == 0) {
				alert("Nothing selected to delete");
			}
			else {
				remove(tab, id);
			}
		}
	});
	$('.sbutton.delete').click(function() {
		$confirm = confirm("Are you sure to delete this " + tab + "?");
		if ($confirm) {
			var id = [];
			id[1] = $(this).val();
			remove(tab, id);
		}
	});

	function remove(tab, id) {
		$.ajax({
			url: tab + ".php",
			type: 'POST',
			data: {
				id: id,
				action: "delete"
			},
			success: function(data) {
				$('.content').html(data);
			},
			error: function() {
				alert("Something wrong, please try again");
			}
		});
	}

	$('#up_img').change(function() {
		var length = $(this)[0].files.length;
		var img, src;
		for (var i=1; i<length; i++) {
			console.log($(this)[0].files[i]);
			src = URL.createObjectURL($(this)[0].files[i]);
			img = "<img src='" + src + "' height='200px'>";
			$('#pre_img').after(img);
		}
		src = URL.createObjectURL($(this)[0].files[0]);
		$('#pre_img').attr("src", src);
	});
	$('.image').click(function() {
		$('.image').not(this).removeClass("clicked");
		$(this).toggleClass("clicked");

	});

});


function logged_in() {
	//	document.getElementById("name").innerHTML = "Hello " + t;
	document.getElementById("welcome").style.display = "block";
	document.getElementById("hello_bt").style.display = "none";	
	document.getElementById("login_out").innerHTML = "Logout";
}

function submit_form() {
	document.getElementById("auto_submit").submit();
}

var time_show = 1, post_show = 1, my_post;	

function time() {	
	if (time_show == 0) {
		time_show = 1;
		time_on();
	}
	else {
		time_show = 0;
		time_on();
	}
}

function time_on() {
	if (time_show == 1) {
		var t = setTimeout(time_on, 500);
		var now = new Date();
		var y, m, d, h, mi, s, day;
		y = now.getYear() + 1900;
		m = reMonth(now.getMonth());
		d = now.getDate();
		h = reTime(now.getHours());
		mi = reTime(now.getMinutes());
		s = reTime(now.getSeconds());
		day = reDay(now.getDay());
		
		document.getElementById("time_value0").innerHTML = day;	
		//document.getElementById("time_bt").value = "Hide Time";
		
		document.getElementById("time_value1").innerHTML = d + " " + m + " " + y;
		document.getElementById("time_value2").innerHTML = h + " : " + mi + " : " + s;
	}
	else {
		clearTimeout(t);
		//document.getElementById("time_bt").value = "Show Time"
		document.getElementById("time_value0").innerHTML = "";
		document.getElementById("time_value1").innerHTML = ""
		document.getElementById("time_value2").innerHTML = ""
	}
	
}

function reTime(i) {
	if (i<10) {
		i = '0' + i;
	}
	return i;
}

function reDay(i) {
	switch(i) {
		case 0:
			return "Saturday";
			break;
		case 1:
			return "Sunday";
			break;
		case 2:
			return "Monday";
			break;
		case 3:
			return "Tuesday";
			break;
		case 4:
			return "Wednesday";
			break;
		case 5:
			return "Thursday";
			break;
		case 6:
			return "Friday";
			break;
		
	}
}

function reMonth(i) {
	switch(i) {
		case 0:
			return "January";
			break;
		case 1:
			return "February";
			break;
		case 2:
			return "March";
			break;
		case 3:
			return "Apirl";
			break;
		case 4:
			return "May";
			break;
		case 5:
			return "June";
			break;
		case 6:
			return "July";
			break;
		case 7:
			return "August";
			break;
		case 8:
			return "Septemper";
			break;
		case 9:
			return "October";
			break;
		case 10:
			return "November";
			break;
		case 11:
			return "December";
			break;	
	}
}

function post() {	
	if (post_show == 0) {
		post_show = 1;
		post_on();
	}
	else {
		post_show = 0;
		post_on();
	}
}

function post_on() {
	if (post_show == 1) {
		document.getElementById("post").value = "Hide Post";
		document.getElementById("post_value").innerHTML = my_post;
	}
	else {
		my_post = document.getElementById("post_value").innerHTML;
		document.getElementById("post").value = "Show Post";
		document.getElementById("post_value").innerHTML = "";
	}
	
}

//test
function loadajax() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById('test').innerHTML = this.responseText;
		}
	}
	xhttp.open("GET", "../html/nar_bar.html", true);
	xhttp.send();
}

$(document).ready(function() {
	$("#test_bt").click(function() {
		//$("#test").load("../account/login_out.php");
		/*
		$.get("../account/login_out.php", function(data, status){
			$("#test").html(data);
		});
		*/
		$.post("../account/login_out.php",
		{
			usr: "hmp12",
			pass: "shaman12"
		},
		function(data, status){
			$("#test").html(data);
		});
	});
});