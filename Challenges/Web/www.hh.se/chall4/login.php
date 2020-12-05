<?php
        $cookie_name = "?";
        $cookie_value = "aW5zZWN1cmU=";
        $cookie_name2 = "admin";
        $cookie_val2 = "0";
        setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/");
        setcookie($cookie_name2, $cookie_val2, time() + (86400 * 30), "/");
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

<?php
        if(isset($_COOKIE[$cookie_name])) {
                if(isset($_GET['Username'], $_GET['Password'])){
                        $varuser = $_GET['Username'];
                        $varpass = $_GET['Password'];
                        if(($varuser === "admin") && ($varpass === "insecure")){
                                if($_COOKIE[$cookie_name2]==1){
                                        echo "hhctf_flag{remembertocheckcookies}";
                                }
                                else{
                                        echo "Not admin enough";
                                }
                        }
                        else{
                                echo "Incorrect username or password. Remember, there's no need to brute force the creds (and the server can't handle it).";
                                header('Location: fail.php');
                        }
                }
        }
        else{
                header('Location: index.html');
        }
?>

<!--
<br><br>
<form action="index.php" method="POST">
        <fieldset>

                <br>Username<br>
                <input value="" type="text" name="Username">
                <br>Password<br>
                <input value="" type="text" name="Password"><br><br>

                <input value="Login" type="submit" class="button">
        </fieldset>
</form>
-->
</body>
</html>