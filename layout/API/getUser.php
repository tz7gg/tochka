<?php

include 'settings.php';

$user = $_GET['user'];
$userID = 0;

$userInfo = [
	'id' => $userID,
	'coins' => 0,
	'products' => [],
	'orders' => []
];

$link = mysqli_connect($addres, $login, $pass, $base);
$sql = "SELECT * FROM `users` WHERE `login` = '$user'";
$response = mysqli_query($link, $sql);
while ($row = mysqli_fetch_array($response)) {
	$userInfo['id'] = intval($row['id']);
}
$userID = $userInfo['id'];

if ($userID) {
	$sql = "SELECT * FROM `coins` WHERE `user_id` = $userID";
	$response = mysqli_query($link, $sql);
	while ($row = mysqli_fetch_array($response)) {
		$userInfo['coins'] += intval($row['price']);
	}

	$sql = "SELECT * FROM `products`";
	$response = mysqli_query($link, $sql);
	while ($row = mysqli_fetch_array($response)) {
		$item = ['id' => $row['id'], 'description' => $row['description'], 'price' => $row['price']];
		array_push($userInfo['products'], $item);
	}

	$sql = "SELECT * FROM `orders_users` WHERE `user_id` = $userID";
	$response = mysqli_query($link, $sql);
	while ($row = mysqli_fetch_array($response)) {
		$item = ['product_id' => $row['product_id']];
		array_push($userInfo['orders'], $item);
	}
}

echo json_encode($userInfo);
