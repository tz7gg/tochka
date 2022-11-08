<?php

include 'settings.php';

$userId = $_GET['userid'];
$productId = $_GET['productid'];

$purchase = [
	'userId' => $userId,
	'productId' => $productId,
	'isPurchase' => false,
];

$userID = $purchase['userId'];
$productId = $purchase['productId'];

$link = mysqli_connect($addres, $login, $pass, $base);
$sql = "SELECT * FROM `orders_users` WHERE (`user_id` = '$userID') AND (`product_id` = '$productId')";
$response = mysqli_query($link, $sql);
while ($row = mysqli_fetch_array($response)) {
	if ($row) {
		$purchase['isPurchase'] = true;
	}
}

if (!$purchase['isPurchase']) {
	$sql = "SELECT * FROM `products` WHERE `id` = '$productId'";
	$response = mysqli_query($link, $sql);
	while ($row = mysqli_fetch_array($response)) {
		$purchase['price'] = $row['price'];
	}

	$sql = "SELECT * FROM `coins` WHERE `user_id` = $userID";
	$response = mysqli_query($link, $sql);
	while ($row = mysqli_fetch_array($response)) {
		$purchase['coins'] += intval($row['price']);
	}

	$price = $purchase['price'];

	if($purchase['price'] <= $purchase['coins']) {
		$sql = "INSERT INTO `coins`(user_id, price, action) VALUES ($userID, -$price, 'purchase producnt_id $productId')";
		$response = mysqli_query($link, $sql);

		$purchase['coins'] -= $purchase['price'];
	
		$link = mysqli_connect($addres, $login, $pass, $base);
		$sql = "INSERT INTO `orders_users`(product_id, user_id) VALUES ($productId, $userID)";
		$response = mysqli_query($link, $sql);
	}	
}

echo json_encode($purchase);
