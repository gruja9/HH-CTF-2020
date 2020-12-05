<?php
	$cookie_name = "admin";
	$cookie_value = "0";
	setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/");
?>
<html>
<head>
<meta charset="UTF-8">
    <title>Login</title>
        <style>
         .button {
         background-color: #ff0000;
         border: none;
         color: white;
         padding: 20px 34px;
         text-align: center;
         text-decoration: none;
         display: inline-block;
         font-size: 20px;
         margin: 4px 2px;
         cursor: pointer;
         }
        </style>
</head>
<body>
<h1>Login page</h1>
<?php
if(isset($_COOKIE[$cookie_name])) {
    	if($_COOKIE[$cookie_name]==1){
		echo "Hello admin, here is your flag: hhctf_flag{fe79007c6ceed591a27cc1d5a0075f87}";
	}
	else{
		echo "Hello regular user, we are sorry only l33t admins get flags.";
	}
}
?>
<br><br>
<form action="chall3.php" method="POST">
        <fieldset>

                <br>Username<br>
                <input value="" type="text" name="Username">
                <br>Password<br>
                <input value="" type="text" name="Password"><br><br>

                <input value="Login" type="submit" class="button">
        </fieldset>
</form>
</body>
</html>
