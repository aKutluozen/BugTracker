<?php 
    $username = $_POST["username"];
    $password = $_POST["password"];
    // TEMPORARY WAY TO GIVE ACCESS TO INTERNAL PEOPLE - Will be moved to a database system.
    if($username !== "admin" || $password !== "admin"){
        header("Location: ../index.html#!/login.html");
    } else {
        setcookie("loggedin", "true", time() + (86400 * 30), "/"); // 86400 = 1 day
        header("Location: ../index.html#!/manageBugs");
    }
?>
