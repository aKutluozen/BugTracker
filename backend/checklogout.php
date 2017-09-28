<?php
setcookie("loggedin", "false", time() + (86400 * 30), "/"); // 86400 = 1 day
header("Location: ../index.html");
?>