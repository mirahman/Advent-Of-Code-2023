<?php 
$lines = file('./input.txt');
print_r($lines);
$count = 0;
foreach($lines as $line) {
    $count += 1;
    echo str_pad($count, 2, 0, STR_PAD_LEFT).". ".$line;
}