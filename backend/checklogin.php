<?php 
    $username = $_POST["username"];
    $password = $_POST["password"];
    if($username !== "cvoadmin" || $password !== "cvoadmin"){
        header("Location: ../index.html#!/login.html");
    } else {
        setcookie("loggedin", "true", time() + (86400 * 30), "/"); // 86400 = 1 day
        header("Location: ../index.html#!/manageBugs");
    }
?>