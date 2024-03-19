<?php
$method = $_SERVER['REQUEST_METHOD'];
if ($method == 'POST'){

    // Retrieve the name entered in the form
    $name = $_POST["name"];

    // Generate the filename by appending '.html' to the name
    $filename = "userDirects/" . $name . ".html";

    // Read the content template from a separate file
    $template = file_get_contents("template.html");

    // Replace placeholders in the template with the actual content
    $content = str_replace("{name}", $name, $template);

    // Create the new HTML file and write the content
    file_put_contents($filename, $content);

    // Redirect to the newly created file
    header("Location: $filename");
    exit();
    }
?>